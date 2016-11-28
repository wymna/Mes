/**
 * Created by wymna on 2016/3/17.
 */
angular.module('mes.itemwakeup',[])
    .controller('itemwakeupCtrl',['$rootScope','$scope','$state', '$ionicPopup','$localstorage','$ionicLoading',
   'itemWakeupSevice',function($rootScope,$scope,$state, $ionicPopup,$localstorage,$ionicLoading,
                                          itemWakeupSevice){

    var currentpage=1;
    $scope.canshowmore = true;
    $scope.itemwakeupMessages=[];

    $scope.isshowsearch=false;

      var usercode=$localstorage.get("usernamex","");
      var usercodedaima=$localstorage.get("usernamedaima","");
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


      itemWakeupSevice.loaditemWakeupmessage(currentpage,usercode).then(function (data) {
        if(data!=null) {
          $scope.itemwakeupMessages = data;
          currentpage++;
          $ionicLoading.hide();
        }else
        {
          $ionicLoading.hide();
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
              template: message
            }).then(function (res) {
              console.log('Your password is', res);
            });
          }
          console.log(JSON.stringify(data));
        }else{


        }
    });

    function  inititemwakeup(){

      //var usercodes=$localstorage.get("usernamex","");
      itemWakeupSevice.loaditemWakeupmessage(currentpage,usercode).then(function (data) {
        if(data!=null) {
          $scope.itemwakeupMessages = data;
          currentpage++;
          $ionicLoading.hide();
        }else
        {
          $ionicLoading.hide();
        }
      })
    }

    //后续加载
    $scope.loaditemwakeupMore=function()
    {
      itemWakeupSevice.loaditemWakeupmessage(currentpage).then(function(data){
        if(data.length===0) {
          $scope.canshowmore = false;
        } else
        {
          $scope.itemwakeupMessages =$scope.itemwakeupMessages.concat(data);
          currentpage++;
        }
        $scope.$broadcast('scroll.infiniteScrollComplete');
      })

    }

    $scope.refreshitemwakeup=function(){
      $scope.itemwakeupMessages=[];
      currentpage=1;
      $scope.$broadcast('scroll.refreshComplete');
      inititemwakeup();
    }



    $scope.back=function(){
      $state.go("main");
    }


    $scope.serch=function(){
      $scope.isshowsearch=!$scope.isshowsearch;
    }
    }])
  .controller('itemwakeupdetailCtrl',['$rootScope','$scope','$state', '$stateParams','$ionicPopup',
    '$localstorage','ItemWakeuphuifuSevice','ItemWakeupupdateSevice','WakeupDetailSevice',function($rootScope,$scope, $state,$stateParams,$ionicPopup,
                                              $localstorage,ItemWakeuphuifuSevice,ItemWakeupupdateSevice,WakeupDetailSevice){
           $scope.ID=$stateParams.id;
            var id=$scope.ID;
  //  $scope.SendTime=$stateParams.time;
   // $scope.Content=$stateParams.content;
   // var pcode=$stateParams.pcode;

      $scope.main=function(){

        $state.go("main");

      }


    var usercode=$localstorage.get("usernamex","");

            $scope.ID=$stateParams.id;
            var id=$scope.ID;
      $scope.$on("$ionicView.enter", function() {

        console.log("$ionicView.enter");
        ItemWakeupupdateSevice.getItemWakeupupdate(id,usercode).then(function (data)
        {
          console.log(data);
          //message.IsRead==1
            $rootScope.unreadItem=$rootScope.unreadItem-1;
        });
      });

            WakeupDetailSevice.loadWakeupsDetail(id,usercode).then(function (data) {

                $scope.MeetingName=data.MeetingName;
                $scope.name=data.Name;
                $scope.WorkContent=data.WorkContent;
                $scope.BeginTime=data.BeginTime;
                $scope.content=data.CompletionDesc;
                $scope.Event=data.Event;

            });

      $scope.huifuc=function(contentx) {

      if (contentx== null || contentx == "") {
        var messagec = "请输入回复内容";
        var gg = $ionicPopup.alert({
          title: "通知",
          template: messagec
        }).then(function (res) {
          console.log('Your password is', res);
        });
      } else {
            ItemWakeuphuifuSevice.gethifuItemWakeup(id, usercode, contentx).then(function (data) {
                if (data == '1') {
                    var messagec = "保存成功";
                    var gg = $ionicPopup.alert({
                      template: messagec,
                      okText:"确定"
                    }).then(function (res) {
                        console.log('Your password is', res);
                        $state.go('itemwakeup');

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
