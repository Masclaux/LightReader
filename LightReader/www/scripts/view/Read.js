var LightReader;
(function (LightReader) {
    var view;
    (function (view) {
        var core = LightReader.core;
        var Read = (function () {
            function Read() {
                var _this = this;
                this.router = core.Router.Inst();
                //curent page index
                this.currentPage = 0;
                //curent chapter index
                this.currentChapter = 0;
                this.PinchToZoom = function (x, y, scaling, image) {
                    image.css({ 'height': _this.swiper.height * scaling });
                    image.css({ 'width': '100%' });
                };
                this.OnNewSlide = function (swiper) {
                    if (swiper.activeIndex != swiper.previousIndex
                        && (swiper.activeIndex == 2 || swiper.activeIndex == 0)) {
                        if (swiper.activeIndex > swiper.previousIndex) {
                            _this.pageTo(_this.currentPage - 1, _this.currentPage + 1);
                        }
                        else {
                            _this.pageTo(_this.currentPage - 3, _this.currentPage - 1);
                        }
                    }
                };
                this.OnPinch = function (event) {
                    var image = $(".swiper-slide-active zoomable img");
                    if (image.length > 0) {
                        _this.PinchToZoom(event.deltaX, event.deltaY, event.scale, image);
                    }
                };
            }
            Read.prototype.Ready = function (element, options) {
                this.volume = options;
                this.chapter = this.volume.chapterList[this.currentChapter];
                this.swiper = new Swiper('.swiper-container', {
                    'observer': true,
                    'observeParents': true,
                    'onTransitionEnd': this.OnNewSlide,
                });
                this.hammer = new Hammer(element);
                this.hammer.add(new Hammer.Pinch());
                this.hammer.on('pinch', this.OnPinch);
                this.pages = $(".swiper-slide");
                this.pageTo(0, 2);
                this.swiper.slideTo(0, 0, false); //set first
            };
            Read.prototype.Exit = function (element) {
            };
            Read.prototype.pageTo = function (start, end) {
                console.info("Show page " + start + " to " + end);
                if (start >= 0) {
                    //check if end is beyond
                    if (this.chapter.pages.length <= end) {
                        this.pageTo(this.chapter.pages.length - 3, this.chapter.pages.length - 1);
                        this.swiper.slideTo(2, 0, false); //set last
                        return;
                    }
                    var slide = 0;
                    for (var i = start; i <= end; i++) {
                        var content = this.chapter.pages[i];
                        if (content.url != null) {
                            this.pages[slide].innerHTML =
                                "<zoomable>" +
                                    "<img src='" + LightReader.ModelHelper.Get(this.chapter.pages[i]) + "' style='width:100%'/>" +
                                    "</zoomable>";
                        }
                        else {
                            this.pages[slide].innerHTML = LightReader.ModelHelper.Get(this.chapter.pages[i]);
                        }
                        slide++;
                    }
                    this.currentPage = end;
                }
                else {
                    this.pageTo(0, 2); //restart to the first
                    this.swiper.slideTo(0, 0, false); //set first
                    return;
                }
                this.swiper.slideTo(1, 0, false); //set middle slide active
            };
            return Read;
        })();
        view.Read = Read;
    })(view = LightReader.view || (LightReader.view = {}));
})(LightReader || (LightReader = {}));
//# sourceMappingURL=Read.js.map