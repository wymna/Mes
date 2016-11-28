/**
 * Created by wymna on 2016/3/17.
 */
angular.module('mes.main')
  .factory('maincountSevice',['$http','$q',function($http,$q){








    var loadcount=function(usercode)
    {
      var deferred=$q.defer();

      var baseurl="http://s-241601.gotocdn.com:3000/api/Schedule/GetTotalCount?userCode="+usercode;

      $http.get(baseurl)
        .success(function(data){
          if(data)
          {
            usercode=null;
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
      loadcounts:loadcount
    }

  }])
  .factory('pushEmailService', ['$rootScope',function ($rootScope) {

    var  getemail=function() {

     return "ff";

    }

    $.connection.hub.url = "http://s-241601.gotocdn.com:3000/signalr";

    var message = $.connection.messageHub;

    message.client.addEmailMessage = function (Title, Content, ReceiveUser) {

      $rootScope.$broadcast('pushemail-data-event',
        {
          'code': Title,
          'content': Content,
          'receiver': ReceiveUser
        });

    };


    message.client.addScheduleMessage = function (Title, Content, SendTime, ReceiveUser) {

      $rootScope.$broadcast('pushschedule-data-event',
        {
          'Title': Title,
          'Content':Content,
          'SendTime':SendTime,
          'ReceiveUser':ReceiveUser
        });

    };



    message.client.addMeetMessage = function (Title, Content, SendTime, ReceiveUser) {
      $rootScope.$broadcast('pushmeet-data-event',
        {
          'Title': Title,
          'Content':Content,
          'SendTime':SendTime,
          'ReceiveUser':ReceiveUser
        });

    };

   var message2 = $.connection.warnxHub;


    message2.client.addWarnRealTimeMessage = function (id, guname,AlarmLevel, AttrName, CorpCode) {
      console.log("ff"+AlarmLevel+AttrName+CorpCode);



      $rootScope.$broadcast('psSecurityMonitorService-received-data-event',
        {
          'AlarmLevel': AlarmLevel,
          'AttrName': AttrName,
          'CorpCode': CorpCode
        });
    };

    $.connection.hub.start()
      .done()
      .fail(function (data) {
          alert(data);
        }
      );
    return {
      pushemail:getemail()
    }

  }])





