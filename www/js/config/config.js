//常量定义 app一些参数 parse（利用云端服务）
angular.module('mes.config', [ ])

.constant('appConfig', {
	"debug": false,
	"appStoreURL": { "android": "http://122.114.62.225/mes.apk",
		"ios": "http://itunes.com/apps/id967282827" }
}
);
//http://122.114.62.225/mes.apk
