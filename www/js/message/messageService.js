/**
 * Created by wymna on 2016/3/17.
 */
angular.module('mes.message')
    .factory('messageSevice',['$http','$q','$localstorage',function($http,$q,$localstorage){

      var currentpage;


      var everypagecount=7;

      //var usercode=$localstorage.get("usernamex","");


      var loadmessages=function(currentpage,usercode)
      {
        var deferred=$q.defer();
        currentpage=currentpage||1;
        var baseurl="http://s-241601.gotocdn.com:3000/api/Message/GetMessage?curPage="+currentpage+
          "&pageSize="+everypagecount+"&usercode="+usercode;

        $http.get(baseurl)
          .success(function(data){
           if(data&&data.length)
           {
             usercode=null;
             console.log("xiaoxi"+data);
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
            loadmessage:loadmessages
        }

    }])
    .factory('messageupdateSevice',['$http','$q',function($http,$q) {

        var messageupdate = function (id, usercode) {
            var ids = parseInt(id);
            var deferred = $q.defer();
            $http({
                contentType: "application/json; charset=utf-8",//required
                method: "POST",
                url: "http://s-241601.gotocdn.com:3000/api/Message/MessageIsRead",
                dataType: "json",//optional
                data: {"userCode": usercode, "messageId": ids},
                async: "isAsync"//optional
            }).success(function (data) {


                console.log("xiaoxi2" + data);
                deferred.resolve(data);
            })
                .error(function (err, data) {
                    deferred.reject();
                });

            return deferred.promise;

        };

        return {
            getmessageupdate:messageupdate
        }
    }]);
