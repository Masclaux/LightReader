var LightReader;
(function (LightReader) {
    var parser;
    (function (parser) {
        var bakaTsuki;
        (function (bakaTsuki) {
            var Constant = (function () {
                function Constant() {
                }
                //main url
                Constant.MAIN_URL = "https://baka-tsuki.org/";
                //light novel list url
                Constant.LIST_URL = Constant.MAIN_URL + "project/index.php?title=Category:Light_novel_(English)";
                //image url query
                Constant.IMAGE_QUERY = Constant.MAIN_URL
                    + "project/api.php?action=query&prop=imageinfo&iiprop=url&format=json&titles=File:";
                //image url
                Constant.IMAGE_URL = Constant.MAIN_URL + "project/images/";
                return Constant;
            })();
            bakaTsuki.Constant = Constant;
        })(bakaTsuki = parser.bakaTsuki || (parser.bakaTsuki = {}));
    })(parser = LightReader.parser || (LightReader.parser = {}));
})(LightReader || (LightReader = {}));
//# sourceMappingURL=Constant.js.map