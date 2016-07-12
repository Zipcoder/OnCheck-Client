// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.directives', 'starter.services', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
  })

  .state('app.tabs', {
    url: '/tabs',
    views: {
      'menuContent': {
        templateUrl: 'templates/tabNav.html',

      }
    }
  })

  .state('app.submit-tip', {
      url: '/submit-tip',
      views: {
        'menuContent': {
          templateUrl: 'templates/submitTip.html',
          controller: 'tipCtrl'
        }
      }
    })
    .state('app.glossary', {
        url: '/glossary',
        views: {
          'menuContent': {
            templateUrl: 'templates/glossary.html'
          }
        }
    })
    .state('app.analytics', {
        url: '/analytics',
        views: {
          'menuContent': {
            templateUrl: 'templates/analytics.html'
          }
        }
    })

    .state('app.user-tips', {
      url: '/user-tips',
      views: {
        'menuContent': {
          templateUrl: 'templates/userTips.html',
          controller: 'userTipsCtrl'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/tabs');
});
