var LightReader;
(function (LightReader) {
    //Application model Singleton Instance
    var AppModel = (function () {
        function AppModel() {
            this.databaseName = "sourcesDatas.json";
            //list of sources
            this.sources = new Array();
            if (AppModel.inst) {
                throw new Error("Error: Instantiation failed: Use AppModel.getInstance() instead of new.");
            }
            AppModel.inst = this;
        }
        //return object instance
        AppModel.Inst = function () {
            return AppModel.inst;
        };
        AppModel.prototype.InitDataBase = function () {
            var adapter = new LokiCordovaFSAdapter({ "prefix": "loki" });
            var db = new loki(this.databaseName, {
                autosave: true,
                autosaveInterval: 1000,
                adapter: adapter
            });
            if (db != null) {
                db.save(function (err) { "Error while creating database " + err; });
            }
        };
        AppModel.inst = new AppModel();
        return AppModel;
    })();
    LightReader.AppModel = AppModel;
})(LightReader || (LightReader = {}));
//# sourceMappingURL=AppModel.js.map