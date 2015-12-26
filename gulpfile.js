
var gulp       = require('gulp'),
    concat     = require('gulp-concat'),
    ext        = require('gulp-ext'),
    minifyCss  = require('gulp-minify-css'),
    tinypng    = require('gulp-tinypng-compress'),
    uglify     = require('gulp-uglify'),
    htmlmin    = require('gulp-htmlmin'),
    favicons   = require("gulp-favicons/es5"),
    sequence   = require('gulp-sequence'),
    livereload = require('gulp-livereload');


var srcPath = {
    css  : 'src/design/css/',
    fonts: 'src/design/fonts/',
    imgs : 'src/design/imgs/',
    js   : 'src/design/js/',
    root : 'src/'
};

var destPath = {
    css  : 'html/design/css/',
    fonts: 'html/design/fonts/',
    imgs : 'html/design/imgs/',
    js   : 'html/design/js/',
    root : 'html/'
};


// ---------------------------------------------------------------------
// | Maintains updated src changes in the browser.                     |
// ---------------------------------------------------------------------

/**
 * Reload on change.
 */
gulp.task('reload', function() {
    gulp.src(srcPath.root)
        .pipe(livereload());
});

/**
 * Monitors changes in projects files and apply changes instantly.
 * Use with livereload chrome extension.
 * Reference: https://github.com/vohof/gulp-livereload
 */
gulp.task('watch', function() {
    // Files to be watched.
    var files = [
        srcPath.root + '*.html',
        srcPath.css  + '**/*.css',
        srcPath.js   + '**/*.js'
    ];

    livereload.listen();

    gulp.watch(files, ['reload']);
});


// ---------------------------------------------------------------------
// | Build production project.                                         |
// ---------------------------------------------------------------------

/**
 * Concatenate and minify css files using gulp-minify-css.
 * Reference: https://github.com/murphydanger/gulp-minify-css
 */
gulp.task('css', function() {
    // Source files.
    var srcFiles = [
        srcPath.css + 'vendor/bootstrap.css',
        srcPath.css + 'styles.css',
        srcPath.css + 'styles-responsive.css'
    ];

    // Output file.
    var outputFile = 'styles.css';

    return gulp.src(srcFiles)
        .pipe(concat(outputFile))
        .pipe(minifyCss())
        .pipe(gulp.dest(destPath.css));
});


/**
 * Copy specific files from fonts folder.
 */
gulp.task('fonts', function() {
    // Source files.
    var srcFiles = srcPath.fonts + '*.{eot,woff,woff2,ttf,svg}'

    return gulp.src(srcFiles)
        .pipe(gulp.dest(destPath.fonts));
});


/**
 * Optimize images using gulp-tinypng-compress.
 * Reference: https://github.com/stnvh/gulp-tinypng-compress
 */
gulp.task('imgs', function() {
    var tinyFiles  = srcPath.imgs + '*.{png,jpg,jpeg}',
        otherFiles = srcPath.imgs + '*.*';

    // Copy non png, jpg and jpeg files.
    gulp.src([otherFiles, '!' + tinyFiles])
        .pipe(gulp.dest(destPath.imgs));


    // tinypng options
    var opts = {
        key: 'pFFAVLRIqtR-exFUo5XuSLrNAuP53k4d',
        sigFile: srcPath.imgs + '.tinypng-sigs',
        log: true
    };

    // Optimize tinyFiles.
    return gulp.src(tinyFiles)
        .pipe(tinypng(opts))
        .pipe(gulp.dest(destPath.imgs));
});


/**
 * Concatenate and minify js files.
 * References: https://github.com/terinjokes/gulp-uglify
 *             http://lisperator.net/uglifyjs/
 */
gulp.task('js', function() {
    // Output file.
    var outputFile = 'scripts.js';

    return gulp.src(srcPath.js + '/**/*.*')
        .pipe(concat(outputFile))
        .pipe(uglify())
        .pipe(gulp.dest(destPath.js));
});


/**
 * Minify and create txt file from html.
 * References: https://github.com/jonschlinkert/gulp-htmlmin
 *             https://github.com/kangax/html-minifier
 */
gulp.task('html', function() {
    // Source files.
    var srcFiles = srcPath.root + '*.html';

    // Opts
    var opts = {
        collapseWhitespace: true,
        removeComments: true
    };

    return gulp.src(srcFiles)
        .pipe(htmlmin(opts))
        .pipe(ext.replace('txt', 'html'))
        .pipe(gulp.dest(destPath.root));
});


/**
 * Copy robots and humans.
 */
gulp.task('txt', function() {
    // Source files.
    var srcFiles = [
        srcPath.root + 'robots.txt',
        srcPath.root + 'humans.txt'
    ];

    return gulp.src(srcFiles)
        .pipe(gulp.dest(destPath.root));
});


/**
 * Generate generate favicos.
 * Reference: https://github.com/haydenbleasel/favicons
 */
gulp.task('favico', function() {
    var opts = {
        appName: "My App",
        appDescription: "This is my application",
        developerName: "Goplek",
        developerURL: "http://goplek.com/",
        background: "transparent",
        path: "html/favicons",
        url: "http://pageurl.com/",
        display: "standalone",
        orientation: "portrait",
        version: 1.0,
        logging: false,
        online: false,
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
    };

    return gulp.src(srcPath.root + 'favico.png')
        .pipe(favicons(opts))
        .pipe(gulp.dest(destPath.root + 'favicons'));
});


/**
 * Build project and lave ready to deploy.
 * @param done
 */
gulp.task('build', function(done) {
    sequence('css', 'fonts', 'imgs', 'js', 'html', 'txt', 'favico', done);
});


/**
 * Run default task.
 */
gulp.task('default', ['build']);