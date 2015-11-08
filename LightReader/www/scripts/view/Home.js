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
                this.OnSourceSelected = function (event, datas) {
                    _this.model.currrentSource = datas.index;
                    _this.router.Navigate("List.html", datas.source);
                };
            }
            Home.prototype.Ready = function (element, options) {
                Rivets.bind(element, this);
                LightReader.MenuPopOver.Init();
            };
            Home.prototype.Exit = function (element) {
                LightReader.MenuPopOver.Destroy();
            };
            return Home;
        })();
        view.Home = Home;
    })(view = LightReader.view || (LightReader.view = {}));
})(LightReader || (LightReader = {}));
//# sourceMappingURL=Home.js.map