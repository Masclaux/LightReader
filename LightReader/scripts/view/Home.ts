module LightReader.view
{
    import core = LightReader.core;

    export class Home implements LightReader.core.iPage
    {
        private router: core.Router = core.Router.Inst();

        private model: AppModel = AppModel.Inst();

        private sources: KnockoutObservableArray<Source>;

        public Ready(element: HTMLElement, options: any): void
        {
            //data binding
            this.sources = ko.observableArray(this.model.sources);

            ko.applyBindings(this, element);
        }

        public Exit(element: HTMLElement): void
        {
            //clean binding ( I know is not recommended )
            ko.cleanNode(element);
        }

        public OnSourceSelected = (source: Source, id: number): void =>
        {
            this.model.currrentSource = id;
            this.router.Navigate("List.html", source);
        }
    }
}