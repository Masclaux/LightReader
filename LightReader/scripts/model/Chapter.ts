module LightReader
{
    export class Chapter
    {
        constructor()
        {
            this.pages = new Array<string>();
        }

        public title: string;

        public url: string;

        public images: { [id: string]: Image; } = {};

        public pages: Array<string>;
    }
} 