var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    sass = require('gulp-sass'),
    csso = require("gulp-csso"),
    sourcemaps = require("gulp-sourcemaps"),
    jade = require("gulp-jade"),
    typeings = require("./typings.json");
    typescript = require('gulp-typescript');


/*| base setting or conf for the project|*/
var dir = {
    "pub":"./pub/",
    "bin":"./bin/"
}
//some constan dirs
var dir_ = {
    "bin":{
        "scss":dir.bin + "scss/**/*.scss",
        "ts":dir.bin + "ts/**/*.ts",
        "jade":dir.bin + "jade/**/*.jade"
    },
    "pub":{
        "css":dir.pub + "css",
        "js":dir.pub + "js",
        "jsLib":dir.pub + "js/lib"
    }
}
/*| gulp base setup|*/
gulp.task('default',['watch']);
gulp.task('watch', function() {
    gulp.watch(dir_.bin.scss, ['sass']);
    gulp.watch(dir_.bin.jade, ['jade']);
    gulp.watch(dir_.bin.ts, ['tsc']);
});
/*| third perTy component | */
gulp.task('grabOthers', function() {
    return gulp.src([
        'bower_components/**/*.*'
    ])
      .pipe(gulp.dest(dir.pub + "/lib/"))

});
/* common compile tasks */
gulp.task('sass', function() {
   return gulp.src(dir_.bin.scss)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest(dir_.pub.css))
});

gulp.task('jade', function() {
   return gulp.src(dir_.bin.jade)
        .pipe(plumber())
        .pipe(jade({pretty: true}))
        .pipe(gulp.dest(dir.pub))
});
gulp.task('tsc', function() {
    return gulp.src(dir_.bin.ts)
        .pipe(sourcemaps.init())
        .pipe(typescript(typeings.compilerOptions))
        .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(dir_.pub.js))
});