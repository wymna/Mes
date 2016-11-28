/**
 * Created by wymna on 2016/3/17.
 */
angular.module('mes.warnx',[])
    .controller('warnxCtrl',['$scope','$ionicLoading','$interval','warnxSevice',function($scope,$ionicLoading,$interval,warnxSevice){

    var everypagecount=100;
    $scope.warnMessages=[];
    var toDo = function () {

      warnxSevice.loadswarnxmessage(everypagecount).then(function (data) {
        if(data!=null) {
          $scope.warnMessages = data;
          console.log(data);

        }else
        {
          var message="此用户没有开通此模块权限";
          var gg = $ionicPopup.alert({
            title: "查询结果",
            template: message
          }).then(function (res) {
            console.log('Your password is', res);
          });
        }

          })
    };
    $interval(toDo, 10000);


    $scope.back=function(){
      $state.go("main");

    }


  }]);
