module.exports = function(karmaConfig) {
  karmaConfig.set({
    basePath: '',
    frameworks: ['browserify', 'jasmine'],
    files: [
      'src/scripts/**',
      'src/tests/units/**'
    ],
    exclude: [
      '**/*.swp'
    ],
    preprocessors: {
      'src/scripts/**': ['browserify'],
      'src/tests/units/**': ['browserify']
    },
    port: 9876,
    colors: true,
    logLevel: karmaConfig.LOG_INFO,
    reporters: ['dots'],
    autoWatch: true,
    browsers: ['firefox'],
    singleRun: false,
    concurrency: Infinity,
    browserify: pkg.config.browserify,
    watchify: {
      poll: true
    }
  });
}
