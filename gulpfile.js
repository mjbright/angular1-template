
// require gulp and selected modules:
var gulp = require('gulp'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    uglify = require('gulp-uglify'),
    usemin = require('gulp-usemin'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    // HAS ISSUES! cache = require('gulp-cache'),
    newer = require('gulp-newer'),
    changed = require('gulp-changed'),
    rev = require('gulp-rev'),
    browserSync = require('browser-sync'),
    del = require('del'),
    debug = require('gulp-debug'),
    ngannotate = require('gulp-ng-annotate'),
    foreach = require('gulp-foreach');

// Default task
gulp.task('default', ['clean'], function() {
    gulp.start('usemin', 'imagemin','copyfonts','copyhtml');
});

// 'clean': Start by deleting the 'dist' directory
gulp.task('clean', function() {
    return del(['dist']);
});

// 'jshint': run jshint on all js files:
gulp.task('jshint', function() {
  return gulp.src('app/scripts/**/*.js')
         .pipe(jshint())
         .pipe(jshint.reporter(stylish));
});

// 'usemin': minimize css and js files referred to in html files
gulp.task('usemin', ['jshint'], function() {
    //return gulp.src(['./app/*.html', './app/views/*.html']).pipe(foreach(function(stream, file) {}
    gulp.src('./app/views/*.html').pipe(gulp.dest('dist/views'));

    return gulp.src('./app/*.html').pipe(foreach(function(stream, file) {
         return stream.pipe(usemin({
              css:[minifycss(), rev()],
              js: [ngannotate(), uglify(), rev()]
         }))
         .pipe(debug({title: "GULP-DEBUG(usemin): '??html?? css js"}))
         .pipe(gulp.dest('dist/'));
    }));
});   

// 'imagemin': minimize images
gulp.task('imagemin', function() {
  return del(['dist/images']), gulp.src('app/images/**/*')

      // TODO: Need to add back minimzation here:
      .pipe(newer('./dist/images'))
      //.pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))

      .pipe(debug({title: "GULP-DEBUG(imagemin): app/images/*"}))
      .pipe(gulp.dest('./dist/images'))
      .pipe(notify({ message: 'Images task complete' }));
});

// 'copyhtml': Copy html files to dist
gulp.task('copyhtml', ['clean'], function() {
   //console.log("**** COPYVIEWS-1 ****")
   gulp.src('app/views/**/*.html')
       .pipe(debug({title: "GULP-DEBUG(copyhtml): app/views/*.html"}))
       .pipe(gulp.dest('./dist/views'));

   //console.log("**** COPYVIEWS-2 ****")
   gulp.src('app/**/*.html')     
       .pipe(debug({title: "GULP-DEBUG(copyhtml): app/*.html"}))
       .pipe(gulp.dest('./dist'));
});

// 'copyfonts': Copy fonts and css files to dist:
gulp.task('copyfonts', ['clean'], function() {

   gulp.src('bower_components/**/*.{ttf,woff,eof,svg,css}*')
       .pipe(debug({title: "GULP-DEBUG(copyfonts): bower_components/**"}))
       .pipe(gulp.dest('./dist/bower_components'));
});


// 'watch': Watch for js/html/image file changes : copy ...
gulp.task('watch', ['browser-sync'], function() {
  // Watch .js files
  gulp.watch('{app/scripts/**/*.js,app/styles/**/*.css,app/**/*.html,app/views/**/*.html}', ['usemin']);
  gulp.watch('{app/views/**/*.html}', ['copyhtml']);

  // Watch image files
  console.log("IMAGE");
  gulp.watch('app/images/**/*', ['imagemin']);

});

// 'browser-sync':
gulp.task('browser-sync', ['default'], function () {
   var files = [
      'app/**/*.html',
      'app/styles/**/*.css',
      'app/images/**/*.png',
      'app/scripts/**/*.js',
      'dist/**/*'
   ];

   browserSync.init(files, {
      server: {
         baseDir: "dist",
         index: "index.html"
      },
      reloadDelay: 1000
   });

   // Watch any files in dist/, reload on change
  gulp.watch(['dist/**']).on('change', browserSync.reload);
});


