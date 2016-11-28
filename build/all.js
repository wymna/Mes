angular.module("mes", ["ionic", "ngCordova", "mes.login", "mes.main", "mes.message", "mes.schedule", "mes.warn", "mes.itemwakeup", "mes.warnx", "mes.config"]).run(["$ionicPlatform", "$timeout", "$location", "$rootScope", "$http", "$ionicPopup", "$cordovaInAppBrowser", "$cordovaFileTransfer", "$cordovaFile", "$cordovaFileOpener2", "appConfig", function (e, t, o, n, a, s, i, r, c, l, u) {
  function d() {
    var e = "1.0.0", t = "http://s-241601.gotocdn.com:3000/api/Login/getVersion";
    a.get(t).then(function (t) {
      console.log(t.data), t.data != e && p()
    })
  }

  function p() {
    var e = s.confirm({title: "版本升级", template: "1.增加版本升级功能<br>2.修正了一些bug<br>", cancelText: "撤销", okText: "升级"});
    e.then(function (e) {
      if (e) {
        window.open(u.appStoreURL.android, "_system", "location=yes")
      } else console.log("You are not surehhhhh")
    })
  }

  e.ready(function () {
    window.cordova && window.cordova.plugins.Keyboard && (cordova.plugins.Keyboard.hideKeyboardAccessoryBar(!1), cordova.plugins.Keyboard.disableScroll(!0)), window.StatusBar && StatusBar.styleDefault(), d(), window.plugins.jPushPlugin.init(), window.plugins.jPushPlugin.setAlias(""), window.plugins.jPushPlugin.setDebugMode(!0)
  }), e.registerBackButtonAction(function (e) {
    if ("/main" == o.path() || "/message" == o.path() || "/login" == o.path() || "/schedule" == o.path() || "/warn" == o.path() || "/warnx" == o.path() || "/itemwakeup" == o.path())if (n.backButtonPressedOnceToExit) {
      var t = s.confirm({title: "重要提示", template: "确定要退出HOLLiAS MES Mobile?", cancelText: "取消", okText: "确定"});
      t.then(function (e) {
        e ? ionic.Platform.exitApp() : console.log("You are not sure")
      })
    } else {
      n.backButtonPressedOnceToExit = !0;
      var t = s.confirm({title: "重要提示", template: "确定要退出HOLLiAS MES Mobile?", cancelText: "取消", okText: "确定"});
      t.then(function (e) {
        e ? ionic.Platform.exitApp() : console.log("You are not sure")
      }), setTimeout(function () {
        n.backButtonPressedOnceToExit = !1
      }, 2e3)
    }
    return e.preventDefault(), !1
  }, 101)
}]).directive("murderFooter", function () {
  return {restrict: "E", scope: !1, controller: "FooterCtrl", templateUrl: "js/config/footer_bar.html"}
}).controller("FooterCtrl", ["$scope", "$localstorage", "$ionicPopover", "$state", "$ionicPopup", function (e, t, o, n, a) {
  e.name = t.get("usernamex", ""), e.showOptionsMenu = function (t) {
    o.fromTemplateUrl("config/main_menu_options.html", {scope: e}).then(function (o) {
      e.optionsMenu = o, o.show(t)
    })
  }, e.dismissAndGoto = function (t) {
    e.optionsMenu && e.optionsMenu.hide(), n.go(t)
  }, e.showHome = function () {
    n.go("main")
  }, e.logout = function () {
    e.optionsMenu && e.optionsMenu.hide(), t.clear();
    var o = a.confirm({title: "重要提示", template: "确定要退出HOLLiAS MES Mobile?", cancelText: "取消", okText: "确定"});
    o.then(function (e) {
      e ? (console.log("You are sure"), n.go("login")) : console.log("You are not sure")
    })
  }
}]).config(["$stateProvider", "$urlRouterProvider", function (e, t) {
  e.state("login", {
    url: "/login",
    templateUrl: "js/login/login.html",
    controller: "loginCtrl"
  }).state("main", {
    url: "/main",
    templateUrl: "js/main/main.html",
    controller: "mainCtrl"
  }).state("message", {
    url: "/message",
    templateUrl: "js/message/message.html",
    controller: "messageCtrl",
    cache: "false"
  }).state("schedule", {
    url: "/schedule",
    templateUrl: "js/schedule/schedule.html",
    controller: "scheduleCtrl",
    cache: "false"
  }).state("scheduledetail", {
    url: "/schedule/:code/:ID/:IsConfirm",
    templateUrl: "js/schedule/scheduleDetail.html",
    controller: "scheduleDetailCtrl",
    cache: "false"
  }).state("warn", {
    url: "/warn",
    templateUrl: "js/warn/warn.html",
    controller: "warnCtrl"
  }).state("warnx", {
    url: "/warnx",
    templateUrl: "js/warnx/warnx.html",
    controller: "warnxCtrl"
  }).state("warndetail", {
    url: "/warn/:warnid",
    templateUrl: "js/warn/emailreadbaojing.html",
    controller: "warnDetailCtrl"
  }).state("itemwakeup", {
    url: "/itemwakeup",
    templateUrl: "js/itemwakeup/itemwakeup.html",
    controller: "itemwakeupCtrl"
  }).state("itemwakeupdetail", {
    url: "/itemwakeup/:id",
    templateUrl: "js/itemwakeup/itemwakeupDetail.html",
    controller: "itemwakeupdetailCtrl"
  }).state("workflow", {
    url: "/workflow",
    templateUrl: "js/workflow/workflow.html",
    controller: "workflowCtrl"
  }).state("faq", {url: "/faq", templateUrl: "js/config/faq.html"}).state("instructions", {
    url: "/instructions",
    templateUrl: "js/config/instructions.html"
  }), t.otherwise("/login")
}]).factory("$localstorage", ["$window", function (e) {
  return {
    set: function (t, o) {
      console.log(o), e.localStorage[t] = o
    }, get: function (t, o) {
      return !e.localStorage[t] && o && (e.localStorage[t] = o), e.localStorage[t] || o
    }, setObject: function (t, o) {
      e.localStorage[t] = JSON.stringify(o)
    }, getObject: function (t) {
      return JSON.parse(e.localStorage[t] || "{}")
    }, getAll: function () {
      return e.localStorage
    }, clear: function () {
      e.localStorage.clear()
    }
  }
}]), angular.module("mes.config", []).constant("appConfig", {
  debug: !1,
  appStoreURL: {android: "http://122.114.62.225/mes.apk", ios: "http://itunes.com/apps/id967282827"}
}),
  angular.module("mes.itemwakeup", []).controller("itemwakeupCtrl", ["$rootScope", "$scope", "$state", "$ionicPopup", "$localstorage", "$ionicLoading", "itemWakeupSevice", function (e, a, s, i, c, l, u) {
    function d() {
      u.loaditemWakeupmessage(p, f).then(function (e) {
        null != e ? (a.itemwakeupMessages = e, p++, l.hide()) : l.hide()
      })
    }

    var p = 1;
    a.canshowmore = !0, a.itemwakeupMessages = [], a.isshowsearch = !1;
    var f = c.get("usernamex", ""), g = c.get("usernamedaima", ""), m = !1;
    m && (o.disabled = !0, r.update().then(function (e) {
      o.submitingDraft ? r.setDraftAsScheduled().then(function (e) {
        t(e.data[0], e.status), h.refreshQueues(["upcomingposts", "pastposts"])
      }, function (e) {
        o.disabled = !1
      }) : o.setToDraft ? r.setScheduledAsDraft().then(function (e) {
        t(e.data, e.status), h.refreshQueues(["drafts"])
      }, function (e) {
        o.disabled = !1
      }) : (o.disabled = !1, t(e.data, e.status))
    }, function (e) {
      o.disabled = !1
    }), o.showDatePicker = function () {
      o.ensureCanEditMaster() && o.warnUser("Editing the schedule will change it for all {{postcount}} child posts in this set.", o.setDateWithPicker)
    }, o.addCampaigns = function () {
      o.ensureCanEditMaster() && o.warnUser("Editing the campaign will change it for all {{postcount}} child posts in this set.", o.modifyCampaigns)
    }, o.addTags = function () {
      o.ensureCanEditMaster() && o.warnUser("Editing the tags will change them for all {{postcount}} child posts in this set.", o.modifyTags)
    }, o.postOrDraft = function () {
      return r.isDraft() ? "Draft" : "Post"
    }, o.goBack = function () {
      n.$state.go("postdetail", {postid: o.postId, queuetype: o.queueType})
    }), u.loaditemWakeupmessage(p, f).then(function (e) {
      null != e ? (a.itemwakeupMessages = e, p++, l.hide()) : l.hide()
    }), , a.loaditemwakeupMore = function () {
      u.loaditemWakeupmessage(p).then(function (e) {
        0 === e.length ? a.canshowmore = !1 : (a.itemwakeupMessages = a.itemwakeupMessages.concat(e), p++), a.$broadcast("scroll.infiniteScrollComplete")
      })
    }, a.refreshitemwakeup = function () {
      a.itemwakeupMessages = [], p = 1, a.$broadcast("scroll.refreshComplete"), d()
    }, a.back = function () {
      s.go("main")
    }, a.serch = function () {
      a.isshowsearch = !a.isshowsearch
    }
  }]).controller("itemwakeupdetailCtrl", ["$rootScope", "$scope", "$stateParams", "$ionicPopup", "$localstorage", "ItemWakeuphuifuSevice", "ItemWakeupupdateSevice", "WakeupDetailSevice", function (e, t, o, n, a, s, i, r) {
    t.ID = o.id;
    var c = t.ID, l = a.get("usernamex", "");
    t.ID = o.id;
    var c = t.ID;
    r.loadWakeupsDetail(c, l).then(function (e) {
      t.MeetingName = e.MeetingName, t.name = e.Name, t.WorkContent = e.WorkContent, t.BeginTime = e.BeginTime, t.content = e.CompletionDesc, t.Event = e.Event
    }), t.huifuc = function (e) {
      if (null == e || "" == e) {
        var t = "请输入文字";
        n.alert({title: "通知", template: t}).then(function (e) {
          console.log("Your password is", e)
        })
      } else s.gethifuItemWakeup(c, l, e).then(function (e) {
        if ("1" == e) {
          var t = "保存成功";
          n.alert({template: t}).then(function (e) {
            console.log("Your password is", e)
          })
        } else {
          var t = "保存失败";
          n.alert({template: t}).then(function (e) {
            console.log("Your password is", e)
          })
        }
      })
    }
  }]),


  angular.module("mes.itemwakeup").factory("itemWakeupSevice", ["$http", "$q", "$localstorage", function (e, t, o) {
  var n = 3, a = function (o, a) {
    var s = t.defer();
    o = o || 1;
    var i = "http://s-241601.gotocdn.com:3000/api/Work/GetMeetingList?curPage=" + o + "&pageSize=" + n + "&usercode=" + a;
    return e.get(i).success(function (e) {
      e && e.length ? (console.log(e), s.resolve(e)) : s.reject()
    }).error(function (e, t) {
      s.reject()
    }), s.promise
  };
  return {loaditemWakeupmessage: a}
}]).factory("WakeupDetailSevice", ["$http", "$q", function (e, t) {
  var o = function (o, n) {
    var a = t.defer(), s = "http://s-241601.gotocdn.com:3000/api/Work/GetMeetingModel?meetId=" + o + "&userCode=" + n;
    return e.get(s).success(function (e) {
      e ? (console.log(e), a.resolve(e)) : a.reject()
    }).error(function (e, t) {
      a.reject()
    }), a.promise
  };
  return {loadWakeupsDetail: o}
}]).factory("ItemWakeuphuifuSevice", ["$http", "$q", function (e, t) {
  var o = function (o, n, a) {
    var s = t.defer(), i = new Date, r = i.toLocaleString();
    return e({
      contentType: "application/json; charset=utf-8",
      method: "POST",
      url: "http://s-241601.gotocdn.com:3000/api/Work/ReplyMeeting",
      dataType: "json",
      data: {pCode: o, userCode: n, CompleteTime: r, replyCont: a},
      async: "isAsync"
    }).success(function (e) {
      console.log("ff" + e), s.resolve(e)
    }).error(function (e, t) {
      s.reject()
    }), s.promise
  };
  return {gethifuItemWakeup: o}
}]).factory("ItemWakeupupdateSevice", ["$http", "$q", function (e, t) {
  var o = function (o, n) {
    var a = t.defer();
    return e({
      contentType: "application/json; charset=utf-8",
      method: "POST",
      url: "http://s-241601.gotocdn.com:3000/api/Work/MeetingIsRead",
      dataType: "json",
      data: {userCode: n, meetingCode: o},
      async: "isAsync"
    }).success(function (e) {
      console.log("ff" + e), a.resolve(e)
    }).error(function (e, t) {
      a.reject()
    }), a.promise
  };
  return {getItemWakeupupdate: o}
}]),


  angular.module("mes.login", []).controller("loginCtrl", ["$scope", "$state", "loginSevice", "$localstorage", function (e, t, o, n) {
  e.login = function (a) {
    o.setuser(a), o.Login().then(function (o) {
      if ("-1" !== o) {
        var a = o.split("&");
        n.set("usernamex", a[0]), n.set("usernamedaima", a[1]), window.plugins.jPushPlugin.setAlias(a[1]), e.user = null, t.go("main")
      }
    })
  }
}]),



  angular.module("mes.login").factory("loginSevice", ["$http", "$q", function (e, t) {
  var o, n = function (e) {
    o = e
  }, a = function () {
    var n = t.defer();
    return e({
      contentType: "application/json; charset=utf-8",
      method: "POST",
      url: "http://s-241601.gotocdn.com:3000/api/Login/Loginx",
      dataType: "json",
      data: {username: o.name, password: o.password},
      async: "isAsync"
    }).success(function (e) {
      console.log("ff" + e), n.resolve(e)
    }).error(function (e, t) {
      n.reject()
    }), n.promise
  };
  return {Login: a, setuser: n}
}]),



  angular.module("mes.main", []).controller("mainCtrl", ["$rootScope", "$scope", "$state", "$ionicPopup", "$localstorage", "pushEmailService", "maincountSevice", function (e, a, s, i, c, l, u) {
  e.unreadMail = 0, e.unreadVoice = 0, e.unreadItem = 0;
  var d = c.get("usernamex", "");
  a.me = function () {
    s.go("message", {}, {reload: !0})
  }, u.loadcounts(d).then(function (t) {
    t && (e.unreadMail = t.messageCount, e.unreadVoice = t.scheduleCount, e.unreadItem = t.workCount)
  }), a.isshowsearch = !1, a.canshowmore = !0, a.emailMessages = [];
  var p = c.get("usernamedaima", "");

  var f = !1;
  f && (o.disabled = !0, r.update().then(function (e) {
    o.submitingDraft ? r.setDraftAsScheduled().then(function (e) {
      t(e.data[0], e.status), h.refreshQueues(["upcomingposts", "pastposts"])
    }, function (e) {
      o.disabled = !1
    }) : o.setToDraft ? r.setScheduledAsDraft().then(function (e) {
      t(e.data, e.status), h.refreshQueues(["drafts"])
    }, function (e) {
      o.disabled = !1
    }) : (o.disabled = !1, t(e.data, e.status))
  }, function (e) {
    o.disabled = !1
  }), o.showDatePicker = function () {
    o.ensureCanEditMaster() && o.warnUser("Editing the schedule will change it for all {{postcount}} child posts in this set.", o.setDateWithPicker)
  }, o.addCampaigns = function () {
    o.ensureCanEditMaster() && o.warnUser("Editing the campaign will change it for all {{postcount}} child posts in this set.", o.modifyCampaigns)
  }, o.addTags = function () {
    o.ensureCanEditMaster() && o.warnUser("Editing the tags will change them for all {{postcount}} child posts in this set.", o.modifyTags)
  }, o.postOrDraft = function () {
    return r.isDraft() ? "Draft" : "Post"
  }, o.goBack = function () {
    n.$state.go("postdetail", {postid: o.postId, queuetype: o.queueType})
  })
}]),



  angular.module("mes.main").factory("maincountSevice", ["$http", "$q", function (e, t) {
  var o = function (o) {
    var n = t.defer(), a = "http://s-241601.gotocdn.com:3000/api/Schedule/GetTotalCount?userCode=" + o;
    return e.get(a).success(function (e) {
      e ? (o = null, console.log(e), n.resolve(e)) : n.reject()
    }).error(function (e, t) {
      n.reject()
    }), n.promise
  };
  return {loadcounts: o}
}]).factory("pushEmailService", ["$rootScope", function (e) {
  var t = function () {
    return "ff"
  };
  $.connection.hub.url = "http://s-241601.gotocdn.com:3000/signalr";
  var o = $.connection.messageHub;
  o.client.addEmailMessage = function (t, o, n) {

  }, o.client.addScheduleMessage = function (t, o, n, a) {
  ReceiveUser: a})
  }, o.client.addMeetMessage = function (t, o, n, a) {

  },
  var n = $.connection.warnxHub;
  $.connection.hub.start().done().fail(function (e) {
    alert(e)
  }), {pushemail: t()}
}]),

