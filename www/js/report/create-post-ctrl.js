angular.module("mes").controller("CreatePostCtrl", ["$state", "$q", "$stateParams", "$scope", "$http", "$rootScope", "PublishingService", "CallbackHelperService", "MediaPickerService", "$ionicPopup", "LinkShortenerService", "$ionicTabsDelegate", "PostTimelineService", "$timeout", "$window", "$ionicSideMenuDelegate", "SharedEditPostService", "$ionicHistory", "$translate", function (e, t, o, i, a, s, n, r, c, u, d, p, l, b, h, g, P, f, k) {
    P.loadMethods(i, "create"), i.customInitialization = function () {
        n.initDefaultCampaign(), n.initTimezone(), i.tab_index = {
            MasterPost: 0,
            FacebookPost: 1,
            TwitterPost: 2
        }, i.setPropertyCountScope()
    }, i.setPropertyCountScope = function () {
        i.propertyCount = _.size(n.getProperties())
    }, i.performValidations = function () {
        i.disabled = _.isEmpty(n.getProperties()) ? !0 : (!i.hasTwitterProperty() || 140 != i.twitterCount || n.hasAttachedImage() || n.hasAttachedLink()) && (!i.hasFacebookProperty() || 0 != i.facebookPost.length || n.hasAttachedImage() || n.hasAttachedLink()) ? i.hasTwitterProperty() ? i.twitterCount < 0 ? !0 : !1 : i.facebookPost.length > 5e3 && i.hasFacebookProperty() ? !0 : !1 : !0
    }, i.submit = function () {
        i.disabled = !0, n.create().then(function (e) {
            i.disabled = !1, e.data && e.data.posts && i.mapPostsSetSuccess(e.data), n.deleteAll(), l.refreshQueues(n.isDraft() ? ["drafts"] : ["upcomingposts", "pastposts"]), ASMobile.Utils.trackAction("mob.pub.postcreate", i), f.goBack()
        }, function (e) {
            i.disabled = !1
        })
    }, i.mapPostsSetSuccess = function (e) {
        var t, o = e.posts, i = l.getTypeTitleQueue("recentcreations");
        i.queueChildren = [], i.indices = [], _.map(o, function (o) {
            _.contains(i.indices, o.id) || (t || (t = o.id), o.masterPost = e, i.indices.push(o.id), i.queueChildren.push(o))
        }), s.messageType = "SUCCESS", s.respMsg = n.formatActionResultString(e, "Create", !0), t && (s.link = "/postdetail/" + t + "/recentcreations", s.linkTitle = "View"), s.msgId = _.uniqueId("msgId_")
    }, i.addProperties = function () {
        cordova.plugins.Keyboard && cordova.plugins.Keyboard.close();
        var e = {selected: _.keys(n.getProperties())};
        r.goAndReturn(e, "postproperties", n.setProperties)
    }, i.setTabs = function () {
        i.hideTwitterTab = !0, i.hideFacebookTab = !0, _.each(n.getProperties(), function (e) {
            "TwitterAccount" == e.type ? i.hideTwitterTab = !1 : ("FacebookPage" == e.type || "Audience" == e.type || "Group" == e.type) && (i.hideFacebookTab = !1)
        }), "TwitterPost" == n.currentTab() && i.hideTwitterTab && n.currentTab("MasterPost"), "FacebookPost" == n.currentTab() && i.hideFacebookTab && n.currentTab("MasterPost"), i.updateTabUI()
    }, i.startOverConfirm = function () {
        var e = [];
        cordova.plugins.Keyboard.close(), n.getPublisherMessage() ? (e.push({
            text: k.instant("Keep Message"),
            onClick: function () {
                return f.goBack(), !1
            }
        }), e.push({
            text: k.instant("Discard"), onClick: function () {
                return n.deleteAll(), f.goBack(), !1
            }
        }), i.disabled || e.push({
            text: k.instant("Save as Draft"), onClick: function () {
                return n.setAsDraft(), i.submit(), !1
            }
        }), e.push({
            type: "cancel",
            text: "<b>" + k.instant("Cancel") + "</b>"
        }), i.showActionSheet(e)) : (n.deleteAll(), f.goBack())
    }, i.showDatePicker = function () {
        i.setDateWithPicker()
    }, i.addCampaigns = function () {
        i.modifyCampaigns()
    }, i.addTags = function () {
        i.modifyTags()
    }, i.goBack = function () {
        f.goBack()
    }, i.initializeController()
}]);
