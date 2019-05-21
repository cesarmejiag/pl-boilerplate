const { src, dest, watch, series } = require( 'gulp' )

const sass = require( 'gulp-sass' )
    , autoprefixer = require( 'gulp-autoprefixer' )
    , uglify = require( 'gulp-uglify' )
    , concat = require( 'gulp-concat' )
    , babel = require( 'gulp-babel' )
    , favicons = require( 'gulp-favicons' )
    , livereload = require( 'gulp-livereload' )


const srcPath = {
    fonts  : 'source/design/fonts'  ,
    images : 'source/design/images' ,
    scripts: 'source/design/scripts',
    sass   : 'source/design/sass'   ,
    root   : 'source'
}

const destPath = {
    styles : 'html/design/styles' ,
    fonts  : 'html/design/fonts'  ,
    images : 'html/design/images' ,
    scripts: 'html/design/scripts',
    root   : 'html'
}


/**
 * Generate favicons for all devices.
 * @param {function} callback 
 */
function favico (callback) {
    const faviconsSettings = {
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
        html: `${ destPath }/index.html`,
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
            yandex: false
        }
    }

    return src( `${ srcPath.root }/favicon.png` )
        .pipe( favicons( faviconsSettings ) )
        .pipe( dest(`${ destPath.root }/favicons`) )
}


/**
 * Compiles sass files to generate production styles.
 * @param {function} callback 
 */
function styles ( callback ) {
    const sassSettings = {
        outputStyle: 'compressed'
    }

    const autoprefixerSettings = {
        browsers: [ 'last 2 versions' ],
        cascade: false
    }

    return src( `${ srcPath.sass }/styles.scss` )
        .pipe( sass( sassSettings ) )
        .pipe( autoprefixer( autoprefixerSettings ) )
        .pipe( dest( `${ destPath.styles }` ) )

}


/**
 * Compiles js files to generate production scripts.
 * @param {function} callback 
 */
function scripts ( callback ) {
    const babelSettings = {
        presets: [ '@babel/env' ]
    }

    return src( `${ srcPath.scripts }/scripts.js` )
        .pipe( babel( babelSettings ) )
        .pipe( uglify(  ) )
        .pipe( concat( `scripts.js` ) )
        .pipe( dest( `${ destPath.scripts }` ) )

}


/**
 * Handle watch event.
 * @param {function} callback 
 */
function watcher (callback) {
    const files = [
        `${ srcPath.fonts }/**/*.{otf,ttf,woff,svg}`,
        `${ srcPath.imgs }/**/*.{jpg,jpeg,svg,png}`,
        `${ srcPath.sass }/**/*.scss`,
        `${ srcPath.scripts }/**/*.js`
    ];

    livereload.listen()

    return watch( files, series( styles, scripts ) );
}


exports.favico = favico
exports.styles = styles
exports.scripts = scripts
exports.watcher = watcher
