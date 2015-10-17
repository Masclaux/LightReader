module LightReader.parser.bakaTsuki
{
    export class ChapterParser implements iChapterParser
    {
        //delegate  call when a chapter is completed
        public onChaptersComplete: any;

        private listUrl: String = "http://baka-tsuki.org";

        public Volume: Volume;

        private chaptersRequest: number = 0;

        private imagesRequest: number = 0;

        private imagesStack: Object;

        //Download and Parse  all required datas from the source.
        public ParseChapters(volume: Volume): void
        {
            console.info("Stating Parsing detail for " + volume.title);

            this.imagesStack = {};

            this.Volume = volume;
            for (var i = 0; i < volume.chapterList.length; i++)
            {
                this.ParseChapter(volume.chapterList[i]);
            }
        }

        //Download and parse a chapter
        public ParseChapter(chapter: Chapter): void
        {
            this.chaptersRequest++;
            Http.Get(this.listUrl + chapter.url, this.OnRequestComplete, this.OnError, chapter);
        }

        private OnRequestComplete = (data: XMLHttpRequest, currentChapter: Chapter): void =>
        {
            console.info("Start Parsing chapter " + currentChapter.title);

            var firstPartNotFound: boolean = false;

            var tempWords: number = 0;
            var page: TextContent = new TextContent();

            var res = $.parseHTML(data.responseText);
            if (res != null)
            {
                var text: JQuery = $(res).find("#mw-content-text").find('h2,h3,p,div.thumb.tright,div.thumb');
                for (var i = 0; i < text.length; i++)
                {
                    var value: HTMLElement = text[i];
                    switch (value.nodeName.toUpperCase())
                    {
                        case 'H2':
                            page.content += "<h2>" + value.firstChild.textContent + "</h2>";
                            break;

                        case 'H3':
                            if (currentChapter.pages.length > 0)
                            {
                                currentChapter.pages.push(page);
                                page = new TextContent();

                                tempWords = 0;
                            }

                            page.content += "<h3>" + value.firstChild.textContent + "</h3>";
                            break;

                        case 'P':
                            page.content += "<P>" + value.firstChild.textContent + "</P>";
                            break;

                        case 'DIV':

                            this.imagesRequest++;

                            var image: ImageContent = new ImageContent();
                            image.title = ImageHelper.GetImageName(value);

                            var filename = image.title.replace(/^.*[\\\/]/, '');

                            if (this.imagesStack[image.title] == null)
                            {
                                this.imagesStack[image.title] = new Array<ImageContent>();
                            }

                            this.imagesStack[image.title].push(image);
                            currentChapter.pages.push(image);

                            ImageHelper.GetImageLink(image.title, this.OnImageComplete, this.OnImageError, image);
                            break;
                    }

                    tempWords += value.firstChild.textContent.split(" ").length;
                    if (tempWords >= 350)
                    {
                        currentChapter.pages.push(page);

                        var page: TextContent = new TextContent();
                        tempWords = 0;
                    }
                }
            }

            this.chaptersRequest--;
            this.checkComplete();
        }

        private OnError = (ev: Event): void =>
        {
            console.error("Invalid Chapter");
            this.chaptersRequest--;
            this.checkComplete();
        }

        private OnImageComplete = (image: ImageContent): void =>
        {
            console.info("Found try to download it " + image.url);
            ImageHelper.DownloadImage(image, this.OnImageDownloaded, this.OnImageError);
        }

        private OnImageDownloaded = (image: string): void =>
        {
            console.info("Image downloaded " + image);
            if (this.imagesStack)
            {
                //get image name
                var filename = image.replace(/^.*[\\\/]/, '');
                for (var i: number = 0; i < this.imagesStack[filename].length; i++)
                {
                    this.imagesStack[filename][i].localUrl = image;
                    this.imagesStack[filename][i].isLocal = true;

                    this.imagesRequest--;
                }

                this.imagesStack[filename] = [];
            }

            this.checkComplete();
        }

        private OnImageError = (ev: Event): void =>
        {
            console.warn("Invalid image");

            this.imagesRequest--;
            this.checkComplete();
        }

        private checkComplete(): void
        {
            if (this.chaptersRequest <= 0 && this.imagesRequest <= 0)
            {
                if (this.onChaptersComplete)
                {
                    this.onChaptersComplete(this);
                }
            }
        }
    }
} 