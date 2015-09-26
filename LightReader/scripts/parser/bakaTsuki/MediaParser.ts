module LightReader.parser.bakaTsuki
{
    export class MediaParser implements iMediaParser
    {
        public mediaList: Array<Media> = new Array<Media>();

        //delegate  call when medias parsing is completed
        onMediaComplete: any;

        //Download and Parse  all required datas from the source.
        public ParseMedia(): void
        {
            var listUrl =
                "http://baka-tsuki.org/project/index.php?title=Category:Light_novel_(English)";

            Http.Get(listUrl, this.OnRequestComplete, this.OnError);
        }

        private OnRequestComplete = (data: XMLHttpRequest): void =>
        {
            console.info("Start parsing light novel list");

            var htmlDoc: DOMParser = new DOMParser();

            var res: Document = htmlDoc.parseFromString(data.responseText, "text/xml");
            if (res != null)
            {
                var cellules: NodeList = res.querySelectorAll(".mw-content-ltr ul li a");
                for (var i = 0; i < cellules.length; ++i)
                {
                    var novel = new Media();
                    var aRef: Node = cellules[i];

                    novel.title = aRef.attributes.getNamedItem("title").value;
                    novel.url = aRef.attributes.getNamedItem("href").value;

                    console.log("Found : " + novel.title + " - " + novel.url);

                    this.mediaList.push(novel);
                }
            }

            if (this.onMediaComplete != null)
            {
                this.onMediaComplete(this);
            }
        }

        private OnError = (ev: Event): void =>
        {
            console.error("Error on Parse Media " + ev.type);
        }
    }
} 