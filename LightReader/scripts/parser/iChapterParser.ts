module LightReader.parser
{
    export interface iChapterParser
    {
        //delegate  call when a chapter is completed
        onChaptersComplete: any;

        Volume: Volume;

        //Download and Parse chapter
        ParseChapters(volume: Volume): void;
    }
} 