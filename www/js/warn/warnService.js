/**
 * Created by wymna on 2016/3/17.
 */
angular.module('mes.warn')
    .factory('warnSevice',['$http','$q','$localstorage',function($http,$q,$localstorage){

    var currentpage;


    var everypagecount=5;

    var usercode=$localstorage.get("usernamex","");


    var loadwarnmessages=function(currentpage)
    {
      var deferred=$q.defer();
      currentpage=currentpage||1;
       // http://s-241601.gotocdn.com
      var baseurl="http://s-241601.gotocdn.com:3000/api/Warn/GetRmisAlarm?curPage="+currentpage+
        "&pageSize="+everypagecount+"&usercode="+usercode;

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
      loadswarnmessage:loadwarnmessages
    }

    }])

  .factory('warnDetailSevice',['$http','$q',function($http,$q){


    var loadwarnDetail=function(id)
    {
      var deferred=$q.defer();

      var baseurl="http://s-241601.gotocdn.com:3000/api/Warn/GetAlarmModel?alarmId="+id;
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
      loadwarnsDetail:loadwarnDetail
    }

  }])
    .factory('warnhuifuSevice',['$http','$q','$localstorage',function($http,$q,$localstorage){

      var hifuwarn=function(id,counb){
        //console.log(pcode+"AA"+usercode+"AA"+replycont);

            var deferred=$q.defer();
            var usercode=$localstorage.get("usernamex","");
            var date=new Date();
            var replycont=date.toLocaleString();
        $http({
                contentType: "application/json; charset=utf-8",//required
                method: "POST",
                url: "http://s-241601.gotocdn.com:3000/api/Warn/ReplyAlarm",
                dataType: "json",//optional
                data: {"alarmId":id,"handler":usercode,"handleTime":replycont,"content":counb},
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
        gethifuwarn:hifuwarn
      }


    }]);



