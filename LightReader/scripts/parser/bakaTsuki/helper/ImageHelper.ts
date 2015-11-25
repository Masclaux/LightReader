module LightReader.parser.bakaTsuki
{
    //Image helper
    export class ImageHelper
    {
        //return url from filename
        public static DownloadImage(datas: ImageContent, onSuccess: any, onError: any): void
        {
            console.info("Download image " + datas.title);

            //get file path
            var path = datas.url.replace(Constant.IMAGE_URL, "");//remove url
            var dirs: string[] = path.split("/");
            var filename: string = dirs.pop();//get filname

            path = dirs.toString().replace(',', '/');

            File.Write(datas.url, "images/bakatuski/" + path + "/", filename, onSuccess, onError);
        }

        //return url from filename
        public static GetImageLink(fileName: string, onSuccess: any, onError: any, datas: ImageContent): void
        {
            var url: string = Constant.IMAGE_QUERY + fileName + "&";//avoid warning with & at the end ><

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