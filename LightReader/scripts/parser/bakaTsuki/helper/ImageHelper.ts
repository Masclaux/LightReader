module LightReader.parser.bakaTsuki
{
    //Image helper
    export class ImageHelper
    {
        public static IMAGE_QUERY: string =
        "http://www.baka-tsuki.org/project/api.php?action=query&prop=imageinfo&iiprop=url&format=json&titles=File:";

        //return url from filename
        public static GetImageLink(fileName: string, onSuccess:any, onError:any, datas: ImageContent): void
        {
            var url: string = this.IMAGE_QUERY + fileName + "&";//avoid warning with & at the end ><

            var args: Object = { "callBack": onSuccess, "datas": datas };
            Http.Get(url, this.OnRequestComplete, this.OnError, args);           
        }



        //Get image name from url.
        public static GetImageName(link: HTMLElement): string
        {
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
                                        return finalUrl[1];//right part
                                    }
                                    break; // yes so we quit the loop
                                }
                            }
                        }
                    }
                }
            }   

            return "";
        }   

        private static OnRequestComplete = (data: XMLHttpRequest, args: any): void =>
        {
            var image: ImageContent = args.datas;
            var res: any = JSON.parse(data.responseText);

            for (var index in res.query.pages)
            {                
                image.url = res.query.pages[index].imageinfo[0].url;
            }

            if (args.callBack != null)
            {
                args.callBack(image);
            }
        }

        private static OnError = (ev: Event): void =>
        {
            console.error("Error while loading Image");
        }
    }
}