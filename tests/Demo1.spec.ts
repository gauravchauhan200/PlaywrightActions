/*

What is an iFrame?
------------------
An iframe (Inline Frame) is an HTML element that allows one web page 
to be embedded inside another web page.

tag:   frame,  iframe
  frameset  --> contains multiple frames

Examples:
- YouTube videos
- Payment gateways
- Advertisements
- External web pages

page.frame(locator)  ---> Not auto waited , not returns promise
page.frameLocator(locator)  --- auto waited , await is not need (special case)
page.frames()  -- retuns all the frames

*/

import { test, expect } from "@playwright/test";

test('handle frames',async({ page })=>{

    // open the frames demo application
    await page.goto('https://ui.vision/demo/webtest/frames/');
    
    //Get all frames available on the page
    const frames = page.frames();

    // Verify total number of frames


    //Approach 1: Using page.frame() -  This approach is not recommended.
    //page.frame() returns a Frame object. It doesn't wait, can return null.
    //After getting the frame object, we can locate and interact with elements inside that frame.




    // Approach 2: Using frameLocator()
    // frameLocator() is the recommended approach because it directly
    // locates elements inside an iframe without creating a Frame object.
 

})
