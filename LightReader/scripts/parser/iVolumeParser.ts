module LightReader.parser
{
    export interface iVolumeParser
    {
        //result
        media: Media;

        //delegate  call when volume parsing is completed
        onVolumeListComplete: any;

        //Download and Parse a media
        parseVolume(media: Media): void;
    }
} 