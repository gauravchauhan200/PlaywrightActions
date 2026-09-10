import { test , expect} from '@playwright/test'

test('page fixture test',async({ page })=>{

    await page.goto('https://demowebshop.tricentis.com/');
    await page.getByText('Register').click();
    await expect(page).toHaveURL(/register/);
    
})

//browser -> context -> page
//context (incognito mode)

test('context fixture test', async({ context })=>{

    const mypage1 = await context.newPage();
    await mypage1.goto('https://demowebshop.tricentis.com/');
    await mypage1.getByText('Register').click();
    await expect(mypage1).toHaveURL(/register/);
    
    const mypage2 = await context.newPage();
    await mypage2.goto('https://www.google.com/');
    await expect(mypage2).toHaveURL(/google/);

})

test('browser fixture test',async ({ browser })=>{

    //context 1

    const context1= await browser.newContext();
    const page1= await context1.newPage();
    await page1.goto("https://www.rediff.com/");
        
    const page2 = await context1.newPage();
    await page2.goto('https://www.google.com/');

    //context 2

    const context2= await browser.newContext();
    const mypage1= await context2.newPage();
    await mypage1.goto("https://www.rediff.com/");
        
    const mypage2 = await context2.newPage();
    await mypage2.goto('https://www.google.com/');

    await context1.close();
    await context2.close();
})