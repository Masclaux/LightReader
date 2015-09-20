var LightReader;
(function (LightReader) {
    var parser;
    (function (parser) {
        var bakaTsuki;
        (function (bakaTsuki) {
            var MediaParser = (function () {
                function MediaParser() {
                    this.mediaList = new Array();
                }
                //Download and Parse  all required datas from the source.
                MediaParser.prototype.ParseMedia = function () {
                    var _this = this;
                    var listUrl = "http://baka-tsuki.org/project/index.php?title=Category:Light_novel_(English)";
                    var request = $.ajax({
                        type: "GET",
                        url: listUrl,
                    });
                    request.done(function (res) { return _this.OnRequestComplete(res); });
                    request.fail(function (req, er) { return _this.OnError(req, er); });
                };
                MediaParser.prototype.OnRequestComplete = function (data) {
                    var _this = this;
                    console.info("Start parsing light novel list");
                    var res = $.parseHTML(data);
                    if (res != null) {
                        var table = $(res).find(".mw-content-ltr ul li");
                        $.each(table, function (index, value) {
                            var novel = new LightReader.Media();
                            var aRef = $(value).find("a");
                            novel.title = aRef.attr("title");
                            novel.url = aRef.attr("href");
                            console.log("Found : " + novel.title + " - " + novel.url);
                            _this.mediaList.push(novel);
                        });
                    }
                    if (this.onMediaComplete != null) {
                        this.onMediaComplete(this);
                    }
                };
                MediaParser.prototype.OnError = function (xmlHttpRequest, textStatus) {
                    console.error("Error on Parse Media " + textStatus);
                };
                return MediaParser;
            })();
            bakaTsuki.MediaParser = MediaParser;
        })(bakaTsuki = parser.bakaTsuki || (parser.bakaTsuki = {}));
    })(parser = LightReader.parser || (LightReader.parser = {}));
})(LightReader || (LightReader = {}));
//# sourceMappingURL=MediaParser.js.map