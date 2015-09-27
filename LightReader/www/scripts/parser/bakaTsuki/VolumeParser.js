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
                            _this.onVolumeListComplete(_this);
                        }
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
                * return  synopsis from class #Story_Synopsis
                * if not found return the content of the first <p>
                */
                VolumeParser.prototype.GetSynopsis = function (doc) {
                    //get synoptis
                    var synopsis = doc.querySelector("#Story_Synopsis");
                    if (synopsis != null) {
                        var synopsis = synopsis.parentNode;
                        for (var i = 0; i < 10; i++) {
                            if (synopsis.nodeName == "p") {
                                return synopsis.textContent;
                            }
                            synopsis = synopsis.nextSibling;
                        }
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
                    var images = doc.getElementsByClassName("thumbinner");
                    if (images != null && images.length > 0) {
                        var image = images[0];
                        var alist = image.querySelectorAll("a");
                        if (alist != null && alist.length > 0) {
                            var a = alist[0];
                            res = new LightReader.Image();
                            res.title = image.textContent;
                            res.url = a.getAttribute("href");
                        }
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
                    var synopsis = doc.querySelector("#mw-content-text");
                    for (var i = 0; i < synopsis.childNodes.length; i++) {
                        var currentNode = synopsis.childNodes[i];
                        switch (currentNode.nodeName) {
                            case 'h2':
                                foundH2 = currentNode.querySelector("span").textContent.indexOf("by") != -1;
                                break;
                            case 'h3':
                                if (foundH2) {
                                    currentVolumeTitle = currentNode.querySelector("span").textContent;
                                    //Check if link full text exist if found take it
                                    var linkList = currentNode.querySelectorAll("a");
                                    if (linkList.length > 0) {
                                        currentVolumeUrl = linkList[0].attributes.getNamedItem("href").value;
                                    }
                                    canParse = true;
                                }
                                break;
                            case "dl":
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
                                    var chapterlist = currentNode.querySelectorAll("a");
                                    for (var j = 0; j < chapterlist.length; j++) {
                                        var a = chapterlist[j];
                                        if (a.hasAttribute("href")) {
                                            var chaper = new LightReader.Chapter();
                                            chaper.url = a.getAttribute("href");
                                            chaper.title = a.textContent;
                                            currentNovelVolume.chapterList.push(chaper);
                                        }
                                    }
                                }
                                break;
                            case "p":
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