/**
 * Created by wymna on 2016/3/17.
 */
angular.module('mes.main',[])
.controller('mainCtrl',['$rootScope','$scope','$state','$ionicPopup','$localstorage','pushEmailService','maincountSevice',function($rootScope,$scope,$state,$ionicPopup,$localstorage,pushEmailService,maincountSevice){
     // $rootScope.unreadMail=0;
     // $rootScope.unreadVoice =0;
     // $rootScope.unreadItem =0;

      //shezhi全局变量
   //   $rootScope.onev="0";
     // $rootScope.twov="0";
    //  $rootScope.threev="0";
     // $rootScope.fourv="0";
    //页面初始值

    $scope.messageu = { checked: $rootScope.one };
    $scope.xiada = { checked:  $rootScope.two};
    $scope.diaodu ={ checked: $rootScope.three };
    $scope.jingbao = { checked: $rootScope.four };



    $scope.messagec=function(){
      $rootScope.one=$scope.messageu.checked;
    //  $rootScope.onev="1";
    }
    $scope.xiadac=function(){
      $rootScope.two=$scope.xiada.checked;
     // $rootScope.twov="1";
    }

    $scope.diaoduc=function(){
      $rootScope.three=$scope.diaodu.checked;
     // $rootScope.threev="1";
    }

    $scope.jingbaoc=function(){
      $rootScope.four=$scope.jingbao.checked;
    //  $rootScope.fourv="1";
    }

    var usercode=$localstorage.get("usernamex","");

   $scope.me=function()
   {
     $state.go("message",{}, {reload: true});
   };

    maincountSevice.loadcounts(usercode).then(function (data) {
     if(data) {
       $rootScope.unreadMail = data.messageCount;

       $rootScope.unreadVoice = data.scheduleCount;
       $rootScope.unreadItem = data.workCount;
     }
    })




  $scope.isshowsearch=false;
  $scope.canshowmore = true;
  $scope.emailMessages=[];


    var usercodedaima=$localstorage.get("usernamedaima","");

  $scope.$on('pushemail-data-event', function (evt, data) {

    if(data!=null) {
      var tt = data.receiver.split('&');
      if (tt!=null &&tt[0]===usercode && tt[1]===usercodedaima) {
        var message = data.code + "通知"+'<br>'+"主要内容是:" + data.content;


        $rootScope.unreadMail++;
///wang add sound
        if($rootScope.one) {
          var thisMedia = new Media('/android_asset/www/sounds/Approved_Bonus_Points.mp3', null, null);
          thisMedia.play();
        }
        ///
        var gg = $ionicPopup.alert({
          title: "消息通知",
          template: message,
          okText:"确定"
        }).then(function (res) {
          console.log('Your password is', res);
        });

      }
      console.log(JSON.stringify(data));
    }else
    {
      //todo
    }
  });



  $scope.$on('pushschedule-data-event', function (evt, data) {
    if (data != null) {
      var tt = data.ReceiveUser.split('&');

      if (tt != null && tt[0] === usercode && tt[1] === usercodedaima) {
        var message = "标题:"+data.Title +'<br>'+"指令内容:" + data.Content +'<br>'+"发送时间:" + data.SendTime + "";
        $rootScope.unreadVoice++;
        ///wang 7/13
        if($rootScope.two) {
          var thisMedia = new Media('/android_asset/www/sounds/Approved_Task_Completed.mp3', null, null);
          thisMedia.play();
        }
        ////
        var gg = $ionicPopup.alert({
          title: "调度指令",
          template: message,
          okText:"确定"
        }).then(function (res) {
          console.log('Your password is', res);
        });
      }
      console.log(JSON.stringify(data));
    } else
    {
      //todo
    }
  });



    $scope.$on('pushmeet-data-event', function (evt, data) {

        if(data!=null) {
          var tt = data.ReceiveUser.split('&');
          if (tt != null && tt[0] == usercode && tt[1] == usercodedaima) {
            var message = "题目:"+data.Title +'<br>'+ "主要内容:" + data.Content + '<br>'+"发送时间：" + data.SendTime;

            $rootScope.unreadItem++;
          ///wang 7/13
            if($rootScope.three) {
              var thisMedia = new Media('/android_asset/www/sounds/button-1.mp3', null, null);
              thisMedia.play();
            }
            ////
            var gg = $ionicPopup.alert({
              title: "会议通知",
              template: message,
              okText:"确定"
            }).then(function (res) {
              console.log('Your password is', res);

            });
          }
          console.log(JSON.stringify(data));
        }else{

          }

    });

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


  }]);




