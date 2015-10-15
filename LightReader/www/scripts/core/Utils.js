var LightReader;
(function (LightReader) {
    //collection of useful methods   
    var Util = (function () {
        function Util() {
        }
        /**
        * Detect if application run on ripple
        * @return true if on ripple then false
        */
        Util.IsRipple = function () {
            var parent = window.parent;
            return parent.ripple != null;
        };
        return Util;
    })();
    LightReader.Util = Util;
})(LightReader || (LightReader = {}));
//# sourceMappingURL=Utils.js.map