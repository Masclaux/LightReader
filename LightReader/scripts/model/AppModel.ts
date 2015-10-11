module LightReader
{
    //workaround for loki and is file adapter typescript description file
    declare var loki: any;
    declare var LokiCordovaFSAdapter: any;

    //Application model Singleton Instance
    export class AppModel
    {
        private static inst: AppModel = new AppModel();

        private databaseName: string = "sourcesDatas.json";

        public dataBase: Loki;

        //List of parsers
        public parsers: Array<LightReader.parser.iParser> = new Array<LightReader.parser.iParser>();

        //list of sources
        public sources: Array<Source> = new Array<Source>();

        //loki database of sources
        private internalSource: LokiCollection<Source>;

        //
        public onDataBaseReady: any;

        //return object instance
        public static Inst(): AppModel
        {
            return AppModel.inst;
        }

        constructor()
        {
            if (AppModel.inst)
            {
                throw new Error("Error: Instantiation failed: Use AppModel.getInstance() instead of new.");
            }

            AppModel.inst = this;
        }

        //Start dataBase loading and call onDataBaseReady when completed
        public InitDataBase(): void
        {
            var adapter = new LokiCordovaFSAdapter({ "prefix": "loki" });
            this.dataBase = new loki(this.databaseName,
                {
                    autosave: true,
                    autosaveInterval: 1000, // 1 second
                    autoload: true,
                    adapter: adapter,
                    autoloadCallback: this.OnDataBaseLoaded
                });
        }

        private OnDataBaseLoaded = (): void =>
        {
            if (this.onDataBaseReady)
            {
                this.onDataBaseReady();
            }
            else
            {
                console.warn("No handler attached to onDataBaseReady");
            }
        }

        //Load datas from database
        public Load(): void
        {
            this.internalSource = this.dataBase.getCollection<Source>("collections");
            if (this.internalSource != null)
            {
                this.sources = new Array<Source>();
                for (var i: number = 0; i < this.internalSource.count(); i++)
                {
                    this.sources.push(this.internalSource.data[i]);
                }
            }
        }

        //Verify if database contain sources
        public Exist(): boolean
        {
            if (this.dataBase != null)
            {
                return this.internalSource != null && this.sources.length > 0;
            }
            else
            {
                console.error("Database not initialised !");
            }

            return false;
        }

        //save or update  model to database
        public Save(): void
        {
            if (this.internalSource == null)
            {
                this.internalSource = this.dataBase.addCollection<Source>("collections");
            }

            for (var i: number = 0; i < this.sources.length; i++)
            {
                if (this.internalSource.maxId - 1 < i)
                {
                    console.info("Adding new Source in database");
                    this.internalSource.insert(this.sources[i]);
                }
                else
                {
                    this.internalSource.update(this.sources[i]);
                }
            }
        }
    }
} 