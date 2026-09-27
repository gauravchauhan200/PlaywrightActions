import { test, expect } from "@playwright/test";

test("Nested frames", async({page})=>{

await page.goto('https://sdetqa.vercel.app/autoplay');

// page.frameLocator('iframe').nth(0) - deprecated
//page.frameLocator('iframe').first() - deprecated