import { test, expect } from '@playwright/test';

test.describe('Handle Dialogs Validation/Alerts',()=>{

    test.beforeEach('Navigate to the FileUpload Page', async({ page })=>{
       
        await page.goto('https://sdetqa.vercel.app/autoplay.html');
        await expect(page.getByText('AutoPlay')).toBeVisible();        
    })

    test('Simple Dialog', async({ page })=>{
        page.on('dialog', (dialog)=>{
            expect(dialog.type()).toBe('alert');
            console.log(dialog.message());
            expect(dialog.message()).toContain("Simple alert!");            
            dialog.accept();
        })
        await  page.getByRole('button',{name:'Simple'}).click();
    })

    //  Handling confirmation and alert together

    test('Confirmation dialog',async({page})=>{
        page.on('dialog',(dialog)=>{
        //    expect(dialog.type()).toBe('confirm');
        //    expect(dialog.message()).toContain('Confirm?');
        //    console.log(dialog.message());
        //    dialog.accept();

            console.log(`Dialog type: ${dialog.type()}`);
            console.log(`Dialog message: ${dialog.message()}`);

            if (dialog.type() === 'confirm') {
                expect(dialog.message()).toContain('Confirm?');
                dialog.accept();
            } 
            else if (dialog.type() === 'alert') {
                expect(dialog.message()).toContain('Confirmed');
                dialog.accept();
            }
        })
        await page.getByRole('button',{name:'Confirm'}).click();
    })


    test('Prompt dialog',async({page})=>{
        page.on('dialog',(dialog)=>{

           // console.log(`Dialog type: ${dialog.type()}`);
           // console.log(`Dialog message is : ${dialog.message()}`);
           
            if(dialog.type()==='prompt')
            { 
                console.log(`Dialog type: ${dialog.type()}`);             
                console.log(`Dialog message is : ${dialog.message()}`);
                dialog.accept('Gaurav');
            }
            else if(dialog.type()==='alert')
            {
                console.log(`Dialog type is:${dialog.type()}`);
                console.log(`Dialog message is : ${dialog.message()}`);
                dialog.accept();
            }
        })
        await page.getByRole('button',{name:'Prompt'}).click();
        await page.waitForTimeout(2000);
    })



    




})