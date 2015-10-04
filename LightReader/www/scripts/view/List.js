var LightReader;
(function (LightReader) {
    var view;
    (function (view) {
        var List = (function () {
            function List() {
                this.router = LightReader.core.Router.Inst();
            }
            List.prototype.Ready = function (element, options) {
            };
            List.prototype.Exit = function (element) {
                //clean binding ( I know is not recommended )
                ko.cleanNode(element);
            };
            return List;
        })();
        view.List = List;
    })(view = LightReader.view || (LightReader.view = {}));
})(LightReader || (LightReader = {}));
//# sourceMappingURL=List.js.map