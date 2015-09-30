module LightReader.parser
{
    export interface iChapterParser
    {
        //Download and Parse chapter
        ParseChapters(volume: Volume): void;
    }
} 