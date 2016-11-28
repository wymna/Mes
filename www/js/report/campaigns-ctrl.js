angular.module("mes").controller("CampaignsCtrl", ["$scope", "CampaignsService", "CallbackService", "$location", function (e, t, a, l) {
    var o = a.getCallback(l.url()), i = o.getParams(), n = "filter" == i.purpose, c = {
        title: "Campaigns",
        left_action: function () {
            o.reject()
        },
        right_action: function () {
            e.list_picker_options.submitSelected()
        }
    };
    cordova.plugins.Keyboard && cordova.plugins.Keyboard.close(), e.onSwipeDown = function () {
        cordova.plugins.Keyboard.close()
    }, e.list_picker_options = {
        header: c,
        recent_items_label: "Recent Campaigns",
        all_items_label: "All Campaigns",
        single_select: i.singleSelect,
        filter: n,
        onSubmit: function (e) {
            o.resolve(e)
        },
        loadData: function (a) {
            t.search(a).then(function (t) {
                var a = t.data;
                _.each(a, function (e) {
                    _.contains(i.selected.map(String), e.id + "") && (e.selected = !0)
                }), e.list_picker_options.setItems(t.data), e.$broadcast("scroll.refreshComplete")
            })
        }
    }
}]);
