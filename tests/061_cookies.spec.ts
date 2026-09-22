/*
    In real-world applications, cookies are commonly used for:

    Remembering login sessions
    Saving user preferences (language, theme, currency)
    Authentication (JWT -JSON Web Token/Session ID)
    Tracking user activities
    Personalizing the application

    Browser --> context ---> page


    1. Create Browser Context	    browser.newContext()
    2. Create New Page	            context.newPage()
    3. Add Cookies	                context.addCookies()
    4. Get Cookies	                context.cookies()
    5. Clear Cookies	            context.clearCookies()
*/

import { test, chromium } from '@playwright/test'

test("Cookies demo",async()=>{

    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://playwright.dev/');

    //Add Cookies

    await context.addCookies([
        {
            name:'username',
            value: 'Pavan',
            domain: 'playwright.dev',
            path: '/',
            httpOnly: false,
            secure: true,
            sameSite: 'Lax'
        },
        {
            name: 'auth_token',
            value: 'xyz123secret',
            url: 'https://example.com'
        }
    ])

    // Get all the cookies
    let cookies = await context.cookies();
    console.log("cookies=====> ",cookies);


    //Clear Cookies
    await context.clearCookies();
    cookies = await context.cookies();
    console.log("AfterClearCookies===> ",cookies);


    //Close Context
    await context.close();

    //Close Browser
    await browser.close();

})