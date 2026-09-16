import { test, expect} from '@playwright/test'

test('Shadow DOM',async({ page })=>{

    await page.goto('https://sdetqa.vercel.app/autoplay');

     //Heading
    const shadowHeading = page.locator('h3', {hasText:'Shadow DOM'});
    await shadowHeading.scrollIntoViewIfNeeded();                   //optional
    await expect(shadowHeading).toBeVisible();

    const shadowElement = await page.locator('#shadow_content').innerText();
    console.log(shadowElement);

    const laptop = await page.locator('#nested_shadow_content').innerText();
    console.log(laptop);

    const shadowHost = page.locator('#shadow_host');
    const blogInput = shadowHost.locator('input[type="text"]')

    await blogInput.fill('Welcome');
    expect(blogInput).toHaveValue('Welcome');
    
    const checkbox =  shadowHost.locator('input[type="checkbox"]');
    await checkbox.check();
    await expect(checkbox).toBeChecked();

    const fileInput = shadowHost.locator('input[type="file"]');
    await fileInput.setInputFiles('uploads/Test1.txt');

    await page.waitForTimeout(3000);

    const youtubeLink =  page.getByRole('link',{name:'Youtube'});
    await expect(youtubeLink).toBeVisible();
    expect(youtubeLink).toHaveAttribute('href','https://www.youtube.com/@sdetpavan/videos');

    const blog = shadowHost.getByRole('link',{name:'Blog'});
    await expect(blog).toBeVisible();
    await expect(blog).toHaveAttribute('href','https://www.pavantestingtools.com/');

})