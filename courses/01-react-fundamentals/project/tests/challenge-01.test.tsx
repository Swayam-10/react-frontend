import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import UserProfile from '../src/components/UserProfile';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('Challenge 01: User Profile Component', () => {
  const mockUser = {
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://via.placeholder.com/150'
  };

  it('should render user name', () => {
    render(<UserProfile name={mockUser.name} email={mockUser.email} />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('should render user email', () => {
    render(<UserProfile name={mockUser.name} email={mockUser.email} />);
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
  });

  it('should display avatar or placeholder', () => {
    // README: "Profile picture (or placeholder)" - either img (avatar) or placeholder must be present
    const { rerender } = render(<UserProfile name={mockUser.name} email={mockUser.email} />);
    expect(screen.getByTestId('user-profile-avatar')).toBeInTheDocument();

    rerender(<UserProfile name={mockUser.name} email={mockUser.email} avatar={mockUser.avatar} />);
    const avatarImg = screen.getByRole('img', { name: /profile/i });
    expect(avatarImg).toBeInTheDocument();
    expect(avatarImg).toHaveAttribute('src', mockUser.avatar);
  });

  it('should render follow button', () => {
    render(<UserProfile name={mockUser.name} email={mockUser.email} />);
    expect(screen.getByRole('button', { name: /follow/i })).toBeInTheDocument();
  });

  it('should toggle follow button state', async () => {
    const user = userEvent.setup();
    render(<UserProfile name={mockUser.name} email={mockUser.email} />);
    
    const button = screen.getByRole('button', { name: /follow/i });
    expect(button).toHaveTextContent(/follow/i);
    
    await user.click(button);
    expect(button).toHaveTextContent(/following/i);
    
    await user.click(button);
    expect(button).toHaveTextContent(/follow/i);
  });

  it('should use useState for button state', () => {
    // This will be checked via AST parsing in review engine
    const componentFile = readFileSync(
      join(__dirname, '../src/components/UserProfile.tsx'),
      'utf-8'
    );
    expect(componentFile).toContain('useState');
  });
});
