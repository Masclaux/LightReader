module LightReader.view
{
    import core = LightReader.core;

    export class Reader implements LightReader.core.iPage
    {
        public Ready(element: HTMLElement, options: any): void
        {
            var swiper: Swiper = new Swiper('.swiper-container');

            var volume: Volume = new Volume();
            var chapter: Chapter = new Chapter();
            
            var page: TextContent = new TextContent();
            page.content = '  <h2>Chapter 1 『To this 《Shield》———』</h2>';           
            chapter.pages.push(page);
            
            var image: ImageContent = new ImageContent();
            image.url = 'https://www.baka-tsuki.org/project/images/1/15/Absolute_Duo_Volume_1_Colour_5.jpg';
            chapter.pages.push(image);
            
            page = new TextContent();
            page.content = '  <p>“That’s strange. Kuroko, didn’t this place used to have Monday releases a day early?”</p>';
            chapter.pages.push(page);

            volume.chapterList.push(chapter);
        }

        public Exit(element: HTMLElement): void
        {
        }

        public PinchToZoom(x: number, y: number, scaling: number) :void
        {

        }
    }
}