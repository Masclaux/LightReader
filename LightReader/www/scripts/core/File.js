var LightReader;
(function (LightReader) {
    var core;
    (function (core) {
        //File helper
        var File = (function () {
            function File() {
            }
            /**
            * Check if file exist on server or on file system
            */
            File.Exist = function (url) {
                var requestType = "HEAD";
                //HEAD request on windows return "access is denied" so we use GET ( slowly ) 
                if (window.cordova && window.cordova.platformId == "windows") {
                    requestType = "GET";
                }
                var http = new XMLHttpRequest();
                http.open(requestType, url, false);
                http.send();
                return http.status != 404;
            };
            return File;
        })();
        core.File = File;
    })(core = LightReader.core || (LightReader.core = {}));
})(LightReader || (LightReader = {}));
//# sourceMappingURL=File.js.map