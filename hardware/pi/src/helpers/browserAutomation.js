const puppeteer = require('puppeteer');

class Browser {
  constructor(site) {
    this.site = site;
    this.browser = null;
    this.page = null;
  }

  async openBrowser() {
    this.browser && this.closeBrowser();

    this.browser = await puppeteer.launch({ headless: false, product: "chrome", executablePath: "/usr/bin/chromium-browser", });
    this.page = await this.browser.newPage();
    await this.page.goto(this.site);
  }

  async closeBrowser() {
    this.browser && (await this.browser.close());
  }

  async refresh() {
    this.page && (await this.page.reload());
  }
}

module.exports = Browser;
