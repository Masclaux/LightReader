module LightReader.parser.bakaTsuki
{
    export class VolumeParser implements iVolumeParser
    {
        //delegate  call when volume parsing is completed
        public onVolumeListComplete: any;

        public media: Media;

        public parseVolume(media: Media): void
        {
            this.media = media;

            console.info("Stating Parsing detail for " + media.title);

            Http.Get("http://baka-tsuki.org" + media.url, this.OnRequestComplete, this.OnError);
        }

        private OnRequestComplete = (data: XMLHttpRequest): void =>
        {
            var htmlDoc: DOMParser = new DOMParser();

            var res: Document = htmlDoc.parseFromString(data.responseText, "text/xml");
            if (res != null)
            {
                this.media.synopsis = this.GetSynopsis(res);
                this.media.illustration = this.GetIllustation(res);
                this.media.volumeList = this.GetVolumeList(res);
            }
            else
            {
                console.error("Invalid html");
            }

            if (this.onVolumeListComplete)
            {
                this.onVolumeListComplete(this);
            }
        }

        private OnError = (ev: Event): void =>
        {
            console.error("Invalid html");
        }

        /**
        * return  synopsis from class #Story_Synopsis
        * if not found return the content of the first <p>
        */
        private GetSynopsis(doc: Document): string
        {
            //get synoptis
            var synopsis: Node = doc.querySelector("#Story_Synopsis");
            if (synopsis != null)
            {
                var synopsis = synopsis.parentNode;
                for (var i = 0; i < 10; i++) //max 10 try to find the synopsis
                {
                    if (synopsis.nodeName == "p")
                    {
                        return synopsis.textContent;
                    }

                    synopsis = synopsis.nextSibling;
                }
            }

            return "";
        }

        /**
        * return  an illustration for the current media
        * if not found return null
        */
        private GetIllustation(doc: Document): Image
        {
            var res: Image = null;

            //get first image
            var images: NodeList = doc.getElementsByClassName("thumbinner");
            if (images != null && images.length > 0)
            {
                var image: Element = <Element>images[0];
                var alist: NodeList = image.querySelectorAll("a");

                if (alist != null && alist.length > 0)
                {
                    var a: Element = <Element>alist[0];

                    res = new Image();
                    res.title = image.textContent;
                    res.url = a.getAttribute("href");
                }
            }

            return res;
        }

        /**
        * Return all volume found in the current document
        */
        private GetVolumeList(doc: Document): Volume[]
        {
            var res: Volume[] = [];

            var currentVolumeTitle: string = "";
            var currentVolumeUrl: string = "";
            var currentNovelVolume: Volume = new Volume();

            var foundH2: boolean = false;
            var canParse: boolean = false;
            var firstPass: boolean = false;

            var synopsis: Node = doc.querySelector("#mw-content-text");

            for (var i = 0; i < synopsis.childNodes.length; i++)
            {
                var currentNode: Element = <Element>synopsis.childNodes[i];
                switch (currentNode.nodeName)
                {
                    case 'h2':
                        foundH2 = currentNode.querySelector("span").textContent.indexOf("by") != -1;
                        break;

                    case 'h3':
                        if (foundH2)
                        {
                            currentVolumeTitle = currentNode.querySelector("span").textContent;

                            //Check if link full text exist if found take it
                            var linkList: NodeList = currentNode.querySelectorAll("a");
                            if (linkList.length > 0)
                            {
                                currentVolumeUrl = linkList[0].attributes.getNamedItem("href").value;
                            }

                            canParse = true
                        }
                        break;

                    case "dl":
                        if (canParse)
                        {
                            if (currentNovelVolume.title != currentVolumeTitle)
                            {
                                //new volume
                                if (firstPass && currentNovelVolume.chapterList.length > 0)
                                {
                                    res.push(currentNovelVolume);
                                }

                                firstPass = true;

                                currentNovelVolume = new Volume();
                                currentNovelVolume.url = currentVolumeUrl;
                                currentNovelVolume.title = currentVolumeTitle;
                            }

                            //get chapter list from current volume
                            var chapterlist: NodeList = currentNode.querySelectorAll("a");
                            for (var j = 0; j < chapterlist.length; j++)
                            {
                                var a: Element = <Element>chapterlist[j];

                                if (a.hasAttribute("href")) // invalid chapter
                                {
                                    var chaper: Chapter = new Chapter();
                                    chaper.url = a.getAttribute("href");
                                    chaper.title = a.textContent;

                                    currentNovelVolume.chapterList.push(chaper);
                                }
                            }
                        }

                        break;

                    case "p":
                        canParse != canParse; // we exit volume scope start searching for another one
                        break;
                }
            }

            return res;
        }
    }
} 