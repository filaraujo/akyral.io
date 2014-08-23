var metalsmith  = require('metalsmith');
var assets      = require('metalsmith-assets');
var autoprefixer= require('metalsmith-autoprefixer');
var templates   = require('metalsmith-templates');
var collections = require('metalsmith-collections');
var ignore      = require('metalsmith-ignore');
var permalinks  = require('metalsmith-permalinks');
var sass        = require('metalsmith-sass');
var swig        = require('swig');


function renderContents(config){
    return function(files, metalsmith, done){
        Object.keys(files).forEach(function(key){
            var file = files[key];

            if(file.component){
                file.contents = new Buffer(swig.render(file.contents.toString(), { locals: file }));
            }
        });
        done();
    }
}

function setAssetPath(config){
    return function(files, metalsmith, done){
        Object.keys(files).forEach(function(key){
            var file = files[key];
            file.pathRoot = !!file.component ? '../' : '';
        });
        done();
    }
}

metalsmith(__dirname)
    .use(setAssetPath())
    .use(ignore([
      'assets/components',
      'assets/components/**/*',
      'assets/components/**/.bower.json'
    ]))
    .use(collections({
        components: {
            pattern: 'components/*.html'
        }
    }))
    .use(permalinks({
        pattern: ':page'
    }))
    .use(sass({
        outputDir: 'assets/styles',
        outputStyle: 'compressed'
    }))
    .use(assets({
        source: './src/assets/components',
        destination: './assets/components'
    }))
    .use(renderContents())
    .use(templates({
        engine: 'swig',
        partials: {
            drawer: 'partials/drawer',
            footer: 'partials/footer',
            install: 'partials/install',
            header: 'partials/header',
            meta: 'partials/meta'
        }
    }))
    .use(autoprefixer())
    .destination('dist')
    .build(function(err, files) {
        if (err) { throw err; }
    });
