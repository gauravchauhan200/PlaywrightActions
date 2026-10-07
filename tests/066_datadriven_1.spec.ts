import { test, expect } from '@playwright/test'

//testdata
const searchItems:string[] = ['laptop','Gift card','smartphone','monitor'];

//using for-of loop
/*
for(const item of searchItems)
{
    test(`search test for ${item}`,async({ page })=>{
        await page.goto('https://demowebshop.tricentis.com/');
        await page.locator('#small-searchterms').fill(item);
        await page.locator('.search-box-button').click();
        await expect.soft(page.locator('h2 a').nth(0)).toContainText(item,{ignoreCase: true});
    })
}

//using forEach function

searchItems.forEach((item)=>{

test(`search1 test for ${item}`,async ({ page }) => {
            await page.goto('https://demowebshop.tricentis.com/');
            await page.locator('#small-searchterms').fill(item);    // fill teh text in search box
            await page.locator("input[value='Search']").click();    // click on the button
            await expect.soft(page.locator('h2 a').nth(0)).toContainText(item, { ignoreCase: true });  //  check if results appear
        })
})
*/

// describe

test.describe('Searching items',async()=>{
    for(const item of searchItems)
    {
        test(`search test for ${item}`,async({ page })=>{
            await page.goto('https://demowebshop.tricentis.com/');
            await page.locator('#small-searchterms').fill(item);
            await page.locator('.search-box-button').click();
            await expect.soft(page.locator('h2 a').nth(0)).toContainText(item,{ignoreCase: true});
        })
    }
})