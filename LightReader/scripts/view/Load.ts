module LightReader.view
{
    import core = LightReader.core;

    export class Load implements LightReader.core.iPage
    {
        public static SOURCE_LIST: string = "souce_list_update";

        private router: core.Router = core.Router.Inst();

        private model: AppModel = AppModel.Inst();

        public Ready(element: HTMLElement, options: any): void
        {
            ko.applyBindings(this, element);

            switch (options.command)
            {
                case Load.SOURCE_LIST:
                    this.LoadList(options.id)
                    break;
            }
        }

        public Exit(element: HTMLElement): void
        {
            //clean binding ( I know is not recommended )
            ko.cleanNode(element);
        }

        private LoadList(id: number): void
        {
            console.info("Load media list for all sources");

            var sources: Array<LightReader.parser.iParser> = this.model.parsers;
            for (var i: number = 0; i < sources.length; i++)
            {
                sources[i].onSourceComplete = this.OnSourceComplete;
                sources[i].Parse();
            }
        }

        private OnSourceComplete = (media: Array<Media>, index: number = 0): void =>
        {
            this.model.sources[index].novelList = media;
            this.model.Save();

            this.router.Navigate("Home.html");
        }
    }
}