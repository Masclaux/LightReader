var LightReader;
(function (LightReader) {
    var view;
    (function (view) {
        var core = LightReader.core;
        var Home = (function () {
            function Home() {
                this.router = core.Router.Inst();
                this.model = LightReader.AppModel.Inst();
            }
            Home.prototype.Ready = function (element, options) {
                //data binding
                this.sources = ko.observableArray(this.model.sources);
                ko.applyBindings(this, element);
            };
            Home.prototype.Exit = function (element) {
                //clean binding ( I now is not recommended )
                ko.cleanNode(element);
            };
            Home.prototype.OnSourceSelected = function (source) {
                console.info("lol");
            };
            return Home;
        })();
        view.Home = Home;
    })(view = LightReader.view || (LightReader.view = {}));
})(LightReader || (LightReader = {}));
//# sourceMappingURL=Home.js.map