const { src, dest, watch, series } = require( 'gulp' )

const sass = require( 'gulp-sass' )
    , autoprefixer = require( 'gulp-autoprefixer' )
    , uglify = require( 'gulp-uglify' )
    , concat = require( 'gulp-concat' )
    , babel = require('gulp-babel')


const srcPath = {
    fonts  : 'source/design/fonts'  ,
    images : 'source/design/images' ,
    scripts: 'source/design/scripts',
    sass   : 'source/design/sass'   ,
    root   : 'source/'
}

const destPath = {
    styles : 'html/design/styles' ,
    fonts  : 'html/design/fonts'  ,
    images : 'html/design/images' ,
    scripts: 'html/design/scripts',
    root   : 'html/'
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

    return src( `${srcPath.sass}/styles.scss` )
        .pipe( sass( sassSettings ) )
        .pipe( autoprefixer( autoprefixerSettings ) )
        .pipe( dest( `${destPath.styles}` ) )

}


/**
 * Compiles js files to generate production scripts.
 * @param {function} callback 
 */
function scripts ( callback ) {
    const babelSettings = {
        presets: [ '@babel/env' ]
    }

    return src( `${srcPath.scripts}/scripts.js` )
        .pipe( babel( babelSettings ) )
        .pipe( uglify(  ) )
        .pipe( concat( `scripts.js` ) )
        .pipe( dest( `${destPath.scripts}` ) )

}


exports.styles = styles;
exports.scripts = scripts;

