/**
 * Created by wymna on 2016/3/17.
 */
angular.module('mes.schedule',[])
    .controller('scheduleCtrl',['$rootScope','$ionicHistory','$scope','$state',
  '$ionicPopup','$localstorage','$ionicLoading', 'scheduleSevice',function($rootScope,$ionicHistory,$scope,$state,
                                        $ionicPopup,$localstorage,$ionicLoading,
                                       scheduleSevice){

    var currentpage=1;
    $scope.canshowmore = true;
    $scope.scheduleMessages=[];
      var usercode=$localstorage.get("usernamex","");
      var usercodedaima=$localstorage.get("usernamedaima","");



        //$scope.updatesc=function(code)
        //{
        //  scheduleupdateSevice.getscheduleupdate(code,usercode).then(function (data)
        //  {
        //    console.log(data);
        //    //message.IsRead==1
        //  });
        //}



         $scope.ishuifu=function(){



         }




      scheduleSevice.loadschedulemessage(currentpage,usercode).then(function (data) {
        if(data!=null) {
          $scope.scheduleMessages = data;
          currentpage++;
          $ionicLoading.hide();
        }else
        {
          $ionicLoading.hide();
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

    $scope.$on('pushschedule-data-event', function (evt, data) {
      if(data!=null) {
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
            template: message
          }).then(function (res) {
            console.log('Your password is', res);
          });


        }
        console.log(JSON.stringify(data));
      }else
      {

      }
    });

    function  initschedule(){
      var usercodes=$localstorage.get("usernamex","");



        scheduleSevice.loadschedulemessage(currentpage,usercodes).then(function (data) {
          if(data!=null) {
            $scope.scheduleMessages = data;
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


    $scope.loadscheduleMore=function()
    {
      scheduleSevice.loadschedulemessage(currentpage).then(function(data){
        if(data.length===0) {
          $scope.canshowmore = false;
        } else
        {
          $scope.scheduleMessages=$scope.scheduleMessages.concat(data);
          currentpage++;
        }
        $scope.$broadcast('scroll.infiniteScrollComplete');
      })

    }

    $scope.refreshschedule=function(){
      $scope.scheduleMessages=[];
      currentpage=1;
      $scope.$broadcast('scroll.refreshComplete');
      initschedule();
    }



    $scope.back=function(){
      $state.go("main");

    }


    $scope.serch=function(){
      $scope.isshowsearch=!$scope.isshowsearch;
    }
    }])
  .controller('scheduleDetailCtrl',['$rootScope','$scope', '$stateParams','$ionicPopup','$localstorage','$state','schedulehuifuSevice','scheduleupdateSevice','scheduleDetailSevice',function($rootScope,$scope, $stateParams,$ionicPopup,$localstorage,$state,schedulehuifuSevice,
                                                                                                                                                                                              scheduleupdateSevice,scheduleDetailSevice){
   var code=$stateParams.code;
    var id= $stateParams.ID;
    var IsConfirm=$stateParams.IsConfirm;
    if(IsConfirm=='1')
    {
      $scope.isfirm=true;
    }else
    {
      $scope.isfirm=false;
    }
    $scope.Title=$stateParams.title;
      var usercode=$localstorage.get("usernamex","");

    $scope.main=function(){

      $state.go("main");

    }


      $scope.$on("$ionicView.enter", function() {
        console.log("$ionicView.enter");
       //isread
        scheduleupdateSevice.getscheduleupdate(code,usercode).then(function (data)
        {
          console.log(data);
          //message.IsRead==1
          $rootScope.unreadVoice=$rootScope.unreadVoice-1;

        });



      });


    //get detail xing
    scheduleDetailSevice.loadscheduleDetail(id,usercode).then(function (data)
    {
      console.log(data);

      $scope.Title=data.Title;
      $scope.hhh=data.DepartName;
     $scope.itemContent=data.Content;
      $scope.SendTime=data.InputDate;
      $scope.coutent=data.ReplyContent;
      if(data.IsConfirm=='0'){
        $scope.ishuifux=false;
        console.log($scope.ishuifu);
      }else
      {
        $scope.ishuifux=true;
      }

    });



    // $scope.Content=$stateParams.content;
   // $scope.SendTime=$stateParams.time;

    $scope.huifu=function(coutent) {

      if (coutent == null || coutent == "") {
        var messagec = "请输入回复内容";
        var gg = $ionicPopup.alert({
          template: messagec,
          okText:"确定"
        }).then(function (res) {
          console.log('Your password is', res);
        });
      } else {

        schedulehuifuSevice.gethifuschedule(code, usercode, coutent).then(function (data) {
          if (data == '1') {
            var messagec = "保存成功";
            var gg = $ionicPopup.alert({
              template: messagec,
              okText:"确定"
            }).then(function (res) {
              console.log('Your password is', res);
              $state.go('schedule');

            });
          } else {
            var messagec = "保存失败";
            var gg = $ionicPopup.alert({
              template: messagec,
              okText:"确定"
            }).then(function (res) {
              console.log('Your password is', res);
            });
          }
        });
      }
    }

  }]);
