//Auth popup

//https://the-internet.herokuapp.com/basic_auth

import { test, expect } from '@playwright/test'

test('Auth popup',async({ browser })=>{

    const context = await browser.newContext(
        {
            httpCredentials:{
                username: "admin",
                password: "admin"
            }
        }
    )

    //opening new page inside the authenticated context
    const page = await context.newPage();

    // Not a best method
    //await page.goto("http://admin:admin@the-internet.herokuapp.com/basic_auth");

    // Navigate to the URL (without credentials in the URL)
    await page.goto('https://the-internet.herokuapp.com/basic_auth');

    // verify sucessful authentication
    await expect(page.getByText('Congratulations')).toBeVisible();
    await page.waitForTimeout(3000);

})
