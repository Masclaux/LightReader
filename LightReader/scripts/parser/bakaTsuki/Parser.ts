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
        }

        //Download and Parse  all required datas from the source.
        public Parse(): void
        {
            //get media list
            this.mediaParser.ParseMedia();
        }

        public onMediaComplete(res: MediaParser): void
        {
            console.info("Test" + res.mediaList);
        }
    }
} 