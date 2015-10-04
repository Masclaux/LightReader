var LightReader;
(function (LightReader) {
    var view;
    (function (view) {
        var core = LightReader.core;
        var Detail = (function () {
            function Detail() {
                this.router = core.Router.Inst();
                this.model = LightReader.AppModel.Inst();
            }
            Detail.prototype.Ready = function (element, options) {
                ko.applyBindings(this, element);
            };
            Detail.prototype.Exit = function (element) {
                //clean binding ( I know is not recommended )
                ko.cleanNode(element);
            };
            return Detail;
        })();
        view.Detail = Detail;
    })(view = LightReader.view || (LightReader.view = {}));
})(LightReader || (LightReader = {}));
//# sourceMappingURL=Detail.js.map