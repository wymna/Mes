module.exports = function() {
    var client = './www/js/';
    var clientlivb='./www/';


    var config = {

      build: './build/',
      client: client,
      fonts: './bower_components/font-awesome/fonts/**/*.*',
      htmltemplates: client + '**/*.html',
      images: client + 'images/**/*.*',
      index: client + 'index.html',
      js: [
        clientlivb + 'script/*.js',
        clientlivb + 'lib/ngCordova/**/*.js'
        //clientlivb + 'lib/ionic/js/*.js',
      ],


      /**
       * template cache
       */
      templateCache: {
        file: 'templates.js',
        options: {
          module: 'mes',
          standAlone: false,
          root: 'js/'
        }
      }
    }

    return config;
};
