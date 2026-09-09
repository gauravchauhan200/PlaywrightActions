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

    test('Confirmation dialog',async({page})=>{
        page.on('dialog',(dialog)=>{
            expect(dialog.type()).toBe('confirm');
            expect(dialog.message()).toContain('Confirm?');
            console.log(dialog.message());
            dialog.dismiss();//dialog.accept();
        })
        await page.getByRole('button',{name:'Confirm'}).click();



    })






})