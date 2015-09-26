var LightReader;
(function (LightReader) {
    var parser;
    (function (parser) {
        var bakaTsuki;
        (function (bakaTsuki) {
            var Parser = (function () {
                function Parser() {
                    var _this = this;
                    this.source = new LightReader.Source();
                    //Parse Media detail
                    this.mediaParser = new bakaTsuki.MediaParser();
                    //Parse volume detail
                    this.volumeParser = new bakaTsuki.VolumeParser();
                    //Parse chapter detail
                    this.chapterParser = new bakaTsuki.ChapterParser();
                    this.onMediaComplete = function (res) {
                        _this.source.novelList = res.mediaList;
                        console.info(_this.source.novelList[0].synopsis);
                        _this.volumeParser.parseVolume(res.mediaList[0]);
                    };
                    this.onVolumeListComplete = function (res) {
                        console.info(_this.source.novelList[0].synopsis);
                        console.info("volume list parsed for : " + res.media.title);
                    };
                    this.mediaParser.onMediaComplete = this.onMediaComplete;
                    this.volumeParser.onVolumeListComplete = this.onVolumeListComplete;
                }
                //Download and Parse  all required datas from the source.
                Parser.prototype.Parse = function () {
                    //get media list
                    this.mediaParser.ParseMedia();
                };
                return Parser;
            })();
            bakaTsuki.Parser = Parser;
        })(bakaTsuki = parser.bakaTsuki || (parser.bakaTsuki = {}));
    })(parser = LightReader.parser || (LightReader.parser = {}));
})(LightReader || (LightReader = {}));
//# sourceMappingURL=Parser.js.map