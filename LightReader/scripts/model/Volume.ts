module LightReader
{
    export class Volume
    {
        constructor()
        {
            this.chapterList = new Array<Chapter>();
        }

        public title: string;

        public url: string;

        public chapterList: Array<Chapter>;

        public currentPage: Number;

        public lastPos: Number;

        public lastUpdate: Date;
    }
}