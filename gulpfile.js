const { src, dest, watch, series } = require("gulp")
  , autoprefixer = require("gulp-autoprefixer")
  , browserify = require("browserify")
  , buffer = require("vinyl-buffer")
  , favicons = require("gulp-favicons")
  , livereload = require("gulp-livereload")
  , rename = require("gulp-rename")
  , sass = require("gulp-sass")
  , source = require("vinyl-source-stream")
  , sourcemaps = require("gulp-sourcemaps")
  , tsify = require("tsify")
  , uglify = require("gulp-uglify")
  , webp = require("gulp-webp");

const srcPath = {
  fonts: "src/fonts",
  images: "src/images",
  scripts: "src/scripts",
  styles: "src/styles",
  root: "src",
};

const destPath = {
  css: "public/design/css",
  fonts: "public/design/fonts",
  images: "public/design/imgs",
  js: "public/design/js",
  root: "public",
};

/**
 * Generate favicons for all devices.
 * @param {function} cb
 */
function favico() {
  const settings = {
    appName: "PL Web App",
    appShortName: "PL Web App",
    appDescription: "This is a Web App created with pl-boilerplate",
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
 * @param {function} cb
 */
function fonts() {
  const files = `${srcPath.fonts}/*.{eot,woff,woff2,ttf,svg,otf}`;
  return src(files).pipe(dest(`${destPath.fonts}`));
}

/**
 * Copy images to production folder.
 * @param {function} cb
 */
function images() {
  const files = `${srcPath.images}/**.{jpg,jpeg,png,svg,webp}`;
  return src(files).pipe(dest(`${destPath.images}`));
}

/**
 * Compiles sass files to generate production styles.
 * @param {function} cb
 */
function styles() {
  const sassSettings = {
    outputStyle: "compressed",
  };

  const autoprefixerSettings = {
    cascade: false,
  };

  const renameSettings = {
    basename: "styles.min",
    extname: ".css"
  };

  return src(`${srcPath.styles}/styles.scss`)
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sass(sassSettings))
    .pipe(autoprefixer(autoprefixerSettings))
    .pipe(rename(renameSettings))
    .pipe(sourcemaps.write("./"))
    .pipe(dest(`${destPath.css}`));
}

/**
 * Compiles and minify scripts.
 * @param {function} callback
 */
function scripts() {
  const init = {
    basedir: ".",
    debug: true,
    entries: ["src/scripts/scripts.js"],
  };

  return (
    browserify(init)
      // .plugin(tsify, { target: "es2015" }) // Use if proyect is developed with typescript
      .plugin(tsify, { target: "es5" })
      .transform("babelify", { presets: ["@babel/preset-env"],})
      .bundle()
      .pipe(source("scripts.min.js"))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(uglify())
      .pipe(sourcemaps.write("./"))
      .pipe(dest(`${destPath.js}`))
  );
}

/**
 * Handle watch event.
 * @param {function} cb
 */
function watcher() {
  const files = [
    `${srcPath.fonts}/**/*.{otf,ttf,woff,svg}`,
    `${srcPath.images}/**/*.{jpg,jpeg,svg,png}`,
    `${srcPath.styles}/**/*.scss`,
    `${srcPath.scripts}/**/*.{ts,js}`,
  ];

  livereload.listen();
  return watch(files, series(styles, scripts));
}

/**
 * Copy images to production folder.
 * @param {function} cb
 */
function webpImages() {
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
