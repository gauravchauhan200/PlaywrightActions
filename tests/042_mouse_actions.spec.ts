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

     // 2. Right click test
    test('Right Click',async({page})=>{
     
        const rightClickBtn = page.locator('#rightClickBtn');
        const contextMenu = page.locator('button',{hasText:'Edit'}); //its playwright locator with css locator filtering the element using has text
      //  const contextMenu1 = page.getByRole('button',{name:'Edit'}) //Better

        await rightClickBtn.click({button:'right'})
        
    //Capture the options and verify them if needed

        const allOptions =  await page.locator('#customContextMenu button').allInnerTexts();
        console.log(allOptions);
        expect(allOptions).toEqual([ 'Edit', 'Cut', 'Copy', 'Paste', 'Delete', 'Quit' ]);  


        const quitOption = page.getByRole('button',{name:'Quit'})
        await expect(quitOption).toBeVisible();

        await page.waitForTimeout(3000);

        //handling dialog is optional

        page.on('dialog',(dialog)=>{
            console.log(dialog.type());
            console.log(dialog.message())
            dialog.accept();
        });
         await quitOption.click();


    })
// 3. hover interaction test -hover me button/Interactive tooltip


    test('Mouse Hover',async({page})=>{
        const hoverBtn = page.locator('span').filter({hasText:'Hover me'});
        await hoverBtn.hover();
        await expect(hoverBtn).toBeVisible();
      //await page.waitForTimeout(5000);

        expect(await hoverBtn.getAttribute('title')).toBe("This is a tooltip");
    })

    //4. Double click test
    test('Double click test',async({ page })=>{
        const doubleBtn = page.getByRole('button').filter({hasText:'Double click'})
        
        page.once('dialog',(dialog)=>{
            console.log(dialog.type());
            expect(dialog.message()).toContain('Double clicked!');
            dialog.accept();
        })
        await doubleBtn.dblclick();
    })

//5. Copy text test -Double click 

    test('Copy test',async({page})=>{

        const field1 = page.locator('#field1');
        const field2 = page.locator('#field2');
        const copyText = page.getByRole('button',{name:'Copy Text'})

        await field1.fill('Welcome Back');
        await copyText.dblclick();
        await expect(field2).toHaveValue('Welcome Back');
        console.log(await field2.inputValue());
        await page.waitForTimeout(3000);

    })

//6. Drang and Drop
        test('6. Drag and drop the draggable element into the drop zone', async ({ page }) => {

        let sourceItem = page.getByText('Drag me', { exact: true })
        let targetItem = page.getByText('Drop zone', { exact: true })

        page.once('dialog', dialog => {
            expect(dialog.message()).toContain('Dropped!');
            dialog.accept();
        });

        await sourceItem.dragTo(targetItem) // Drag drop event triggers Dialog
        
        await page.waitForTimeout(3000);

        });




        //7. Slider
        test('Range slider', async ({ page }) => {

        const slider = page.locator('#priceSlider');
        await slider.focus()

        await page.keyboard.press('Home') // go to initial point '0'
        //await page.keyboard.press('End') // go to end point '100'
        
        // Move the slider till 50
        for(let i=0;i<50;i++){
            await page.keyboard.press('ArrowRight')
        }
        
        //assertion
        await expect(slider).toHaveValue('50')

        await page.waitForTimeout(5000)


        });
