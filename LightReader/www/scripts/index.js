var LightReader;
(function (LightReader) {
    "use strict";
    var Application;
    (function (Application) {
        function initialize() {
            //Model initialisation
            Application.model = LightReader.AppModel.Inst();
            Application.model.onDataBaseReady = OnDataBaseReady;
            Application.router = LightReader.core.Router.Inst();
            //temp set baka-tsuki parser
            Application.model.parsers.push(new LightReader.parser.bakaTsuki.Parser());
            //temp set baka-tsuki source
            var s = new LightReader.Source();
            s.url = "https://www.baka-tsuki.org/";
            s.name = "Baka-Tsuki";
            s.description = "Baka-Tsuki (BT) is a fan translation community that hosts translations for light novels in the Wiki format.";
            Application.model.sources.push(s);
            document.addEventListener('deviceready', onDeviceReady, false);
        }
        Application.initialize = initialize;
        function onDeviceReady() {
            //Some properties are not set on windows mobile this class fix that
            if (window.cordova.platformId === "windows") {
                new LightReader.FakeCordovaWindows();
            }
            // Handle the Cordova pause and resume events
            document.addEventListener('pause', onPause, false);
            document.addEventListener('resume', onResume, false);
            document.addEventListener('backbutton', onBack, false);
            Application.router.Init("./view");
            Application.router.Add("Home.html", LightReader.view.Home);
            Application.router.Add("List.html", LightReader.view.List);
            Application.router.Add("Detail.html", LightReader.view.Detail);
            Application.router.Add("Read.html", LightReader.view.Read);
            Application.router.Add("Load.html", LightReader.view.Load);
            var assetURL = "https://www.baka-tsuki.org/project/images/1/17/Absolute_Duo_Volume_1_Cover.jpg";
            var fileName = "Absolute_Duo_Volume_1_Cover.jpg";
            LightReader.File.Write(assetURL, "images/bakatuski/", fileName, sucess, fail);
            Application.model.InitDataBase();
        }
        function OnDataBaseReady() {
            Application.model.Load();
            if (Application.model.Exist()) {
                Application.router.Navigate("Home.html");
            }
            else {
                Application.router.Navigate("Load.html", { command: LightReader.view.Load.SOURCE_LIST });
            }
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