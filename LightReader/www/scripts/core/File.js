var LightReader;
(function (LightReader) {
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
        /**
       * Write a file in externalApplicationStorageDirectory + filePath
       * @param url Url
       * @param filePath target path (exemple "image/")
       * @param fileName file name (exemple "test.png")
       * @param onCompletHandler callBack When File request is succefull
       * @param onRequestError callBack When File Request is on error
       */
        File.Write = function (url, filePath, fileName, onRequestComplete, onRequestError) {
            //Detecting ripple and simulate onRequestComplete
            var parent = window.parent;
            if (parent.ripple) {
                console.warn("File.Write not supported on ripple return onRequestComplete with url param as result");
                onRequestComplete(url);
                return;
            }
            var system = window.cordova.platformId;
            var storage = "";
            // WP8
            if (system === "windows") {
                storage = "ms-appdata:///local/";
            }
            else if (system === "android") {
                storage = cordova.file.externalApplicationStorageDirectory;
            }
            storage += filePath;
            var fileTransfer = new FileTransfer();
            fileTransfer.download(encodeURI(url), storage + fileName, function (aEvt) {
                if (onRequestComplete) {
                    onRequestComplete(aEvt.toURL());
                }
            }, function (aEvt) {
                if (onRequestError) {
                    onRequestError(aEvt);
                }
            });
        };
        return File;
    })();
    LightReader.File = File;
})(LightReader || (LightReader = {}));
//# sourceMappingURL=File.js.map