module LightReader.core
{
    //File helper
    export class File
    {
        /**
        * Check if file exist on server or on file system
        */
        public static Exist(url: string): boolean
        {
            var requestType: string = "HEAD";

            //HEAD request on windows return "access is denied" so we use GET ( slowly )
            if (window.cordova && window.cordova.platformId == "windows")
            {
                requestType = "GET";
            }

            var http = new XMLHttpRequest();
            http.open(requestType, url, false);
            http.send();

            return http.status != 404;
        }
    }
}