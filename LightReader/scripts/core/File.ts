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
            var http = new XMLHttpRequest();
            http.open('HEAD', url, false);
            http.send();

            return http.status != 404;
        }
    }
}