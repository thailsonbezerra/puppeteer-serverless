import puppeteer from 'puppeteer';

interface SQSEvent {
  Records: {
    body: string;
    messageId: string;
    receiptHandle: string;
    attributes: any;
    messageAttributes: any;
    md5OfBody: string;
    eventSource: string;
    eventSourceARN: string;
    awsRegion: string;
  }[];
}

export const handler = async (event: SQSEvent) => {
  let browser: any = null;

  try {
    console.log('Received SQS event:', JSON.stringify(event));

    for (const record of event.Records) {
      const messageBody = JSON.parse(record.body);
      console.log('Processing message:', messageBody);

      browser = await puppeteer.launch({
        headless: 'shell', // Mude para false se quiser ver o navegador
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });

      const page = await browser.newPage();
      await page.goto(messageBody.url);
      console.log('Page loaded');
      await page.screenshot({ path: messageBody.fileName });
    }

    return { statusCode: 200, body: 'Processamento concluído' };
  } catch (error) {
    console.error('Error:', error);
    throw error;
  } finally {
    if (browser !== null) {
      await browser.close();
    }
  }
};