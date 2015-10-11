var LightReader;
(function (LightReader) {
    var view;
    (function (view) {
        var core = LightReader.core;
        var Load = (function () {
            function Load() {
                var _this = this;
                this.router = core.Router.Inst();
                this.model = LightReader.AppModel.Inst();
                this.OnSourceComplete = function (media, index) {
                    if (index === void 0) { index = 0; }
                    _this.model.sources[index].novelList = media;
                    _this.model.Save();
                    _this.router.Navigate("Home.html");
                };
            }
            Load.prototype.Ready = function (element, options) {
                ko.applyBindings(this, element);
                switch (options.command) {
                    case Load.SOURCE_LIST:
                        this.LoadList(options.id);
                        break;
                }
            };
            Load.prototype.Exit = function (element) {
                //clean binding ( I know is not recommended )
                ko.cleanNode(element);
            };
            Load.prototype.LoadList = function (id) {
                console.info("Load media list for all sources");
                var sources = this.model.parsers;
                for (var i = 0; i < sources.length; i++) {
                    sources[i].onSourceComplete = this.OnSourceComplete;
                    sources[i].Parse();
                }
            };
            Load.SOURCE_LIST = "souce_list_update";
            return Load;
        })();
        view.Load = Load;
    })(view = LightReader.view || (LightReader.view = {}));
})(LightReader || (LightReader = {}));
//# sourceMappingURL=Load.js.map