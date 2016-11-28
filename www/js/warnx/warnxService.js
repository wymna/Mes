/**
 * Created by wymna on 2016/3/17.
 */
angular.module('mes.warnx')
    .factory('warnxSevice',['$http','$q','$localstorage',function($http,$q,$localstorage){

    var usercode=$localstorage.get("usernamex","");
    var loadwarnxmessages=function(currentpage)
    {
      var deferred=$q.defer();
      currentpage=currentpage||1;
      var time=new Date().getTime();

      var baseurl="http://s-241601.gotocdn.com:3000/api/Warn/GetRmisAlarmr?topSum="+currentpage+
        "&usercode="+usercode;

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
      loadswarnxmessage:loadwarnxmessages
    }

    }]);



