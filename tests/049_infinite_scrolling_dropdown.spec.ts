import { test,expect } from '@playwright/test'
// 1. Open the application
// await page.goto('https://sdetqa.vercel.app/autoplay.html');
 //2. Locate the dropdown
 // keep scrolling drowpdown till item is visible
 // 3. Select the option (Playwright handles scrolling automatically)
 // 4. Verify the selected value

 test('Select Item 50 from dropdown',async({ page })=>{

     await page.goto('https://sdetqa.vercel.app/autoplay.html');
    
    const dropdown=  page.locator('#scrollable');
 
    //Keep Scrolling dropdown till item is visible

    await dropdown.evaluate(async(select:HTMLSelectElement)=>{

        while(true){
            const itemFound = Array.from(select.options).some(option =>option.text === 'Item 200');
            if(itemFound)
                {
                    break;
                }

            //scroll to the bottom to load more items
            select.scrollTop = select.scrollHeight; 
                
            //wait for new items to load
            await new Promise((resolve) => setTimeout(resolve,100));
        }
      
    })
        // 3. Select the option (playwright handles scrolling automatically)
        await dropdown.selectOption({ label: 'Item 200'});

        // 4. verify the selected value
        await expect(dropdown).toHaveValue('Item 200');
        await page.waitForTimeout(5000);
        await page.close();


})




 
