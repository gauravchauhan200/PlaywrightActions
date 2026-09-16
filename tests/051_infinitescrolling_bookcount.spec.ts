import { test, expect } from '@playwright/test'

test('Count Total Books in the page',async({ page })=>{
    
    test.slow(); // Triple the default timeout (30s ->90s)
    await page.goto('https://www.booksbykilo.in/new-books?pricerange=201to500');

    let previousHeight = 0;
    while(true)
    {
        const allBooks = await page.locator('#productsDiv h3').count();                 // Count all books currently loaded
        await page.evaluate(()=>{window.scrollTo(0,document.body.scrollHeight)});       // scroll to last page
        await page.waitForTimeout(1000);                                                // Wait for lazy loading
        const currentHeight = await page.evaluate(()=>{return document.body.scrollHeight}); //currentHeight

       // console.log(`Previous Height: ${previousHeight}`);
       // console.log(`Current Height : ${currentHeight}`);

        if(previousHeight === currentHeight)                                           // No new content loaded
            {   console.log(`Total Numbers of Books: ${allBooks}`);
                console.log('****** End of the Page ******');
                break;}
        previousHeight = currentHeight;
    }


})