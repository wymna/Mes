/**
 * Created by wymna on 2016/3/17.
 */
angular.module('mes.warn',[])
    .controller('warnCtrl',['$rootScope','$scope','$state','$ionicPopup',
    '$ionicLoading','warnSevice',function($rootScope,$scope,$state,$ionicPopup,
                                    $ionicLoading,warnSevice){
    var currentpage=1;
    $scope.canshowmore = true;

    $scope.warnMessages=[];
    var messages=[];
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


    //第一次加载 或者向上刷新
    function  initwarn(){
        //$ionicLoading.show({
        //    template: '正在加载数据...'
        //});

        warnSevice.loadswarnmessage(currentpage).then(function (data) {
        if(data!=null) {
          $scope.warnMessages = data;
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
    $scope.loadswarnMore=function()
    {
      warnSevice.loadswarnmessage(currentpage).then(function(data){
        if(data.length===0) {
          $scope.canshowmore = false;
        } else
        {
          $scope.warnMessages=$scope.warnMessages.concat(data);
          currentpage++;
        }
        $scope.$broadcast('scroll.infiniteScrollComplete');
      })

    };

    $scope.refreshwarn=function(){
      $scope.warnMessages=[];
      currentpage=1;
      $scope.$broadcast('scroll.refreshComplete');
      initwarn();
    }



    $scope.back=function(){
      $state.go("main");

    }

    $scope.serch=function(){
      $scope.isshowsearch=!$scope.isshowsearch;
    }
  }])
    .controller('warnDetailCtrl',['$scope', '$ionicPopup','$stateParams','$state','warnhuifuSevice','warnDetailSevice',function($scope, $ionicPopup,$stateParams,$state,warnhuifuSevice,warnDetailSevice) {


    $scope.main=function(){

      $state.go("main");

    }



    $scope.ID = $stateParams.warnid;
    var id=$scope.ID;
   // $scope.AttrName = $stateParams.name;//level
    ///$scope.AlarmValue = $stateParams.value;
   // $scope.AlarmLevel = $stateParams.level;
   // $scope.PCode = $stateParams.code;

    warnDetailSevice.loadwarnsDetail(id).then(function (data) {

      console.log(data);
      $scope.AttrName = data.AttrName;//level
      $scope.LevelName = data.LevelName;
      $scope.AlarmLevel = data.AlarmLevel;
      $scope.AlarmValue=data.AlarmValue;
      $scope.PCode=data.PCode;
      $scope.deplyname=data.deplyname;
      $scope.usercoub=data.RecordDetail;
      // $scope.PCode = $stateParams.code;


    });



    $scope.register4 = function (usercoub) {


      var coun = usercoub;
        if (coun == null || coun == "") {

            var messagec = "请输入确认内容";
            var gg = $ionicPopup.alert({
                template: messagec,
                okText:"确定"
            }).then(function (res) {
                console.log('Your password is', res);
            });
        }else {

            warnhuifuSevice.gethifuwarn(id,coun).then(function (data) {
                if (data == '1') {
                    var messagec = "保存成功";
                    var gg = $ionicPopup.alert({
                      template: messagec,
                      okText:"确定"
                    }).then(function (res) {
                        console.log('Your password is', res);
                        $state.go('warn');
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
