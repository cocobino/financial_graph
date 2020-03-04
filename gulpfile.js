const fileInclude = require('gulp-file-include'); // html file include
const browsersync = require('browser-sync').create(); // 웹서버 
const gulp = require('gulp');
const concat = require('gulp-concat');

const dir = {
	src: './src/',
	dist: './dist/'
};

//html: [dir.src + '*.html', dir.src + '**/*.html']
const src = {
	html: [dir.src + '*.html', dir.src + '**/*.html']
};

const dist = {
	css: [dir.dist + 'resources/css/*.css'],
	js: [dir.dist + 'resources/js/'],
	frontJs: [dir.dist + 'resources/js/front/*.js']
};

// js concat
function concatJs(done) {
	return gulp.src(dist.frontJs)
	.pipe(concat('bundle.js'))
	.pipe(gulp.dest(dist.js));
	done();
}

// BrowserSync - webserver
function browserSync(done) {
	browsersync.init({
		server: {
			baseDir: dir.dist
		},
		port: 7777
	});
	done();
}

// BrowserSync Reload
function browserSyncReload(done) {
	browsersync.reload();
	done();
}


// html file include
function fileIncludeFunc() {
	return gulp.src(src.html)
	.pipe(fileInclude({
		prefix: '@@',
		basepath: '@file'
	}))
	.pipe(gulp.dest(dir.dist));
}

function watchFile() {
	gulp.watch(src.html, fileIncludeFunc);
	gulp.watch(src.html, browserSyncReload);
	gulp.watch(dist.css, browserSyncReload);
	gulp.watch(dist.frontJs, concatJs);
	gulp.watch(dist.js + 'bundle.js' , browserSyncReload);
}

exports.default = gulp.series(gulp.parallel(fileIncludeFunc, watchFile, browserSync));