module LightReader
{
    export class Chapter
    {
        constructor()
        {
            this.pages = new Array<iPageContent>();
        }

        public title: string;

        public url: string;
         
        public pages: Array<iPageContent>;
    }
} 