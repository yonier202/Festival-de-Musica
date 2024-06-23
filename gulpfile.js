import gulpSass from 'gulp-sass';
import * as dartSass from "sass";
import {src, dest, watch} from 'gulp';

const sass = gulpSass(dartSass);

export function css(done) {
    src('src/scss/app.scss')
        .pipe(sass().on('error',sass.logError))
        .pipe(dest('build/css'))
    done();
}

export function dev() {
    //compilar todos los archivos que esten en la carpeta scss con extención scss
    watch('src/scss/**/*.scss',css);
}

