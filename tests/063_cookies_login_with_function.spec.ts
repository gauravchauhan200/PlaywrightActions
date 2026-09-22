import { test, expect, Browser, Cookie} from '@playwright/test'

const appURL = 'https://sdetqa.vercel.app/login_app';


// Functin which logs in and returns cookies
async function getCookiesFromApp(browser:Browser) {
   
    //Create a browser context
    const context =  await browser.newContext();
    const page = await context.newPage();

    //Open application
    await page.goto(appURL);

    //Login
    await page.getByRole('textbox', { name: 'Username' }).fill('admin');
    await page.getByLabel('Password').fill('admin123');

    //Select Cookie option
    await page.getByLabel('🍪 Cookie').check();

    //Click Login
    await page.getByRole('button', { name: 'Login' }).click();

    //Verify Login
    await expect(page.getByText('Dashboard Welcome', { exact: true })).toBeVisible();
    
    //Get all cookies
    const cookies = context.cookies();

    console.log('Cookies captured successfully');

    //Close context
    await context.close();

    //Return cookies
    return cookies;

}

test('Login using saved cookies',async({ browser })=>{

    //Get cookies from the application
    const savedCookies = await getCookiesFromApp(browser); // Passing browser to the function

    //Create a fresh browser context
    const context = await browser.newContext();
    
    // restore the cookies
    await context.addCookies(savedCookies);

    console.log('Cookies stored successfully');
    
    //Open new page
    const page = await context.newPage()

    //Navigate to the application

    await page.goto(appURL);

    //Verify user is logged in automatically
    await expect(page.getByText('Dashboard Welcome', { exact: true })).toBeVisible();

    console.log('Login using cookies successful');

})
