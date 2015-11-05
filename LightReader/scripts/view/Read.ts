//reference to swiper js lib
declare var Swiper: any;

module LightReader.view
{
    import core = LightReader.core;

    export class Read implements LightReader.core.iPage
    {
        private router: core.Router = core.Router.Inst();

        //current volume
        private volume: Volume;

        //curent chapter
        private chapter: Chapter;

        //curent page index
        private currentPage: number = 0;

        //curent chapter index
        private currentChapter: number = 0;

        //list of swiper content
        private pages: JQuery;
   
        //reference of swiper lib
        private swiper: any;

        //reference of hammer
        private hammer: HammerManager;

        public Ready(element: HTMLElement, options: any): void
        {            
            this.volume = options;
            this.chapter = this.volume.chapterList[this.currentChapter];

            Rivets.bind(element, this);
            this.swiper = new Swiper('.swiper-container',
                {
                    'observer': true,
                    'observeParents': false,
                    'onTransitionEnd': this.OnNewSlide,
                });
                       

            this.hammer = new Hammer(element,{
                touchAction: 'pan-y'
            });

            this.hammer.add(new Hammer.Pinch());
            this.hammer.on('pinch', this.OnPinch);

            this.pages  = $("swiper-content");

            this.pageTo(0, 2);
            this.swiper.slideTo(0, 0, false); //set first
        }

        public Exit(element: HTMLElement): void
        {
            this.hammer.destroy(); 
        }

        public PinchToZoom = (x: number, y: number, scaling: number, image: JQuery): void =>
        {
            image.css({ 'height': this.swiper.height * scaling });
            image.css({ 'width': this.swiper.width * scaling });
        }

        public pageTo(start: number, end: number)
        {
            console.info("Show page " + start + " to " + end);
            if (start >= 0)
            {
                //check if end is beyond
                if (this.chapter.pages.length <= end && this.chapter.pages.length >= 3)// yeah chapter below 2 page exist
                {
                    this.pageTo(this.chapter.pages.length - 3, this.chapter.pages.length - 1);
                    this.swiper.slideTo(2, 0, false); //set last

                    return;
                }

                var slide: number = 0;
                for (var i = start; i <= end; i++)
                {
                    var content: any = this.chapter.pages[i];
                    if (content != null) // chapter less than 3 pages
                    {
                        if (content.url != null)
                        {
                            this.pages[slide].innerHTML =
                            "<zoomable>" +
                            "<img src='" + ModelHelper.Get(this.chapter.pages[i]) + "' style='width:100%'/>" +
                            "</zoomable>";
                        }
                        else
                        {
                            this.pages[slide].innerHTML = ModelHelper.Get(this.chapter.pages[i]);
                        }
                    }
                    else
                    {
                        this.pages[slide].innerHTML = "<p></p>";
                    }
                                      
                    this.pages[slide].style.height = window.innerHeight + 'px';                    
                    slide++;
                }

                this.currentPage = end
            }
            else
            {
                this.pageTo(0, 2);//restart to the first
                this.swiper.slideTo(0, 0, false); //set first

                return;
            }

            this.swiper.slideTo(1, 0, false); //set middle slide active
        }

        public OnNewSlide = (swiper: any): void =>
        {
            if (swiper.activeIndex != swiper.previousIndex
                && (swiper.activeIndex == 2 || swiper.activeIndex == 0))
            {
                if (swiper.activeIndex > swiper.previousIndex)
                {
                    this.pageTo(this.currentPage - 1, this.currentPage + 1);
                }
                else
                {
                    this.pageTo(this.currentPage - 3, this.currentPage - 1);
                }
            }
        }

        public OnPinch = (event: HammerInput): void =>
        {
            var image: JQuery = $(".swiper-slide-active zoomable img");
            if (image.length > 0)
            {
                this.PinchToZoom(event.deltaX, event.deltaY, event.scale, image);
            }
        }

        public OnPreviousClick = (event: Event, datas: any): void =>
        {
            if (this.currentChapter > 0)
            {
                this.currentChapter--;
                this.chapter = this.volume.chapterList[this.currentChapter];

                this.pageTo(this.chapter.pages.length - 3, this.chapter.pages.length - 1);
                this.swiper.slideTo(2, 0, false); //set last
            }
        }

        public OnNextClick = (event: Event, datas: any): void =>
        {
            if (this.currentChapter + 1 < this.volume.chapterList.length)
            {
                this.currentChapter++;
                this.chapter = this.volume.chapterList[this.currentChapter];

                this.pageTo(0, 2);
                this.swiper.slideTo(0, 0, false); //set first
            }
        }
    }
}