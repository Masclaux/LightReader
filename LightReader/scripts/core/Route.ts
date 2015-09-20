module LightReader.core
{
    /**
    * Define a route historic state
    */
    export class Route
    {
        public url: string;

        public args: any;

        constructor(url: string, args: any)
        {
            this.url = url;
            this.args = args;
        }
    }
}