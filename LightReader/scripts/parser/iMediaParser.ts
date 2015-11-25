module LightReader.parser
{
    export interface iMediaParser
    {
        //delegate  call when medias parsing is completed
        onMediaComplete: any;

        //Download and Parse the list of medias
        ParseMedia(): void;

        //Update medias list 
        UpdateMedia(): void;
    }
} 