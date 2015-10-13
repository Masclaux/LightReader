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
            if (LightReader.Util.IsRipple()) {
                console.warn("File.Write not supported on ripple return onRequestComplete with url param as result");
                onRequestComplete(url);
                return;
            }
            var system = window.cordova.platformId;
            var storage = storage = cordova.file.externalApplicationStorageDirectory;
            // WP8
            if (system !== "windows") {
                storage += filePath;
            }
            var fileTransfer = new FileTransfer();
            fileTransfer.download(encodeURI(url), storage + fileName, function (aEvt) {
                if (system === "windows") {
                    File.Move(aEvt, fileName, storage, filePath, function (aEvt) {
                        onRequestComplete(aEvt.toURL());
                    }, onRequestError);
                }
                else {
                    onRequestComplete(aEvt.toURL());
                }
            }, function (aEvt) {
                if (onRequestError) {
                    onRequestError(aEvt);
                }
            });
        };
        /**
        * Move a file
        * @param fileName file name (exemple "test.png")
        * @param filePath target path (exemple "image/")
        * @param newFilePath target path (exemple "image/")
        * @param onCompletHandler callBack When File request is succefull
        * @param onRequestError callBack When File Request is on error
        */
        File.Move = function (file, fileName, filePath, newFilePath, onRequestComplete, onRequestError) {
            window.requestFileSystem(window.PERSISTENT, 0, function (aEvt) {
                //windows can't create Nested directory we need to make it  recursive
                File.CreateDirectory(aEvt, newFilePath, function (newFilePath) {
                    file.moveTo(newFilePath, fileName, onRequestComplete, onRequestError);
                }, function (aEvt) {
                    onRequestError(aEvt);
                });
            }, function (aEvt) { onRequestError(aEvt); });
        };
        /**
        * Create directory with support of nested directory
        * Code from stack overflow => http://stackoverflow.com/questions/10961000/nested-directory-creator-phonegap
        * @param fs instance of FilesSystem
        * @param path directory target
        * @param onRequestComplete Callback if succeed
        * @param onRequestError CallBack if error detected
        */
        File.CreateDirectory = function (fs, path, onRequestComplete, onRequestError) {
            var dirs = path.split("/").reverse();
            dirs = dirs.filter(function (v) { return v !== ''; }); //remove empty value
            var root = fs.root;
            var createDir = function (dir) {
                root.getDirectory(dir, {
                    create: true,
                    exclusive: false
                }, successCB, onRequestComplete);
            };
            var successCB = function (entry) {
                console.info("Dir created " + entry.fullPath);
                root = entry;
                if (dirs.length > 0) {
                    createDir(dirs.pop());
                }
                else {
                    console.log("All dir created");
                    onRequestComplete(entry);
                }
            };
            createDir(dirs.pop());
        };
        return File;
    })();
    LightReader.File = File;
})(LightReader || (LightReader = {}));
//# sourceMappingURL=File.js.map