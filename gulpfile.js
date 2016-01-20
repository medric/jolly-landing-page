var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')();

var paths = {
    js: [
        'public/app/js/*.js',
        'public/app/js/components/*.js'
    ],
    scss: 'public/assets/stylesheets/sass/**/*.scss',   
    templates: 'public/app/partials/*.html',
    dist: {
        css: 'dist/css',
        js: 'dist/js',
        templates: 'dist/templates',
        libs: ''
    }
};

var templateCache = require('gulp-angular-templatecache');

function watcherWithCache(name, src, tasks) {
    var watcher = gulp.watch(src, tasks);
    
    watcher.on('change', function(event) {
        if (event.type === 'deleted') {
            delete plugins.cached.caches.scripts[event.path];
            plugins.remember.forget(name, event.path);
        }
    });
}

// Dev
gulp.task('lint', function() {
    return gulp.src(paths.js)
        .pipe(plugins.plumber())
        .pipe(plugins.cached('lint')) // only pass through changed files
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('jshint-summary'))
        .pipe(plugins.jshint.reporter('fail'))
        .pipe(plugins.remember('lint')) // add back all files to the stream
        .pipe(gulp.dest(paths.dist.js));
});

// Dist
gulp.task('dist:css', function() {
    return gulp.src(paths.dist.css + '/*.css')
        .pipe(plugins.minifyCss())
        .pipe(gulp.dest(paths.dist.css));
});
    
gulp.task('dist:js', function() {
    return gulp.src(paths.js)
        .pipe(plugins.plumber())
        .pipe(plugins.cached('dist:scripts')) // only pass through changed files
        .pipe(plugins.uglify())
        .pipe(plugins.remember('dist:scripts')) // add back all files to the stream
        .pipe(plugins.concat('jolly.min.js'))
        .pipe(gulp.dest(paths.dist.js));
});

/*gulp.task('libs', function()
{
    return gulp.src(paths.libs)
        .pipe(plugins.plumber())
        .pipe(gulp.dest('dist/libs'));
});*/

// Angular templates caching
gulp.task('dist:templates', function () {
    gulp.src(paths.templates)
        .pipe(templateCache())
        .pipe(gulp.dest(paths.dist.templates));
});

// Watcher
gulp.task('watch', function() {
    //watcherWithCache('lint', paths.js, ['lint']);
    watcherWithCache('dist:js', paths.js, ['dist:js']);
    //watcherWithCache('dist:css', paths.css, ['dist:css']);
    watcherWithCache('dist:templates', paths.templates, ['dist:templates']);
});

gulp.task('default', ['watch']);
