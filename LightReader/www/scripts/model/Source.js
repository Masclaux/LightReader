var LightReader;
(function (LightReader) {
    var Source = (function () {
        function Source() {
            this.novelList = new Array();
            this.logoUrl = new LightReader.ImageContent();
            this.logoUrl.title = "logo";
            this.logoUrl.localUrl = "logo.gif";
            this.logoUrl.url = "logo.gif";
        }
        return Source;
    })();
    LightReader.Source = Source;
})(LightReader || (LightReader = {}));
//# sourceMappingURL=Source.js.map