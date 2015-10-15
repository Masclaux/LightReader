module LightReader.core
{
    //simple router class
    export class Router
    {
        private static inst: Router = new Router();

        private appContent: HTMLElement;

        private viewPath: string;

        private currentPage: iPage;

        //liste des pages
        private pages: { [url: string]: any; } = {};

        public inHistory: Array<Route> = new Array<Route>();

        //return object instance
        public static Inst(): Router
        {
            return Router.inst;
        }

        constructor()
        {
            if (Router.inst)
            {
                throw new Error("Error: Instantiation failed: Use Router.Inst() instead of new.");
            }

            Router.inst = this;
        }

        /**
        * Init router with path to viewModel and view
        * defaut name for main node is appContent (<div id="appContent" />)
        */
        public Init(viewPath: string, className: string = 'appContent'): void
        {
            this.appContent = document.getElementById(className);
            if (this.appContent == null)
            {
                console.error("Cannot find main node");
            }
            else
            {
                this.viewPath = viewPath;
            }

            window.onclick = this.OnUrlClick; //catch click
        }

        /**
        * Add route
        */
        public Add(url: string, page: any): void
        {
            this.pages[url] = page;
        }

        /**
        * Remove route
        */
        public Remove(url: string): void
        {
            delete this.pages[url];
        }

        /**
        * Return to precedent page
        */
        public Back(): void
        {
            //remove the last
            this.inHistory.pop();
            if (this.inHistory.length >= 1)
            {
                //get new destination
                var r: Route = this.inHistory.pop();
                this.Navigate(r.url, r.args);
            }
        }

        /**
        * Navigate to a page
        */
        public Navigate(url: string, args?: any): void
        {
            //clear precedent page
            this.appContent.innerHTML = "";
            if (File.Exist(this.viewPath + "/" + url))
            {
                this.inHistory.push(new Route(url, args));

                Http.Get(this.viewPath + "/" + url, this.OnRequestComplete, this.OnRequestError);
            }
            else
            {
                console.error("cannot found " + this.viewPath + "/" + url);
            }
        }

        private OnRequestComplete = (ev: XMLHttpRequest) =>
        {
            var route: Route = this.inHistory[this.inHistory.length - 1];

            if (this.currentPage != undefined)
            {
                this.currentPage.Exit(this.appContent); //launch EXIT of previous page
            }

            this.appContent.innerHTML = ev.responseText;

            this.currentPage = new this.pages[route.url];
            if (this.currentPage != null)
            {
                this.currentPage.Ready(this.appContent, route.args);
            }
            else
            {
                console.error("Invalid viewModel class");
            }
        }

        private OnRequestError = (ev: Event) =>
        {
            console.info("Error while loading ");
        }

        private OnUrlClick = (e: any) =>
        {
            if (e.target.localName == 'a')
            {
                var dest: string = "";

                //Windows mobile add www on local link ....
                if (window.cordova && window.cordova.platformId == "windows")
                {
                    dest = e.target.nameProp; // workaround use windows only prop tag
                }
                else
                {
                    dest = e.target.toString().split(location.host)[1].replace(/^\//, '');
                }

                //separate url and args
                var arrayArgs: string[] = dest.split("#");
                if (arrayArgs.length > 0)
                {
                    var url: string = arrayArgs.shift();//url
                    var args: {} = this.GetArgsFromString(arrayArgs);//arg ( id : "value" )

                    this.Navigate(url, args);
                }

                return false; //stop navigation
            }
        }

        private GetArgsFromString(args: string[]): {}
        {
            var tempsArgs: string[];
            var res = {};

            for (var i = 0; i < args.length; ++i)
            {
                tempsArgs = args[i].split(":")
                if (tempsArgs.length == 2)
                {
                    res[tempsArgs[0]] = tempsArgs[1];
                }
                else
                {
                    console.error("Invalid arguments " + args[i] + " not added");
                }
            }

            return res;
        }
    }
}