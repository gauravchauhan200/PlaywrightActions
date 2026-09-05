import {test,expect} from "@playwright/test";
/*
test("title",()=>{

    //step1
    //step2
    //step3

    })
*/

//fixture- global variable: page, browser

test("Verify page title",async({page})=>{ 
    
    await page.goto("https://playwright.dev/");
    await expect(page).toHaveTitle("Fast and reliable end-to-end testing for modern web apps | Playwright");

})

test("verify the url",async({page})=>{

await page.goto("https://playwright.dev/");
await expect(page).toHaveURL(/playwright.dev/);

        

}) 