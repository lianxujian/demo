var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var server = require('gulp-webserver');
var webpack = require('webpack');
var config = require('./webpack.config.js');
//生成测试包
const sourcemaps=require('gulp-sourcemaps');
const postcss=require('gulp-postcss');
const autoprefixer=require('autoprefixer');
const minifycss=require('gulp-clean-css');
const uglify=require('gulp-uglify');

//compile sass to css use gulp-sass
gulp.task('sass',function(){
	return gulp.src('src/scss/*.scss')
	.pipe(sass())
	.pipe(gulp.dest('dist/css'))
})

//create dev server
gulp.task('server',['sass'],function(){
	return gulp.src('./')
	.pipe(server({
		open:'src/html/index.html',
		directoryListing: true,
		livereload:{
			enable:true,
			filter:function(fileName){
				console.log('fileName'+fileName);
				if(fileName.match(/node_modules|src\\js|src\\scss/)){
					return false;
				}
				return true;
			}
		}
	}))
})

gulp.task('watch',function(){
	gulp.watch('src/scss/*.scss',['sass']);
	gulp.watch('src/html/*.html');
	gulp.watch('src/js/*.js',['webpack']);
})

gulp.task('webpack',function(callback){
	webpack(config).run(function(err, stats) {
        callback();
    });
})
//生成测试包
gulp.task('prefixcss',function(){
	return gulp.src('dist/css/*.css')
		.pipe(sourcemaps.init())
		.pipe(postcss([autoprefixer()]))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('test/css'))
})//压缩css文件
gulp.task('minifycss',['prefixcss'],function(){
	return gulp.src('test/css/*.css')
		.pipe(minifycss())
		.pipe(gulp.dest('public/css'))
})
//压缩js文件
gulp.task('uglify',function(){
	return gulp.src('dist/js/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('public/js'))
})

//开发阶段使用
gulp.task('default',['server','watch']);
//生成测试包	
gulp.task('build',['minifycss','uglify']);
