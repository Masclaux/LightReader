module LightReader.parser.bakaTsuki
{
    export class ChapterParser implements iChapterParser
    {
        private listUrl: String = "http://baka-tsuki.org";

        public Volume: Volume;

        //Download and Parse  all required datas from the source.
        public ParseChapters(volume: Volume): void
        {
            console.info("Stating Parsing detail for " + volume.title);

            this.Volume = volume;
            for (var i = 0; i < volume.chapterList.length; i++)
            {
                this.ParseChapter(volume.chapterList[i]);
            }

        }

        //Download and parse a chapter 
        public ParseChapter(chapter: Chapter):void 
        {
            Http.Get(this.listUrl + chapter.url, this.OnRequestComplete, this.OnError, chapter); 
        }

        private OnRequestComplete = (data: XMLHttpRequest, currentChapter: Chapter): void =>
        {
            console.info("Start Parsing chapter " + currentChapter.title);            
        }

        private OnError = (ev: Event): void =>
        {
            console.error("Invalid html");
        }

    }
} 