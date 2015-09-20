module LightReader
{
    //Application model Singleton Instance
    export class AppModel
    {
        private static inst: AppModel = new AppModel();

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
    }
} 