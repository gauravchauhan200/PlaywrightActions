import {test, expect,Locator} from "@playwright/test";



test("VerifyTestBox",async({page})=>{

await page.goto("https://testautomationpractice.blogspot.com/");

const nameText: Locator = page.locator('#name');

await expect(nameText).toBeEnabled();
await expect(nameText).toBeVisible();
const namelenght: string | null = await nameText.getAttribute("maxlength");
expect(namelenght).toBe("15");
await nameText.fill("Playwright");
expect(await nameText.inputValue()).toBe("Playwright");
await page.waitForTimeout(3000);

});


test.only("Verify RadioBtn Action ", async function({page}) {
    
    await page.goto("https://testautomationpractice.blogspot.com/");

    const maleRadioBtn : Locator =  page.locator('#male');
    const femaleRadioBtn : Locator = page.getByLabel('Female');

    await expect(maleRadioBtn).toBeVisible();
    await expect(maleRadioBtn).toBeEnabled();
    await maleRadioBtn.check();
    expect(await maleRadioBtn.isChecked()).toBe(true);
    await femaleRadioBtn.check();
    await page.waitForTimeout(2000);


})