module LightReader.view
{
    import core = LightReader.core;

    export class Load implements LightReader.core.iPage
    {
        public static SOURCE_LIST: string = "souce_list_update";
        public static MEDIA: string = "media_list_update";
        public static VOLUME: string = "volume_list_update";

        private router: core.Router = core.Router.Inst();

        private model: AppModel = AppModel.Inst();

        public Ready(element: HTMLElement, options: any): void
        {
            switch (options.command)
            {
                case Load.SOURCE_LIST:
                    this.LoadList(options.id)
                    break;
                case Load.MEDIA:
                    this.LoadMedia(options.datas)
                    break;
                case Load.VOLUME:
                    this.LoadVolume(options.datas)
                    break;
            }
        }

        public Exit(element: HTMLElement): void
        {
        }

        private LoadList(id: number): void
        {
            console.info("Load media list for all sources");

            var sources: Array<LightReader.parser.iParser> = this.model.parsers;
            for (var i: number = 0; i < sources.length; i++)
            {
                sources[i].onSourceComplete = this.OnSourceComplete;
                sources[i].Parse();
            }
        }

        private OnSourceComplete = (media: Array<Media>, index: number = 0): void =>
        {
            var app: AppModel = this.model;

            this.model.sources[index].novelList = media;
            this.model.Save();

            this.router.Navigate("Home.html");
        }

        private LoadMedia(media: Media): void
        {
            console.info("Load media and volume list");

            var sources: LightReader.parser.iParser = this.model.parsers[this.model.currrentSource];
            sources.volumeParser.onVolumeListComplete = this.onVolumeListComplete;
            sources.volumeParser.parseVolume(media);
        }

        private onVolumeListComplete = (media: LightReader.parser.iVolumeParser): void =>
        {
            media.media.lastUpdate = new Date();

            this.model.Save();
            this.router.Navigate("Detail.html", { media: media.media });
        }

        private LoadVolume(volume: Volume): void
        {
            console.info("Load volume");

            var sources: LightReader.parser.iParser = this.model.parsers[this.model.currrentSource];
            sources.chapterParser.onChaptersComplete = this.onVolumeComplete;
            sources.chapterParser.ParseChapters(volume);
        }

        private onVolumeComplete = (media: LightReader.parser.iChapterParser): void =>
        {
            media.Volume.lastUpdate = new Date();

            this.model.Save();
            this.router.Navigate("Read.html", { media: media.Volume });
        }
    }
}