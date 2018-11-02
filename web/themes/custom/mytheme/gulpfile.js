var gulp 			= require('gulp'),
	sass 			= require('gulp-sass'),
	browserSync 	= require('browser-sync'),
	concat 			= require('gulp-concat'),
	uglify          = require('gulp-uglifyjs'),
	cssnano 		= require('gulp-cssnano'),
    rename 			= require('gulp-rename'),
    del 			= require('del'),
	imagemin        = require('gulp-imagemin'),
    pngquant        = require('imagemin-pngquant'),
	cache           = require('gulp-cache'),
	autoprefixer 	= require('gulp-autoprefixer'),
	notify 			= require('gulp-notify');

gulp.task('sass', function(){ // Создаем таск Sass
	return gulp.src('sass/**/*.sass') // Берем источник
		.pipe(sass({ outputStyle: 'expanded' }).on("error", notify.onError()))
		.pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
		.pipe(gulp.dest('css')) // Выгружаем результата в папку app/css
		.pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});

gulp.task('clean', function() {
    return del.sync('dist');
});

gulp.task('clear', function() {
    return cache.clearAll();
});

gulp.task('img', function() {
	return gulp.src('img/**/*')
	.pipe(cache(imagemin({
		interlaced: true,
		progressive: true,
		svgoPlugins: [{removeViewBox: false}],
		use: [pngquant()]
	})))
	.pipe(gulp.dest('dist/img'));
});

gulp.task('scripts', function() {
    return gulp.src([
        // 'themes/custom/dtheme/libs/bxslider/js/jquery.bxslider.min.js',
    ])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('js'));
});

gulp.task('css-libs', ['sass'], function() {
    return gulp.src('css/libs.css')
    .pipe(cssnano())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('css'));
    
});

gulp.task('browser-sync', function() {
    browserSync({
    	notify: false,
        proxy: "http://blog.localhost/"
    })
});

gulp.task('watch', ['browser-sync', 'css-libs', 'scripts'], function() {
	gulp.watch('sass/**/*.sass', ['sass']);
	gulp.watch('js/**/*.js', browserSync.reload);
	gulp.watch('template/**/*.twig', browserSync.reload);
});

gulp.task('build', ['clean', 'img', 'sass', 'scripts'], function() {

	var buildCss = gulp.src([
			'css/main.css',
			'css/libs.min.css'
		])

	.pipe(gulp.dest('dist/css'));

	var buildFonts = gulp.src('fonts/**/*')
	.pipe(gulp.dest('dist/fonts'));

	var buildJs = gulp.src('js/**/*')
	.pipe(gulp.dest('dist/js'));

	var buildJson = gulp.src('json/**/*')
	.pipe(gulp.dest('dist/json'));

	var buildTwig = gulp.src('templates/**/*')
	.pipe(gulp.dest('dist/template'));

	var buildYml = gulp.src('*.yml')
	.pipe(gulp.dest('dist'));
	
});







