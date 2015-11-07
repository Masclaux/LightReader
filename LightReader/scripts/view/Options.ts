module LightReader.view
{
    import core = LightReader.core;

    export class Options implements LightReader.core.iPage
    {
        private router: core.Router = core.Router.Inst();

        private model: AppModel = AppModel.Inst();

        public Ready(element: HTMLElement, options: any): void
        {
            Rivets.bind(element, this);
        }

        public Exit(element: HTMLElement): void
        {
        }

        public OnBack = (event: Event, datas: any): void =>
        {
            this.router.Back();
        }
    }
}