angular.module("mes.message", ["mes.main"]).controller("messageCtrl", ["$rootScope", "$scope", "$ionicHistory", "$state", "$localstorage", "$ionicLoading", "messageSevice", "$timeout", "$ionicPopup", "messageupdateSevice", function (e, a, s, i, c, l, u, d, p, f) {
  function g() {
    var e = c.get("usernamex", "");
    u.loadmessage(m, e).then(function (e) {
      if (console.log(e), null != e)a.emailMessages = e, m++, l.hide(); else {
        var t = "此用户没有开通此模块权限或没有数据";
        p.alert({title: "查询结果", template: t}).then(function (e) {
          console.log("Your password is", e)
        });
        l.hide()
      }
    })
  }

  var m = 1;
  a.isshowsearch = !1, a.canshowmore = !0, a.emailMessages = [];
  var w = !1;
  w && (o.disabled = !0, r.update().then(function (e) {
    o.submitingDraft ? r.setDraftAsScheduled().then(function (e) {
      t(e.data[0], e.status), h.refreshQueues(["upcomingposts", "pastposts"])
    }, function (e) {
      o.disabled = !1
    }) : o.setToDraft ? r.setScheduledAsDraft().then(function (e) {
      t(e.data, e.status), h.refreshQueues(["drafts"])
    }, function (e) {
      o.disabled = !1
    }) : (o.disabled = !1, t(e.data, e.status))
  }, function (e) {
    o.disabled = !1
  }), o.showDatePicker = function () {
    o.ensureCanEditMaster() && o.warnUser("Editing the schedule will change it for all {{postcount}} child posts in this set.", o.setDateWithPicker)
  }, o.addCampaigns = function () {
    o.ensureCanEditMaster() && o.warnUser("Editing the campaign will change it for all {{postcount}} child posts in this set.", o.modifyCampaigns)
  }, o.addTags = function () {
    o.ensureCanEditMaster() && o.warnUser("Editing the tags will change them for all {{postcount}} child posts in this set.", o.modifyTags)
  }, o.postOrDraft = function () {
    return r.isDraft() ? "Draft" : "Post"
  }, o.goBack = function () {
    n.$state.go("postdetail", {postid: o.postId, queuetype: o.queueType})
  });
  var v = c.get("usernamex", ""), $ = c.get("usernamedaima", "");
  a.updateview = function (t) {
    f.getmessageupdate(t, v).then(function (t) {
      console.log(t), e.unreadMail = e.unreadMail - 1
    })
  }, u.loadmessage(m, v).then(function (e) {
    if (console.log(e), null != e)a.emailMessages = e, m++, l.hide(); else {
      var t = "此用户没有开通此模块权限";
      p.alert({title: "查询结果", template: t}).then(function (e) {
        console.log("Your password is", e)
      });
      l.hide()
    }
  }), a.loadMore = function () {
    u.loadmessage(m).then(function (e) {
      0 === e.length ? a.canshowmore = !1 : (a.emailMessages = a.emailMessages.concat(e), m++), a.$broadcast("scroll.infiniteScrollComplete")
    })
  }, a.refresh = function () {
    a.emailMessages = [], m = 1, a.$broadcast("scroll.refreshComplete"), g()
  }, a.back = function () {
    i.go("main")
  }, a.serch = function () {
    a.isshowsearch = !a.isshowsearch
  }
}]),

  angular.module("mes.message").factory("messageSevice", ["$http", "$q", "$localstorage", function (e, t, o) {
  var n = 7, a = function (o, a) {
    var s = t.defer();
    o = o || 1;
    var i = "http://s-241601.gotocdn.com:3000/api/Message/GetMessage?curPage=" + o + "&pageSize=" + n + "&usercode=" + a;
    return e.get(i).success(function (e) {
      e && e.length ? (a = null, console.log(e), s.resolve(e)) : s.reject()
    }).error(function (e, t) {
      s.reject()
    }), s.promise
  };
  return {loadmessage: a}
}]).factory("messageupdateSevice", ["$http", "$q", function (e, t) {
  var o = function (o, n) {
    var a = parseInt(o), s = t.defer();
    return e({
      contentType: "application/json; charset=utf-8",
      method: "POST",
      url: "http://s-241601.gotocdn.com:3000/api/Message/MessageIsRead",
      dataType: "json",
      data: {userCode: n, messageId: a},
      async: "isAsync"
    }).success(function (e) {
      console.log("ff" + e), s.resolve(e)
    }).error(function (e, t) {
      s.reject()
    }), s.promise
  };
  return {getmessageupdate: o}
}]),

  angular.module("mes.schedule", []).controller("scheduleCtrl", ["$rootScope", "$ionicHistory", "$scope", "$state", "$ionicPopup", "$localstorage", "$ionicLoading", "scheduleSevice", function (e, a, s, i, c, l, u, d) {
  function p() {
    var e = l.get("usernamex", "");
    d.loadschedulemessage(f, e).then(function (e) {
      if (null != e)s.scheduleMessages = e, f++, u.hide(); else {
        var t = "此用户没有开通此模块权限或没有数据";
        c.alert({title: "查询结果", template: t}).then(function (e) {
          console.log("Your password is", e)
        });
        u.hide()
      }
    })
  }

  var f = 1;
  s.canshowmore = !0, s.scheduleMessages = [];
  var g = l.get("usernamex", ""), m = l.get("usernamedaima", "");
  s.ishuifu = function () {
  }, d.loadschedulemessage(f, g).then(function (e) {
    null != e ? (s.scheduleMessages = e, f++, u.hide()) : u.hide()
  });
  var w = !1;
  w && (o.disabled = !0, r.update().then(function (e) {
    o.submitingDraft ? r.setDraftAsScheduled().then(function (e) {
      t(e.data[0], e.status), h.refreshQueues(["upcomingposts", "pastposts"])
    }, function (e) {
      o.disabled = !1
    }) : o.setToDraft ? r.setScheduledAsDraft().then(function (e) {
      t(e.data, e.status), h.refreshQueues(["drafts"])
    }, function (e) {
      o.disabled = !1
    }) : (o.disabled = !1, t(e.data, e.status))
  }, function (e) {
    o.disabled = !1
  }), o.showDatePicker = function () {
    o.ensureCanEditMaster() && o.warnUser("Editing the schedule will change it for all {{postcount}} child posts in this set.", o.setDateWithPicker)
  }, o.addCampaigns = function () {
    o.ensureCanEditMaster() && o.warnUser("Editing the campaign will change it for all {{postcount}} child posts in this set.", o.modifyCampaigns)
  }, o.addTags = function () {
    o.ensureCanEditMaster() && o.warnUser("Editing the tags will change them for all {{postcount}} child posts in this set.", o.modifyTags)
  }, o.postOrDraft = function () {
    return r.isDraft() ? "Draft" : "Post"
  }, o.goBack = function () {
    n.$state.go("postdetail", {postid: o.postId, queuetype: o.queueType})
  }), s.loadscheduleMore = function () {
    d.loadschedulemessage(f).then(function (e) {
      0 === e.length ? s.canshowmore = !1 : (s.scheduleMessages = s.scheduleMessages.concat(e), f++), s.$broadcast("scroll.infiniteScrollComplete")
    })
  }, s.refreshschedule = function () {
    s.scheduleMessages = [], f = 1, s.$broadcast("scroll.refreshComplete"), p()
  }, s.back = function () {
    i.go("main")
  }, s.serch = function () {
    s.isshowsearch = !s.isshowsearch
  }
}]).controller("scheduleDetailCtrl", ["$rootScope", "$scope", "$stateParams", "$ionicPopup", "$localstorage", "$state", "schedulehuifuSevice", "scheduleupdateSevice", "scheduleDetailSevice", function (e, t, o, n, a, s, i, r, c) {
  var l = o.code, u = o.ID;
  t.Title = o.title;
  var d = a.get("usernamex", "");
  t.c.loadscheduleDetail(u, d).then(function (e) {
    console.log(e), t.Title = e.Title, t.hhh = e.DepartName, t.itemContent = e.Content, t.SendTime = e.InputDate, t.coutent = e.ReplyContent, "0" == e.IsConfirm ? (t.ishuifux = !1, console.log(t.ishuifu)) : t.ishuifux = !0
  }), t.huifu = function (e) {
    if (null == e || "" == e) {
      var t = "请输入文字";
      n.alert({template: t}).then(function (e) {
        console.log("Your password is", e)
      })
    } else i.gethifuschedule(l, d, e).then(function (e) {
      if ("1" == e) {
        var t = "保存成功";
        n.alert({template: t}).then(function (e) {
          console.log("Your password is", e), s.go("schedule")
        })
      } else {
        var t = "保存失败";
        n.alert({template: t}).then(function (e) {
          console.log("Your password is", e)
        })
      }
    })
  }
}]),


  angular.module("mes.schedule").factory("scheduleSevice", ["$http", "$q", "$localstorage", function (e, t, o) {
  var n = 6, a = function (o, a) {
    var s = t.defer();
    o = o || 1;
    var i = "http://s-241601.gotocdn.com:3000/api/Schedule/GetScheInstruction?curPage=" + o + "&pageSize=" + n + "&usercode=" + a;
    return e.get(i).success(function (e) {
      e && e.length ? (console.log(e), s.resolve(e)) : s.reject()
    }).error(function (e, t) {
      s.reject()
    }), s.promise
  };
  return {loadschedulemessage: a}
}]).factory("scheduleDetailSevice", ["$http", "$q", function (e, t) {
  var o = function (o, n) {
    var a = t.defer(), s = "http://s-241601.gotocdn.com:3000/api/Schedule/GetScheModel?scheId=" + o + "&userCode=" + n;
    return e.get(s).success(function (e) {
      e ? (console.log(e), a.resolve(e)) : a.reject()
    }).error(function (e, t) {
      a.reject()
    }), a.promise
  };
  return {loadscheduleDetail: o}
}]).factory("schedulehuifuSevice", ["$http", "$q", function (e, t) {
  var o = function (o, n, a) {
    var s = t.defer();
    return e({
      contentType: "application/json; charset=utf-8",
      method: "POST",
      url: "http://s-241601.gotocdn.com:3000/api/Schedule/ReplyScheInstruction",
      dataType: "json",
      data: {pCode: o, userCode: n, replyCont: a},
      async: "isAsync"
    }).success(function (e) {
      console.log("ff" + e), s.resolve(e)
    }).error(function (e, t) {
      s.reject()
    }), s.promise
  };
  return {gethifuschedule: o}
}]).factory("scheduleupdateSevice", ["$http", "$q", function (e, t) {
  var o = function (o, n) {
    var a = t.defer();
    return e({
      contentType: "application/json; charset=utf-8",
      method: "POST",
      url: "http://s-241601.gotocdn.com:3000/api/Schedule/ScheInstructionIsRead",
      dataType: "json",
      data: {userCode: n, scheCode: o},
      async: "isAsync"
    }).success(function (e) {
      console.log("ff" + e), a.resolve(e)
    }).error(function (e, t) {
      a.reject()
    }), a.promise
  };
  return {getscheduleupdate: o}
}]),


  angular.module("mes.warn", []).controller("warnCtrl", ["$rootScope", "$scope", "$state", "$ionicPopup", "$ionicLoading", "warnSevice", function (e, a, s, i, c, l) {
  function u() {
    l.loadswarnmessage(d).then(function (e) {
      if (null != e)a.warnMessages = e, d++, c.hide(); else {
        var t = "此用户没有开通此模块权限或没有数据";
        i.alert({title: "查询结果", template: t}).then(function (e) {
          console.log("Your password is", e)
        });
        c.hide()
      }
    })
  }

  var d = 1;
  a.canshowmore = !0, a.warnMessages = [];
  var p = !1;
  p && (o.disabled = !0, r.update().then(function (e) {
    o.submitingDraft ? r.setDraftAsScheduled().then(function (e) {
      t(e.data[0], e.status), h.refreshQueues(["upcomingposts", "pastposts"])
    }, function (e) {
      o.disabled = !1
    }) : o.setToDraft ? r.setScheduledAsDraft().then(function (e) {
      t(e.data, e.status), h.refreshQueues(["drafts"])
    }, function (e) {
      o.disabled = !1
    }) : (o.disabled = !1, t(e.data, e.status))
  }, function (e) {
    o.disabled = !1
  }), o.showDatePicker = function () {
    o.ensureCanEditMaster() && o.warnUser("Editing the schedule will change it for all {{postcount}} child posts in this set.", o.setDateWithPicker)
  }, o.addCampaigns = function () {
    o.ensureCanEditMaster() && o.warnUser("Editing the campaign will change it for all {{postcount}} child posts in this set.", o.modifyCampaigns)
  }, o.addTags = function () {
    o.ensureCanEditMaster() && o.warnUser("Editing the tags will change them for all {{postcount}} child posts in this set.", o.modifyTags)
  }, o.postOrDraft = function () {
    return r.isDraft() ? "Draft" : "Post"
  }, o.goBack = function () {
    n.$state.go("postdetail", {postid: o.postId, queuetype: o.queueType})
  }), a.loadswarnMore = function () {
    l.loadswarnmessage(d).then(function (e) {
      0 === e.length ? a.canshowmore = !1 : (a.warnMessages = a.warnMessages.concat(e), d++), a.$broadcast("scroll.infiniteScrollComplete")
    })
  }, a.refreshwarn = function () {
    a.warnMessages = [], d = 1, a.$broadcast("scroll.refreshComplete"), u()
  }, a.back = function () {
    s.go("main")
  }, a.serch = function () {
    a.isshowsearch = !a.isshowsearch
  }
}]).controller("warnDetailCtrl", ["$scope", "$ionicPopup", "$stateParams", "$state", "warnhuifuSevice", "warnDetailSevice", function (e, t, o, n, a, s) {
  e.ID = o.warnid;
  var i = e.ID;
  s.loadwarnsDetail(i).then(function (t) {
    console.log(t), e.AttrName = t.AttrName, e.LevelName = t.LevelName, e.AlarmLevel = t.AlarmLevel, e.AlarmValue = t.AlarmValue, e.PCode = t.PCode, e.deplyname = t.deplyname, e.usercoub = t.RecordDetail
  }), e.register4 = function (e) {
    var o = e;
    if (null == o || "" == o) {
      var s = "请输入文字";
      t.alert({template: s}).then(function (e) {
        console.log("Your password is", e)
      })
    } else a.gethifuwarn(i, o).then(function (e) {
      if ("1" == e) {
        var o = "保存成功";
        t.alert({template: o}).then(function (e) {
          console.log("Your password is", e), n.go("warn")
        })
      } else {
        var o = "保存失败";
        t.alert({template: o}).then(function (e) {
          console.log("Your password is", e)
        })
      }
    })
  }
}]),

  angular.module("mes.warn").factory("warnSevice", ["$http", "$q", "$localstorage", function (e, t, o) {
  var n = 5, a = o.get("usernamex", ""), s = function (o) {
    var s = t.defer();
    o = o || 1;
    var i = "http://s-241601.gotocdn.com:3000/api/Warn/GetRmisAlarm?curPage=" + o + "&pageSize=" + n + "&usercode=" + a;
    return e.get(i).success(function (e) {
      e && e.length ? (console.log(e), s.resolve(e)) : s.reject()
    }).error(function (e, t) {
      s.reject()
    }), s.promise
  };
  return {loadswarnmessage: s}
}]).factory("warnDetailSevice", ["$http", "$q", function (e, t) {
  var o = function (o) {
    var n = t.defer(), a = "http://s-241601.gotocdn.com:3000/api/Warn/GetAlarmModel?alarmId=" + o;
    return e.get(a).success(function (e) {
      e ? (console.log(e), n.resolve(e)) : n.reject()
    }).error(function (e, t) {
      n.reject()
    }), n.promise
  };
  return {loadwarnsDetail: o}
}]).factory("warnhuifuSevice", ["$http", "$q", "$localstorage", function (e, t, o) {
  var n = function (n, a) {
    var s = t.defer(), i = o.get("usernamex", ""), r = new Date, c = r.toLocaleString();
    return e({
      contentType: "application/json; charset=utf-8",
      method: "POST",
      url: "http://s-241601.gotocdn.com:3000/api/Warn/ReplyAlarm",
      dataType: "json",
      data: {alarmId: n, handler: i, handleTime: c, content: a},
      async: "isAsync"
    }).success(function (e) {
      console.log("ff" + e), s.resolve(e)
    }).error(function (e, t) {
      s.reject()
    }), s.promise
  };
  return {gethifuwarn: n}
}]),
  angular.module("mes.workflow", []).controller("workflowCtrl", function (e, t, o) {
}),
  angular.module("mes.workflow").factory("workflowSevice", function (e) {
}),
  angular.module("mes.warnx", []).controller("warnxCtrl", ["$scope", "$ionicLoading", "$interval", "warnxSevice", function (e, t, o, n) {
  var a = 100;
  e.warnMessages = [];
  var s = function () {
    n.loadswarnxmessage(a).then(function (t) {
      if (null != t)e.warnMessages = t, console.log(t); else {
        var o = "此用户没有开通此模块权限";
        $ionicPopup.alert({title: "查询结果", template: o}).then(function (e) {
          console.log("Your password is", e)
        })
      }
    })
  };
  o(s, 1e4), e.back = function () {
    $state.go("main")
  }
}]),
  angular.module("mes.warnx").factory("warnxSevice", ["$http", "$q", "$localstorage", function (e, t, o) {
  var n = o.get("usernamex", ""), a = function (o) {
    var a = t.defer();
    o = o || 1;
    var s = "http://s-241601.gotocdn.com:3000/api/Warn/GetRmisAlarmr?topSum=" + o + "&usercode=" + n;
    return e.get(s).success(function (e) {
      e && e.length ? (console.log(e), a.resolve(e)) : a.reject()
    }).error(function (e, t) {
      a.reject()
    }), a.promise
  };
  return {loadswarnxmessage: a}
}]),
  angular.module("mes").controller("CampaignsCtrl", ["$scope", "CampaignsService", "CallbackService", "$location", function (e, t, o, n) {
  var a = o.getCallback(n.url()), s = a.getParams(), i = "filter" == s.purpose, r = {
    title: "Campaigns",
    left_action: function () {
      a.reject()
    },
    right_action: function () {
      e.list_picker_options.submitSelected()
    }
  };
  cordova.plugins.Keyboard && cordova.plugins.Keyboard.close(), e.onSwipeDown = function () {
    cordova.plugins.Keyboard.close()
  }, e.list_picker_options = {
    header: r,
    recent_items_label: "Recent Campaigns",
    all_items_label: "All Campaigns",
    single_select: s.singleSelect,
    filter: i,
    onSubmit: function (e) {
      a.resolve(e)
    },
    loadData: function (o) {
      t.search(o).then(function (t) {
        var o = t.data;
        _.each(o, function (e) {
          _.contains(s.selected.map(String), e.id + "") && (e.selected = !0)
        }), e.list_picker_options.setItems(t.data), e.$broadcast("scroll.refreshComplete")
      })
    }
  }
}]),

  angular.module("mes").controller("CreatePostCtrl", ["$state", "$q", "$stateParams", "$scope", "$http", "$rootScope", "PublishingService", "CallbackHelperService", "MediaPickerService", "$ionicPopup", "LinkShortenerService", "$ionicTabsDelegate", "PostTimelineService", "$timeout", "$window", "$ionicSideMenuDelegate", "SharedEditPostService", "$ionicHistory", "$translate", function (e, t, o, n, a, s, i, r, c, l, u, d, p, f, h, g, m, w, v) {
  m.loadMethods(n, "create"), n.customInitialization = function () {
    i.initDefaultCampaign(), i.initTimezone(), n.tab_index = {
      MasterPost: 0,
      FacebookPost: 1,
      TwitterPost: 2
    }, n.setPropertyCountScope()
  }, n.setPropertyCountScope = function () {
    n.propertyCount = _.size(i.getProperties())
  }, n.performValidations = function () {
    n.disabled = _.isEmpty(i.getProperties()) ? !0 : n.hasTwitterProperty() && 140 == n.twitterCount && !i.hasAttachedImage() && !i.hasAttachedLink() || n.hasFacebookProperty() && 0 == n.facebookPost.length && !i.hasAttachedImage() && !i.hasAttachedLink() ? !0 : n.hasTwitterProperty() ? n.twitterCount < 0 : !!(n.facebookPost.length > 5e3 && n.hasFacebookProperty())
  }, n.submit = function () {
    n.disabled = !0, i.create().then(function (e) {
      n.disabled = !1, e.data && e.data.posts && n.mapPostsSetSuccess(e.data), i.deleteAll(), p.refreshQueues(i.isDraft() ? ["drafts"] : ["upcomingposts", "pastposts"]), ASMobile.Utils.trackAction("mob.pub.postcreate", n), w.goBack()
    }, function (e) {
      n.disabled = !1
    })
  }, n.mapPostsSetSuccess = function (e) {
    var t, o = e.posts, n = p.getTypeTitleQueue("recentcreations");
    n.queueChildren = [], n.indices = [], _.map(o, function (o) {
      _.contains(n.indices, o.id) || (t || (t = o.id), o.masterPost = e, n.indices.push(o.id), n.queueChildren.push(o))
    }), s.messageType = "SUCCESS", s.respMsg = i.formatActionResultString(e, "Create", !0), t && (s.link = "/postdetail/" + t + "/recentcreations", s.linkTitle = "View"), s.msgId = _.uniqueId("msgId_")
  }, n.addProperties = function () {
    cordova.plugins.Keyboard && cordova.plugins.Keyboard.close();
    var e = {selected: _.keys(i.getProperties())};
    r.goAndReturn(e, "postproperties", i.setProperties)
  }, n.setTabs = function () {
    n.hideTwitterTab = !0, n.hideFacebookTab = !0, _.each(i.getProperties(), function (e) {
      "TwitterAccount" == e.type ? n.hideTwitterTab = !1 : ("FacebookPage" == e.type || "Audience" == e.type || "Group" == e.type) && (n.hideFacebookTab = !1)
    }), "TwitterPost" == i.currentTab() && n.hideTwitterTab && i.currentTab("MasterPost"), "FacebookPost" == i.currentTab() && n.hideFacebookTab && i.currentTab("MasterPost"), n.updateTabUI()
  }, n.startOverConfirm = function () {
    var e = [];
    cordova.plugins.Keyboard.close(), i.getPublisherMessage() ? (e.push({
      text: v.instant("Keep Message"),
      onClick: function () {
        return w.goBack(), !1
      }
    }), e.push({
      text: v.instant("Discard"), onClick: function () {
        return i.deleteAll(), w.goBack(), !1
      }
    }), n.disabled || e.push({
      text: v.instant("Save as Draft"), onClick: function () {
        return i.setAsDraft(), n.submit(), !1
      }
    }), e.push({
      type: "cancel",
      text: "<b>" + v.instant("Cancel") + "</b>"
    }), n.showActionSheet(e)) : (i.deleteAll(), w.goBack())
  }, n.showDatePicker = function () {
    n.setDateWithPicker()
  }, n.addCampaigns = function () {
    n.modifyCampaigns()
  }, n.addTags = function () {
    n.modifyTags()
  }, n.goBack = function () {
    w.goBack()
  }, n.initializeController()
}]), angular.module("mes").controller("EditPostCtrl", ["SharedEditPostService", "$state", "$q", "$stateParams", "$scope", "$http", "$rootScope", "PublishingService", "CallbackHelperService", "MediaPickerService", "$ionicPopup", "LinkShortenerService", "$ionicTabsDelegate", "PostTimelineService", "$translate", function (e, t, o, n, a, s, i, r, c, l, u, d, p, f, h) {
  e.loadMethods(a, "edit"), a.customInitialization = function () {
    a.tab_index = {FacebookPost: 0, TwitterPost: 1}, r.setPublishNow();
    var e = r.getCurrentContext();
    a.queueType = i.currentDetailQueueType, a.postId = e.idOfChildPostToEdit, r.currentTab(r.getTabFromEditPostType()), a.propertyCount = _.size(e.template.posts), a.permissionToEditMaster = !!e.template.can.edit
  }, a.startOverConfirm = function () {
    i.$state.go("postdetail", {postid: a.postId, queuetype: a.queueType})
  }, a.surfaceName = function () {
    return r.getSurfaceName()
  }, a.performValidations = function () {
    a.disabled = (0 != a.hideTwitterTab || 140 != a.twitterCount || r.hasAttachedImage() || r.hasAttachedLink()) && (0 != a.hideFacebookTab || 0 != a.facebookPost.length || r.hasAttachedImage() || r.hasAttachedLink()) ? 0 == a.hideTwitterTab ? a.twitterCount < 0 : a.facebookPost.length > 5e3 && 0 == a.hideFacebookTab : !0
  }, a.submit = function () {
    function e(e, t) {
      f.updatePostsUsingMasterPost(e), a.disabled = !1, 200 === t && (ASMobile.Utils.trackAction("mob.pub.postedit", a), i.$state.go("postdetail", {
        postid: a.postId,
        queuetype: a.queueType
      }))
    }

    a.disabled = !0, r.update().then(function (t) {
      a.submitingDraft ? r.setDraftAsScheduled().then(function (t) {
        e(t.data[0], t.status), f.refreshQueues(["upcomingposts", "pastposts"])
      }, function (e) {
        a.disabled = !1
      }) : a.setToDraft ? r.setScheduledAsDraft().then(function (t) {
        e(t.data, t.status), f.refreshQueues(["drafts"])
      }, function (e) {
        a.disabled = !1
      }) : (a.disabled = !1, e(t.data, t.status))
    }, function (e) {
      a.disabled = !1
    })
  }, a.warnUser = function (e, t) {
    var o = r.getCurrentContext().template.posts.length || 1;
    if (1 == o)t(); else {
      var n = u.confirm({
        title: h.instant("Will Affect {{postcount}} Posts", {postcount: o}),
        template: h.instant(e, {postcount: o}),
        okText: h.instant("Edit {{postcount}} Posts", {postcount: o})
      });
      n.then(function (e) {
        e && t()
      })
    }
  }, a.setTabs = function () {
    a.hideTwitterTab = !0, a.hideFacebookTab = !0, "TwitterPost" == r.currentTab() ? a.hideTwitterTab = !1 : "FacebookPost" == r.currentTab() && (a.hideFacebookTab = !1), a.updateTabUI()
  }, a.ensureCanEditMaster = function () {
    return a.permissionToEditMaster === !1 ? (u.alert({
      title: h.instant("Improper Permissions"),
      template: h.instant("You need to own all properties within master post to edit this content")
    }), !1) : !0
  }, a.showDatePicker = function () {
    a.ensureCanEditMaster() && a.warnUser("Editing the schedule will change it for all {{postcount}} child posts in this set.", a.setDateWithPicker)
  }, a.addCampaigns = function () {
    a.ensureCanEditMaster() && a.warnUser("Editing the campaign will change it for all {{postcount}} child posts in this set.", a.modifyCampaigns)
  }, a.addTags = function () {
    a.ensureCanEditMaster() && a.warnUser("Editing the tags will change them for all {{postcount}} child posts in this set.", a.modifyTags)
  }, a.postOrDraft = function () {
    return r.isDraft() ? "Draft" : "Post"
  }, a.goBack = function () {
    i.$state.go("postdetail", {postid: a.postId, queuetype: a.queueType})
  }, a.initializeController()
}]), angular.module("mes").controller("ListFilterCtrl", ["$scope", "$rootScope", "CallbackService", "CallbackHelperService", "$location", "ListFilterService", function (e, t, o, n, a, s) {
  var i = o.getCallback(a.url()), r = function (e, t, o) {
    function a(t) {
      s.set(e, t)
    }

    o = o || {};
    var i = _.extend({selected: s.get(e), purpose: "filter"}, o);
    n.goAndReturn(i, t, a)
  };
  e.filterCount = function (e) {
    return s.count(e)
  }, e.setProperties = function () {
    function e(e) {
      s.setProperties(e)
    }

    var t = {selected: s.getProperties(), purpose: "filter"};
    n.goAndReturn(t, "postproperties", e)
  }, e.setCampaigns = function () {
    var e = "campaigns";
    r(e, e, {singleSelect: !1})
  }, e.setTags = function () {
    var e = "tags";
    r(e, e)
  }, e.goBack = function () {
    e.filters = s.load(), i.reject()
  }, e.submit = function () {
    s.hasChanged() ? i.resolve(s.save()) : i.reject()
  }, e.reset = function () {
    s.resetLocal()
  }, e.isFiltered = function () {
    return s.isFiltered()
  }
}]);

