module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            options: {
                jshintrc: '.jshintrc'
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
                compress: true,
            },
            highcharts: {
                src: 'highcharts-show-last-points.js',
                dest: 'highcharts-show-last-points.min.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-jsbeautifier');

    // Tasks
    grunt.registerTask('default', [
        'jsbeautifier:highcharts',
        'jshint:highcharts'
    ]);
    grunt.registerTask('gruntfile', [
        'jsbeautifier:gruntfile',
        'jshint:gruntfile'
    ]);
    grunt.registerTask('dist', [
        'jsbeautifier:highcharts',
        'jshint:highcharts',
        'uglify:highcharts'
    ]);
};
