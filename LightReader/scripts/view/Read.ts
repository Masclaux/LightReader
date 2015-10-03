module LightReader.view
{
    import core = LightReader.core;

    export class Read implements LightReader.core.iPage
    {
        private router: core.Router = core.Router.Inst();

        private model: AppModel = AppModel.Inst();

        public Ready(element: HTMLElement, options: any): void
        {
            ko.applyBindings(this, element);
        }

        public Exit(element: HTMLElement): void
        {
            //clean binding ( I know is not recommended )
            ko.cleanNode(element);
        }
    }
}