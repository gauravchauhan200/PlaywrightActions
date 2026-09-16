import { test, expect } from '@playwright/test';


test('Lazy loading page',async({ page })=>{

    await page.goto('https://www.booksbykilo.in/new-books?pricerange=201to500');
   
    // Get current scroll height

    let previousHeight =0;
    
    while(true)
    {
        await page.evaluate(()=>{ window.scrollTo(0,document.body.scrollHeight)})
        await page.waitForTimeout(1250);
        const currentHeight = await page.evaluate(()=>{return document.body.scrollHeight;})        

        console.log("-------------");
        console.log(`PreviousHeight: ${previousHeight}`); 
        console.log(`currentHeight: ${currentHeight}`);

        if(previousHeight==currentHeight)
        {
            break;
        }
        previousHeight=currentHeight;
    }

    console.log('You have reached the End');
})
