/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    uglify: {
      dist: {
        files: {
          'docroot/assets/js/giko.min.js': [
            'docroot/assets/js/_*.js'
          ]
        },
        options: {
          sourceMap: 'docroot/assets/js/giko.min.js.map',
          sourceMappingURL: '/assets/js/giko.min.js.map'
        }
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: false,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true
        }
      },
      all: [
        'Gruntfile.js',
        'docroot/assets/js/*.js',
        '!docroot/assets/js/giko.min.js'
      ]
    },
    less: {
      dist: {
        files: {
          'docroot/assets/css/giko.min.css': [
            'docroot/assets/less/main.less'
          ]
        },
        options: {
          compress: true,
          sourceMap: false,
          sourceMapFilename: 'docroot/assets/css/giko.min.css.map',
          sourceMapRootpath: '/assets/css/'
        }
      }
    },
    watch: {
      less: {
        files: [
          'docroot/assets/less/*.less'
        ],
        tasks: ['less']
      },
      js: {
        files: [
          'Gruntfile.js',
          'docroot/assets/js/_*.js'
        ],
        tasks: ['jshint', 'uglify']
      },
      livereload: {
        // Browser live reloading
        // https://github.com/gruntjs/grunt-contrib-watch#live-reloading
        options: {
          livereload: false
        },
        files: [
          'assets/css/main.min.css',
          'assets/js/scripts.min.js',
          'templates/*.php',
          '*.php'
        ]
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');

  // Default task.
  grunt.registerTask('dev', ['watch']);
  grunt.registerTask('default', ['less', 'jshint', 'uglify']);

};
