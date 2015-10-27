var LightReader;
(function (LightReader) {
    //collection of useful methods
    var ModelHelper = (function () {
        function ModelHelper() {
        }
        /**
        * Return page content ( if ImageContent or TextContent)
        */
        ModelHelper.Get = function (content) {
            if (content.content != null) {
                return content.content;
            }
            else if (content.isLocal != null && content.isLocal == true) {
                return content.localUrl;
            }
            else {
                return content.url;
            }
            return "";
        };
        return ModelHelper;
    })();
    LightReader.ModelHelper = ModelHelper;
})(LightReader || (LightReader = {}));
//# sourceMappingURL=ModelHelper.js.map