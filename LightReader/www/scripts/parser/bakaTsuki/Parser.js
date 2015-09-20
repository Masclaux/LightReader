var LightReader;
(function (LightReader) {
    var parser;
    (function (parser) {
        var bakaTsuki;
        (function (bakaTsuki) {
            var Parser = (function () {
                function Parser() {
                    this.source = new LightReader.Source();
                    //Parse Media detail
                    this.mediaParser = new bakaTsuki.MediaParser();
                    //Parse volume detail
                    this.volumeParser = new bakaTsuki.VolumeParser();
                    //Parse chapter detail
                    this.chapterParser = new bakaTsuki.ChapterParser();
                    this.mediaParser.onMediaComplete = this.onMediaComplete;
                }
                //Download and Parse  all required datas from the source.
                Parser.prototype.Parse = function () {
                    //get media list
                    this.mediaParser.ParseMedia();
                };
                Parser.prototype.onMediaComplete = function (res) {
                    console.info("lol" + res.mediaList);
                };
                return Parser;
            })();
            bakaTsuki.Parser = Parser;
        })(bakaTsuki = parser.bakaTsuki || (parser.bakaTsuki = {}));
    })(parser = LightReader.parser || (LightReader.parser = {}));
})(LightReader || (LightReader = {}));
//# sourceMappingURL=Parser.js.map