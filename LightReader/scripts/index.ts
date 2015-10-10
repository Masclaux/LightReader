module LightReader
{
    "use strict";

    export module Application
    {
        //application model reference contain the list of datas sources
        export var model: AppModel;

        export var router: LightReader.core.Router;

        export function initialize()
        {
            document.addEventListener('deviceready', onDeviceReady, false);

            //Model initialisation
            model = AppModel.Inst();
            router = LightReader.core.Router.Inst();
        }

        function onDeviceReady()
        {
            //Some properties are not set on windows mobile this class fix that
            if (window.cordova.platformId === "windows")
            {
                new FakeCordovaWindows();
            }

            var b: LightReader.parser.bakaTsuki.Parser;
            b = new LightReader.parser.bakaTsuki.Parser();
            // b.Parse();

            var s: Source = new Source();
            s.name = "Baka-Tsuki";
            s.description = "Light Novel commmunity";

            model.sources.push(s);

            // Handle the Cordova pause and resume events
            document.addEventListener('pause', onPause, false);
            document.addEventListener('resume', onResume, false);
            document.addEventListener('backbutton', onBack, false);

            router.Init("./view");
            router.Add("Home.html", LightReader.view.Home);
            router.Add("List.html", LightReader.view.List);
            router.Add("Detail.html", LightReader.view.Detail);
            router.Add("Read.html", LightReader.view.Read);

            router.Navigate("Home.html", { id: 2, libelle: "test 2" });

            var assetURL: string = "https://www.baka-tsuki.org/project/images/1/17/Absolute_Duo_Volume_1_Cover.jpg"
            var fileName: string = "Absolute_Duo_Volume_1_Cover.jpg"

            File.Write(assetURL, "images/bakatuski/", fileName, sucess, fail);

            model.InitDataBase();
        }

        function sucess(url: string): void
        {
            console.info(url);
        }

        function fail(error: FileTransferError): void
        {
            console.error(error.exception);
        }

        function onPause() { }

        function onResume() { }

        function onBack()
        {
            router.Back();
        }
    }

    window.onload = function ()
    {
        Application.initialize();
    }
}