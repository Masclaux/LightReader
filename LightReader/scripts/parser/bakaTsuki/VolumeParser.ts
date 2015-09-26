module LightReader.parser.bakaTsuki
{
    export class VolumeParser implements iVolumeParser
    {
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
                this.media.synopsis   = this.GetSynopsis(res);
                this.media.volumeList = this.GetVolumeList(res);
            }
            else
            {
                console.error("Invalid html");
            }
        }
        
        private OnError = (ev: Event): void =>
        {
            
        }


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

        private GetVolumeList(doc: Document): Volume[]
        {
            var res: Volume[] = [];


            return res;
        }

    }
} 