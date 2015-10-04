var LightReader;
(function (LightReader) {
    //A page image
    var ImageContent = (function () {
        function ImageContent() {
            this.isLocal = false;
        }
        ImageContent.prototype.Get = function () {
            if (this.isLocal) {
                return this.localUrl;
            }
            else {
                return this.url;
            }
        };
        return ImageContent;
    })();
    LightReader.ImageContent = ImageContent;
})(LightReader || (LightReader = {}));
//# sourceMappingURL=ImageContent.js.map