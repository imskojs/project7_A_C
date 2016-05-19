var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var ngTemplate = require('gulp-ng-template');
var imageop = require('gulp-image-optimization');
var rename = require('gulp-rename');
var sh = require('shelljs');
var argv = require('yargs').argv;
var gulpif = require('gulp-if');
var stripDebug = require('gulp-strip-debug');
// var inlinesource = require('gulp-inline-source');


var paths = {
  img: ['./codes/img/**/*.*'],
  view: ['./codes/**/*.html'],
  sass: [
    './codes/scss/ionic.app.scss',
    './codes/scss/common.scss',
    './codes/lib/ionRadioFix/ionRadioFix.scss',
    './codes/scss/ngTagsInput.scss',
    './codes/state/**/*.scss'
  ],
  js: [
    './codes/js/app.js',
    './codes/js/config/**/*.js',
    './codes/js/service/**/*.js',
    './codes/js/directive/**/*.js',
    './codes/js/filter/**/*.js',
    './codes/state/**/*.js'
  ],
  //------------------------
  //  Add library paths here
  //------------------------
  lib: [
    // NON-Angular 3rd Party Libraries
    // './codes/lib/jquery/dist/jquery.js',
    './codes/lib/underscore/underscore.js',
    './codes/lib/moment/moment.js',
    // Ionic/Angular Core
    './codes/lib/ionic/js/ionic.bundle.js',
    // Angular 3rd Party Libraries
    './codes/lib/ngstorage/ngStorage.js',
    './codes/lib/angular-permission/dist/angular-permission.js',
    './codes/lib/angular-resource/angular-resource.js',
    // './codes/lib/uiBootstrapDatePicker/ui-bootstrap-custom-tpls-0.13.0.js',
    './codes/lib/ngCordova/dist/ng-cordova.js',
    './codes/lib/ng-file-upload//ng-file-upload.js',
    './codes/lib/ng-tags-input/ng-tags-input.js',
    './codes/lib/ngIOS9UIWebViewPatch/ngIOS9UIWebViewPatch.js',
    './codes/lib/ionRadioFix/ionRadioFix.js'
  ]
};


gulp.task('lib', function(done) {
  gulp.src(paths.lib)
    .pipe(concat('libs.all.js'))
    .pipe(gulpif(argv.production, uglify({
      mangle: false
    })))
    .pipe(rename({
      extname: '.min.js'
    }))
    .pipe(gulp.dest('./www/lib/'))
    .on('end', done);
});


gulp.task('img', function(done) {
  gulp.src(paths.img)
    .pipe(imageop({
      optimizationLevel: 5,
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest('./www/img'))
    .on('end', done);
});




gulp.task('view', function() {
  return gulp.src(paths.view)
    .pipe(ngTemplate({
      standalone: true,
      filePath: 'ngTemplates.js'
    }))
    .pipe(gulp.dest('./www/view/'));
});

gulp.task('sass', function(done) {
  gulp.src(paths.sass)
    .pipe(concat('ionic.app.all.scss'))
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(gulpif(argv.production, minifyCss({
      keepSpecialComments: 0
    })))
    .pipe(rename({
      extname: '.min.css'
    }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('js', function(done) {
  gulp.src(paths.js)
    .pipe(concat('app.all.js'))
    .pipe(gulpif(argv.production, stripDebug()))
    .pipe(gulpif(argv.production, uglify({
      mangle: false
    })))
    .pipe(rename({
      extname: '.min.js'
    }))
    .pipe(gulp.dest('./www/js/'))
    .on('end', done);
});

gulp.task('compile', ['lib', 'img', 'view', 'sass', 'js']);
gulp.task('default', ['view', 'sass', 'js']);

gulp.task('watch', function() {
  gulp.watch(paths.view, ['view']);
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.js, ['js']);
});






// gulp.task('inlinesource', function() {
//     return gulp.src('./www/index-dev.html')
//         .pipe(inlinesource({
//             compress: false
//         }))
//         .pipe(rename('index.html'))
//         .pipe(gulp.dest('./www/'));
// });



//==========================================================================
//              IONIC BUILT
//==========================================================================
gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
