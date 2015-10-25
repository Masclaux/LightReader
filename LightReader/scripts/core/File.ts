module LightReader
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

        /**
       * Write a file in externalApplicationStorageDirectory + filePath
       * @param url Url
       * @param filePath target path (exemple "image/")
       * @param fileName file name (exemple "test.png")
       * @param onCompletHandler callBack When File request is succefull
       * @param onRequestError callBack When File Request is on error
       */
        public static Write(url: string, filePath: string, fileName: string, onRequestComplete: any, onRequestError: any): void
        {
            //Detecting ripple and simulate onRequestComplete
            if (Util.IsRipple())
            {
                console.warn("File.Write not supported on ripple return onRequestComplete with url param as result");
                onRequestComplete(url);

                return;
            }

            var system = window.cordova.platformId;
            var storage: string = storage = cordova.file.externalApplicationStorageDirectory;

            // WP8
            if (system !== "windows")
            {
                storage += filePath;
            }

            var fileTransfer = new FileTransfer();
            fileTransfer.download(encodeURI(url), storage + fileName,

                function (aEvt)
                {
                    if (system === "windows")
                    {
                        File.Move(aEvt, fileName, storage, filePath,
                            function (aEvt)
                            {
                                onRequestComplete(aEvt.toURL());
                            }
                            , onRequestError);
                    }
                    else
                    {
                        onRequestComplete(aEvt.toURL());
                    }
                }
                ,
                function (aEvt)
                {
                    if (onRequestError)
                    {
                        onRequestError(aEvt);
                    }
                });
        }

        /**
        * Move a file
        * @param fileName file name (exemple "test.png")
        * @param filePath target path (exemple "image/")
        * @param newFilePath target path (exemple "image/")
        * @param onCompletHandler callBack When File request is succefull
        * @param onRequestError callBack When File Request is on error
        */
        public static Move(file: FileEntry, fileName: string, filePath: string, newFilePath: string, onRequestComplete: any, onRequestError: any): void
        {
            window.requestFileSystem(window.PERSISTENT, 0,
                function (aEvt)
                {
                    //windows can't create Nested directory we need to make it  recursive
                    File.CreateDirectory(aEvt, newFilePath,
                        function (newFilePath: DirectoryEntry)
                        {
                            file.moveTo(newFilePath, fileName, onRequestComplete, onRequestError);
                        },
                        function (aEvt)
                        {
                            onRequestError(aEvt);
                        });
                }
                ,
                function (aEvt) { onRequestError(aEvt); }
            );
        }

        /**
        * Create directory with support of nested directory
        * Code from stack overflow => http://stackoverflow.com/questions/10961000/nested-directory-creator-phonegap
        * @param fs instance of FilesSystem
        * @param path directory target
        * @param onRequestComplete Callback if succeed
        * @param onRequestError CallBack if error detected
        */
        public static CreateDirectory(fs: FileSystem, path: string, onRequestComplete: any, onRequestError: any): void
        {
            var dirs: string[] = path.split("/").reverse();
            dirs = dirs.filter(function (v) { return v !== '' });//remove empty value

            var root: DirectoryEntry = fs.root;

            var createDir = function (dir: string)
            {
                root.getDirectory(dir,
                    {
                        create: true,
                        exclusive: false
                    }
                    ,
                    successCB, onRequestComplete);
            };

            var successCB = function (entry: DirectoryEntry)
            {
                root = entry;
                if (dirs.length > 0)
                {
                    createDir(dirs.pop());
                }
                else
                {
                    console.info("Dir created " + entry.fullPath);
                    onRequestComplete(entry);
                }
            };

            createDir(dirs.pop());
        }
    }
}