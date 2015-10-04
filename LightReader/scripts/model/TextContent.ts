module LightReader
{
    //A textual page
    export class TextContent implements iPageContent
    {
        public content:string = "";

        public Get():string
        {
            return this.content;
        }
    }
}