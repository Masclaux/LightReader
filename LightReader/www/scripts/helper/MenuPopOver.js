var LightReader;
(function (LightReader) {
    var MenuPopOver = (function () {
        function MenuPopOver() {
        }
        //init menu pop over
        MenuPopOver.Init = function () {
            var menu = $('#menu');
            menu.webuiPopover({ title: 'Menu', width: '300', content: MenuPopOver.menuContent, placement: 'bottom-left', cache: false });
        };
        //destory all instance of pop over
        MenuPopOver.Destroy = function () {
            var menu = $('#menu');
            menu.webuiPopover('destroy');
            var popOver = $(document.body).find(".webui-popover");
            popOver.remove();
        };
        //dropdown menu content
        MenuPopOver.menuContent = '<a class="item" href="Options.html" ><i class="icon ion-android-settings"></i> Options</a>';
        return MenuPopOver;
    })();
    LightReader.MenuPopOver = MenuPopOver;
})(LightReader || (LightReader = {}));
//# sourceMappingURL=MenuPopOver.js.map