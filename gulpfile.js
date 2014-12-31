var path       = require('path');

var gulp       = require('gulp');
var g          = require('gulp-load-plugins')();
var source     = require('vinyl-source-stream');
var buffer     = require('vinyl-buffer');
var chalk      = require('chalk');
var prettyTime = require('pretty-hrtime');

var browserify = require('browserify');
var watchify   = require('watchify');
var to5ify     = require("6to5ify");
var mold       = require('mold-source-map');

var karma      = require('karma').server;
var bowerFiles = require('main-bower-files');
var del        = require('del');
var es         = require('event-stream');
var _          = require('lodash');

var paths = {
  styles:     'app/styles/app.less',
  templates:  'app/scripts/**/*.html',
  images:     'app/images/**/*',
  html:       'app/index.html',
  app: {
    basedir: 'app/scripts',
    entry: './index.js'
  }
};

var vendorScriptOrder = [
  '**/jquery.min.js',
  '**/angular.min.js',
  '**/*.js'
];

var bundlerOpts = _.extend({
  basedir:  paths.app.basedir,
  debug:    true
}, watchify.args);

var bundler = browserify(paths.app.entry, bundlerOpts);
bundler.transform(to5ify);

gulp.task('clean', function (cb) {
  del(['dist'], cb);
});

// Copy all static images
gulp.task('images', ['clean'], function () {
  return gulp.src(paths.images)
    .pipe(gulp.dest('dist/images'));
});

gulp.task('build:vendor', [], buildBower);
gulp.task('build:less', [], buildLess);
gulp.task('build:partials', [], buildPartials);
gulp.task('build:app', [], buildApp);

gulp.task('build', ['clean'], function () {
  return gulp.src(paths.html)
    .pipe(g.plumber({ errorHandler: onError }))
    .pipe(g.inject(buildBower(), {ignorePath: 'dist', name: 'bower'}))
    .pipe(g.inject(buildApp(), {ignorePath: 'dist'}))
    .pipe(g.plumber.stop())
    .pipe(gulp.dest('dist'));
});

gulp.task('assets', ['images']);
gulp.task('default', ['assets', 'build']);

gulp.task('watch', function () {
  var w    = watchify(bundler)
    , name = 'browserify';

  function rebundle() {
    g.util.log('Starting', '\'' + chalk.cyan(name) + '\'...');
    return bundle(w);
  }
  function rebundleDone(time) {
    var secs     = ~~(time / 1000)
      , nanosecs = (time % 1000) * Math.pow(10, 6)
      , time     = prettyTime([secs, nanosecs]);

    g.util.log(
      'Finished', '\'' + chalk.cyan(name) + '\'',
      'after', chalk.magenta(time)
    );
  }
  w.on('update', rebundle);
  w.on('time', rebundleDone);

  gulp.watch(['app/styles/**/*.less'], ['build:less']);
  gulp.watch([paths.templates], ['build:partials']);

  return rebundle();
});

gulp.task('test', function (done) {
  karma.start({
    configFile:  path.join(__dirname, 'karma.config.js'),
    singleRun:   true
  }, done);
});

function onError (err) {
  g.util.log(err);
  this.emit('end');
}

function buildApp () {
  var css      = buildLess()
    , partials = buildPartials()
    , js       = bundle(bundler);

  return es.merge(css, partials, js);
}

function bundle (bundler) {
  return bundler.bundle()
    .on('error', g.util.log.bind(g.util, 'Browserify Error'))
    .pipe(mold.transformSourcesRelativeTo(paths.app.basedir))
    .pipe(source('app.js'))
      .pipe(buffer())
      .pipe(g.sourcemaps.init({loadMaps: true}))
      .pipe(g.sourcemaps.write('./', {sourceRoot: './'}))
    .pipe(gulp.dest('dist/scripts'));
}

function buildBower () {

  var bowerSrc = gulp.src(bowerFiles(), { base: 'bower_components' });
  bowerSrc.pipe(g.plumber({ errorHandler: onError }));

  // gulp-ignore has useful function, confusing naming
  // ignore.include passes files that meet the filter condition
  // ignore.exclude discards files that meet the filter condition
  var css = bowerSrc
    .pipe(g.ignore.include('**/*.css'))
    .pipe(g.sourcemaps.init({loadMaps: true}))
      .pipe(g.concat('vendor.css'))
      .pipe(g.plumber.stop())
    .pipe(g.sourcemaps.write('./', {sourceRoot: '/bower_components'}))
    .pipe(gulp.dest('dist/styles'));

  var fonts = bowerSrc
    .pipe(g.ignore.include('**/fonts/*'))
    .pipe(g.flatten())
    .pipe(g.plumber.stop())
    .pipe(gulp.dest('dist/fonts'));

  var js = bowerSrc
    .pipe(g.ignore.include('**/*.js'))
    .pipe(g.ignore.exclude(['**/angular-mocks.js']))
    .pipe(g.sourcemaps.init({loadMaps: true}))
      .pipe(g.order(vendorScriptOrder))
      .pipe(g.concat('vendor.js'))
      .pipe(g.plumber.stop())
    .pipe(g.sourcemaps.write('./', {sourceRoot: '/bower_components'}))
    .pipe(gulp.dest('dist/scripts'));

  return es.merge(css, fonts, js);
}

function buildLess () {
  return gulp.src(paths.styles)
    .pipe(g.sourcemaps.init())
      .pipe(g.plumber({ errorHandler: onError }))
      .pipe(g.less())
      .pipe(g.concat('app.css'))
      .pipe(g.plumber.stop())
    .pipe(g.sourcemaps.write('./', {sourceRoot: './'}))
    .pipe(gulp.dest('dist/styles'));
}

function buildPartials () {
  return gulp.src(paths.templates, { base: paths.app.basedir })
    .pipe(g.plumber({ errorHandler: onError }))
    .pipe(g.ngHtml2js({ moduleName: "partials" }))
    .pipe(g.concat('app.partials.js'))
    .pipe(g.plumber.stop())
    .pipe(gulp.dest("dist/scripts"));
}
