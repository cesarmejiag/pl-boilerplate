const { src, dest, watch, series } = require("gulp"),
  autoprefixer = require("gulp-autoprefixer"),
  browserify = require("browserify"),
  buffer = require("vinyl-buffer"),
  favicons = require("gulp-favicons"),
  livereload = require("gulp-livereload"),
  sass = require("gulp-sass"),
  source = require("vinyl-source-stream"),
  sourcemaps = require("gulp-sourcemaps"),
  tsify = require("tsify"),
  uglify = require("gulp-uglify"),
  webp = require("gulp-webp");

const srcPath = {
  fonts: "src/fonts",
  images: "src/images",
  scripts: "src/scripts",
  sass: "src/sass",
  ts: "src/typescript",
  root: "src",
};

const destPath = {
  styles: "public/design/styles",
  fonts: "public/design/fonts",
  images: "public/design/images",
  scripts: "public/design/scripts",
  root: "public",
};

/**
 * Generate favicons for all devices.
 * @param {function} callback
 */
function favico(callback) {
  const settings = {
    appName: "PL App",
    appShortName: "PL App",
    appDescription: "This is an App created with pl-boilerplate",
    developerName: "César Mejía",
    developerURL: "http://cesarmejia.me/",
    background: "#020307",
    path: "/favicons",
    url: "http://cesarmejia.me/",
    display: "standalone",
    orientation: "portrait",
    scope: "/",
    start_url: "/?homescreen=1",
    version: 1.0,
    logging: false,
    html: `${destPath}/index.html`,
    pipeHTML: true,
    replace: true,
    icons: {
      android: false,
      appleIcon: true,
      appleStartup: false,
      coast: false,
      favicons: true,
      firefox: false,
      opengraph: false,
      twitter: false,
      windows: false,
      yandex: false,
    },
  };

  return src(`${srcPath.root}/favicon.png`)
    .pipe(favicons(settings))
    .pipe(dest(`${destPath.root}/favicons`));
}

/**
 * Copy fonts to production folder.
 * @param {function} callback
 */
function fonts(callback) {
  const files = `${srcPath.fonts}/*.{eot,woff,woff2,ttf,svg,otf}`;

  return src(files).pipe(dest(`${destPath.fonts}`));
}

/**
 * Copy images to production folder.
 * @param {function} callback
 */
function images(callback) {
  const files = `${srcPath.images}/**.{jpg,jpeg,png,svg,webp}`;

  return src(files).pipe(dest(`${destPath.images}`));
}

/**
 * Compiles sass files to generate production styles.
 * @param {function} callback
 */
function styles(callback) {
  const sassSettings = {
    outputStyle: "compressed",
  };

  const autoprefixerSettings = {
    browsers: ["last 2 versions"],
    cascade: false,
  };

  return src(`${srcPath.sass}/styles.scss`)
    .pipe(sass(sassSettings))
    .pipe(autoprefixer(autoprefixerSettings))
    .pipe(dest(`${destPath.styles}`));
}

/**
 * Compiles and minify scripts.
 * @param {function} callback
 */
function scripts(callback) {
  const init = {
    basedir: ".",
    debug: true,
    entries: ["src/scripts/scripts.js"],
  };

  return (
    browserify(init)
      .plugin(tsify, { target: "es2015" })
      .transform("babelify", {
        presets: ["@babel/preset-env"],
      })
      .bundle()
      .pipe(source("bundle.min.js"))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      // .pipe(uglify())
      .pipe(sourcemaps.write("./"))
      .pipe(dest("dist"))
  );
}

/**
 * Handle watch event.
 * @param {function} callback
 */
function watcher(callback) {
  const files = [
    // `${srcPath.fonts}/**/*.{otf,ttf,woff,svg}`,
    // `${srcPath.imgs}/**/*.{jpg,jpeg,svg,png}`,
    // `${srcPath.sass}/**/*.scss`,
    `${srcPath.scripts}/**/*.{ts,js}`,
  ];

  livereload.listen();

  // return watch(files, series(styles, scripts));
  return watch(files, series(scripts));
}

/**
 * Copy images to production folder.
 * @param {function} callback
 */
function webpImages(callback) {
  const files = `${srcPath.images}/**/*.{jpg,jpge,png,tiff,webp}`;

  return src(`${files}`).pipe(webp()).pipe(`${destPath.images}`);
}

exports.favico = favico;
exports.fonts = fonts;
exports.images = images;
exports.styles = styles;
exports.scripts = scripts;
exports.watcher = watcher;
exports.webpImages = webpImages;

exports.build = series(favico, fonts, images, styles, scripts);
