import { expect } from "@playwright/test";

export default class CustomerPage {
    constructor(page) {
        this.page = page;
    }

    async validateCustomerName(selectors, user) {
        await this.page.waitForSelector(selectors.customerTable);
        await expect(async () => {
            const cellText = await this.page.locator(`${selectors.customerTable}[1]//td[2]`).innerText();
            const cleanedText = cellText.replace(/\n/g, ' ').trim();
            const finalText = cleanedText.replace(/^.\s*(.+)$/, '$1');
            expect(finalText).toBe(`${user.firstName} ${user.lastName}`);
        }).toPass();
    }
}