/**
 * Created by wymna on 2016/3/17.
 */
angular.module('mes.login',[])
.controller('loginCtrl',['$scope','$state','loginSevice','$localstorage',function($scope,$state,loginSevice,$localstorage){


        $scope.play=function(src)
        {
            var media=new Media(src,null,null,null);
           // mrt=media;
            media.play(media);
        }

        var mediaStatusback=function(status)
        {
            if(status==Media.MEDIA_STARTING){
                $ionicLoading.show({template:"loading..."});
            }else if(status==Media.MEDIA_STOPPED)
            {
                $ionicLoding.hide();
            }
        }
////////////////////
        $scope.login=function(user){

         loginSevice.setuser(user);
          loginSevice.Login().then(function(data){
       if(data!=='-1') {

         var words = data.split('&');
         $localstorage.set("usernamex", words[0]);
         $localstorage.set("usernamedaima", words[1]);
    // window.plugins.jPushPlugin.setAlias(words[1]);

           $scope.user=null;
         $state.go('main');
       }else{
         //todo
       }
          });

        };

    }]);
