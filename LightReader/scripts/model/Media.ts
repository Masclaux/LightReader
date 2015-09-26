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

        public illustration: Image;

        public synopsis: String = "test synopsis ";

        public volumeList: Array<Volume>;
    }
}