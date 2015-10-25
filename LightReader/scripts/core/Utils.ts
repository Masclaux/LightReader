module LightReader
{
    //collection of useful methods
    export class Util
    {
        /**
        * Detect if application run on ripple
        * @return true if on ripple then false
        */
        public static IsRipple(): Boolean
        {
            var parent: any = window.parent;
            return parent.ripple != null;
        }
    }
}