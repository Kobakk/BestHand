import puppeteer from "puppeteer";

async function scraping(url) {
    try{
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.goto(url);
        await page.waitForSelector('.ItemCard__price.ItemCard__price--bold');
    
        const prices = await page.evaluate(() => {
            const domElement = document.querySelectorAll('.ItemCard__price.ItemCard__price--bold');
            console.log(domElement);
            return Array.from(domElement, aux => aux.textContent.trim()).slice(0, 40);
        })
        const titles = await page.evaluate(() => {
            const titleElement = document.getElementsByClassName('ItemCardList grid-lg-4 grid-md-3 grid-sm-2 grid-xl-4 grid-xs-2 m-auto w-100')[0];
            return Array.from (titleElement.children)
                .map(child => child.title.trim())
                .slice(0, 40)
        })
        console.log(prices);
        console.log(titles)
        await browser.close();
    } catch(error){
        console.error('Error: ', error);
    }
}


let url = 'https://es.wallapop.com/app/search?keywords=MacBook%20Pro%202019%20i7%2015&filters_source=quick_filters&longitude=-3.69196&latitude=40.41956&min_sale_price=200';
scraping(url);