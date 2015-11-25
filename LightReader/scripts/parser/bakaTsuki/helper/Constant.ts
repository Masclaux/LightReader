module LightReader.parser.bakaTsuki
{
    export class Constant
    {
        //main url
        public static MAIN_URL: string = "https://baka-tsuki.org/";

        //light novel list url
        public static LIST_URL: string = Constant.MAIN_URL + "project/index.php?title=Category:Light_novel_(English)";

        //image url query
        public static IMAGE_QUERY: string = Constant.MAIN_URL
        + "project/api.php?action=query&prop=imageinfo&iiprop=url&format=json&titles=File:";

        //image url
        public static IMAGE_URL: string = Constant.MAIN_URL + "project/images/";
    }
}