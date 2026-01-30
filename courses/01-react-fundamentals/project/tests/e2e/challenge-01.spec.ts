import { test, expect } from '@playwright/test';

/**
 * E2E Tests for Challenge 01: User Profile Component
 * 
 * These tests verify the visual output and user interactions
 * that learners can see when running the app.
 */

test.describe('Challenge 01: User Profile Component - E2E', () => {
  test.beforeEach(async ({ page }) => {
    // UserProfile is rendered on the challenge route, not the home page
    await page.goto('/challenge/01-user-profile');
  });

  test('should display user profile component on the page', async ({ page }) => {
    const profile = page.getByTestId('user-profile');
    await expect(profile).toBeVisible();
  });

  test('should display user name', async ({ page }) => {
    // App.tsx passes name="John Doe" on this route
    await expect(page.getByText('John Doe')).toBeVisible();
  });

  test('should display user email', async ({ page }) => {
    // App.tsx passes email="john.doe@example.com" on this route
    await expect(page.getByText('john.doe@example.com')).toBeVisible();
  });

  test('should have a follow button', async ({ page }) => {
    const followButton = page.getByRole('button', { name: /follow/i });
    await expect(followButton).toBeVisible();
  });

  test('should toggle follow button when clicked', async ({ page }) => {
    const followButton = page.getByRole('button', { name: /follow/i });

    await expect(followButton).toContainText(/^follow$/i);
    await followButton.click();
    await expect(followButton).toContainText(/^following$/i);
    await followButton.click();
    await expect(followButton).toContainText(/^follow$/i);
  });

  test('should have proper styling and layout', async ({ page }) => {
    const profile = page.getByTestId('user-profile');
    const boundingBox = await profile.boundingBox();
    expect(boundingBox).not.toBeNull();
    expect(boundingBox!.width).toBeGreaterThan(0);
    expect(boundingBox!.height).toBeGreaterThan(0);
  });

  test('should display avatar or placeholder', async ({ page }) => {
    // README: "Profile picture (or placeholder)" - App passes no avatar, so placeholder is shown
    const avatarOrPlaceholder = page.getByTestId('user-profile-avatar');
    await expect(avatarOrPlaceholder).toBeVisible();
  });
});
