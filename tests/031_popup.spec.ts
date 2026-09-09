import {test,expect} from '@playwright/test'

test('Commom pop overlay',async({ page })=>{

    await page.goto("https://sdetqa.vercel.app/autoplay");
    
    await page.getByRole('button',{name:'Popup'}).click();
    
    const popupBox = page.locator('.popup-card');
    await expect(popupBox).toBeVisible();

    await expect(page.getByRole('heading',{name:'Be always in touch'})).toBeVisible();

    await popupBox.getByRole('button',{name:'Yes'}).click();
    await expect(popupBox).toBeHidden();    
    
    await page.waitForTimeout(2000);


})