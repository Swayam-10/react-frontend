import { test, expect } from '@playwright/test';

/**
 * E2E Tests for Challenge 02: Todo List Application
 * 
 * These tests verify the visual output and user interactions
 * for the todo list functionality.
 */

test.describe('Challenge 02: Todo List Application - E2E', () => {
  test.beforeEach(async ({ page }) => {
    // TodoList is rendered on the challenge route, not the home page
    await page.goto('/challenge/02-todo-list');
  });

  test('should display todo input field', async ({ page }) => {
    const input = page.getByPlaceholderText(/add.*todo|enter.*todo|new.*todo/i).first();
    await expect(input).toBeVisible();
  });

  test('should display add button', async ({ page }) => {
    const addButton = page.getByRole('button', { name: /add|submit|create/i }).first();
    await expect(addButton).toBeVisible();
  });

  test('should add a new todo when form is submitted', async ({ page }) => {
    const input = page.getByPlaceholderText(/add.*todo|enter.*todo|new.*todo/i).first();
    const addButton = page.getByRole('button', { name: /add|submit|create/i }).first();
    
    const todoText = 'Test E2E Todo Item';
    await input.fill(todoText);
    await addButton.click();
    
    // Todo should appear in the list
    await expect(page.getByText(todoText)).toBeVisible();
  });

  test('should mark todo as completed when checkbox is clicked', async ({ page }) => {
    // First add a todo
    const input = page.getByPlaceholderText(/add.*todo|enter.*todo|new.*todo/i).first();
    const addButton = page.getByRole('button', { name: /add|submit|create/i }).first();
    
    await input.fill('Complete this todo');
    await addButton.click();
    
    // Find the checkbox for this todo
    const checkbox = page.getByRole('checkbox').first();
    await expect(checkbox).not.toBeChecked();
    
    // Click to complete
    await checkbox.click();
    await expect(checkbox).toBeChecked();
  });

  test('should show completed todos with strikethrough or different styling', async ({ page }) => {
    // Add and complete a todo
    const input = page.getByPlaceholderText(/add.*todo|enter.*todo|new.*todo/i).first();
    const addButton = page.getByRole('button', { name: /add|submit|create/i }).first();
    
    const todoText = 'Completed Todo';
    await input.fill(todoText);
    await addButton.click();
    
    const checkbox = page.getByRole('checkbox').first();
    await checkbox.click();
    
    // Check for completed styling (strikethrough, opacity, etc.)
    const completedTodo = page.getByText(todoText);
    const style = await completedTodo.evaluate(el => {
      const computed = window.getComputedStyle(el);
      return {
        textDecoration: computed.textDecoration,
        opacity: computed.opacity,
        color: computed.color
      };
    });
    
    // Should have some visual indication of completion
    const isCompleted = 
      style.textDecoration.includes('line-through') ||
      parseFloat(style.opacity) < 1 ||
      style.color.includes('gray') ||
      style.color.includes('rgb(128');
    
    expect(isCompleted).toBe(true);
  });

  test('should delete todo when delete button is clicked', async ({ page }) => {
    // Add a todo
    const input = page.getByPlaceholderText(/add.*todo|enter.*todo|new.*todo/i).first();
    const addButton = page.getByRole('button', { name: /add|submit|create/i }).first();
    
    const todoText = 'Todo to delete';
    await input.fill(todoText);
    await addButton.click();
    
    // Verify it's there
    await expect(page.getByText(todoText)).toBeVisible();
    
    // Find and click delete button
    const deleteButton = page.getByRole('button', { name: /delete|remove|×|✕/i }).first();
    await deleteButton.click();
    
    // Todo should be removed
    await expect(page.getByText(todoText)).not.toBeVisible();
  });

  test('should handle multiple todos', async ({ page }) => {
    const input = page.getByPlaceholderText(/add.*todo|enter.*todo|new.*todo/i).first();
    const addButton = page.getByRole('button', { name: /add|submit|create/i }).first();
    
    const todos = ['Todo 1', 'Todo 2', 'Todo 3'];
    
    for (const todo of todos) {
      await input.fill(todo);
      await addButton.click();
      await expect(page.getByText(todo)).toBeVisible();
    }
    
    // All todos should be visible
    for (const todo of todos) {
      await expect(page.getByText(todo)).toBeVisible();
    }
  });
});
