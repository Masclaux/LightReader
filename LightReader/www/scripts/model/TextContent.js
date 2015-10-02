var LightReader;
(function (LightReader) {
    //A textual page
    var TextContent = (function () {
        function TextContent() {
            this.content = "";
        }
        TextContent.prototype.Get = function () {
            return this.content;
        };
        return TextContent;
    })();
    LightReader.TextContent = TextContent;
})(LightReader || (LightReader = {}));
//# sourceMappingURL=TextContent.js.map