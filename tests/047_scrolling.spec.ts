import { test, expect } from '@playwright/test'

    /*
    Most of the time, Playwright will automatically scroll for you before doing any actions. 
    Therefore, you do not need to scroll explicitly (Excluding Infinite Scrolling page).

    ways to scrolling the page:

    1. Scroll by Pixel Values
        Moves the window by a specified number of pixels relative to its current position.

    2. Scroll to a Specific Element
        Brings a target element directly into the browser viewport

    3. Scroll to bottom of the document
        Moves the view directly to the top or the very bottom of the document
        
    4. Scroll Continuously (Infinite Scroll)
    */

    const url ='https://www.worldometers.info/geography/flags-of-the-world/';

    test('Automatic scrolling',async({ page })=>{

        await page.goto(url);
        const IndiaFlag = page.locator('img[alt="Flag of India"]');
        await expect(IndiaFlag).toBeVisible();
    })
    
    test('Scroll by Pixel Values',async({ page })=>{

        page.goto(url);
        page.evaluate(()=>{ window.scrollTo(0,2000);})
        const  scrollPosition = await page.evaluate(()=>window.scrollY);
        console.log(scrollPosition);
        expect(scrollPosition).toBe(2000);

    })
    
    test('Scroll to a Specific Element',async({ page })=>{

        await page.goto(url);
        const japanFlag =  page.getByAltText('Flag of Japan');
    //  Scroll until the India flag becomes visible
        await japanFlag.scrollIntoViewIfNeeded();
        await expect(japanFlag).toBeVisible();
    })

    test('Scroll to bottom of the document',async({ page})=>{

        await page.goto(url);
        await page.evaluate(()=>{window.scrollTo(0,document.body.scrollHeight)})
        await expect(page.getByRole('link',{name:'about'})).toBeVisible();
    })

    test('Scroll to bottom then top',async({ page })=>{
        await page.goto(url);
        await page.evaluate(()=>{window.scrollTo(0,-document.body.scrollHeight)})
        await page.waitForTimeout(3000);
    })