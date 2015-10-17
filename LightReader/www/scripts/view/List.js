var LightReader;
(function (LightReader) {
    var view;
    (function (view) {
        var List = (function () {
            function List() {
                var _this = this;
                this.router = LightReader.core.Router.Inst();
                this.OnMediaSelected = function (media) {
                    if (media.lastUpdate == null || media.volumeList.length == 0) {
                        _this.router.Navigate("Load.html", { command: LightReader.view.Load.MEDIA, datas: media });
                    }
                    else {
                        _this.router.Navigate("Detail.html", media);
                    }
                };
            }
            List.prototype.Ready = function (element, options) {
                this.source = options;
                //data binding
                this.mediaList = ko.observableArray(this.source.novelList);
                this.title = ko.observable(this.source.name);
                ko.applyBindings(this, element);
            };
            List.prototype.Exit = function (element) {
                //clean binding ( I know is not recommended )
                ko.cleanNode(element);
            };
            return List;
        })();
        view.List = List;
    })(view = LightReader.view || (LightReader.view = {}));
})(LightReader || (LightReader = {}));
//# sourceMappingURL=List.js.map