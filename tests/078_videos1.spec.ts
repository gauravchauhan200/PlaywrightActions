/*
    Two Approaches to capture videos in Playwright:
    1. Programmatically  via Browser Context
    2. Globally via Playwright Config File 
*/

import { test, chromium, expect} from '@playwright/test'

test('Record video for Single Test',async({},testInfo)=>{

  const browser = await chromium.launch();

  const context = await browser.newContext({})

})