module LightReader
{
    //A page image
    export class ImageContent implements iPageContent
    {
        public title: string;

        public url: string;

        public localUrl: string;

        public isLocal: boolean = false;
    }
} 