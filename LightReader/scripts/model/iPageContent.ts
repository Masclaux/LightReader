﻿module LightReader
{
    //Every page class need to implement this interface
    export interface iPageContent
    {
        //return page content
        Get(): string;
    }
}