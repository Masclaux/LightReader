﻿module LightReader.parser.bakaTsuki
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
            this.chapterParser.onChaptersComplete = this.onChaptersComplete;
        }

        //Download and Parse  all required datas from the source.
        public Parse(returnDatas?: any): void
        {
            //get media list
            this.mediaParser.ParseMedia();
        }

        public onMediaComplete = (res: MediaParser): void =>
        {
            this.onSourceComplete(res.mediaList);
        }

        public onVolumeListComplete = (res: VolumeParser): void =>
        {
            console.info("volume list parsed for : " + res.media.title);
        }

        public onChaptersComplete = (res: ChapterParser): void =>
        {
            console.info("volume list parsed for : " + res.Volume);
        }
    }
} 