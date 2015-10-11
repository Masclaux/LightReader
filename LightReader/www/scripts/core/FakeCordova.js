var LightReader;
(function (LightReader) {
    /**
    * Override cordova.file with all values set at "ms-appdata:///local/"
    * Call when device is ready
    * ONLY FOR windows device !
    */
    var FakeCordovaWindows = (function () {
        function FakeCordovaWindows() {
            var file = {
                applicationDirectory: "ms-appdata:///local/",
                applicationStorageDirectory: "ms-appdata:///local/",
                dataDirectory: "ms-appdata:///local/",
                cacheDirectory: "ms-appdata:///local/",
                externalApplicationStorageDirectory: "ms-appdata:///local/",
                externalDataDirectory: "ms-appdata:///local/",
                externalCacheDirectory: "ms-appdata:///local/",
                externalRootDirectory: "ms-appdata:///local/",
                tempDirectory: "ms-appdata:///local/",
                syncedDataDirectory: "ms-appdata:///local/",
                documentsDirectory: "ms-appdata:///local/",
                sharedDirectory: "ms-appdata:///local/",
            };
            if (cordova.file == undefined) {
                cordova.file = file;
            }
        }
        return FakeCordovaWindows;
    })();
    LightReader.FakeCordovaWindows = FakeCordovaWindows;
})(LightReader || (LightReader = {}));
//# sourceMappingURL=FakeCordova.js.map