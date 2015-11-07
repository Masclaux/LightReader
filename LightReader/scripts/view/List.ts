﻿module LightReader.view
{
    export class List implements LightReader.core.iPage
    {
        private router: core.Router = core.Router.Inst();

        private source: Source;

        constructor() { }

        public Ready(element: HTMLElement, options: any): void
        {
            this.source = options;
            Rivets.bind(element, this);

            var menu: any = $('#menu');
            menu.webuiPopover({ title: 'Menu', width: '300', content: AppModel.menuContent, placement: 'bottom-left' });
        }

        public Exit(element: HTMLElement): void
        {
        }

        public OnMediaSelected = (event: Event, datas: any): void =>
        {
            var media: Media = this.source.novelList[datas.index];
            if (media.lastUpdate == null || media.volumeList.length == 0)
            {
                this.router.Navigate("Load.html", { command: LightReader.view.Load.MEDIA, datas: media }, false);
            }
            else
            {
                this.router.Navigate("Detail.html", { media: media });
            }
        }

        public OnBack = (event: Event, datas: any): void =>
        {
            this.router.Back();
        }
    }
}