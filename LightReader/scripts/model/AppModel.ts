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

        //list of sources
        public sources: Array<Source> = new Array<Source>();

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
        
        public InitDataBase(): void
        {   
            var adapter = new LokiCordovaFSAdapter({ "prefix": "loki" }); 
            var db: Loki = new loki(this.databaseName,
                {
                    autosave: true,
                    autosaveInterval: 1000, // 1 second
                    adapter: adapter
                });
               
            if (db != null)
            {
                db.save(function (err: Error) { "Error while creating database " + err });
            }         

        }

    }
} 