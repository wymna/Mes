angular.module("mes").controller("EditPostCtrl", ["SharedEditPostService", "$state", "$q", "$stateParams", "$scope", "$http", "$rootScope", "PublishingService", "CallbackHelperService", "MediaPickerService", "$ionicPopup", "LinkShortenerService", "$ionicTabsDelegate", "PostTimelineService", "$translate", function (t, e, i, s, o, a, n, r, u, d, c, l, p, h, f) {
    t.loadMethods(o, "edit"), o.customInitialization = function () {
        o.tab_index = {FacebookPost: 0, TwitterPost: 1}, r.setPublishNow();
        var t = r.getCurrentContext();
        o.queueType = n.currentDetailQueueType, o.postId = t.idOfChildPostToEdit, r.currentTab(r.getTabFromEditPostType()), o.propertyCount = _.size(t.template.posts), o.permissionToEditMaster = !!t.template.can.edit
    }, o.startOverConfirm = function () {
        n.$state.go("postdetail", {postid: o.postId, queuetype: o.queueType})
    }, o.surfaceName = function () {
        return r.getSurfaceName()
    }, o.performValidations = function () {
        o.disabled = (0 != o.hideTwitterTab || 140 != o.twitterCount || r.hasAttachedImage() || r.hasAttachedLink()) && (0 != o.hideFacebookTab || 0 != o.facebookPost.length || r.hasAttachedImage() || r.hasAttachedLink()) ? 0 == o.hideTwitterTab ? o.twitterCount < 0 ? !0 : !1 : o.facebookPost.length > 5e3 && 0 == o.hideFacebookTab ? !0 : !1 : !0
    }, o.submit = function () {
        function t(t, e) {
            h.updatePostsUsingMasterPost(t), o.disabled = !1, 200 === e && (ASMobile.Utils.trackAction("mob.pub.postedit", o), n.$state.go("postdetail", {
                postid: o.postId,
                queuetype: o.queueType
            }))
        }

        o.disabled = !0, r.update().then(function (e) {
            o.submitingDraft ? r.setDraftAsScheduled().then(function (e) {
                t(e.data[0], e.status), h.refreshQueues(["upcomingposts", "pastposts"])
            }, function (t) {
                o.disabled = !1
            }) : o.setToDraft ? r.setScheduledAsDraft().then(function (e) {
                t(e.data, e.status), h.refreshQueues(["drafts"])
            }, function (t) {
                o.disabled = !1
            }) : (o.disabled = !1, t(e.data, e.status))
        }, function (t) {
            o.disabled = !1
        })
    }, o.warnUser = function (t, e) {
        var i = r.getCurrentContext().template.posts.length || 1;
        if (1 == i)e(); else {
            var s = c.confirm({
                title: f.instant("Will Affect {{postcount}} Posts", {postcount: i}),
                template: f.instant(t, {postcount: i}),
                okText: f.instant("Edit {{postcount}} Posts", {postcount: i})
            });
            s.then(function (t) {
                t && e()
            })
        }
    }, o.setTabs = function () {
        o.hideTwitterTab = !0, o.hideFacebookTab = !0, "TwitterPost" == r.currentTab() ? o.hideTwitterTab = !1 : "FacebookPost" == r.currentTab() && (o.hideFacebookTab = !1), o.updateTabUI()
    }, o.ensureCanEditMaster = function () {
        return o.permissionToEditMaster === !1 ? (c.alert({
            title: f.instant("Improper Permissions"),
            template: f.instant("You need to own all properties within master post to edit this content")
        }), !1) : !0
    }, o.showDatePicker = function () {
        o.ensureCanEditMaster() && o.warnUser("Editing the schedule will change it for all {{postcount}} child posts in this set.", o.setDateWithPicker)
    }, o.addCampaigns = function () {
        o.ensureCanEditMaster() && o.warnUser("Editing the campaign will change it for all {{postcount}} child posts in this set.", o.modifyCampaigns)
    }, o.addTags = function () {
        o.ensureCanEditMaster() && o.warnUser("Editing the tags will change them for all {{postcount}} child posts in this set.", o.modifyTags)
    }, o.postOrDraft = function () {
        return r.isDraft() ? "Draft" : "Post"
    }, o.goBack = function () {
        n.$state.go("postdetail", {postid: o.postId, queuetype: o.queueType})
    }, o.initializeController()
}]);
