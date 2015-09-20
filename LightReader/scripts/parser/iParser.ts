module LightReader.parser
{
    export interface iParser
    {
        //resultat 
        source: Source;

        //delegate  call when source parsing is completed
        onSourceComplete: any;

        //Parse Media detail
        mediaParser: iMediaParser;

        //Parse volume detail
        volumeParser: iVolumeParser;

        //Parse chapter detail
        chapterParser: iChapterParser;

        //Download and Parse  all required datas from the source.
        parse(): void;
    }
} 