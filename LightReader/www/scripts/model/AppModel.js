var LightReader;
(function (LightReader) {
    //Application model Singleton Instance
    var AppModel = (function () {
        function AppModel() {
            var _this = this;
            this.databaseName = "sourcesDatas.json";
            //List of parsers
            this.parsers = new Array();
            //list of sources
            this.sources = new Array();
            this.OnDataBaseLoaded = function () {
                if (_this.onDataBaseReady) {
                    _this.onDataBaseReady();
                }
                else {
                    console.warn("No handler attached to onDataBaseReady");
                }
            };
            if (AppModel.inst) {
                throw new Error("Error: Instantiation failed: Use AppModel.getInstance() instead of new.");
            }
            AppModel.inst = this;
        }
        //return object instance
        AppModel.Inst = function () {
            return AppModel.inst;
        };
        //Start dataBase loading and call onDataBaseReady when completed
        AppModel.prototype.InitDataBase = function () {
            var adapter = new LokiCordovaFSAdapter({ "prefix": "loki" });
            this.dataBase = new loki(this.databaseName, {
                autosave: true,
                autosaveInterval: 1000,
                autoload: true,
                adapter: adapter,
                autoloadCallback: this.OnDataBaseLoaded
            });
        };
        //Load datas from database
        AppModel.prototype.Load = function () {
            this.internalSource = this.dataBase.getCollection("collections");
            if (this.internalSource != null) {
                this.sources = new Array();
                for (var i = 0; i < this.internalSource.count(); i++) {
                    this.sources.push(this.internalSource.data[i]);
                }
            }
        };
        //Verify if database contain sources 
        AppModel.prototype.Exist = function () {
            if (this.dataBase != null) {
                return this.internalSource != null && this.sources.length > 0;
            }
            else {
                console.error("Database not initialised !");
            }
            return false;
        };
        //save or update  model to database
        AppModel.prototype.Save = function () {
            if (this.internalSource == null) {
                this.internalSource = this.dataBase.addCollection("collections");
            }
            for (var i = 0; i < this.sources.length; i++) {
                if (this.internalSource.maxId - 1 < i) {
                    console.info("Adding new Source in database");
                    this.internalSource.insert(this.sources[i]);
                }
                else {
                    this.internalSource.update(this.sources[i]);
                }
            }
        };
        AppModel.inst = new AppModel();
        return AppModel;
    })();
    LightReader.AppModel = AppModel;
})(LightReader || (LightReader = {}));
//# sourceMappingURL=AppModel.js.map