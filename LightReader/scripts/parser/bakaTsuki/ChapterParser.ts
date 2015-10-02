﻿module LightReader.parser.bakaTsuki
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

            var firstPartNotFound:boolean = false;
            
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
                            page.content  += "<P>" + value.firstChild.textContent + "</P>";
                            break;

                        case 'DIV':
                            var image: ImageContent = new ImageContent();
                            image.url = this.parseImage(value);
                            currentChapter.pages.push(image);
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
        }
          
        //Get image name from url.
        public parseImage(link): string
        {
            var fileUrl: string = "";
            if (link != null)
            {
                var url = $(link).find("a.image").attr('href');
                if (url != null)
                {
                    var splitUrl = url.split(","); // in read 
                    if (splitUrl.length > 0)
                    {
                        splitUrl = splitUrl[0].split("/");
                        for (var c in splitUrl)
                        {
                            if (splitUrl[c] != "thumb")
                            {
                                if (splitUrl[c].indexOf(".") != -1) //we found the file ? 
                                {
                                    var finalUrl = splitUrl[c].split("File:"); //get only page name
                                    if (finalUrl.length > 0)
                                    {
                                        fileUrl = finalUrl[1];//right part
                                    }
                                    break; // yes so we quit the loop
                                }
                            }
                        }
                    }
                }
            }

            console.info("Found ImageContent : " + fileUrl);

            return fileUrl;
        }


        private OnError = (ev: Event): void =>
        {
            console.error("Invalid html");
        }
    }
} 