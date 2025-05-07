import puppeteer from 'puppeteer'

export const handler = async (event: any, context: any, callback: any) => {
  let result: string | null = null;
  let browser: any = null;

  try {
    browser = await puppeteer.launch({
      headless: false,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    await page.goto('https://www.serverless.com');
    console.log('Page loaded');
    await page.screenshot({ path: 'screenshot.png' });
  } catch (error) {
    return callback(error);
  } finally {
    if (browser !== null) {
      await browser.close();
    }
  }

  return callback(null, result);
};
