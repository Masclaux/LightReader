module LightReader
{
    //Type de requete Http
    enum eRequestType
    {
        GET,
        POST
    }

    //Http Request Helper
    export class Http
    {
        /**
        * Send an HTTP request
        * ShortCut of Http.Send(url, eRequestType.GET, onRequestComplete, onRequestError, return data, "");
        */
        public static Get(url: string, onRequestComplete: any, onRequestError: any, returnDatas?: any): void
        {
            Http.Send(url, eRequestType.GET, onRequestComplete, onRequestError, returnDatas, "");
        }

        /**
        * Send an HTTP request
        * @param url Url
        * @param rType Request Type ( GET or POST )
        * @param onCompletHandler callBack When Request is succefull
        * @param onRequestError callBack When Request is on error
        * @param returnDatas  datas who are set on "succeed" callback
        * @param args Args to send with the request
        */
        public static Send(url: string, rType: eRequestType, onCompletHandler: any, onRequestError: any, returnDatas?: any, args?: string): void
        {
            var rTypeStr = rType == eRequestType.GET ? "GET" : "POST";

            var http = new XMLHttpRequest();
            http.onreadystatechange = function (aEvt)
            {
                if (http.readyState == 4)
                {
                    if (http.status == 200)
                    {
                        onCompletHandler(http, returnDatas);
                    }
                    else
                    {
                        onRequestError(http);
                    }
                }
            }

            http.open(rTypeStr, url, true);
            http.onerror = onRequestError;
            http.send(args);
        }
    }
}