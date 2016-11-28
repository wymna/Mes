/**
 * Created by wymna on 2016/3/17.
 */
angular.module('mes.itemwakeup')
    .factory('itemWakeupSevice',['$http','$q','$localstorage',function($http,$q,$localstorage){

      var currentpage;
      var everypagecount=3;

      var loaditemWakeupmessages=function(currentpage,usercodes)
      {
        var deferred=$q.defer();
        currentpage=currentpage||1;
        var baseurl="http://s-241601.gotocdn.com:3000/api/Work/GetMeetingList?curPage="+currentpage+
          "&pageSize="+everypagecount+"&usercode="+usercodes;
        $http.get(baseurl)
          .success(function(data){
            if(data&&data.length)
            {

              console.log(data);
              deferred.resolve(data);
            }else
            {
              deferred.reject();
            }
          })
          .error(function(err,status){
            deferred.reject();
          });

        return  deferred.promise;

      };


      return {
        loaditemWakeupmessage:loaditemWakeupmessages
      }

    }])
    .factory('WakeupDetailSevice',['$http','$q',function($http,$q){


      var loadWakeupDetail=function(id,usercodes)
      {
        var deferred=$q.defer();

        var baseurl="http://s-241601.gotocdn.com:3000/api/Work/GetMeetingModel?meetId="+id+
            "&userCode="+usercodes;


        $http.get(baseurl)
            .success(function(data){
              if(data)
              {
                console.log(data);
                deferred.resolve(data);
              }else
              {
                deferred.reject();
              }

            })
            .error(function(err,status){
              deferred.reject();
            });

        return  deferred.promise;


      };
      return {
        loadWakeupsDetail:loadWakeupDetail
      }

    }])
  .factory('ItemWakeuphuifuSevice',['$http','$q',function($http,$q){

    var hifuItemWakeup=function(pcode,usercode,replycont){

      var deferred=$q.defer();

      var date=new Date();
      var timeg=date.toLocaleString();
      $http({
        contentType: "application/json; charset=utf-8",//required
        method: "POST",
        url: "http://s-241601.gotocdn.com:3000/api/Work/ReplyMeeting",
        dataType: "json",//optional
        data: {"pCode": pcode,"userCode":usercode,"CompleteTime":timeg,"replyCont":replycont},
        async: "isAsync"//optional
      }).success(function (data) {

        console.log("ff"+data);
        deferred.resolve(data);
      })
        .error(function (err, data) {
          deferred.reject();
        });

      return  deferred.promise;

    };

    return {
      gethifuItemWakeup:hifuItemWakeup
    }

  }])
  .factory('ItemWakeupupdateSevice',['$http','$q',function($http,$q) {

    var messageupdate = function (idcode, usercode) {

      var deferred = $q.defer();
      $http({
        contentType: "application/json; charset=utf-8",//required
        method: "POST",
        url: "http://s-241601.gotocdn.com:3000/api/Work/MeetingIsRead",
        dataType: "json",//optional
        data: {"userCode": usercode, "meetingCode": idcode},
        async: "isAsync"//optional
      }).success(function (data) {


        console.log("ff" + data);
        deferred.resolve(data);
      })
        .error(function (err, data) {
          deferred.reject();
        });

      return deferred.promise;

    };

    return {
      getItemWakeupupdate:messageupdate
    }
  }]);




