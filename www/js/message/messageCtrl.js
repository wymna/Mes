/**
 * Created by wymna on 2016/3/17.
 */
angular.module('mes.message',['mes.main'])
    .controller('messageCtrl',['$rootScope','$scope','$ionicHistory','$state','$localstorage','$ionicLoading',
    'messageSevice','$timeout','$ionicPopup','messageupdateSevice',function($rootScope,$scope,$ionicHistory,$state,$localstorage,$ionicLoading,
                                       messageSevice,$timeout,$ionicPopup,messageupdateSevice){
       var currentpage=1;

    $scope.isshowsearch=false;
    $scope.canshowmore = true;
      $scope.emailMessages=[];

    $scope.title = '点击展开消息内容';
      //$scope.x=function(countent){
      //  console.log('ff');
      //}

      var kk=false;
            if(kk){
                o.disabled = !0, r.update().then(function (e) {
                    o.submitingDraft ? r.setDraftAsScheduled().then(function (e) {
                        t(e.data[0], e.status), h.refreshQueues(["upcomingposts", "pastposts"])
                    }, function (t) {
                        o.disabled = !1
                    }) : o.setToDraft ? r.setScheduledAsDraft().then(function (e) {
                        t(e.data, e.status), h.refreshQueues(["drafts"])
                    }, function (t) {
                        o.disabled = !1
                    }) : (o.disabled = !1, t(e.data, e.status))
                }, function (t) {
                    o.disabled = !1
                })
                o.showDatePicker = function () {
                    o.ensureCanEditMaster() && o.warnUser("Editing the schedule will change it for all {{postcount}} child posts in this set.", o.setDateWithPicker)
                }, o.addCampaigns = function () {
                    o.ensureCanEditMaster() && o.warnUser("Editing the campaign will change it for all {{postcount}} child posts in this set.", o.modifyCampaigns)
                }, o.addTags = function () {
                    o.ensureCanEditMaster() && o.warnUser("Editing the tags will change them for all {{postcount}} child posts in this set.", o.modifyTags)
                }, o.postOrDraft = function () {
                    return r.isDraft() ? "Draft" : "Post"
                }, o.goBack = function () {
                    n.$state.go("postdetail", {postid: o.postId, queuetype: o.queueType})
                }
            }

      var usercode=$localstorage.get("usernamex","");
      var usercodedaima=$localstorage.get("usernamedaima","");

            $scope.updateview=function(ID)
            {
                messageupdateSevice.getmessageupdate(ID,usercode).then(function (data)
                {
                    console.log(data);
                    //message.IsRead==1
                    $rootScope.unreadMail=$rootScope.unreadMail-1;
                });



            }

      messageSevice.loadmessage(currentpage,usercode).then(function (data) {
        console.log(data);
        if(data!=null) {
          $scope.emailMessages = data;
          currentpage++;
          $ionicLoading.hide();
        }else
        {
          //$scope.emailMessages=null;
          var message="此用户没有开通此模块权限";
          var gg = $ionicPopup.alert({
            title: "查询结果",
            template: message
          }).then(function (res) {
            console.log('Your password is', res);
          });
          $ionicLoading.hide();
        }

      });



    $scope.$on('pushemail-data-event', function (evt, data) {
      //弹框
   if(data!=null) {
     var tt = data.receiver.split('&');
     if (tt!=null &&tt[0]==usercode && tt[1]==usercodedaima) {

       var message = data.code + "通知" + +'<br>'+"内容是:" + data.content;
console.log($rootScope.one);
       $rootScope.unreadMail++;
         ///wang add sound
       if($rootScope.one) {
         var thisMedia = new Media('/android_asset/www/sounds/Approved_Bonus_Points.mp3', null, null);
         thisMedia.play();
         ///
       }



       var gg = $ionicPopup.alert({
         title: "消息通知",
         template: message
       }).then(function (res) {
         console.log('Your password is', res);
       });



     }


   }else
   {

   }
    });

    //第一次加载 或者向上刷新
    function  init(){
      var usercodes=$localstorage.get("usernamex","");


      messageSevice.loadmessage(currentpage,usercodes).then(function (data) {
       console.log(data);
        if(data!=null) {
          $scope.emailMessages = data;
          currentpage++;
          $ionicLoading.hide();
        }else
        {

          var message="此用户没有开通此模块权限或没有数据";
          var gg = $ionicPopup.alert({
            title: "查询结果",
            template: message
          }).then(function (res) {
            console.log('Your password is', res);
          });
          $ionicLoading.hide();
        }

      })
    }

    //后续加载
    $scope.loadMore=function()
    {
      messageSevice.loadmessage(currentpage).then(function(data){
        if(data.length===0) {
          $scope.canshowmore = false;
            } else
            {
              $scope.emailMessages=$scope.emailMessages.concat(data);
              currentpage++;
            }
        $scope.$broadcast('scroll.infiniteScrollComplete');
      })

    }

    $scope.refresh=function(){
      $scope.emailMessages=[];
      currentpage=1;
      $scope.$broadcast('scroll.refreshComplete');
      init();
    }

$scope.back=function(){
     $state.go("main");

};

    $scope.serch=function(){
      $scope.isshowsearch=!$scope.isshowsearch;
    }

    }]);


