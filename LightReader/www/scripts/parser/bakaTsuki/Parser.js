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
                }
                //Download and Parse  all required datas from the source.
                Parser.prototype.parse = function () {
                    if (this.onSourceComplete) {
                        this.onSourceComplete(new LightReader.Source());
                    }
                };
                return Parser;
            })();
            bakaTsuki.Parser = Parser;
        })(bakaTsuki = parser.bakaTsuki || (parser.bakaTsuki = {}));
    })(parser = LightReader.parser || (LightReader.parser = {}));
})(LightReader || (LightReader = {}));
//# sourceMappingURL=Parser.js.map