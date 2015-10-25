var LightReader;
(function (LightReader) {
    var core;
    (function (core) {
        //simple router class
        var Router = (function () {
            function Router() {
                var _this = this;
                //liste des pages
                this.pages = {};
                this.inHistory = new Array();
                this.OnRequestComplete = function (ev) {
                    var route = _this.inHistory[_this.inHistory.length - 1];
                    if (route.inHistory == false) {
                        _this.inHistory.pop(); //not need in history ( probably transition pages)
                    }
                    if (_this.currentPage != undefined) {
                        _this.currentPage.Exit(_this.appContent); //launch EXIT of previous page
                    }
                    _this.appContent.innerHTML = ev.responseText;
                    _this.currentPage = new _this.pages[route.url];
                    if (_this.currentPage != null) {
                        _this.currentPage.Ready(_this.appContent, route.args);
                    }
                    else {
                        console.error("Invalid viewModel class");
                    }
                };
                this.OnRequestError = function (ev) {
                    console.info("Error while loading ");
                };
                this.OnUrlClick = function (e) {
                    if (e.target.localName == 'a') {
                        var dest = e.target.getAttribute("href");
                        if (dest != null) {
                            //separate url and args
                            var arrayArgs = dest.split("#");
                            if (arrayArgs.length > 0) {
                                var url = arrayArgs.shift(); //url
                                var args = _this.GetArgsFromString(arrayArgs); //arg ( id : "value" )
                                _this.Navigate(url, args);
                            }
                        }
                        return false; //stop navigation
                    }
                };
                if (Router.inst) {
                    throw new Error("Error: Instantiation failed: Use Router.Inst() instead of new.");
                }
                Router.inst = this;
            }
            //return object instance
            Router.Inst = function () {
                return Router.inst;
            };
            /**
            * Init router with path to viewModel and view
            * defaut name for main node is appContent (<div id="appContent" />)
            */
            Router.prototype.Init = function (viewPath, className) {
                if (className === void 0) { className = 'appContent'; }
                this.appContent = document.getElementById(className);
                if (this.appContent == null) {
                    console.error("Cannot find main node");
                }
                else {
                    this.viewPath = viewPath;
                }
                window.onclick = this.OnUrlClick; //catch click
            };
            /**
            * Add route
            */
            Router.prototype.Add = function (url, page) {
                this.pages[url] = page;
            };
            /**
            * Remove route
            */
            Router.prototype.Remove = function (url) {
                delete this.pages[url];
            };
            /**
            * Return to precedent page
            */
            Router.prototype.Back = function () {
                //remove the last
                this.inHistory.pop();
                if (this.inHistory.length >= 1) {
                    //get new destination
                    var r = this.inHistory.pop();
                    this.Navigate(r.url, r.args);
                }
            };
            /**
            * Navigate to a page
            */
            Router.prototype.Navigate = function (url, args, inHistory) {
                //clear precedent page
                this.appContent.innerHTML = "";
                if (LightReader.File.Exist(this.viewPath + "/" + url)) {
                    this.inHistory.push(new core.Route(url, args, inHistory == null || inHistory == true));
                    LightReader.Http.Get(this.viewPath + "/" + url, this.OnRequestComplete, this.OnRequestError);
                }
                else {
                    console.error("cannot found " + this.viewPath + "/" + url);
                }
            };
            Router.prototype.GetArgsFromString = function (args) {
                var tempsArgs;
                var res = {};
                for (var i = 0; i < args.length; ++i) {
                    tempsArgs = args[i].split(":");
                    if (tempsArgs.length == 2) {
                        res[tempsArgs[0]] = tempsArgs[1];
                    }
                    else {
                        console.error("Invalid arguments " + args[i] + " not added");
                    }
                }
                return res;
            };
            Router.inst = new Router();
            return Router;
        })();
        core.Router = Router;
    })(core = LightReader.core || (LightReader.core = {}));
})(LightReader || (LightReader = {}));
//# sourceMappingURL=Router.js.map