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

        //Download and Parse  all required datas from the source.
        public parse(): void
        {
            if (this.onSourceComplete)
            {
                this.onSourceComplete(new Source());
            }
        }
    }
} 