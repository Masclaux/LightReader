var LightReader;
(function (LightReader) {
    var parser;
    (function (parser) {
        var bakaTsuki;
        (function (bakaTsuki) {
            var ChapterParser = (function () {
                function ChapterParser() {
                    var _this = this;
                    this.listUrl = "http://baka-tsuki.org";
                    this.OnRequestComplete = function (data, currentChapter) {
                        for (var i = 0; i < _this.Volume.chapterList.length; i++) {
                            console.info(_this.Volume.chapterList[i].title);
                        }
                        console.info("start Parsing chapter " + currentChapter.title);
                        currentChapter.title = "bite";
                        for (var i = 0; i < _this.Volume.chapterList.length; i++) {
                            console.info(_this.Volume.chapterList[i].title);
                        }
                    };
                    this.OnError = function (ev) {
                        console.error("Invalid html");
                    };
                }
                //Download and Parse  all required datas from the source.
                ChapterParser.prototype.ParseChapters = function (volume) {
                    console.info("Stating Parsing detail for " + volume.title);
                    this.Volume = volume;
                    for (var i = 0; i < volume.chapterList.length; i++) {
                        this.ParseChapter(volume.chapterList[i]);
                    }
                };
                //Download and parse a chapter 
                ChapterParser.prototype.ParseChapter = function (chapter) {
                    LightReader.Http.Get(this.listUrl + chapter.url, this.OnRequestComplete, this.OnError, chapter);
                };
                return ChapterParser;
            })();
            bakaTsuki.ChapterParser = ChapterParser;
        })(bakaTsuki = parser.bakaTsuki || (parser.bakaTsuki = {}));
    })(parser = LightReader.parser || (LightReader.parser = {}));
})(LightReader || (LightReader = {}));
//# sourceMappingURL=ChapterParser.js.map