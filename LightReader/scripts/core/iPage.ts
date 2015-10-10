declare module LightReader.core
{
    export class iPage
    {
        public Ready(element: HTMLElement, options: any): void;

        public Exit(element: HTMLElement): void;
    }
}