module LightReader.view
{
    export class List implements LightReader.core.iPage
    {
        private router: core.Router = core.Router.Inst();

        private source: Source;

        private title: KnockoutObservable<String>;
        private mediaList: KnockoutObservableArray<Media>;

        constructor() { }

        public Ready(element: HTMLElement, options: any): void
        {
            this.source = options;

            //data binding
            this.mediaList = ko.observableArray(this.source.novelList);
            this.title = ko.observable<String>(this.source.name);

            ko.applyBindings(this, element);
        }

        public Exit(element: HTMLElement): void
        {
            //clean binding ( I know is not recommended )
            ko.cleanNode(element);
        }

        public OnMediaSelected = (media: Media): void =>
        {
            if (media.lastUpdate == null || media.volumeList.length == 0)
            {
                this.router.Navigate("Load.html", { command: LightReader.view.Load.MEDIA, datas: media });
            }
            else
            {
                this.router.Navigate("Detail.html", media);
            }
        }
    }
}