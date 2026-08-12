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


test("Verify RadioBtn Action ", async function({page}) {
    
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

test.only("CheckBoxAction",async function({page}){

    await page.goto("https://testautomationpractice.blogspot.com/");
    const sundayCheckbox :Locator = page.getByLabel('sunday');
    await sundayCheckbox.check();
    await expect(sundayCheckbox).toBeChecked(); 
    await sundayCheckbox.uncheck();

    // 2. capture all checkboxes and assert each is checked

    const days:string[] = ['Sunday','monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    const checkboxLocs: Locator[] = days.map(index=> page.getByLabel(index));

    expect(checkboxLocs.length).toBe(7);
  
    for(const checkbox of checkboxLocs)
        {
            await checkbox.check();
            await expect(checkbox).toBeChecked();
        }
        await page.waitForTimeout(2000);
    // 4. Uncheck last 3 checkboxs and assert
        
    for(const checkbox of checkboxLocs.slice(-3))
        {
            await checkbox.uncheck();
            await expect(checkbox).not.toBeChecked()
        }
    await page.waitForTimeout(2000);
    //5 Toggle checkboxes: if checked, uncheck, if unchecked,check. Assert state flipped

        for(const checkbox of checkboxLocs)
        {
            if (await checkbox.isChecked()==true)
            {
            await checkbox.uncheck();
            await expect(checkbox).not.toBeChecked();
            }

        else{
            await checkbox.check();
            await expect(checkbox).toBeChecked();
           }
        }   

    await page.waitForTimeout(2000);

    //6 select checkbox randomly

    const indexes:number[] = [1,3,6];

    for(const i of indexes)
    {
        await checkboxLocs[i].check();
        await expect(checkboxLocs[i]).toBeChecked();

    }
    await page.waitForTimeout(5000);

    //7. Select the checkbox based on the label

    const weekName:string = "Friday";

    for(const label of days)
    {
        if(label.toLowerCase() ===weekName.toLocaleLowerCase())
        {
        const checkbox = page.getByLabel(label);
        checkbox.uncheck();
        await expect(checkbox).not.toBeChecked();
        }
    }

     await page.waitForTimeout(5000);

});




    