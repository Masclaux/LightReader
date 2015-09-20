module LightReader.view
{
    import core = LightReader.core;

    export class Home implements LightReader.core.iPage
    {
        private router: core.Router = core.Router.Inst();

        constructor()
        {
            console.log("oo");
        }

        public Ready(element: HTMLElement, options: any): void
        {
            //this.router.Navigate("List.html");
            console.log("Coucou : " + options.id + " libelle " + options.libelle);
        }
    }
}