module LightReader.view
{
    export class List implements LightReader.core.iPage
    {
        private router: core.Router = core.Router.Inst();

        constructor() { }

        public Ready(element: HTMLElement, options: any): void
        {
        }

        public Exit(element: HTMLElement): void
        {
            //clean binding ( I now is not recommended )
            ko.cleanNode(element);
        }
    }
}