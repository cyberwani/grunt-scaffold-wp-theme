/**
 * Build Theme
 *
 * @author {%= author_name %}
 * @version {%= version %}
 * @param grunt
 */
module.exports = function( grunt ) {

  grunt.initConfig({
  
    // Load configuration about project
    pkg: grunt.file.readJSON( 'composer.json' ),
    
    uglify: {
      'production': {
        options: {
          mangle: false,
          beautify: false
        },
        files: {
          'scripts/app.js':     [ 'scripts/src/app.dev.js' ],
          'scripts/require.js': [ 'vendor/usabilitydynamics/lib-utility/scripts/require.js' ]
        }
      }
    },
    
    requirejs: {
    
    },
    
    // Documentation
    yuidoc: {
      compile: {
        name: '<%= pkg.name %>',
        description: '<%= pkg.description %>',
        version: '<%= pkg.version %>',
        url: '<%= pkg.homepage %>',
        logo: 'http://media.usabilitydynamics.com/logo.png',
        options: {
          paths: './',
          outdir: 'static/codex'
        }
      }
    },
    
    // Less Compilation
    less: {
      'app.css': {
        options: {
          yuicompress: true,
          relativeUrls: true
        },
        files: {
          'styles/app.css': [ 'styles/less/app.less' ]
        }
      },
      'app.dev.css': {
        options: {
          relativeUrls: true
        },
        files: {
          'styles/app.dev.css': [ 'styles/less/app.less' ]
        }
      },
      'editor-style.dev.css': {
        options: {
          yuicompress: false,
          relativeUrls: true
        },
        files: {
          'styles/editor-style.dev.css': [ 'styles/less/editor-style.less' ]
        }
      },
      'editor-style.css': {
        options: {
          yuicompress: true,
          relativeUrls: true
        },
        files: {
          'styles/editor-style.css': [ 'styles/less/editor-style.less' ]
        }
      }
    },

    // Watcher
    watch: {
      options: {
        interval: 1000,
        debounceDelay: 500
      },
      styles: {
        files: [
          'gruntfile.js', 'styles/less/*.*'
        ],
        tasks: [ 'less' ]
      },
      scripts: {
        files: [
          'gruntfile.js', 'scripts/src/*.js'
        ],
        tasks: [ 'uglify', 'requirejs' ]
      },
      docs: {
        files: [
          'styles/app.*.css', 'composer.json', 'readme.md'
        ],
        tasks: [ 'markdown' ]
      }
    },
    
    markdown: {
      all: {
        files: [
          {
            expand: true,
            src: 'readme.md',
            dest: 'static/',
            ext: '.html'
          }
        ],
        options: {
          markdownOptions: {
            gfm: true,
            codeLines: {
              before: '<span>',
              after: '</span>'
            }
          }
        }
      }
    }

  });
  
  // Load tasks
  grunt.loadNpmTasks( 'grunt-component' );
  grunt.loadNpmTasks( 'grunt-component-build' );
  grunt.loadNpmTasks( 'grunt-markdown' );
  grunt.loadNpmTasks( 'grunt-requirejs' );
  grunt.loadNpmTasks( 'grunt-spritefiles' );
  grunt.loadNpmTasks( 'grunt-contrib-symlink' );
  grunt.loadNpmTasks( 'grunt-contrib-yuidoc' );
  grunt.loadNpmTasks( 'grunt-contrib-uglify' );
  grunt.loadNpmTasks( 'grunt-contrib-watch' );
  grunt.loadNpmTasks( 'grunt-contrib-less' );
  //grunt.loadNpmTasks( 'grunt-contrib-concat' );
  //grunt.loadNpmTasks( 'grunt-contrib-clean' );
  //grunt.loadNpmTasks( 'grunt-shell' );
  
  // Build Assets
  grunt.registerTask( 'default', [ 'yuidoc', 'uglify', 'markdown', 'less', 'requirejs' ] );

  // Install environment
  grunt.registerTask( 'install', [ 'yuidoc', 'uglify', 'markdown', 'less', 'requirejs' ] );

  // Update Environment
  grunt.registerTask( 'update', [ 'yuidoc', 'uglify', 'markdown', 'less', 'requirejs' ] );

  // Prepare distribution
  grunt.registerTask( 'dist', [ 'yuidoc', 'uglify', 'markdown', 'less', 'requirejs' ] );

  // Update Documentation
  grunt.registerTask( 'doc', [ 'yuidoc', 'markdown' ] );

};