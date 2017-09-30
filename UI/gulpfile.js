const gulp = require("gulp");
const babel = require("gulp-babel");
const babelPresetEs2015 = require("babel-preset-es2015");
const babelPluginAmd = require("babel-plugin-transform-es2015-modules-amd");

const JS_SOURCE = "./src/*.js";
const JS_DESTINATION = "./dist";

gulp.task("build", function()
{
    return gulp.src(JS_SOURCE)
        .pipe(babel(
        {
            presets: [babelPresetEs2015],
            plugins: [babelPluginAmd]
        }))
        .pipe(gulp.dest(JS_DESTINATION));
});

gulp.task("watch-build", function() {
    return gulp.watch(JS_SOURCE, ["build"]);
});
