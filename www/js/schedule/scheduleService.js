/**
 * Created by wymna on 2016/3/17.
 */
angular.module('mes.schedule')
    .factory('scheduleSevice',['$http','$q','$localstorage',function($http,$q,$localstorage){

      var currentpage;
      var everypagecount=6;
      var loadschedulemessages=function(currentpage,usercodes)
      {

        var deferred=$q.defer();
        currentpage=currentpage||1;
        var baseurl="http://s-241601.gotocdn.com:3000/api/Schedule/GetScheInstruction?curPage="+currentpage+
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
        loadschedulemessage:loadschedulemessages
      }

    }])
  .factory('scheduleDetailSevice',['$http','$q',function($http,$q){


    var loadscheduleDetail=function(id,usercodes)
    {
      var deferred=$q.defer();

      var baseurl="http://s-241601.gotocdn.com:3000/api/Schedule/GetScheModel?scheId="+id+
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
      loadscheduleDetail:loadscheduleDetail
    }

  }])
  .factory('schedulehuifuSevice',['$http','$q',function($http,$q){

    var hifuschedule=function(pcode,usercode,replycont){

      var deferred=$q.defer();
      $http({
        contentType: "application/json; charset=utf-8",//required
        method: "POST",
        url: "http://s-241601.gotocdn.com:3000/api/Schedule/ReplyScheInstruction",
        dataType: "json",//optional
        data: {"pCode": pcode,"userCode":usercode,"replyCont":replycont},
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
      gethifuschedule:hifuschedule
    }


  }])
    .factory('scheduleupdateSevice',['$http','$q',function($http,$q) {

      var messageupdate = function (idcode, usercode) {

        var deferred = $q.defer();
        $http({
          contentType: "application/json; charset=utf-8",//required
          method: "POST",
          url: "http://s-241601.gotocdn.com:3000/api/Schedule/ScheInstructionIsRead",
          dataType: "json",//optional
          data: {"userCode": usercode, "scheCode": idcode},
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
        getscheduleupdate:messageupdate
      }
    }]);




