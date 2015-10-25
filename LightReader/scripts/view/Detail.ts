module LightReader.view
{
    import core = LightReader.core;

    export class Detail implements LightReader.core.iPage
    {
        private router: core.Router = core.Router.Inst();

        private media: Media;

        public Ready(element: HTMLElement, options: any): void
        {
            //restore get method ( lost in database javascript is definitly not Object oriented)
            options.media.illustration.Get = ImageContent.prototype.Get;
            this.media = options.media;

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
    }
}