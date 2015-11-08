module LightReader
{

    export class MenuPopOver 
    {
        //dropdown menu content
        public static menuContent: string = '<a class="item" href="Options.html" ><i class="icon ion-android-settings"></i> Options</a>';

        //init menu pop over
        public static Init(): void
        {
            var menu: any = $('#menu');
            menu.webuiPopover({ title: 'Menu', width: '300', content: MenuPopOver.menuContent, placement: 'bottom-left', cache: false });
        }

        //destory all instance of pop over
        public static  Destroy(): void
        {
            var menu: any = $('#menu');
            menu.webuiPopover('destroy'); 

            var popOver: JQuery = $(document.body).find(".webui-popover");
            popOver.remove();                           
        } 
    }
}