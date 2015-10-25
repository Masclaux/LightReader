var LightReader;
(function (LightReader) {
    var view;
    (function (view) {
        var Reader = (function () {
            function Reader() {
                var _this = this;
                this.chapter = new LightReader.Chapter();
                //curent page index
                this.currentPage = 0;
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
                this.PinchToZoom = function (x, y, scaling, image) {
                    image.css({ 'height': _this.swiper.height * scaling });
                    image.css({ 'width': '100%' });
                };
            }
            Reader.prototype.Ready = function (element, options) {
                var volume = new LightReader.Volume();
                for (var i = 0; i < 5; i++) {
                    var page = new LightReader.TextContent();
                    page.content = '<h2>' + i + '</h2>';
                    this.chapter.pages.push(page);
                }
                volume.chapterList.push(this.chapter);
                this.swiper = new Swiper('.swiper-container', {
                    onTransitionEnd: this.OnNewSlide,
                });
                var mc = new Hammer(element);
                mc.add(new Hammer.Pinch());
                mc.on('pinch', this.OnPinch);
                this.pages = $(".swiper-slide");
                this.pageTo(0, 2);
                this.swiper.slideTo(0, 0, false); //set first
            };
            Reader.prototype.Exit = function (element) {
            };
            Reader.prototype.pageTo = function (start, end) {
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
                        if (this.chapter.pages[i] instanceof LightReader.ImageContent) {
                            this.pages[slide].innerHTML =
                                "<zoomable>" +
                                    "<img src='" + this.chapter.pages[i].Get() + "' style='width:100%'/>" +
                                    "</zoomable>";
                        }
                        else {
                            this.pages[slide].innerHTML = this.chapter.pages[i].Get();
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
            return Reader;
        })();
        view.Reader = Reader;
    })(view = LightReader.view || (LightReader.view = {}));
})(LightReader || (LightReader = {}));
//# sourceMappingURL=reader.js.map