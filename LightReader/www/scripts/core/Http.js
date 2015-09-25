var LightReader;
(function (LightReader) {
    //Type de requete Http
    var eRequestType;
    (function (eRequestType) {
        eRequestType[eRequestType["GET"] = 0] = "GET";
        eRequestType[eRequestType["POST"] = 1] = "POST";
    })(eRequestType || (eRequestType = {}));
    //Http Request Helper
    var Http = (function () {
        function Http() {
        }
        /**
        * Send an HTTP request
        * ShortCut of Http.Send(url, eRequestType.GET, onRequestComplete, onRequestError, "");
        */
        Http.Get = function (url, onRequestComplete, onRequestError) {
            Http.Send(url, eRequestType.GET, onRequestComplete, onRequestError, "");
        };
        /**
        * Send an HTTP request
        * @param url Url
        * @param rType Request Type ( GET or POST )
        * @param onCompletHandler callBack When Request is succefull
        * @param onRequestError callBack When Request is on error
        * @param args Args to send with the request
        */
        Http.Send = function (url, rType, onCompletHandler, onRequestError, args) {
            var rTypeStr = rType == eRequestType.GET ? "GET" : "POST";
            var http = new XMLHttpRequest();
            http.onreadystatechange = function (aEvt) {
                if (http.readyState == 4) {
                    if (http.status == 200) {
                        onCompletHandler(http);
                    }
                    else {
                        onRequestError(http);
                    }
                }
            };
            http.open(rTypeStr, url, true);
            http.onerror = onRequestError;
            http.send(args);
        };
        return Http;
    })();
    LightReader.Http = Http;
})(LightReader || (LightReader = {}));
//# sourceMappingURL=Http.js.map