var LightReader;
(function (LightReader) {
    var parser;
    (function (parser) {
        var bakaTsuki;
        (function (bakaTsuki) {
            //Image helper
            var ImageHelper = (function () {
                function ImageHelper() {
                }
                //return url from filename
                ImageHelper.GetImageLink = function (fileName, onSuccess, onError, datas) {
                    var url = this.IMAGE_QUERY + fileName + "&"; //avoid warning with & at the end ><
                    var args = { "callBack": onSuccess, "datas": datas };
                    LightReader.Http.Get(url, this.OnRequestComplete, this.OnError, args);
                };
                //Get image name from url.
                ImageHelper.GetImageName = function (link) {
                    if (link != null) {
                        var url = $(link).find("a.image").attr('href');
                        if (url != null) {
                            var splitUrl = url.split(","); // in read 
                            if (splitUrl.length > 0) {
                                splitUrl = splitUrl[0].split("/");
                                for (var c in splitUrl) {
                                    if (splitUrl[c] != "thumb") {
                                        if (splitUrl[c].indexOf(".") != -1) {
                                            var finalUrl = splitUrl[c].split("File:"); //get only page name
                                            if (finalUrl.length > 0) {
                                                return finalUrl[1]; //right part
                                            }
                                            break; // yes so we quit the loop
                                        }
                                    }
                                }
                            }
                        }
                    }
                    return "";
                };
                ImageHelper.IMAGE_QUERY = "http://www.baka-tsuki.org/project/api.php?action=query&prop=imageinfo&iiprop=url&format=json&titles=File:";
                ImageHelper.OnRequestComplete = function (data, args) {
                    var image = args.datas;
                    var res = JSON.parse(data.responseText);
                    for (var index in res.query.pages) {
                        image.url = res.query.pages[index].imageinfo[0].url;
                    }
                    if (args.callBack != null) {
                        args.callBack(image);
                    }
                };
                ImageHelper.OnError = function (ev) {
                    console.error("Error while loading Image");
                };
                return ImageHelper;
            })();
            bakaTsuki.ImageHelper = ImageHelper;
        })(bakaTsuki = parser.bakaTsuki || (parser.bakaTsuki = {}));
    })(parser = LightReader.parser || (LightReader.parser = {}));
})(LightReader || (LightReader = {}));
//# sourceMappingURL=ImageHelper.js.map