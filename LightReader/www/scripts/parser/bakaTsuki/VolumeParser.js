var LightReader;
(function (LightReader) {
    var parser;
    (function (parser) {
        var bakaTsuki;
        (function (bakaTsuki) {
            var VolumeParser = (function () {
                function VolumeParser() {
                    var _this = this;
                    this.OnRequestComplete = function (data) {
                        var htmlDoc = new DOMParser();
                        var res = htmlDoc.parseFromString(data.responseText, "text/xml");
                        if (res != null) {
                            //get synoptis
                            var synopsis = res.querySelector("#Story_Synopsis");
                            if (synopsis != null) {
                                var synopsis = synopsis.parentNode;
                                for (var i = 0; i < 10; i++) {
                                    if (synopsis.nodeName == "p") {
                                        _this.media.synopsis = synopsis.textContent;
                                        break;
                                    }
                                    synopsis = synopsis.nextSibling;
                                }
                                console.info("toto");
                            }
                        }
                    };
                    this.OnError = function (ev) {
                    };
                }
                VolumeParser.prototype.parseVolume = function (media) {
                    this.media = media;
                    console.info("Stating Parsing detail for " + media.title);
                    LightReader.Http.Get("http://baka-tsuki.org" + media.url, this.OnRequestComplete, this.OnError);
                };
                return VolumeParser;
            })();
            bakaTsuki.VolumeParser = VolumeParser;
        })(bakaTsuki = parser.bakaTsuki || (parser.bakaTsuki = {}));
    })(parser = LightReader.parser || (LightReader.parser = {}));
})(LightReader || (LightReader = {}));
//# sourceMappingURL=VolumeParser.js.map