var LightReader;
(function (LightReader) {
    var parser;
    (function (parser) {
        var bakaTsuki;
        (function (bakaTsuki) {
            var MediaParser = (function () {
                function MediaParser() {
                    var _this = this;
                    this.mediaList = new Array();
                    this.OnRequestComplete = function (data) {
                        console.info("Start parsing light novel list");
                        var htmlDoc = new DOMParser();
                        var res = htmlDoc.parseFromString(data.responseText, "text/xml");
                        if (res != null) {
                            var cellules = $(res).find(".mw-content-ltr ul li a");
                            for (var i = 0; i < cellules.length; ++i) {
                                var novel = new LightReader.Media();
                                var aRef = cellules[i];
                                novel.title = aRef.attributes.getNamedItem("title").value;
                                novel.url = aRef.attributes.getNamedItem("href").value;
                                console.log("Found : " + novel.title + " - " + novel.url);
                                _this.mediaList.push(novel);
                            }
                        }
                        if (_this.onMediaComplete != null) {
                            _this.onMediaComplete(_this);
                        }
                    };
                    this.OnError = function (ev) {
                        console.error("Error on Parse Media " + ev.type);
                    };
                }
                //Download and Parse  all required datas from the source.
                MediaParser.prototype.ParseMedia = function () {
                    LightReader.Http.Get(bakaTsuki.Constant.LIST_URL, this.OnRequestComplete, this.OnError);
                };
                //Download and Parse  all required datas from the source.
                MediaParser.prototype.UpdateMedia = function () {
                    LightReader.Http.Get(bakaTsuki.Constant.LIST_URL, this.OnRequestComplete, this.OnError);
                };
                return MediaParser;
            })();
            bakaTsuki.MediaParser = MediaParser;
        })(bakaTsuki = parser.bakaTsuki || (parser.bakaTsuki = {}));
    })(parser = LightReader.parser || (LightReader.parser = {}));
})(LightReader || (LightReader = {}));
//# sourceMappingURL=MediaParser.js.map