var LightReader;
(function (LightReader) {
    var core;
    (function (core) {
        var Route = (function () {
            function Route(url, args) {
                this.url = url;
                this.args = args;
            }
            return Route;
        })();
        core.Route = Route;
    })(core = LightReader.core || (LightReader.core = {}));
})(LightReader || (LightReader = {}));
//# sourceMappingURL=Route.js.map