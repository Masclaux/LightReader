var LightReader;
(function (LightReader) {
    //Application model Singleton Instance
    var AppModel = (function () {
        function AppModel() {
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
        AppModel.inst = new AppModel();
        return AppModel;
    })();
    LightReader.AppModel = AppModel;
})(LightReader || (LightReader = {}));
//# sourceMappingURL=AppModel.js.map