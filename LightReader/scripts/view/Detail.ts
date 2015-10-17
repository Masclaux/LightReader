module LightReader.view
{
    import core = LightReader.core;

    export class Detail implements LightReader.core.iPage
    {
        private router: core.Router = core.Router.Inst();

        private media: Media;

        private title: KnockoutObservable<String>;

        private synopsis: KnockoutObservable<String>;

        private url: KnockoutObservable<String>;

        private lastUpdate: KnockoutObservable<String>;

        private illustration: KnockoutObservable<String>;

        private volumeList: KnockoutObservableArray<Volume>;


        public Ready(element: HTMLElement, options: any): void
        {
            this.media = options.media;

            this.title = ko.observable<String>(this.media.title);
            this.url = ko.observable<String>(this.media.url);
            this.synopsis = ko.observable<String>(this.media.synopsis);
            this.illustration = ko.observable<String>(this.media.illustration.Get());
            this.lastUpdate = ko.observable<String>(this.media.lastUpdate.toString());
            this.title = ko.observable<String>(this.media.title);

            this.volumeList = ko.observableArray(this.media.volumeList);

            ko.applyBindings(this, element);            
        }

        public Exit(element: HTMLElement): void
        {
            //clean binding ( I know is not recommended )
            ko.cleanNode(element);
        }

        public OnVolumeSelected = (volume: Volume): void =>
        {
            if (volume.lastUpdate == null || volume.chapterList.length == 0)
            {
                this.router.Navigate("Load.html", { command: LightReader.view.Load.VOLUME, datas: volume });
            }
            else
            {
                this.router.Navigate("Read.html", volume);
            }
        }
    }
}