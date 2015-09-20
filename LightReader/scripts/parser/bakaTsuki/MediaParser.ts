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

            var request = $.ajax({
                type: "GET",
                url: listUrl,
            });

            request.done((res) => this.OnRequestComplete(res));
            request.fail((req, er) => this.OnError(req, er));
        }

        private OnRequestComplete(data: any): void
        {
            console.info("Start parsing light novel list");

            var res = $.parseHTML(data);
            if (res != null)
            {
                var table = $(res).find(".mw-content-ltr ul li");
                $.each(table, (index, value) =>
                {
                    var novel = new Media();
                    var aRef: JQuery = $(value).find("a");

                    novel.title = aRef.attr("title");
                    novel.url = aRef.attr("href");

                    console.log("Found : " + novel.title + " - " + novel.url);

                    this.mediaList.push(novel);
                });
            }

            if (this.onMediaComplete != null)
            {
                this.onMediaComplete(this);
            }
        }

        private OnError(xmlHttpRequest: any, textStatus: any): void
        {
            console.error("Error on Parse Media " + textStatus);
        }
    }
} 