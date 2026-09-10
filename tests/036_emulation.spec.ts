import { test, devices } from '@playwright/test'


//create your own Emulator

test('Emulator test on iphone15',async({ browser })=>{

    const context = await browser.newContext({...devices['Pixel 8 Pro']});

    const page = await context.newPage();
    await page.goto('https://www.google.com/');
    await page.waitForTimeout(5000);

})

// we can use Emulator setup from playwright.config.ts file

    /*
    {
        name: 'Mobile Safari',
        use : {...devices['iPhone 15']},
        }
    */

        test('Emulator test on iPhone 15 from config file',async({page})=>{

            await page.goto('https://www.google.com/');
            await page.waitForTimeout(5000);
        })