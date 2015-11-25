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

            Http.Get( Constant.MAIN_URL + media.url, this.OnRequestComplete, this.OnError);
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
                if (this.media.illustration == null)
                {
                    this.onVolumeListComplete(this);
                }
                else
                {
                    console.info("Download illustration");

                    //get only File:...
                    var finalUrl = this.media.illustration.url.split("File:"); //get only page name
                    if (finalUrl.length > 0)
                    {
                        ImageHelper.GetImageLink(finalUrl[1], this.OnLinkComplete, this.OnImageError, this.media.illustration);
                    }
                }
            }
        }

        private OnLinkComplete = (image: ImageContent): void =>
        {
            ImageHelper.DownloadImage(image, this.OnImageComplete, this.OnError);
        }

        private OnImageComplete = (image: string): void =>
        {
            console.info("Found " + image);

            this.media.illustration.localUrl = image;
            this.media.illustration.isLocal = true;

            this.onVolumeListComplete(this);
        }

        private OnImageError = (error: FileTransferError): void =>
        {
            console.error(error.exception);
            this.onVolumeListComplete(this);
        }

        private OnError = (ev: Event): void =>
        {
            console.error("Invalid html");
        }

        /**
        * search  synopsis from class #Story_Synopsis
        * if  found return the content of the first <p>
        */
        private GetSynopsis(doc: Document): string
        {
            //get synoptis
            var synopsis: JQuery = $(doc).find("#Story_Synopsis").parent().next("p");
            if (synopsis.length == 1)
            {
                return synopsis.text();
            }

            return "";
        }

        /**
        * return  an illustration for the current media
        * if not found return null
        */
        private GetIllustation(doc: Document): ImageContent
        {
            var res: ImageContent = null;

            //get first image
            var image: JQuery = $(doc).find(".thumbinner").first();
            if (image != null && image.length == 1)
            {
                res = new ImageContent();
                res.title = image.text();
                res.url = $(image).find("a").attr("href");
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

            var synopsis: JQuery = $(doc).find("#mw-content-text").find('h2,h3,li,p');
            for (var i = 0; i < synopsis.length; i++)
            {
                var currentNode: Node = synopsis[i];
                switch (currentNode.nodeName.toUpperCase())
                {
                    case 'H2':
                        foundH2 = $(currentNode).find("span").first().text().indexOf("by") != -1;
                        break;

                    case 'H3':
                        if (foundH2)
                        {
                            currentVolumeTitle = $(currentNode).find("span").first().text();
                            currentVolumeUrl = $(currentNode).find("a").attr("href");

                            canParse = true
                        }
                        break;

                    case "LI":
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
                            var charpterUrl: string = $(currentNode).find("a").attr("href");
                            var charpterTitle: string = $(currentNode).find("a").first().text();

                            if (charpterUrl != undefined) // invalid chapter
                            {
                                var chaper: Chapter = new Chapter();
                                chaper.url = charpterUrl;
                                chaper.title = charpterTitle;

                                currentNovelVolume.chapterList.push(chaper);
                            }
                        }

                        break;

                    case "P":
                        canParse != canParse; // we exit volume scope start searching for another one
                        break;
                }
            }

            return res;
        }
    }
} 