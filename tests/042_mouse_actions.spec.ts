import { test, expect} from '@playwright/test'

test.beforeEach('Navigate to the page',async ({page})=>{

    await page.goto('https://sdetqa.vercel.app/autoplay');
    await expect(page).toHaveURL(/autoplay/);
    })
    
    //1. Toggle button test (START / STOP)
    test('Toggle button test',async({ page })=>{

        const toggleBtn =  page.locator('#toggleBtn');
        const originalToggleText = await toggleBtn.textContent();
    
        await toggleBtn.click();
        await toggleBtn.click();

        const newToggleText = await toggleBtn.textContent();
        expect(newToggleText).not.toBe(originalToggleText);
    
    })
     //2. Right click test
    test('Right Click',async({page})=>{
     
        const rightClickBtn = page.locator('#rightClickBtn');
        const contextMenu = page.locator('button',{hasText:'Edit'}); //its playwright locator with css locator filtering the element using has text
      //  const contextMenu1 = page.getByRole('button',{name:'Edit'}) //Better

        await rightClickBtn.click({button:'right'})
await page.waitForTimeout(3000)
        await contextMenu.click();
       
        await page.waitForTimeout(5000);


    })












//3. Hover interaction test - Hover Me button/Interactive Tooltip
//4. Double click test
//5. Copy text test -Double click 
//6. Drang and Drop
//7. Slider
