var fs = require('fs-extra');

module.exports = function(grunt) {

  grunt.initConfig({
    import: {
      options: {
        indent: true
      },
      sass: {
        files: [{
          expand: true,
          src: "src/sass/*.scss",
          rename: function(dest, src) {
            return src.replace('src/sass', '_build/sass');
          }
        }]
      },
      babel: {
        files: [{
          expand: true,
          src: "src/babel/*.js",
          rename: function(dest, src) {
            return src.replace('src/babel', '_build/babel');
          }
        }]
      },
      html: {
        files: [{
          expand: true,
          src: "src/html/*.html",
          rename: function(dest, src) {
            return src.replace('src/html', '_build/html');
          }
        }]
      },
    },

    /*
      Compile SASS code to CSS
     */
    sass: {
      elements: {
        options: {
          sourcemap: 'none',
          outputStyle: 'expanded',
          noCache: true
        },
        files: [{
          expand: true,
          cwd: '',
          src: "_build/sass/*.scss",
          dest: '',
          rename: function(dest, src) {
            return src.replace('_build/sass', '_build/css');
          },
          ext: ".css"
        }]
      }
    },
    /*
      Add css prefixes for compatibility (mainly for Firefox ESL)
     */
    postcss: {
      options: {
        map: false,
        processors: [
          require('autoprefixer')({
            browsers: ['firefox 24', 'IE 10', 'last 2 versions']
          })
        ]
      },
      elements: {
        src: "_build/css/*.css"
      }
    },
    /*
      Process JavaScript
     */
    babel: {
      options: {
        sourceMap: false,
        // presets: ['es2015']
        // full es2015 list gives problems with behaviors
        plugins: [
          require("babel-plugin-transform-es2015-template-literals"),
          require("babel-plugin-transform-es2015-literals"),
          // require("babel-plugin-transform-es2015-function-name"),
          [require("babel-plugin-transform-es2015-arrow-functions"), {
            "spec": true
          }],
          require("babel-plugin-transform-es2015-block-scoped-functions"),
          require("babel-plugin-transform-es2015-classes"),
          require("babel-plugin-transform-es2015-object-super"),
          require("babel-plugin-transform-es2015-shorthand-properties"),
          require("babel-plugin-transform-es2015-duplicate-keys"),
          require("babel-plugin-transform-es2015-computed-properties"),
          require("babel-plugin-transform-es2015-for-of"),
          require("babel-plugin-transform-es2015-sticky-regex"),
          require("babel-plugin-transform-es2015-unicode-regex"),
          require("babel-plugin-check-es2015-constants"),
          require("babel-plugin-transform-es2015-spread"),
          require("babel-plugin-transform-es2015-parameters"),
          require("babel-plugin-transform-es2015-destructuring"),
          require("babel-plugin-transform-es2015-block-scoping"),
          require("babel-plugin-transform-es2015-typeof-symbol"),
          require("babel-plugin-transform-es2015-modules-commonjs"),
          [require("babel-plugin-transform-regenerator"), {
            async: false,
            asyncGenerators: false
          }]
        ]
      },
      elements: {
        files: [{
          expand: true,
          // src: ['src_elements/**/*.js'],
          src: "_build/babel/*.js",
          rename: function(dest, src) {
            return src.replace('_build/babel', '_build/javascript');
          },
        }]
      }
    },
    copy: {
      html: {
        files: [{
          expand: true,
          src: "_build/html/*.html",
          rename: function(dest, src) {
            return src.replace('_build/html', '.');
          }
        }]
      }
    },
    uglify: {
      options: {
        preserveComments: /(?:^\*|@(?:license|preserve|cc_on))/,
        mangleProperties: false,
        mangle: true,
        beautify: true,
        srewIE8: true,
        sourceMap: false
      },
      /*
       * Compile JavaScript on Polymer Elements
       */
      elements: {
        files: [{
          expand: true,
          src: "_build/javascript/*.js"
        }]
      }
    },

    inline: {
      html: {
        files: [{
          expand: true,
          src: "_build/html/*.html"
        }]
      }
    },

    clean: {
      buildfiles: {
        options: {
          'no-write': false
        },
        src: ['_build']
      },
      all: {
        options: {
          'no-write': false
        },
        src: ['_build', 'responsive-columns.html']
      }
    },

    'wct-test': {
      local: {
        options: {
          remote: false,
          suites: ["test/index.html"]
        }
      }
    }

  });

  require("load-grunt-tasks")(grunt);
  grunt.loadNpmTasks('grunt-import');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-inline');
  grunt.loadNpmTasks('web-component-tester');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', ['import', 'sass', 'postcss', 'babel', 'uglify', 'inline', 'copy', 'clean:buildfiles']);
  grunt.registerTask('test', ['wct-test']);
};
