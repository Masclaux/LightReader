var LightReader;
(function (LightReader) {
    var PageContent = (function () {
        function PageContent() {
            this.content = "";
        }
        PageContent.prototype.Get = function () {
            return this.content;
        };
        return PageContent;
    })();
    LightReader.PageContent = PageContent;
})(LightReader || (LightReader = {}));
//# sourceMappingURL=PageContent.js.map