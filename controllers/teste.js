const puppeteer = require("puppeteer");
const { games } = require("./wantedGamesController");

async function findAmazonPrice(searchTerm) {
  let baseLink = "https://www.amazon.com.br/s?k=";
  let params = "&rh=n%3A16253336011";

  const SELECTORS = {
    productTitle:
      "#search > div.s-desktop-width-max.s-desktop-content.sg-row > div.sg-col-20-of-24.sg-col-28-of-32.sg-col-16-of-20.sg-col.sg-col-32-of-36.sg-col-8-of-12.sg-col-12-of-16.sg-col-24-of-28 > div > span:nth-child(4) > div.s-main-slot.s-result-list.s-search-results.sg-row > div:nth-child(1) > div > span > div > div > div:nth-child(2) > div.sg-col-4-of-12.sg-col-8-of-16.sg-col-16-of-24.sg-col-12-of-20.sg-col-24-of-32.sg-col.sg-col-28-of-36.sg-col-20-of-28 > div > div:nth-child(1) > div > div > div:nth-child(1) > h2 > a > span",
    productPrice:
      "#search > div.s-desktop-width-max.s-desktop-content.sg-row > div.sg-col-20-of-24.sg-col-28-of-32.sg-col-16-of-20.sg-col.sg-col-32-of-36.sg-col-8-of-12.sg-col-12-of-16.sg-col-24-of-28 > div > span:nth-child(4) > div.s-main-slot.s-result-list.s-search-results.sg-row > div:nth-child(1) > div > span > div > div > div:nth-child(2) > div.sg-col-4-of-12.sg-col-8-of-16.sg-col-16-of-24.sg-col-12-of-20.sg-col-24-of-32.sg-col.sg-col-28-of-36.sg-col-20-of-28 > div > div:nth-child(2) > div.sg-col-4-of-24.sg-col-4-of-12.sg-col-4-of-36.sg-col-4-of-28.sg-col-4-of-16.sg-col.sg-col-4-of-20.sg-col-4-of-32 > div > div.a-section.a-spacing-none.a-spacing-top-small > div:nth-child(2) > div > div > a > span > span:nth-child(2)",
  };

  const browser = await puppeteer.launch({
    defaultViewport: { width: 1366, height: 768 },
  });
  const page = await browser.newPage();
  await page.goto(baseLink + searchTerm + params);

  await page.waitForSelector(SELECTORS.productTitle, { visible: true });
  await page.waitForSelector(SELECTORS.productPrice, { visible: true });

  const priceInput = await page.$(SELECTORS.productPrice);
  const titleInput = await page.$(SELECTORS.productTitle);
  const game = new Object();

  game.price = await page.evaluate((element) => element.innerText, priceInput);
  game.price = game.price.replace(/\n/g, "");
  game.title = await page.evaluate((element) => element.innerText, titleInput);
  await browser.close();

  return game;
}
