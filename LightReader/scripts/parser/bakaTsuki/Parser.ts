module LightReader.parser.bakaTsuki
{
    export class Parser implements iParser
    {
        public source: Source = new Source();

        //delegate  call when source parsing is completed
        onSourceComplete: any;

        //Parse Media detail
        public mediaParser: MediaParser = new MediaParser();

        //Parse volume detail
        public volumeParser: VolumeParser = new VolumeParser();

        //Parse chapter detail
        public chapterParser: ChapterParser = new ChapterParser();

        constructor()
        {
            this.mediaParser.onMediaComplete = this.onMediaComplete;
            this.volumeParser.onVolumeListComplete = this.onVolumeListComplete;
        }

        //Download and Parse  all required datas from the source.
        public Parse(): void
        {
            //get media list
            this.mediaParser.ParseMedia();
        }

        public onMediaComplete = (res: MediaParser): void =>
        {
            this.source.novelList = res.mediaList;
            this.volumeParser.parseVolume(res.mediaList[0]);
        }

        public onVolumeListComplete = (res: VolumeParser): void =>
        {
            console.info("volume list parsed for : " + res.media.title);
        }
    }
} 