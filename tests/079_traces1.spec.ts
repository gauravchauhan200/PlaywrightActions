/*

3 Approaches to capture Trace file in Playwright:

1. Programatically (Start and stop tracing manually within a test.) 
2. Configure tracing in playwright.config.ts (used in most real projects).
3. using CLI command


*/


import { test, chromium, expect } from '@playwright/test';


test('Capture Trace Manually', async ({ }, testInfo) => {

    const browser = await chromium.launch();

    const context = await browser.newContext();

    // Start tracing
    await context.tracing.start({
        screenshots: true,
        snapshots: true,
        sources: true
    });