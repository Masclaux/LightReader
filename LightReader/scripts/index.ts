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
            //Model initialisation
            model = AppModel.Inst();
            model.onDataBaseReady = OnDataBaseReady;

            router = LightReader.core.Router.Inst();

            //temp set baka-tsuki parser
            model.parsers.push(new LightReader.parser.bakaTsuki.Parser());

            //temp set baka-tsuki source
            var s: Source = new Source();
            s.url = "https://www.baka-tsuki.org/";
            s.name = "Baka-Tsuki";
            s.description = "Baka-Tsuki (BT) is a fan translation community that hosts translations for light novels in the Wiki format.";

            model.sources.push(s);

            document.addEventListener('deviceready', onDeviceReady, false);
        }

        function onDeviceReady()
        {
            //Some properties are not set on windows mobile this class fix that
            if (window.cordova.platformId === "windows")
            {
                new FakeCordovaWindows();
            }

            // Handle the Cordova pause and resume events
            document.addEventListener('pause', onPause, false);
            document.addEventListener('resume', onResume, false);
            document.addEventListener('backbutton', onBack, false);

            router.Init("./view");
            router.Add("Home.html", LightReader.view.Home);
            router.Add("List.html", LightReader.view.List);
            router.Add("Detail.html", LightReader.view.Detail);
            router.Add("Read.html", LightReader.view.Read);
            router.Add("Load.html", LightReader.view.Load);

            var assetURL: string = "https://www.baka-tsuki.org/project/images/1/17/Absolute_Duo_Volume_1_Cover.jpg"
            var fileName: string = "Absolute_Duo_Volume_1_Cover.jpg"

            File.Write(assetURL, "images/bakatuski/", fileName, sucess, fail);

            model.InitDataBase();
        }

        function OnDataBaseReady()
        {            
            model.Load();
            if (model.Exist())
            {
                router.Navigate("Home.html");                
            }
            else
            {
                router.Navigate("Load.html", { command: LightReader.view.Load.SOURCE_LIST });
            }
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
        //FastClick initialisation
        FastClick.attach(document.body);

        Application.initialize();
    }
}