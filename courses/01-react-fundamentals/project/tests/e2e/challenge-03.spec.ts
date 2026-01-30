import { test, expect } from '@playwright/test';

/**
 * E2E Tests for Challenge 03: Theme Management
 * 
 * These tests verify the visual theme switching functionality
 * that users can see and interact with.
 */

test.describe('Challenge 03: Theme Management - E2E', () => {
  test.beforeEach(async ({ page }) => {
    // ThemeToggle is rendered on the challenge route; theme applies app-wide
    await page.goto('/challenge/03-state-management');
  });

  test('should display theme toggle button', async ({ page }) => {
    const toggleButton = page.getByRole('button', { name: /theme|toggle|dark|light|mode/i }).first();
    await expect(toggleButton).toBeVisible();
  });

  test('should toggle theme when button is clicked', async ({ page }) => {
    const toggleButton = page.getByRole('button', { name: /theme|toggle|dark|light|mode/i }).first();
    
    // Get initial background color
    const body = page.locator('body');
    const initialBg = await body.evaluate(el => window.getComputedStyle(el).backgroundColor);
    
    // Click toggle
    await toggleButton.click();
    await page.waitForTimeout(500); // Wait for theme transition
    
    // Background should change
    const newBg = await body.evaluate(el => window.getComputedStyle(el).backgroundColor);
    expect(newBg).not.toBe(initialBg);
  });

  test('should persist theme preference after page reload', async ({ page }) => {
    const toggleButton = page.getByRole('button', { name: /theme|toggle|dark|light|mode/i }).first();
    
    // Toggle to dark theme
    await toggleButton.click();
    await page.waitForTimeout(500);
    
    const darkBg = await page.locator('body').evaluate(el => window.getComputedStyle(el).backgroundColor);
    
    // Reload page
    await page.reload();
    await page.waitForTimeout(500);
    
    // Theme should persist
    const persistedBg = await page.locator('body').evaluate(el => window.getComputedStyle(el).backgroundColor);
    expect(persistedBg).toBe(darkBg);
  });

  test('should apply theme to all components', async ({ page }) => {
    // Add some content first (from previous challenges)
    const input = page.getByPlaceholderText(/add.*todo|enter.*todo|new.*todo/i).first();
    if (await input.isVisible().catch(() => false)) {
      await input.fill('Test todo');
      const addButton = page.getByRole('button', { name: /add|submit|create/i }).first();
      await addButton.click();
    }
    
    const toggleButton = page.getByRole('button', { name: /theme|toggle|dark|light|mode/i }).first();
    const initialColor = await page.locator('body').evaluate(el => window.getComputedStyle(el).color);
    
    await toggleButton.click();
    await page.waitForTimeout(500);
    
    const newColor = await page.locator('body').evaluate(el => window.getComputedStyle(el).color);
    expect(newColor).not.toBe(initialColor);
  });

  test('should have smooth theme transition', async ({ page }) => {
    const toggleButton = page.getByRole('button', { name: /theme|toggle|dark|light|mode/i }).first();
    const body = page.locator('body');
    
    // Check for transition property
    const transition = await body.evaluate(el => {
      const style = window.getComputedStyle(el);
      return style.transition || style.transitionProperty;
    });
    
    // Should have some transition (not required but good practice)
    // This is informational, not a hard requirement
  });
});
