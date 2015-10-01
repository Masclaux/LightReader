var LightReader;
(function (LightReader) {
    var parser;
    (function (parser) {
        var bakaTsuki;
        (function (bakaTsuki) {
            var ChapterParser = (function () {
                function ChapterParser() {
                    var _this = this;
                    this.listUrl = "http://baka-tsuki.org";
                    this.OnRequestComplete = function (data, currentChapter) {
                        console.info("Start Parsing chapter " + currentChapter.title);
                        var firstPartNotFound = false;
                        var tempParaText = "";
                        var tempWords = 0;
                        currentChapter.pages = new Array();
                        var res = $.parseHTML(data.responseText);
                        if (res != null) {
                            var text = $(res).find("#mw-content-text").find('h2,h3,p,div.thumb.tright,div.thumb');
                            for (var i = 0; i < text.length; i++) {
                                var value = text[i];
                                switch (value.nodeName.toUpperCase()) {
                                    case 'H2':
                                        tempParaText += "<h2>" + value.firstChild.textContent + "</h2>";
                                        break;
                                    case 'H3':
                                        if (currentChapter.pages.length > 0) {
                                            currentChapter.pages.push(tempParaText);
                                            tempWords = 0;
                                            tempParaText = "";
                                        }
                                        tempParaText += "<h3>" + value.firstChild.textContent + "</h3>";
                                        break;
                                    case 'P':
                                        tempParaText += "<P>" + value.firstChild.textContent + "</P>";
                                        break;
                                    case 'DIV':
                                        var val = _this.parseImage(value);
                                        currentChapter.pages.push("img;;" + val);
                                        currentChapter.images[val] = new LightReader.Image();
                                        currentChapter.images[val].id = val;
                                        break;
                                }
                                tempWords += value.firstChild.textContent.split(" ").length;
                                if (tempWords >= 350) {
                                    currentChapter.pages.push(tempParaText);
                                    tempWords = 0;
                                    tempParaText = "";
                                }
                            }
                        }
                    };
                    this.OnError = function (ev) {
                        console.error("Invalid html");
                    };
                }
                //Download and Parse  all required datas from the source.
                ChapterParser.prototype.ParseChapters = function (volume) {
                    console.info("Stating Parsing detail for " + volume.title);
                    this.Volume = volume;
                    for (var i = 0; i < volume.chapterList.length; i++) {
                        this.ParseChapter(volume.chapterList[i]);
                    }
                };
                //Download and parse a chapter 
                ChapterParser.prototype.ParseChapter = function (chapter) {
                    LightReader.Http.Get(this.listUrl + chapter.url, this.OnRequestComplete, this.OnError, chapter);
                };
                ChapterParser.prototype.parseImage = function (link) {
                    var fileUrl = "";
                    if (link != null) {
                        var url = $(link).find("a.image").attr('href');
                        if (url != null) {
                            var splitUrl = url.split(","); // in read 
                            if (splitUrl.length > 0) {
                                splitUrl = splitUrl[0].split("/");
                                for (var c in splitUrl) {
                                    if (splitUrl[c] != "thumb") {
                                        if (splitUrl[c].indexOf(".") != -1) {
                                            var finalUrl = splitUrl[c].split("File:"); //get only page name
                                            if (finalUrl.length > 0) {
                                                fileUrl = finalUrl[1]; //right part
                                            }
                                            break; // yes so we quit the loop
                                        }
                                    }
                                }
                            }
                        }
                    }
                    console.info("Found Image : " + fileUrl);
                    return fileUrl;
                };
                return ChapterParser;
            })();
            bakaTsuki.ChapterParser = ChapterParser;
        })(bakaTsuki = parser.bakaTsuki || (parser.bakaTsuki = {}));
    })(parser = LightReader.parser || (LightReader.parser = {}));
})(LightReader || (LightReader = {}));
//# sourceMappingURL=ChapterParser.js.map