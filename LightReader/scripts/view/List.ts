module LightReader.view
{
    export class List implements LightReader.core.iPage
    {
        private router: core.Router = core.Router.Inst();

        private source: Source;

        private mediaList: KnockoutObservableArray<Media>;

        constructor() { }

        public Ready(element: HTMLElement, options: any): void
        {
            this.source = options;

            //data binding
            this.mediaList = ko.observableArray(this.source.novelList);

            ko.applyBindings(this, element);
        }

        public Exit(element: HTMLElement): void
        {
            //clean binding ( I know is not recommended )
            ko.cleanNode(element);
        }
    }
}