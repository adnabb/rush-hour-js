const gulp = require("gulp")
const ts   = require("gulp-typescript")

exports.default = gulp.series(build)
exports.dev     = gulp.watch('src/**/*.ts', {}, build)

function build() {
  const tsProject = ts.createProject("tsconfig.json")
  return tsProject.src().pipe(tsProject()).js.pipe(gulp.dest('dist'))
}
