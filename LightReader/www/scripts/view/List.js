var LightReader;
(function (LightReader) {
    var view;
    (function (view) {
        var List = (function () {
            function List() {
                var _this = this;
                this.router = LightReader.core.Router.Inst();
                this.OnMediaSelected = function (event, datas) {
                    var media = _this.source.novelList[datas.index];
                    if (media.lastUpdate == null || media.volumeList.length == 0) {
                        _this.router.Navigate("Load.html", { command: LightReader.view.Load.MEDIA, datas: media }, false);
                    }
                    else {
                        _this.router.Navigate("Detail.html", { media: media });
                    }
                };
                this.OnBack = function (event, datas) {
                    _this.router.Back();
                };
            }
            List.prototype.Ready = function (element, options) {
                this.source = options;
                Rivets.bind(element, this);
                LightReader.MenuPopOver.Init();
            };
            List.prototype.Exit = function (element) {
                LightReader.MenuPopOver.Destroy();
            };
            return List;
        })();
        view.List = List;
    })(view = LightReader.view || (LightReader.view = {}));
})(LightReader || (LightReader = {}));
//# sourceMappingURL=List.js.map