angular.module("mes").run(["$templateCache", function ($templateCache) {
  $templateCache.put("js/config/faq.html", "<ion-view class=scroll-bg><ion-nav-bar class=bar-dark><ion-nav-back-button class=button-clear><i class=ion-chevron-left></i>关于能源管理</ion-nav-back-button></ion-nav-bar><ion-content scrollbar-x=false scrollbar-y=false><div class=\"section-content tnc-content\"><h2>能源管理</h2><p>能源管理分为宏观管理与微观管理。政府及有关部门对能源的开发，生产和消费的全过程进行计划、组织、调控和监督的社会职能是能源宏观管理；企业对能源供给与消费的全过程进行管理是能源微观管理。 广义的能源管理是指对能源生产过程的管理和消费过程的管理。 狭义上的能源管理是指对能源消费过程的计划、组织、控制和监督等一系列工作。能源包括煤炭、石油及气类产品、风电能和核电能，对这些能源的管理形成了一个系统，超出了这个范围的管理就是越界了。三者都是运用管理手段、系统思想、过程方法、PDCA途径和持续改进对所控制的对象进行系统的控制和管理，但由于三个管理体系所对应的核心概念――质量、环境和能源不同，以及由此导致的管理体系的关注点和过程控制方法也不完全不同，因此，所使用的控制和管理措施以及采取的具体技术方法将存在差异。但总的来说，能源管理体系标准是在ISO9000标准和ISO14000标准的基础上建立起来的一套管理体..典型功能 1.采集状态监测与报警； 2.管理； 3.能耗管理与数据报表； 4.建筑基本情况、分类分项能耗情况及相关能耗指标显示； 5.各监测支路的以上各分类分项能耗逐时原始读数列表； 6.历史记录与趋势分析； 7.故障分析与设备维护管理； 8.成本分析。 目标实现 1.建筑与工业设施整体能耗状况的实时监测和细致化管理 2.电力、燃气、水等分类能耗数据和电量各分项能耗数据的透明化 3.为其他高级应用提供设施各类能耗的全方位实时高精度数据 4.为用户建筑与工业设施能源系统精细设计和节能改造提供依据 5.能耗总量统计和趋势分析施 6.能耗成本结构优化 7.电力、燃气、水等能源供应中断、事故跳闸、故障原因分析 8.趋势记录帮助优化资源...</p></div></ion-content><murder-footer></murder-footer></ion-view>");
  $templateCache.put("js/config/footer_bar.html", "<ion-footer-bar align-title=left class=footer-bar><div class=footer-content><div class=user-avatar><img class=user-avatar-img src=\"{{ user.facebookID ? \'http://graph.facebook.com/\' + user.facebookID + \'/picture?height=100&width=100\' : \'img/space.png\' }}\"></div><div class=footer-contents><div class=user-name>{{name}}</div><div class=footer-buttons><a class=\"footer-button burger-menu\" ng-click=showOptionsMenu($event)></a></div></div></div></ion-footer-bar><script id=config/main_menu_options.html type=text/ng-template><ion-popover-view class=\"burger-menu\"> <ion-content scroll=\"false\"> <div class=\"row\"> <a class=\"list-link logout\" nav-transition=\"none\" ng-click=\"logout()\">退出</a> </div> <!--<div class=\"row\">--> <!--<a class=\"list-link\" ng-click=\"dismissAndGoto(\'faq\')\">设置</a>--> <!--</div>--> <div class=\"row\"> <a class=\"list-link\" ng-click=\"dismissAndGoto(\'faq\')\">关于能源管理</a> </div> </ion-content> </ion-popover-view></script>");
  $templateCache.put("js/config/instructions.html", "<ion-view class=scroll-bg><ion-content scrollbar-x=false scrollbar-y=false><div class=section-header><h1>Mes有关协议</h1></div><div class=\"section-content tnc-content\"><strong>Players are invited to become an elite member of Nancy Maher\'s top legal defence team who are defending a client charged with murder.</strong><ul><li>Players are invited to become an elite member of <strong>Nancy Maher\'s</strong> top legal defence team who are defending a client charged with murder.</li><li>Players have six weeks to complete the game and win the case for their client, <strong>Hilary Finn</strong>. Players can join the game at any time across the six weeks and play from the start.</li><li>Every Tuesday there is a new task with a checklist of items to complete. Items are unlocked throughout the week as new content is released into the game.</li><li>Players receive notifications throughout the week of new tasks and items to complete. An item is complete once it is read. Weekly tasks are complete when all items are read.</li><li>Once players complete a task they are asked if they want to <strong>LEAK</strong> or <strong>BURY</strong> the evidence. Players must choose the least damaging option for Hilary\'s case to gain more points.</li><li>The more tasks a player completes and the more items they discover, the more points they receive. Players can gain points and bonus points by completing items, weekly tasks, and by sharing whether they leak or bury task evidence.</li><li>The more points a player receives, the greater chance they have of winning the $1000 grand prize.</li><li>The final <strong>LEAK</strong> or <strong>BURY</strong> decision will result in different game endings.</li></ul>So choose wisely, or you may find yourself in a spot of trouble.<p style=margin-top:1em>If you have any questions about the game or how to play it, please contact <a href=# onclick=\"window.location.href = \'mailto:?subject=Help! #TV2HTGAWM\';\">helloblacksand@gmail.com</a> and we will endeavour to respond to you within 48 hours.</p></div></ion-content></ion-view>");
  $templateCache.put("js/itemwakeup/itemwakeup.html", "<ion-view class=scroll-bg cache-view=false><ion-nav-bar class=bar-dark><ion-nav-back-button class=button-clear><i class=ion-chevron-left></i>事项提醒</ion-nav-back-button><ion-nav-buttons side=right><button ng-click=serch() class=\"button button-icon button-clear ion-search\"></button></ion-nav-buttons></ion-nav-bar><div class=\"bar bar-subheader bar-dark\" ng-show=isshowsearch><label class=\"item item-input\"><i class=\"icon ion-search placeholder-icon\"></i> <input type=text placeholder=请输入标题或时间或下发部门或类型 ng-model=data></label></div><ion-content scrollbar-x=false scrollbar-y=true><ion-refresher pulling-text=正在初始化数据... on-refresh=refreshitemwakeup()></ion-refresher><ion-list><ion-item class=item-transparent ng-repeat=\"message in itemwakeupMessages |filter:data\"><a class=list-link href=#/itemwakeup/{{message.ID}}><div class=secure-email-item><div class=secure-email-image><div class=\"secure-email-avatar {{ message.IsRead==1 ? \'viewed\' : \'new\' }}\"></div><image class=star src=img/images/email/HTGAWM-star_pink.png ng-show=\"message.IsConfirm== \'1\'\"></image></div><div class=secure-email-summary><h1 class>会议名称:{{ message.MeetingName }}</h1><h1 class>事项名称:{{ message.Event }}</h1><div class=date>计划完成时间: {{ message.CompleteTimeByPlan | date:\"yyyy-MM-dd\"}}</div><h2 class=normal-text>会议内容:{{ message.Content }}</h2><p class=normal-text>事项内容:{{ message.WorkContent }}</p></div><div style=clear:both;></div></div></a></ion-item><ion-infinite-scroll ng-if=canshowmore on-infinite=loaditemwakeupMore() distance=60%></ion-infinite-scroll></ion-list></ion-content><murder-footer></murder-footer></ion-view>");
  $templateCache.put("js/itemwakeup/itemwakeupDetail.html", "<ion-view class=scroll-bg cache-view=false><ion-nav-bar class=bar-dark><ion-nav-back-button class=button-clear><i class=ion-chevron-left></i>会议追踪事项</ion-nav-back-button></ion-nav-bar><ion-content scrollbar-x=false><div class=secure-email-read><div class=secure-email-header><p class=normal-text>会议标题：<span class=to-from-name>{{MeetingName}}</span></p><p class=normal-text>下发人：<span class=to-from-name>{{name}}</span></p><h1 class=normal-text>事项名称： {{WorkContent}}</h1><h1 class=normal-text>计划完成时间：{{BeginTime|date:\"yyyy-MM-dd\"}}</h1></div></div><div class=login-sign-up><div class=employee-details><div class=row><div class=\"col col-10 ion-android-clipboard\"></div><div class=col><div class=\"item item-input-inset\"><label class=item-input-wrapper><textarea name=textarea cols=10 rows=5 placeholder=实际情况 ng-model=content></textarea><div style=clear:both;></div></label></div></div></div><div class=button-bar><button class=\"button button-positive\" ng-click=huifuc(content)>回复</button></div></div></div></ion-content><murder-footer></murder-footer></ion-view>");
  $templateCache.put("js/login/login.html", "<ion--view class=\"scroll-bg login\"><ion-content class=login-content ng-controller=loginCtrl scrollbar-x=false scrollbar-y=false><div class=game-logo-container><image class=game-logo src=\"img/images/main menu/HTGAWM-logo.png\"></image></div><form class=manual-login name=loginForm ng-submit=login(user)><div class=list><div class=\"input-container name-input\"><label><input type=text ng-model=user.name placeholder=请输入用户名></label></div><div class=\"input-container password-input\"><label><input type=password ng-model=user.password name=userPassword placeholder=请输入密码></label></div><div><button class=login-button type=submit>登录</button></div></div></form></ion-content><div class=\"bar bar-footer\" style=\"background-color: #7091BD\"><div class=title>&copy; 2016 杭州和利时公司All Rights Reserved.</div></div></ion--view>");
  $templateCache.put("js/main/main.html", "<ion-view id=main-menu class=\"scroll-bg main-menu\"><ion-content scrollbar-x=false scrollbar-y=false class=center has-bouncing=false><div class=mainmenu-header><image class=attorneys-logo src=\"img/images/main menu/HTGAWM-logo.png\"><div class=title><h1 class=internal>Mes</h1><h1 class=comms>生产制造管理</h1></div></image></div><div class=row><div class=col><a ng-click=me() class=app-button><div class=\"app-button-icon button-email\" ng-class=\"{unread: unreadMail > 0}\"><div class=unread-count>{{unreadMail}}</div></div><div class=app-button-label>消息通知</div></a></div><div class=col><a href=#/schedule class=app-button><div class=\"app-button-icon button-voicemail\" ng-class=\"{unread: unreadVoice > 0}\"><div class=unread-count>{{unreadVoice}}</div></div><div class=app-button-label>调度指令</div></a></div><div class=col><a href=#/warn class=app-button><div class=\"app-button-icon button-messaging\" ng-class=\"{unread: unreadChat > 0}\"><div class=unread-count>{{unreadChat}}</div></div><div class=app-button-label>报警查询</div></a></div></div><div class=row><div class=col><a href=#/warnx class=app-button><div class=\"app-button-icon button-notes\"><div class=unread-count></div></div><div class=app-button-label>报警实时查询</div></a></div><div class=col><a href=#/itemwakeup class=app-button><div class=\"app-button-icon button-employeeid\" ng-class=\"{unread: unreadItem > 0}\"><div class=unread-count>{{unreadItem}}</div></div><div class=app-button-label>事项提醒</div></a></div><div class=col></div></div></ion-content><murder-footer></murder-footer></ion-view>");
  $templateCache.put("js/message/message.html", "<ion-view class=scroll-bg cache-view=false><ion-nav-bar class=bar-dark><ion-nav-back-button class=button-clear><i class=ion-chevron-left></i>消息通知</ion-nav-back-button><ion-nav-buttons side=right><button ng-click=serch() class=\"button button-icon button-clear ion-search\"></button></ion-nav-buttons></ion-nav-bar><div class=\"bar bar-subheader bar-dark\" ng-show=isshowsearch><label class=\"item item-input\"><i class=\"icon ion-search placeholder-icon\"></i> <input type=text placeholder=请输入标题或时间 ng-model=data></label></div><ion-content><ion-refresher pulling-text=正在初始化数据... on-refresh=refresh()></ion-refresher><ion-list><ion-item class=item-transparent ng-repeat=\"message in emailMessages |filter:data\"><a class=list-link ng-click=updateview(message.ID)><div class=secure-email-item><div class=secure-email-image><div class=\"secure-email-avatar {{ message.IsRead==\'1\' ? \'viewed\' : \'new\' }}\"></div></div><div class=secure-email-summary><h1 class>标题：{{ message.Title }}</h1><div class=date>消息发送时间：{{ message.SendTime| date:\"yyyy-MM-dd\"}}</div><p class=normal-text>消息内容：{{ message.Content }}</p></div><div style=clear:both;></div></div></a></ion-item><ion-infinite-scroll ng-if=canshowmore on-infinite=loadMore() distance=10%></ion-infinite-scroll></ion-list></ion-content><murder-footer></murder-footer></ion-view>");
  $templateCache.put("js/other/other.html", "<!DOCTYPE html><html lang=en><head><meta charset=UTF-8><title></title></head><body></body></html>");
  $templateCache.put("js/schedule/schedule.html", "<ion-view class=scroll-bg cache-view=false><ion-nav-bar class=bar-dark><ion-nav-back-button class=button-clear><i class=ion-chevron-left ng-click=back()></i>调度指令</ion-nav-back-button><ion-nav-buttons side=right><button ng-click=serch() class=\"button button-icon button-clear ion-search\"></button></ion-nav-buttons></ion-nav-bar><div class=\"bar bar-subheader bar-dark\" ng-show=isshowsearch><label class=\"item item-input\"><i class=\"icon ion-search placeholder-icon\"></i> <input type=text placeholder=请输入标题或时间或下发部门或类型 ng-model=data></label></div><ion-content scrollbar-x=false scrollbar-y=true><ion-refresher pulling-text=正在初始化数据... on-refresh=refreshschedule()></ion-refresher><ion-list><ion-item class=item-transparent ng-repeat=\"message in scheduleMessages |filter:data\"><a class=list-link href=\"#/schedule/{{ message.Code }}/{{ message.ID }}/{{message.IsConfirm}}\"><div class=secure-email-item><div class=secure-email-image><div class=\"secure-email-avatar {{ message.IsRead==1 ? \'viewed\' : \'new\' }}\"></div><image class=star src=img/images/email/HTGAWM-star_pink.png ng-show=\"message.IsConfirm== \'1\'\"></image></div><div class=secure-email-summary><h1 class>标题:{{ message.Title }}</h1><div class=date>调度时间：{{ message.InputDate | date:\"yyyy-MM-dd\"}}</div><h2 class=normal-text>调度部门：{{ message.DepartName}}</h2><p class=normal-text>调度内容:{{ message.Content }}</p></div><div style=clear:both;></div></div></a></ion-item><ion-infinite-scroll ng-if=canshowmore on-infinite=loadscheduleMore() distance=10%></ion-infinite-scroll></ion-list></ion-content><murder-footer></murder-footer></ion-view>");
  $templateCache.put("js/schedule/scheduleDetail.html", "<ion-view class=scroll-bg cache-view=false><ion-nav-bar class=bar-dark><ion-nav-back-button class=button-clear><i class=ion-chevron-left></i>调度通知</ion-nav-back-button></ion-nav-bar><ion-content scrollbar-x=false><div class=secure-email-read><div class=secure-email-header><p class=normal-text>标题：<span class=to-from-name>{{Title}}</span></p><p class=normal-text>下发部门：<span class=to-from-name>{{hhh}}</span></p><h1 class=title>事项： {{itemContent}}</h1><h1 class=title>下发时间：{{SendTime| date:\"yyyy-MM-dd\"}}</h1></div></div><div class=login-sign-up><div class=employee-details><div class=row><div class=\"col col-10 ion-android-clipboard\"></div><div class=col><div class=\"item item-input-inset\"><label class=item-input-wrapper><textarea type=textarea cols=10 rows=5 name=coutent placeholder=指令内容 ng-model=coutent></textarea></label></div></div></div><div class=button-bar ng-show=!ishuifux><button class=\"button button-positive\" ng-click=huifu(coutent)>回复</button></div></div></div></ion-content><murder-footer></murder-footer></ion-view>");
  $templateCache.put("js/warn/emailreadbaojing.html", "<ion-view class=scroll-bg><ion-nav-bar class=bar-dark><ion-nav-back-button class=button-clear><i class=ion-chevron-left></i>报警通知</ion-nav-back-button></ion-nav-bar><ion-content scrollbar-x=false><div class=secure-email-read><div class=secure-email-header><p class=normal-text>分组：<span class=to-from-name>{{PCode}}</span></p><p class=normal-text>警报属性名：<span class=to-from-name>{{AttrName}}</span></p><p class=normal-text>警报级别名：<span class=to-from-name>{{LevelName}}</span></p><h1 class=title>警报级别：{{AlarmLevel}}</h1><h1 class=title>警报值：{{AlarmValue}}</h1><h1 class=title>流程图名：{{deplyname}}</h1></div></div><div class=email-body compile-html=\"htmlEmailBody | insertLinks | callbackLinks:\'onBodyLinkClick\'\"></div><div class=login-sign-up><div class=employee-details><div class=row><div class=\"col col-10 ion-android-clipboard\"></div><div class=col><div class=\"item item-input-inset\"><label class=item-input-wrapper><textarea type=textarea cols=10 rows=5 name=usercontent placeholder=处理内容 ng-model=usercoub></textarea></label></div></div></div><div class=button-bar><button class=\"button button-positive\" ng-click=register4(usercoub)>回复</button></div></div></div></ion-content><murder-footer></murder-footer></ion-view>");
  $templateCache.put("js/warn/warn.html", "<ion-view class=scroll-bg cache-view=false><ion-nav-bar class=bar-dark><ion-nav-back-button class=button-clear><i class=ion-chevron-left></i>报警查询</ion-nav-back-button><ion-nav-buttons side=right><button ng-click=serch() class=\"button button-icon button-clear ion-search\"></button></ion-nav-buttons></ion-nav-bar><div class=\"bar bar-subheader bar-dark\" ng-show=isshowsearch><label class=\"item item-input\"><i class=\"icon ion-search placeholder-icon\"></i> <input type=text placeholder=请输入标题或时间 ng-model=data></label></div><ion-content><ion-refresher pulling-text=正在初始化数据... on-refresh=refreshwarn()></ion-refresher><ion-list><ion-item class=item-transparent ng-repeat=\"message in warnMessages |filter:data\"><a class=list-link href=#/warn/{{message.ID}}><div class=secure-email-item><div class=secure-email-image><div><img src=img/baojing/sta_alarming.png width=30 ng-show=\"message.State == \'2\'\"> <img src=img/baojing/chuli.png width=30 ng-show=\"message.State == \'3\'\"> <img src=img/baojing/autohuifu.png width=30 ng-show=\"message.State == \'1\'\"></div></div><div class=secure-email-summary><h1 class>警报位号：{{message.ID}}</h1><div class=normal-text>警报属性名：{{message.AttrName}}</div><div class=normal-text>警报级别名：{{message.LevelName}}</div><h2 class=normal-text>警报级别：{{message.AlarmLevel}}</h2><h2 class=normal-text>警报值：{{message.AlarmValue}}</h2><p class=date>警报时间：{{message.EndTime | date:\"yyyy-MM-dd\"}}</p></div><div style=clear:both;></div></div></a></ion-item><ion-infinite-scroll ng-if=canshowmore on-infinite=loadswarnMore() distance=10%></ion-infinite-scroll></ion-list></ion-content><murder-footer></murder-footer></ion-view>");
  $templateCache.put("js/warnx/warnx.html", "<ion-view class=scroll-bg cache-view=false><ion-nav-bar class=bar-dark><ion-nav-back-button class=button-clear><i class=ion-chevron-left></i>报警实时通知</ion-nav-back-button></ion-nav-bar><ion-content><ion-list><ion-item class=item-transparent ng-repeat=\"message in warnMessages\"><a class=list-link><div class=secure-email-item><div class=secure-email-image><div><img src=img/baojing/sta_alarming.png width=30 ng-show=\"message.State == \'2\'\"> <img src=img/baojing/chuli.png width=30 ng-show=\"message.State == \'3\'\"> <img src=img/baojing/autohuifu.png width=30 ng-show=\"message.State == \'1\'\"></div></div><div class=secure-email-summary><h1 class=normal-text>位号： {{message.ID}}</h1><div class=normal-text>警报属性名：{{message.AttrName}}</div><h2 class=normal-text>警报级别： {{message.AlarmLevel}}</h2><h2 class=normal-text>警报值： {{message.AlarmValue}}</h2><p class=date>发送时间: {{message.EndTime | date:\"yyyy-MM-dd\"}}</p></div><div style=clear:both;></div></div></a></ion-item></ion-list></ion-content><murder-footer></murder-footer></ion-view>");
  $templateCache.put("js/workflow/workflow.html", "<ion-view>workflow</ion-view>");
}]);
