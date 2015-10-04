var LightReader;
(function (LightReader) {
    var view;
    (function (view) {
        var core = LightReader.core;
        var Home = (function () {
            function Home() {
                var _this = this;
                this.router = core.Router.Inst();
                this.model = LightReader.AppModel.Inst();
                this.OnSourceSelected = function (source) {
                    _this.router.Navigate("List.html", source);
                };
            }
            Home.prototype.Ready = function (element, options) {
                //data binding
                this.sources = ko.observableArray(this.model.sources);
                ko.applyBindings(this, element);
            };
            Home.prototype.Exit = function (element) {
                //clean binding ( I know is not recommended )
                ko.cleanNode(element);
            };
            return Home;
        })();
        view.Home = Home;
    })(view = LightReader.view || (LightReader.view = {}));
})(LightReader || (LightReader = {}));
//# sourceMappingURL=Home.js.map