import { test } from '@playwright/test'

// Browser context level setting

test('Browser context option',async ({browser})=>{

    const context = await browser.newContext(

        
        {
            // Dark Theme
            colorScheme: 'dark',
            
            //Browser Permissios
            permissions:[
                'notifications',
                'geolocation',
                'microphone'
            ],

            // language

            locale: 'en-IN',

            //Time Zone
            timezoneId: 'Asia/Kolkata',

            //view port size

            viewport:{
                width:1280,
                height:720
            },

            // Fake GPS Location
            geolocation: {
                latitude: 17.3843,
                longitude: 78.4583
            },

            //Ignore HTTPS certificate errors

            ignoreHTTPSErrors:true
    
        }
    )

    const page = await context.newPage();
    await page.goto('https://www.google.com/');
    //await page.goto("https://expired.badssl.com/");

    await page.waitForTimeout(5000)    

})

//Page Level Settings
test("page options demo", async ({ page }) => {

    //await page.setViewportSize({width:1920, height : 1080})

    //minimizing the pase
    //Playwright does not directly supported
    await page.setViewportSize({ width: 1, height: 1 })

    // Navigate
    await page.goto('https://www.google.com/');
    await page.waitForTimeout(5000);

})