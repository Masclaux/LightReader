var LightReader;
(function (LightReader) {
    var parser;
    (function (parser) {
        var bakaTsuki;
        (function (bakaTsuki) {
            var VolumeParser = (function () {
                function VolumeParser() {
                    var _this = this;
                    this.OnRequestComplete = function (data) {
                        var htmlDoc = new DOMParser();
                        var res = htmlDoc.parseFromString(data.responseText, "text/xml");
                        if (res != null) {
                            _this.media.synopsis = _this.GetSynopsis(res);
                            _this.media.illustration = _this.GetIllustation(res);
                            _this.media.volumeList = _this.GetVolumeList(res);
                        }
                        else {
                            console.error("Invalid html");
                        }
                        if (_this.onVolumeListComplete) {
                            if (_this.media.illustration == null) {
                                _this.onVolumeListComplete(_this);
                            }
                            else {
                                console.info("Download illustration");
                                //get only File:...
                                var finalUrl = _this.media.illustration.url.split("File:"); //get only page name
                                if (finalUrl.length > 0) {
                                    bakaTsuki.ImageHelper.GetImageLink(finalUrl[1], _this.OnLinkComplete, _this.OnImageError, _this.media.illustration);
                                }
                            }
                        }
                    };
                    this.OnLinkComplete = function (image) {
                        bakaTsuki.ImageHelper.DownloadImage(image, _this.OnImageComplete, _this.OnError);
                    };
                    this.OnImageComplete = function (image) {
                        console.info("Found " + image);
                        _this.media.illustration.localUrl = image;
                        _this.media.illustration.isLocal = true;
                        _this.onVolumeListComplete(_this);
                    };
                    this.OnImageError = function (error) {
                        console.error(error.exception);
                        _this.onVolumeListComplete(_this);
                    };
                    this.OnError = function (ev) {
                        console.error("Invalid html");
                    };
                }
                VolumeParser.prototype.parseVolume = function (media) {
                    this.media = media;
                    console.info("Stating Parsing detail for " + media.title);
                    LightReader.Http.Get("http://baka-tsuki.org" + media.url, this.OnRequestComplete, this.OnError);
                };
                /**
                * search  synopsis from class #Story_Synopsis
                * if  found return the content of the first <p>
                */
                VolumeParser.prototype.GetSynopsis = function (doc) {
                    //get synoptis
                    var synopsis = $(doc).find("#Story_Synopsis").parent().next("p");
                    if (synopsis.length == 1) {
                        return synopsis.text();
                    }
                    return "";
                };
                /**
                * return  an illustration for the current media
                * if not found return null
                */
                VolumeParser.prototype.GetIllustation = function (doc) {
                    var res = null;
                    //get first image
                    var image = $(doc).find(".thumbinner").first();
                    if (image != null && image.length == 1) {
                        res = new LightReader.ImageContent();
                        res.title = image.text();
                        res.url = $(image).find("a").attr("href");
                    }
                    return res;
                };
                /**
                * Return all volume found in the current document
                */
                VolumeParser.prototype.GetVolumeList = function (doc) {
                    var res = [];
                    var currentVolumeTitle = "";
                    var currentVolumeUrl = "";
                    var currentNovelVolume = new LightReader.Volume();
                    var foundH2 = false;
                    var canParse = false;
                    var firstPass = false;
                    var synopsis = $(doc).find("#mw-content-text").find('h2,h3,li,p');
                    for (var i = 0; i < synopsis.length; i++) {
                        var currentNode = synopsis[i];
                        switch (currentNode.nodeName.toUpperCase()) {
                            case 'H2':
                                foundH2 = $(currentNode).find("span").first().text().indexOf("by") != -1;
                                break;
                            case 'H3':
                                if (foundH2) {
                                    currentVolumeTitle = $(currentNode).find("span").first().text();
                                    currentVolumeUrl = $(currentNode).find("a").attr("href");
                                    canParse = true;
                                }
                                break;
                            case "LI":
                                if (canParse) {
                                    if (currentNovelVolume.title != currentVolumeTitle) {
                                        //new volume
                                        if (firstPass && currentNovelVolume.chapterList.length > 0) {
                                            res.push(currentNovelVolume);
                                        }
                                        firstPass = true;
                                        currentNovelVolume = new LightReader.Volume();
                                        currentNovelVolume.url = currentVolumeUrl;
                                        currentNovelVolume.title = currentVolumeTitle;
                                    }
                                    //get chapter list from current volume
                                    var charpterUrl = $(currentNode).find("a").attr("href");
                                    var charpterTitle = $(currentNode).find("a").first().text();
                                    if (charpterUrl != undefined) {
                                        var chaper = new LightReader.Chapter();
                                        chaper.url = charpterUrl;
                                        chaper.title = charpterTitle;
                                        currentNovelVolume.chapterList.push(chaper);
                                    }
                                }
                                break;
                            case "P":
                                canParse != canParse; // we exit volume scope start searching for another one
                                break;
                        }
                    }
                    return res;
                };
                return VolumeParser;
            })();
            bakaTsuki.VolumeParser = VolumeParser;
        })(bakaTsuki = parser.bakaTsuki || (parser.bakaTsuki = {}));
    })(parser = LightReader.parser || (LightReader.parser = {}));
})(LightReader || (LightReader = {}));
//# sourceMappingURL=VolumeParser.js.map