var LightReader;
(function (LightReader) {
    var view;
    (function (view) {
        var core = LightReader.core;
        var Detail = (function () {
            function Detail() {
                var _this = this;
                this.router = core.Router.Inst();
                this.OnVolumeSelected = function (event, datas) {
                    var volume = _this.media.volumeList[datas.index];
                    if (volume.lastUpdate == null || volume.chapterList.length == 0) {
                        _this.router.Navigate("Load.html", { command: LightReader.view.Load.VOLUME, datas: volume }, false);
                    }
                    else {
                        _this.router.Navigate("Read.html", volume);
                    }
                };
                this.OnBack = function (event, datas) {
                    _this.router.Back();
                };
            }
            Detail.prototype.Ready = function (element, options) {
                //restore get method ( lost in database javascript is definitly not Object oriented)
                this.media = options.media;
                this.illustration = LightReader.ModelHelper.Get(this.media.illustration);
                Rivets.bind(element, this);
            };
            Detail.prototype.Exit = function (element) {
            };
            return Detail;
        })();
        view.Detail = Detail;
    })(view = LightReader.view || (LightReader.view = {}));
})(LightReader || (LightReader = {}));
//# sourceMappingURL=Detail.js.map