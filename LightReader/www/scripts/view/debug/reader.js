var LightReader;
(function (LightReader) {
    var view;
    (function (view) {
        var Reader = (function () {
            function Reader() {
            }
            Reader.prototype.Ready = function (element, options) {
                var swiper = new Swiper('.swiper-container');
            };
            Reader.prototype.Exit = function (element) {
            };
            return Reader;
        })();
        view.Reader = Reader;
    })(view = LightReader.view || (LightReader.view = {}));
})(LightReader || (LightReader = {}));
//# sourceMappingURL=reader.js.map