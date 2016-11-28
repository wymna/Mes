
angular.module('mes', ['ionic','ngCordova','mes.login','mes.main',
  'mes.message','mes.schedule','mes.warn','mes.itemwakeup','mes.warnx','mes.config'])

.run(['$ionicPlatform','$timeout','$location','$rootScope','$http','$ionicPopup','$cordovaInAppBrowser','$cordovaFileTransfer', '$cordovaFile', '$cordovaFileOpener2','appConfig',function($ionicPlatform,$timeout,$location,$rootScope,$http,$ionicPopup,$cordovaInAppBrowser,$cordovaFileTransfer, $cordovaFile, $cordovaFileOpener2,appConfig) {
  $ionicPlatform.ready(function() {

    if(window.cordova && window.cordova.plugins.Keyboard) {

      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    checkVersion();

    window.plugins.jPushPlugin.init();
    window.plugins.jPushPlugin.setAlias("");
    window.plugins.jPushPlugin.setDebugMode(true);

    //setTimeout(function () {
    //  navigator.splashscreen.hide();
    //}, 100);



  });


    //物理返回按钮控制&双击退出应用
    $ionicPlatform.registerBackButtonAction(function (e) {
      //判断处于哪个页面时双击退出
      if ($location.path() == '/main'||$location.path() == '/login') {
        if ($rootScope.backButtonPressedOnceToExit) {
          //tongzhi

          var confirmPopup = $ionicPopup.confirm({
            title: "重要提示",
            template: "确定要退出HOLLiAS MES Mobile?",
            cancelText: "取消",
            okText:"确定"
          });
          confirmPopup.then(function(res) {
            if(res) {

              ionic.Platform.exitApp();
            } else {
              console.log('You are not sure');
            }
          });

        } else {
          $rootScope.backButtonPressedOnceToExit = true;
         //tongzhi
          var confirmPopup = $ionicPopup.confirm({
            title: "重要提示",
            template: "确定要退出HOLLiAS MES Mobile?",
            cancelText: "取消",
            okText:"确定"
          });
          confirmPopup.then(function(res) {
            if(res) {

              ionic.Platform.exitApp();
            } else {
              console.log('You are not sure');
            }
          });
          setTimeout(function () {
            $rootScope.backButtonPressedOnceToExit = false;
          }, 2000);
        }
      }
      e.preventDefault();
      return false;
    }, 101);





    function checkVersion() {
      var AppVersion = "1.0.0";
      //获取版本
       var baseurl="http://s-241601.gotocdn.com:3000/api/Login/getVersion";
      $http.get(baseurl).then(function (version) {
         console.log(version.data);
        if (version.data != AppVersion) {
          showUpdateConfirm();
        }
      });
    }

    // 一个确认对话框
    function showUpdateConfirm() {

      var confirmPopup = $ionicPopup.confirm({
        title:"版本升级",
        template:"1.增加版本升级功能<br>2.修正了一些bug<br>",
        cancelText:"撤销",
        okText:"升级"
      });


      confirmPopup.then(function(res) {
        if(res) {
          var options = {
            location: 'yes',
            clearcache: 'yes',
            toolbar: 'no'
          };
          window.open(appConfig.appStoreURL.android, '_system', 'location=yes');
         // $cordovaInAppBrowser.open(appConfig.appStoreURL.android, '_blank', options);
        } else {
          console.log('You are not surehhhhh');
        }
      });






    }



}])
    .directive('murderFooter', function() {
      return {
        restrict: 'E',
        scope: false,
      controller: 'FooterCtrl',
        templateUrl: 'js/config/footer_bar.html'
      };
    })
  .directive('expander', function() {
    return {
      restrict: 'EA',
      replace: true,
      transclude: true,
      scope: {
        title: '@expanderTitle'
      },
      template: '<div>'
      + '<p class="normal-text" ng-click="toggle()" ng-show="showMex">{{title |limitTo : 20 }}......</p>'
      + '<p class="normal-text" ng-click="togglex()" ng-show="showMe" ng-transclude></p>'
      + '</div>',
      link: function (scope, element, attrs) {
        scope.showMe = false;
        scope.showMex = true;
        scope.toggle = function toggle() {
          scope.showMe = !scope.showMe;
          scope.showMex = !scope.showMex;
        }
        scope.togglex = function toggle() {

          scope.showMe = !scope.showMe;
          scope.showMex = !scope.showMex;
         // cordova.plugins.Keyboard.close();
        }

      }
    }
  })
    .controller('FooterCtrl',['$scope','$localstorage','$ionicPopover','$state','$ionicPopup',function($scope,$localstorage,$ionicPopover,$state,$ionicPopup){
    $scope.name=$localstorage.get("usernamex","");

    $scope.showOptionsMenu = function($event) {

      $ionicPopover.fromTemplateUrl('config/main_menu_options.html', {
        scope: $scope,
      }).then(function(popover) {
        $scope.optionsMenu = popover;
        popover.show($event);
      });
    };




    $scope.dismissAndGoto = function(href) {

      if( $scope.optionsMenu ) {
        $scope.optionsMenu.hide();
      }
      $state.go(href);

    };

    $scope.showHome = function() {

      $state.go('main');
    };


    //$scope.watchOnDemand = function() {
    //  var url = ionic.Platform.isIOS() ? 'https://itunes.apple.com/nz/app/tvnz-ondemand/id592636641' : 'https://play.google.com/store/apps/details?id=nz.co.tvnz.ondemand.phone.android&hl=en';
    //  window.open(url, '_system');
    //};
    $scope.logout=function(){
      if( $scope.optionsMenu ) {
        $scope.optionsMenu.hide();
      }
      $localstorage.clear();

//2016-5-25  modify wymna
        var confirmPopup = $ionicPopup.confirm({
          title: "重要提示",
          template: "确定要退出HOLLiAS MES Mobile?",
          cancelText: "取消",
          okText:"确定"
        });
        confirmPopup.then(function(res) {
          if(res) {
            console.log('You are sure');
            $state.go('login');
          } else {
            console.log('You are not sure');
          }
        });
      };
//2016-5-25  modify wymna
  }])
  .config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){

      //add sound  7/13
      document.addEventListener("deviceready", function () {

      }, false);


    $stateProvider
      .state('login',
      {
        url:'/login',
        templateUrl:'js/login/login.html',
        controller:'loginCtrl'
      })
      .state('main',{
        url:'/main',
        templateUrl:'js/main/main.html',
          controller: 'mainCtrl'
      })
        .state('message',{
          url:'/message',
          templateUrl:'js/message/message.html',
          controller:'messageCtrl',
          cache:'false'
      })
        .state('schedule',{
          url:'/schedule',
          templateUrl:'js/schedule/schedule.html',
          controller:'scheduleCtrl',
          cache:'false'
      })
      .state('scheduledetail',{
        url:'/schedule/:code/:ID/:IsConfirm',
        templateUrl:'js/schedule/scheduleDetail.html',
        controller:'scheduleDetailCtrl',
        cache:'false'
      })

        .state('warn',{
          url:'/warn',
          templateUrl:'js/warn/warn.html',
          controller:'warnCtrl'
        })
      .state('warnx',{
        url:'/warnx',
        templateUrl:'js/warnx/warnx.html',
        controller:'warnxCtrl'
      })

        .state('warndetail',{
          url:'/warn/:warnid',
          templateUrl:'js/warn/emailreadbaojing.html',
          controller:'warnDetailCtrl'
        })
      .state('itemwakeup',{
        url:'/itemwakeup',
        templateUrl:'js/itemwakeup/itemwakeup.html',
        controller:'itemwakeupCtrl'
      })
      .state('itemwakeupdetail',{
        url:'/itemwakeup/:id',
        templateUrl:'js/itemwakeup/itemwakeupDetail.html',
        controller:'itemwakeupdetailCtrl'
      })
        .state('workflow',{
          url:'/workflow',
          templateUrl:'js/workflow/workflow.html',
          controller:'workflowCtrl'
        })
      .state('faq', {
        url: "/faq",
        templateUrl: "js/config/faq.html",
          controller: 'mainCtrl'
      })
      .state('instructions', {
        url: "/instructions",
        templateUrl: "js/config/instructions.html"
      });
    $urlRouterProvider.otherwise('/login');
  }])
  .factory('$localstorage', ['$window',
    function($window) {
      return {
        set: function(key, value) {
          console.log(value);
          $window.localStorage[key] = value;
        },
        get: function(key, defaultValue) {
          if(!$window.localStorage[key] && defaultValue) {
            $window.localStorage[key] = defaultValue;
          }
          return $window.localStorage[key] || defaultValue;
        },
        setObject: function(key, value) {
          $window.localStorage[key] = JSON.stringify(value);
        },
        getObject: function(key) {
          return JSON.parse($window.localStorage[key] || '{}');
        },
        getAll: function() {
          return $window.localStorage;
        },
        clear: function() {
          $window.localStorage.clear();
        }
      };
    }
  ]);
