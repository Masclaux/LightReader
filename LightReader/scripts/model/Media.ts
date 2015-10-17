module LightReader
{
    export class Media
    {
        constructor()
        {
            this.volumeList = new Array<Volume>();
        }

        public url: string;

        public title: string;

        public illustration: ImageContent;

        public synopsis: String = "test synopsis ";

        public volumeList: Array<Volume>;

        public lastUpdate: Date;
    }
}