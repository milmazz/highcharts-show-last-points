module.exports = function (grunt) {
  // load all grunt tasks matching the ['grunt-*', '@*/grunt-*'] patterns
  require('load-grunt-tasks')(grunt)

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    eslint: {
      options: {
        configFile: '.eslintrc'
      },
      highcharts: 'highcharts-show-last-points.js',
      gruntfile: 'Gruntfile.js'
    },
    jsbeautifier: {
      highcharts: {
        src: 'highcharts-show-last-points.js',
        options: {
          config: '.jsbeautifyrc'
        }
      },
      gruntfile: {
        src: 'Gruntfile.js',
        options: {
          config: '.jsbeautifyrc'
        }
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
          '/* <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        separator: ',',
        compress: true
      },
      highcharts: {
        src: 'highcharts-show-last-points.js',
        dest: 'highcharts-show-last-points.min.js'
      }
    }
  })

  // Tasks
  grunt.registerTask('default', [
    'jsbeautifier:highcharts',
    'eslint:highcharts'
  ])
  grunt.registerTask('gruntfile', [
    'jsbeautifier:gruntfile',
    'eslint:gruntfile'
  ])
  grunt.registerTask('dist', [
    'jsbeautifier:highcharts',
    'eslint:highcharts',
    'uglify:highcharts'
  ])
}
