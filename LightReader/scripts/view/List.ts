module LightReader.view
{
    export class List implements LightReader.core.iPage
    {
        private router: core.Router = core.Router.Inst();

        private source: Source;

        constructor() { }

        public Ready(element: HTMLElement, options: any): void
        {
            this.source = options;
            Rivets.bind(element, this);

            MenuPopOver.Init();
        }

        public Exit(element: HTMLElement): void
        {
            MenuPopOver.Destroy();
        }

        public OnMediaSelected = (event: Event, datas: any): void =>
        {
            var media: Media = this.source.novelList[datas.index];
            if (media.lastUpdate == null || media.volumeList.length == 0)
            {
                this.router.Navigate("Load.html", { command: LightReader.view.Load.MEDIA, datas: media }, false);
            }
            else
            {
                this.router.Navigate("Detail.html", { media: media });
            }
        }

        public OnBack = (event: Event, datas: any): void =>
        {
            this.router.Back();
        }
    }
}