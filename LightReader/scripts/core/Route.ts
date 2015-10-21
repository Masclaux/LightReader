module LightReader.core
{
    /**
    * Define a route historic state
    */
    export class Route
    {
        public url: string;

        public args: any;

        public inHistory: any;

        constructor(url: string, args: any, inHistory: boolean = true)
        {
            this.url = url;
            this.args = args;
            this.inHistory = inHistory;
        }
    }
}