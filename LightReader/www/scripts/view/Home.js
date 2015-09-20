var LightReader;
(function (LightReader) {
    var view;
    (function (view) {
        var core = LightReader.core;
        var Home = (function () {
            function Home() {
                this.router = core.Router.Inst();
                console.log("oo");
            }
            Home.prototype.Ready = function (element, options) {
                //this.router.Navigate("List.html");
                console.log("Coucou : " + options.id + " libelle " + options.libelle);
            };
            return Home;
        })();
        view.Home = Home;
    })(view = LightReader.view || (LightReader.view = {}));
})(LightReader || (LightReader = {}));
//# sourceMappingURL=Home.js.map