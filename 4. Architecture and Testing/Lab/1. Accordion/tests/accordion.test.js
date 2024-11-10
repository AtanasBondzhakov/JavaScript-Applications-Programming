import { chromium } from 'playwright-chromium';
import { expect } from 'chai';

const host = 'http://localhost:3000'

let browser, page;

describe('Accordion', function () {
    this.timeout(8000);

    before(async () => {
        browser = await chromium.launch({ headless: true, slowMo: 500 });
    })
    beforeEach(async () => {
        page = await browser.newPage();
    })
    after(async () => {
        await browser.close();
    })
    afterEach(async () => {
        await page.close();
    })


    describe('test', () => {
        it('should load tiles', async function () {
            await page.goto(host);

            const firstTile = await page.isVisible('div.head > span');

            expect(firstTile).to.be.true;
        })

        it('should test button More', async function () {
            await page.goto(host);
            await page.waitForSelector('div.head > button.button');
            await page.click('div.head > button.button');

            const paragraph = await page.isVisible('div.extra > p');
            const btnText = await page.textContent('div.head > button.button');
            const extraText = await page.textContent('div.extra > p');

            expect(btnText).to.equal('Less');
            expect(paragraph).to.be.true;
            expect(extraText).to.equal('Scalable Vector Graphics (SVG) is an Extensible Markup Language (XML)-based vector image format for two-dimensional graphics with support for interactivity and animation. The SVG specification is an open standard developed by the World Wide Web Consortium (W3C) since 1999.');
        })

        it('should test button Less', async function () {
            await page.goto(host);
            await page.waitForSelector('div.head > button.button');
            await page.click('div.head > button.button');
            
            await page.click('div.head > button.button');

            const paragraph = await page.isVisible('div.extra > p');
            const btnText = await page.textContent('div.head > button.button');
            
            expect(paragraph).to.be.false;
            expect(btnText).to.equal('More');
        })
    })
})
