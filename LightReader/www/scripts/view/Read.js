var LightReader;
(function (LightReader) {
    var view;
    (function (view) {
        var core = LightReader.core;
        var Read = (function () {
            function Read() {
                this.router = core.Router.Inst();
            }
            Read.prototype.Ready = function (element, options) {
                this.volume = options;
            };
            Read.prototype.Exit = function (element) {
            };
            return Read;
        })();
        view.Read = Read;
    })(view = LightReader.view || (LightReader.view = {}));
})(LightReader || (LightReader = {}));
//# sourceMappingURL=Read.js.map