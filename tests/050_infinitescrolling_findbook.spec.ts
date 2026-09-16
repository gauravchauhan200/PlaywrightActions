import { test , expect } from '@playwright/test'

// Get all book titles currently loaded on the page
// Check if the target book is in the list
// Scroll to the bottom
// Wait for new content to load
// Get current scroll height
// Check if end of page is reached

test('Find A Book in the page',async({ page })=>{
    await page.goto('https://www.booksbykilo.in/new-books?pricerange=201to500');

    //test.slow();
    test.setTimeout(80000);
   
    let bookFound = false;
    let previousHeight = 0;
    
    while(true)
    {   
        // Get all book titles currently loaded on the page
        const titles = await page.locator('#productsDiv h3').allTextContents();

        // Check if the target book is in the list
        if(titles.includes(' Treasure '))
        {
            console.log('Book found!');
            bookFound = true;
            expect(bookFound).toBeTruthy();
            break;
        }

        // Scroll to the bottom
        await page.evaluate(()=>{
           window.scrollTo(0,document.body.scrollHeight);  
        })

        await page.waitForTimeout(2000);

         // Get current scroll height
        const currentHeight = await page.evaluate(()=>{
            return document.body.scrollHeight;
        })

        console.log("==============================")
        console.log(`Previous height: ${previousHeight}`);
        console.log(`Current height: ${currentHeight}`);

        // Check if end of page is reached
        if(currentHeight === previousHeight)
        {break;}

        previousHeight = currentHeight;
    }

    console.log('--------- Reached end of the page-------');

        if(!bookFound)
        {
            console.log('Book Not Found!')
        }

})