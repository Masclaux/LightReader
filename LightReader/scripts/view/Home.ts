module LightReader.view
{
    import core = LightReader.core;

    export class Home implements LightReader.core.iPage
    {
        private router: core.Router = core.Router.Inst();

        private model: AppModel = AppModel.Inst();

        public Ready(element: HTMLElement, options: any): void
        {
            Rivets.bind(element, this);

            var menu: any = $('#menu');
            menu.webuiPopover({ title: 'Menu', width: '300', content: AppModel.menuContent, placement: 'bottom-left' });
        }

        public Exit(element: HTMLElement): void
        {
        }

        public OnSourceSelected = (event: Event, datas: any): void =>
        {
            this.model.currrentSource = datas.index;
            this.router.Navigate("List.html", datas.source);
        }
    }
}