module LightReader
{
    export class Source
    {
        public name: String;

        public url: String;

        public logoUrl: ImageContent;

        public description: String;

        public novelList: Array<Media>;

        constructor()
        {
            this.novelList = new Array<Media>();

            this.logoUrl = new ImageContent();
            this.logoUrl.title = "logo";
            this.logoUrl.localUrl = "logo.gif"
            this.logoUrl.url = "logo.gif"
        }
    }
} 