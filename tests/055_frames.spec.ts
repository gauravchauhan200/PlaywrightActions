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
