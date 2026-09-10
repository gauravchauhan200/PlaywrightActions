import {test, chromium} from '@playwright/test'


//Browser -> context -> page

test('Browser Context', async()=>{

    //Created chromium browser
    const browser = await chromium.launch();
  
    //creating context
    const context1 = await browser.newContext();
    const context2 = await browser.newContext();

    //creating pages
    const context1page = await context1.newPage();
    const context2page =  await context2.newPage()

    await context1page.goto('https://www.saucedemo.com/');
    await context2page.goto('https://www.saucedemo.com/');

    await context1page.waitForTimeout(4000);
    await context2page.waitForTimeout(4000);

    await context1.close();
    await context2.close();

    await browser.close();

})