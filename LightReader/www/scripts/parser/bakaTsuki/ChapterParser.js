var LightReader;
(function (LightReader) {
    var parser;
    (function (parser) {
        var bakaTsuki;
        (function (bakaTsuki) {
            var ChapterParser = (function () {
                function ChapterParser() {
                    var _this = this;
                    this.chaptersRequest = 0;
                    this.imagesRequest = 0;
                    this.OnRequestComplete = function (data, currentChapter) {
                        console.info("Start Parsing chapter " + currentChapter.title);
                        var firstPartNotFound = false;
                        var tempWords = 0;
                        var page = new LightReader.TextContent();
                        var res = $.parseHTML(data.responseText);
                        if (res != null) {
                            var text = $(res).find("#mw-content-text").find('h2,h3,p,div.thumb.tright,div.thumb');
                            for (var i = 0; i < text.length; i++) {
                                var value = text[i];
                                switch (value.nodeName.toUpperCase()) {
                                    case 'H2':
                                        page.content += "<h2>" + value.firstChild.textContent + "</h2>";
                                        break;
                                    case 'H3':
                                        if (currentChapter.pages.length > 0) {
                                            currentChapter.pages.push(page);
                                            page = new LightReader.TextContent();
                                            tempWords = 0;
                                        }
                                        page.content += "<h3>" + value.firstChild.textContent + "</h3>";
                                        break;
                                    case 'P':
                                        page.content += "<P>" + value.firstChild.textContent + "</P>";
                                        break;
                                    case 'DIV':
                                        _this.imagesRequest++;
                                        var image = new LightReader.ImageContent();
                                        image.title = bakaTsuki.ImageHelper.GetImageName(value);
                                        var filename = image.title.replace(/^.*[\\\/]/, '');
                                        if (_this.imagesStack[image.title] == null) {
                                            _this.imagesStack[image.title] = new Array();
                                        }
                                        _this.imagesStack[image.title].push(image);
                                        currentChapter.pages.push(image);
                                        bakaTsuki.ImageHelper.GetImageLink(image.title, _this.OnImageComplete, _this.OnImageError, image);
                                        break;
                                }
                                tempWords += value.firstChild.textContent.split(" ").length;
                                if (tempWords >= 350) {
                                    currentChapter.pages.push(page);
                                    var page = new LightReader.TextContent();
                                    tempWords = 0;
                                }
                            }
                        }
                        _this.chaptersRequest--;
                        _this.checkComplete();
                    };
                    this.OnError = function (ev) {
                        console.error("Invalid Chapter");
                        _this.chaptersRequest--;
                        _this.checkComplete();
                    };
                    this.OnImageComplete = function (image) {
                        console.info("Found try to download it " + image.url);
                        bakaTsuki.ImageHelper.DownloadImage(image, _this.OnImageDownloaded, _this.OnImageError);
                    };
                    this.OnImageDownloaded = function (image) {
                        console.info("Image downloaded " + image);
                        if (_this.imagesStack) {
                            //get image name
                            var filename = image.replace(/^.*[\\\/]/, '');
                            for (var i = 0; i < _this.imagesStack[filename].length; i++) {
                                _this.imagesStack[filename][i].localUrl = image;
                                _this.imagesStack[filename][i].isLocal = true;
                                _this.imagesRequest--;
                            }
                            _this.imagesStack[filename] = [];
                        }
                        _this.checkComplete();
                    };
                    this.OnImageError = function (ev) {
                        console.warn("Invalid image");
                        _this.imagesRequest--;
                        _this.checkComplete();
                    };
                }
                //Download and Parse  all required datas from the source.
                ChapterParser.prototype.ParseChapters = function (volume) {
                    console.info("Stating Parsing detail for " + volume.title);
                    this.imagesStack = {};
                    this.Volume = volume;
                    for (var i = 0; i < volume.chapterList.length; i++) {
                        this.ParseChapter(volume.chapterList[i]);
                    }
                };
                //Download and parse a chapter
                ChapterParser.prototype.ParseChapter = function (chapter) {
                    this.chaptersRequest++;
                    LightReader.Http.Get(bakaTsuki.Constant.MAIN_URL + chapter.url, this.OnRequestComplete, this.OnError, chapter);
                };
                ChapterParser.prototype.checkComplete = function () {
                    if (this.chaptersRequest <= 0 && this.imagesRequest <= 0) {
                        if (this.onChaptersComplete) {
                            this.onChaptersComplete(this);
                        }
                    }
                };
                return ChapterParser;
            })();
            bakaTsuki.ChapterParser = ChapterParser;
        })(bakaTsuki = parser.bakaTsuki || (parser.bakaTsuki = {}));
    })(parser = LightReader.parser || (LightReader.parser = {}));
})(LightReader || (LightReader = {}));
//# sourceMappingURL=ChapterParser.js.map