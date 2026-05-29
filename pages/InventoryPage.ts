import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly cartLink: Locator;
  readonly cartBadge: Locator;
  readonly inventoryItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartLink = page.locator('.shopping_cart_link');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.inventoryItems = page.locator('.inventory_item');
  }

  async isLoaded(): Promise<boolean> {
    return this.page.url().includes('/inventory.html');
  }

  addToCartButton(productName: string): Locator {
    const slug = productName.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '');
    return this.page.locator(`[data-test="add-to-cart-${slug}"]`);
  }

  removeButton(productName: string): Locator {
    const slug = productName.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '');
    return this.page.locator(`[data-test="remove-${slug}"]`);
  }

  async addToCart(productName: string) {
    await this.addToCartButton(productName).click();
  }

  async removeFromCart(productName: string) {
    await this.removeButton(productName).click();
  }

  async getCartCount(): Promise<number> {
    const visible = await this.cartBadge.isVisible();
    if (!visible) return 0;
    const text = await this.cartBadge.innerText();
    return parseInt(text, 10);
  }

  async goToCart() {
    await this.cartLink.click();
  }

  async getProductPrice(productName: string): Promise<string> {
    const item = this.page.locator('.inventory_item', {
      has: this.page.locator('.inventory_item_name', { hasText: productName }),
    });
    return await item.locator('.inventory_item_price').innerText();
  }
}
