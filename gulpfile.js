import gulpSass from 'gulp-sass';
import * as dartSass from "sass";
import {src, dest, watch, series} from 'gulp';

const sass = gulpSass(dartSass);

export function css(done) {
    src('src/scss/app.scss', {sourcemaps: true})
        .pipe(sass().on('error',sass.logError))
        .pipe(dest('build/css', {sourcemaps: true}))
    done();
}
export function js(done){
    src('src/js/app.js')
        .pipe(dest('build/js'))
    done();
}

export function dev() {
    //compilar todos los archivos que esten en la carpeta scss con extención scss
    watch('src/scss/**/*.scss',css);
    watch('src/js/**/*.js',js);
}

export default series(js, css, dev);

