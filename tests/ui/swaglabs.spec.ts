import { test, expect } from "@playwright/test";

test.describe("Swag Labs - UI Tests", () => {
  const baseUrl = "https://www.saucedemo.com/";

  test.beforeEach(async ({ page }) => {
    await page.goto(baseUrl);
  });

  test("Login successfully", async ({ page }) => {
    await page.fill('[data-test="username"]', "standard_user");
    await page.fill('[data-test="password"]', "secret_sauce");
    await page.click('[data-test="login-button"]');

    await expect(page).toHaveURL(/inventory/);
    await expect(page.locator(".title")).toHaveText("Products");
  });

  test("Failed login (wrong user)", async ({ page }) => {
    await page.fill('[data-test="username"]', "usuario_invalido");
    await page.fill('[data-test="password"]', "senha_invalida");
    await page.click('[data-test="login-button"]');

    const error = page.locator('[data-test="error"]');
    await expect(error).toBeVisible();
    await expect(error).toContainText(
      "Username and password do not match any user in this service"
    );
  });

  test("Add and remove products in the cart", async ({ page }) => {
    await page.fill('[data-test="username"]', "standard_user");
    await page.fill('[data-test="password"]', "secret_sauce");
    await page.click('[data-test="login-button"]');

    await expect(page).toHaveURL(/inventory/);
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');
    await page.click('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]');

    await expect(page.locator(".shopping_cart_badge")).toHaveText("3");
    await page.click('[data-test="remove-sauce-labs-bike-light"]');
    await page.click('[data-test="remove-sauce-labs-backpack"]');

    await expect(page.locator(".shopping_cart_badge")).toHaveText("1");

    await page.click(".shopping_cart_link");

    await expect(page.locator(".inventory_item_name")).toHaveText(
      "Sauce Labs Bolt T-Shirt"
    );
  });

  test("Error when completing purchase without filling in mandatory data", async ({
    page,
  }) => {
    await page.fill('[data-test="username"]', "standard_user");
    await page.fill('[data-test="password"]', "secret_sauce");
    await page.click('[data-test="login-button"]');

    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click(".shopping_cart_link");
    await page.click('[data-test="checkout"]');

    await page.click('[data-test="continue"]');

    const error = page.locator('[data-test="error"]');
    await expect(error).toBeVisible();
    await expect(error).toHaveText("Error: First Name is required");
  });
});
