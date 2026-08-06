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


