module LightReader
{
    //collection of useful methods
    export class ModelHelper
    {
        /**
        * Return page content ( if ImageContent or TextContent)
        */
        public static Get(content: any): string
        {
            if (content.content != null) //page content
            {
                return content.content;
            }
            else if (content.isLocal != null && content.isLocal == true) //image content
            {
                return content.localUrl;
            }
            else
            {
                return content.url;
            }

            return "";
        }
    }
}