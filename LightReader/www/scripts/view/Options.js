var LightReader;
(function (LightReader) {
    var view;
    (function (view) {
        var core = LightReader.core;
        var Options = (function () {
            function Options() {
                var _this = this;
                this.router = core.Router.Inst();
                this.model = LightReader.AppModel.Inst();
                this.OnBack = function (event, datas) {
                    _this.router.Back();
                };
            }
            Options.prototype.Ready = function (element, options) {
                Rivets.bind(element, this);
            };
            Options.prototype.Exit = function (element) {
            };
            return Options;
        })();
        view.Options = Options;
    })(view = LightReader.view || (LightReader.view = {}));
})(LightReader || (LightReader = {}));
//# sourceMappingURL=Options.js.map