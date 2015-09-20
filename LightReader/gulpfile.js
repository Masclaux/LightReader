/// <binding BeforeBuild='auto_include' AfterBuild='auto_include' Clean='auto_include' ProjectOpened='auto_include' />
var gulp = require("gulp");
var rename = require("gulp-rename");
var includeSources = require('gulp-include-source');


//include model javascript files
gulp.task("auto_include", function ()
{
    return gulp.src('./www/index.tpl.html')
    .pipe(rename('index.html'))
    .pipe(includeSources())
    .pipe(gulp.dest('./www/'));    
});