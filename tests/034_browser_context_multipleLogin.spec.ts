import { test, chromium} from "@playwright/test"

test('Browser context demo for two different users',async()=>{

    const browser = await chromium.launch();

    const user1context = await browser.newContext();
    const user2context = await browser.newContext();

    const user1page = await user1context.newPage();
    const user2page = await user2context.newPage();

    await user1page.goto('https://www.saucedemo.com/');
    await user2page.goto('https://www.saucedemo.com/');

    //login as user1

    await user1page.locator('#user-name').fill('standard_user');
    await user1page.locator('#password').fill('secret_sauce');
    await user1page.locator('#login-button').click();

    //login as user 2

    await user2page.locator('#user-name').fill('visual_user');
    await user2page.locator('#password').fill('secret_sauce');
    await user2page.locator('#login-button').click();

    await user1page.waitForTimeout(3000);
    await user2page.waitForTimeout(3000);

    await user1context.close();
    await user2context.close();
    await browser.close();

})