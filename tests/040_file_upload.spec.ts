import { test, expect}  from '@playwright/test'


//single file upload

test.beforeEach('Navigate to file upload page',async({ page })=>{

    await page.goto('https://sdetqa.vercel.app/autoplay');
    await expect(page).toHaveURL(/autoplay/);
})

test.afterEach('Closing the page',async({ page })=>{
    await page.close();
})

test('Upload single file',async({ page })=>{

    const chooseFile = page.locator('#singleFileInput');
    const uploadButton = page.locator('#singleFileForm button');
    const confirmMess =page.locator('#singleFileStatus');

    await chooseFile.setInputFiles('uploads/Test1.txt');
    await uploadButton.click();
    await expect(confirmMess).toHaveText(/Single file selected: Test1.txt/);
})

test('Upload multiple file',async({page})=>{

    const chooseFile = page.locator('#multipleFilesInput');
    const uploadButton = page.locator('#multipleFilesForm button');
    const confirmMess = page.locator('#multipleFilesStatus');

    await chooseFile.setInputFiles(["uploads/Test1.txt","uploads/Test2.txt"]);
    await uploadButton.click();
    await page.waitForTimeout(3000);
    await expect(confirmMess).toHaveText(/Test1.txt/);
    await expect(confirmMess).toHaveText(/Test2.txt/);

})