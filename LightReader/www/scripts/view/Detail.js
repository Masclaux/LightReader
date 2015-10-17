var LightReader;
(function (LightReader) {
    var view;
    (function (view) {
        var core = LightReader.core;
        var Detail = (function () {
            function Detail() {
                this.router = core.Router.Inst();
            }
            Detail.prototype.Ready = function (element, options) {
                this.media = options.media;
                this.title = ko.observable(this.media.title);
                this.url = ko.observable(this.media.url);
                this.synopsis = ko.observable(this.media.synopsis);
                this.illustration = ko.observable(this.media.illustration.Get());
                this.lastUpdate = ko.observable(this.media.lastUpdate.toString());
                this.title = ko.observable(this.media.title);
                this.volumeList = ko.observableArray(this.media.volumeList);
                ko.applyBindings(this, element);
            };
            Detail.prototype.Exit = function (element) {
                //clean binding ( I know is not recommended )
                ko.cleanNode(element);
            };
            return Detail;
        })();
        view.Detail = Detail;
    })(view = LightReader.view || (LightReader.view = {}));
})(LightReader || (LightReader = {}));
//# sourceMappingURL=Detail.js.map