module LightReader.view
{
    import core = LightReader.core;

    export class Detail implements LightReader.core.iPage
    {
        private router: core.Router = core.Router.Inst();

        private media: Media;

        private illustration: string;

        public Ready(element: HTMLElement, options: any): void
        {
            //restore get method ( lost in database javascript is definitly not Object oriented)
            this.media = options.media;
            this.illustration = ModelHelper.Get(this.media.illustration);

            Rivets.bind(element, this);
        }

        public Exit(element: HTMLElement): void
        {
        }

        public OnVolumeSelected = (event: Event, datas: any): void =>
        {
            var volume: Volume = this.media.volumeList[datas.index]
            if (volume.lastUpdate == null || volume.chapterList.length == 0)
            {
                this.router.Navigate("Load.html", { command: LightReader.view.Load.VOLUME, datas: volume }, false);
            }
            else
            {
                this.router.Navigate("Read.html", volume);
            }
        }

        public OnBack = (event: Event, datas: any): void =>
        {
            this.router.Back();
        }
    }
}