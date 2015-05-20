// Generated on 2014-09-17 using generator-angular 0.9.8
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Configurable paths for the application
  var appConfig = {
    app: 'app',
    dist: 'dist'
  };

  var rewriteRulesSnippet = require('grunt-connect-rewrite/lib/utils').rewriteRequest;

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    yeoman: appConfig,

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      js: {
        files: ['<%= yeoman.app %>/script/**/*.js'],
        tasks: ['newer:jshint:all'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
      view:{
        files: ['<%= yeoman.app %>/view/**/*.html'],
        tasks: ['newer:tmod'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
      jsTest: {
        files: ['test/spec/**/*.js'],
        tasks: ['newer:jshint:test', 'karma']
      },
      compass: {
        files: ['<%= yeoman.app %>/style/**/*.{scss,sass}'],
        tasks: ['compass:server', 'autoprefixer']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= yeoman.app %>/**/*.html',
          '.tmp/style/**/*.css',
          '<%= yeoman.app %>/images/**/*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: 35729
      },
      rules: [
          // Internal rewrite
          {from: '^/[a-z0-9/]*$', to: '/index.html'}
      ],
      livereload: {
        options: {
          open: 'http://localhost:9000/',
          middleware: function (connect) {
            return [
              rewriteRulesSnippet,
              connect.static('.tmp'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect.static(appConfig.app)
            ];
          }
        }
      },
      test: {
        options: {
          port: 9001,
          middleware: function (connect) {
            return [
              connect.static('.tmp'),
              connect.static('test'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect.static(appConfig.app)
            ];
          }
        }
      },
      dist: {
        options: {
          open: true,
          base: '<%= yeoman.dist %>'
        }
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: 'core.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: [
          'Gruntfile.js',
          '<%= yeoman.app %>/script/**/*.js'
        ]
      },
      test: {
        options: {
          jshintrc: 'test/test.jshintrc'
        },
        src: ['test/spec/**/*.js']
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '.sass-cache',
            '<%= yeoman.dist %>/**/*',
            '!<%= yeoman.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/style/',
          src: '**/*.css',
          dest: '.tmp/style/'
        }]
      }
    },

    // Automatically inject Bower components into the app
    wiredep: {
      app: {
        src: ['<%= yeoman.app %>/index.html'],
        ignorePath:  /\.\.\//
      },
      sass: {
        src: ['<%= yeoman.app %>/style/**/*.{scss,sass}'],
        ignorePath: /(\.\.\/){1,2}bower_components\//
      }
    },

    // Compiles Sass to CSS and generates necessary files if requested
    compass: {
      options: {
        sassDir: '<%= yeoman.app %>/style',
        cssDir: '.tmp/style',
        //用于合成雪碧图
        generatedImagesDir: '.tmp/image/generated',
        imagesDir: '<%= yeoman.app %>/image',
        javascriptsDir: '<%= yeoman.app %>/script',
        fontsDir: '<%= yeoman.app %>/style/font',
        importPath: './bower_components',
        httpImagesPath: '/image',
        httpGeneratedImagesPath: '/image/generated',
        httpFontsPath: '/style/font',
        relativeAssets: false,
        assetCacheBuster: false,
        raw: 'Sass::Script::Number.precision = 10\n'
      },
      dist: {
        options: {
          generatedImagesDir: '<%= yeoman.dist %>/image/generated'
        }
      },
      server: {
        options: {
          debugInfo: false
        }
      }
    },

    // Renames files for browser caching purposes
    filerev: {
      dist: {
        src: [
          '<%= yeoman.dist %>/script/**/*.js',
          '<%= yeoman.dist %>/style/**/*.css',
          '<%= yeoman.dist %>/image/**/*.{png,jpg,jpeg,gif,webp,svg}'
          //'<%= yeoman.dist %>/style/font/**/*.{eot,svg,ttf,woff}'
        ]
      }
    },

  // Reads HTML for usemin blocks to enable smart builds that automatically
  // concat, minify and revision files. Creates configurations in memory so
  // additional tasks can operate on them
  // <!-- build:<type>(alternate search path) <path> -->
  // ... HTML Markup, list of script / link tags.
  // <!-- endbuild -->
  //设定处理顺序，html文件
    useminPrepare: {
      html: ['<%= yeoman.app %>/index.html','<%= yeoman.app %>/storage.html'],
      options: {
        dest: '<%= yeoman.dist %>',
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglifyjs'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },

    // Performs rewrites based on filerev and the useminPrepare configuration
    usemin: {
      html: ['<%= yeoman.dist %>/**/*.html'],
      css: ['<%= yeoman.dist %>/style/**/*.css'],
      options: {
        assetsDirs: ['<%= yeoman.dist %>','<%= yeoman.dist %>/image','<%= yeoman.dist %>/style/font']
      }
    },

    // The following *-min tasks will produce minified files in the dist folder
    // By default, your `index.html`'s <!-- Usemin block --> will take care of
    // minification. These next options are pre-configured if you do not wish
    // to use the Usemin blocks.
    cssmin: {
      dist: {
        files: {
          '<%= yeoman.dist %>/style/vendor.css': [
            '<%= yeoman.app %>/style/**/*.css'
          ]
        }
      }
    },
    // uglify: {
    //   dist: {
    //     files: {
    //       '<%= yeoman.dist %>/script/script.js': [
    //         '<%= yeoman.dist %>/script/script.js'
    //       ]
    //     }
    //   }
    // },
    // concat: {
    //   dist: {}
    // },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/image',
          src: '**/*.{png,jpg,jpeg,gif}',
          dest: '<%= yeoman.dist %>/image'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/image',
          src: '**/*.svg',
          dest: '<%= yeoman.dist %>/image'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          conservativeCollapse: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true,
          removeOptionalTags: true
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: ['*.html', 'view/**/*.html'],
          dest: '<%= yeoman.dist %>'
        }]
      }
    },

    // ng-annotate tries to make the code safe for minification automatically
    // by using the Angular long form for dependency injection.
    ngAnnotate: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat/script',
          src: ['*.js', '!oldieshim.js'],
          dest: '.tmp/concat/script'
        }]
      }
    },

  // Replace Google CDN references
  // cdnify: {
  //   someTarget: {
  //     options: {
  //       base: '//cdn.example.com/stuff/'
  //     },
  //     files: [{
  //       expand: true,
  //       cwd: 'app',
  //       src: '**/*.{css,html}',
  //       dest: 'dist'
  //     }]
  //   }
  // }
    cdnify: {
      dist: {
        html: ['<%= yeoman.dist %>/*.html']
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          //匹配.开头的文件
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            '*.html',
            '*.js',
            'image/**/*.{webp}',
            'style/font/*.*'
          ]
        //图片
        }, {
          expand: true,
          cwd: '.tmp/image',
          dest: '<%= yeoman.dist %>/image',
          src: ['generated/*']
        //字体
        }, {
          expand: true,
          cwd: '.',
          src: ['bower_components/bootstrap-sass-official/assets/fonts/bootstrap/*'],
          dest: '<%= yeoman.dist %>'
        }]
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: [
        'compass:server'
      ],
      test: [
        'compass'
      ],
      dist: [
        'compass:dist',
        'imagemin',
        'svgmin'
      ]
    },

    // Test settings
    karma: {
      unit: {
        configFile: 'test/karma.conf.js',
        singleRun: true
      }
    },

    tmod: {
      template: {
        src: '<%= yeoman.app %>/view/**/*.html',
        dest: '<%= yeoman.app %>/view/compiled/view.js',
        options: {
            base: '<%= yeoman.app %>/view',
            minify:false,
            namespace:'QQSwitcherTmpl'
        } 
      }
    },
    ftpush: {
      build: {
        auth: {
          host: '192.168.1.107',
          port: 21,
          authKey: 'key1'
        },
        src: 'dist',
        dest: '/',
        exclusions: ['script','style']
      }
    }
  });


  grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'wiredep',
      'concurrent:server',
      'autoprefixer',
      'tmod',
      'configureRewriteRules',
      'connect:livereload',
      'watch'
    ]);
  });

  // grunt.registerTask('server', 'DEPRECATED TASK. Use the "serve" task instead', function (target) {
  //   grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
  //   grunt.task.run(['serve:' + target]);
  // });

  grunt.registerTask('test', [
    'clean:server',
    'concurrent:test',
    'autoprefixer',
    'connect:test',
    'karma'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'wiredep',
    'useminPrepare',
    'concurrent:dist',
    'autoprefixer',
    'concat',
    'tmod',
    'ngAnnotate',
    'copy:dist',
    'cdnify',
    'cssmin',
    'uglify',
    'filerev',
    'usemin',
    'htmlmin'
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'test',
    'build'
  ]);
};
