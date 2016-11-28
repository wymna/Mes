/**
 * Created by wymna on 2016/3/17.
 */
angular.module('mes.login')
    .factory('loginSevice',['$http','$q',function($http,$q){
     var userx;
    var setuserx=function(user)
    {
      userx=user;
    }

      var loginmessage=function(){
        var deferred=$q.defer();
        $http({
          contentType: "application/json; charset=utf-8",//required
          method: "POST",
          url: "http://s-241601.gotocdn.com:3000/api/Login/Loginx",
          dataType: "json",//optional
          data: {"username": userx.name,"password":userx.password},
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
            Login:loginmessage,
            setuser:setuserx
            }


    }]);
