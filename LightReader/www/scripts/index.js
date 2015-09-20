var LightReader;
(function (LightReader) {
    "use strict";
    var Application;
    (function (Application) {
        //application model reference contain the list of datas sources
        Application.model;
        Application.router;
        function initialize() {
            document.addEventListener('deviceready', onDeviceReady, false);
            //Model initialisation
            Application.model = LightReader.AppModel.Inst();
            Application.router = LightReader.core.Router.Inst();
        }
        Application.initialize = initialize;
        function onDeviceReady() {
            var b;
            b = new LightReader.parser.bakaTsuki.Parser();
            b.Parse();
            var s = new LightReader.Source();
            s.name = "Baka-Tsuki";
            s.description = "Light Novel commmunity";
            Application.model.sources.push(s);
            Application.model.sources.push(s);
            // Handle the Cordova pause and resume events
            document.addEventListener('pause', onPause, false);
            document.addEventListener('resume', onResume, false);
            document.addEventListener('backbutton', onBack, false);
            Application.router.Init("./view");
            Application.router.Add("Home.html", LightReader.view.Home);
            Application.router.Add("List.html", LightReader.view.List);
            Application.router.Navigate("Home.html", { id: 1, libelle: "test" });
            Application.router.Navigate("List.html", { id: 1, libelle: "test 1" });
            Application.router.Navigate("Home.html", { id: 2, libelle: "test 2" });
        }
        function onPause() { }
        function onResume() { }
        function onBack() {
            Application.router.Back();
        }
    })(Application = LightReader.Application || (LightReader.Application = {}));
    window.onload = function () {
        Application.initialize();
    };
})(LightReader || (LightReader = {}));
//# sourceMappingURL=index.js.map