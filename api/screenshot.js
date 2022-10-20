import { chromium } from "playwright-aws-lambda";

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const {domain} = req.query;
        const browser = await chromium.launch();
        const page = await browser.newPage();
        await page.goto('https://' + domain);
        const img = await page.screenshot();
        await browser.close();
        res.setHeader('content-type', 'image/png')
        return res.send(img);
    } else {
        return res.send('Post Request not allowed');
    }
  }