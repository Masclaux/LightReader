module LightReader.parser
{
    export interface iVolumeParser
    {
        //Download and Parse a media
        parseVolume(media: Media): void;
    }
} 