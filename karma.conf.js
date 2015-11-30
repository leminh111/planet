module.exports = function(karmaConfig) {
  karmaConfig.set({
    basePath: '',
    frameworks: ['browserify', 'jasmine'],
    files: [
      'src/scripts/**',
      'tests/units/**'
    ],
    exclude: [
      '**/*.swp'
    ],
    preprocessors: {
      'src/scripts/**': ['browserify'],
      'tests/units/**': ['browserify']
    },
    port: 9876,
    colors: true,
    logLevel: karmaConfig.LOG_INFO,
    reporters: ['progress'],
    autoWatch: true,
    browsers: ['Firefox'],
    singleRun: false,
    concurrency: Infinity,
    browserify: {
      debug: true,
      transform: [
        ['babelify', { presets: 'es2015' }]
      ]
    },
    watchify: {
      poll: true
    }
  });
}
