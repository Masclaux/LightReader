var LightReader;
(function (LightReader) {
    var core;
    (function (core) {
        /**
        * Define a route historic state
        */
        var Route = (function () {
            function Route(url, args, inHistory) {
                if (inHistory === void 0) { inHistory = true; }
                this.url = url;
                this.args = args;
                this.inHistory = inHistory;
            }
            return Route;
        })();
        core.Route = Route;
    })(core = LightReader.core || (LightReader.core = {}));
})(LightReader || (LightReader = {}));
//# sourceMappingURL=Route.js.map