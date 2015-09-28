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
            var b: LightReader.parser.bakaTsuki.Parser;
            b = new LightReader.parser.bakaTsuki.Parser();

            b.Parse();

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

            router.Navigate("Home.html", { id: 1, libelle: "test" });
            router.Navigate("List.html", { id: 1, libelle: "test 1" });
            router.Navigate("Home.html", { id: 2, libelle: "test 2" });
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