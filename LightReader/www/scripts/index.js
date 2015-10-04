var LightReader;
(function (LightReader) {
    "use strict";
    var Application;
    (function (Application) {
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
            // b.Parse();
            var s = new LightReader.Source();
            s.name = "Baka-Tsuki";
            s.description = "Light Novel commmunity";
            Application.model.sources.push(s);
            // Handle the Cordova pause and resume events
            document.addEventListener('pause', onPause, false);
            document.addEventListener('resume', onResume, false);
            document.addEventListener('backbutton', onBack, false);
            Application.router.Init("./view");
            Application.router.Add("Home.html", LightReader.view.Home);
            Application.router.Add("List.html", LightReader.view.List);
            Application.router.Add("Detail.html", LightReader.view.Detail);
            Application.router.Add("Read.html", LightReader.view.Read);
            Application.router.Navigate("Home.html", { id: 2, libelle: "test 2" });
            var assetURL = "https://www.baka-tsuki.org/project/images/1/17/Absolute_Duo_Volume_1_Cover.jpg";
            var fileName = "Absolute_Duo_Volume_1_Cover.jpg";
            LightReader.Http.WriteFile(assetURL, "images/bakatuski/", fileName, sucess, fail);
        }
        function sucess(url) {
            console.info(url);
        }
        function fail(error) {
            console.error(error.exception);
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