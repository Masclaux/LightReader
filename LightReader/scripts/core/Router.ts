module LightReader.core
{
    //simple router class
    export class Router
    {
        private static inst: Router = new Router();

        private appContent: HTMLElement;

        private xmlhttp: XMLHttpRequest;

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

            this.xmlhttp = new XMLHttpRequest();
            this.xmlhttp.onloadend = this.OnRequestComplete;
            this.xmlhttp.onerror = this.OnRequestError;
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
        * Check if file is currently avaible
        */
        private FileExist(url: string): boolean
        {
            var http = new XMLHttpRequest();
            http.open('HEAD', url, false);
            http.send();
            return http.status != 404;
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
            if (this.FileExist(this.viewPath + "/" + url))
            {
                this.inHistory.push(new Route(url, args));
                this.xmlhttp.open("GET", this.viewPath + "/" + url, true);
                this.xmlhttp.send();
            }
            else
            {
                console.error("cannot found " + this.viewPath + "/" + url);
            }
        }

        private OnRequestComplete = (ev: ProgressEvent) =>
        {
            var route: Route = this.inHistory[this.inHistory.length - 1];

            this.appContent.innerHTML = this.xmlhttp.responseText;

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
    }
}