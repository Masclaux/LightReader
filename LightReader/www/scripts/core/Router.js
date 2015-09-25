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
                if (Router.inst) {
                    throw new Error("Error: Instantiation failed: Use Router.Inst() instead of new.");
                }
                Router.inst = this;
                //this.xmlhttp = new XMLHttpRequest();
                //t/his.xmlhttp.onloadend = this.OnRequestComplete;
                //this.xmlhttp.onerror = this.OnRequestError;
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
            Router.prototype.Navigate = function (url, args) {
                //clear precedent page
                this.appContent.innerHTML = "";
                if (core.File.Exist(this.viewPath + "/" + url)) {
                    this.inHistory.push(new core.Route(url, args));
                    //this.xmlhttp.open("GET", this.viewPath + "/" + url, true);
                    //this.xmlhttp.send();
                    LightReader.Http.Get(this.viewPath + "/" + url, this.OnRequestComplete, this.OnRequestError);
                }
                else {
                    console.error("cannot found " + this.viewPath + "/" + url);
                }
            };
            Router.inst = new Router();
            return Router;
        })();
        core.Router = Router;
    })(core = LightReader.core || (LightReader.core = {}));
})(LightReader || (LightReader = {}));
//# sourceMappingURL=Router.js.map