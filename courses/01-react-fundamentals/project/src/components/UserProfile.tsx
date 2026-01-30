/**
 * Challenge 01: User Profile Component
 * Displays user name, email, avatar (or placeholder), and a Follow button that toggles state.
 */

import { useState } from 'react';

const BUTTON_TEXT_FOLLOW = 'Follow';
const BUTTON_TEXT_FOLLOWING = 'Following';

interface UserProfileProps {
  name: string;
  email: string;
  avatar?: string;
}

function UserProfile({ name, email, avatar }: UserProfileProps) {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollowClick = () => {
    setIsFollowing((prev) => !prev);
  };

  return (
    <div
      data-testid="user-profile"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
        padding: '1.5rem',
        maxWidth: '320px',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        backgroundColor: 'var(--card-bg, #fff)',
      }}
    >
      {avatar ? (
        <img
          data-testid="user-profile-avatar"
          src={avatar}
          alt={`${name} profile`}
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            objectFit: 'cover',
          }}
        />
      ) : (
        <div
          data-testid="user-profile-avatar"
          aria-hidden
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            backgroundColor: '#e5e7eb',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#6b7280',
            fontSize: '1.5rem',
            fontWeight: 600,
          }}
        >
          {name.charAt(0).toUpperCase()}
        </div>
      )}
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontWeight: 600, fontSize: '1.125rem' }}>{name}</div>
        <div style={{ color: '#6b7280', fontSize: '0.875rem', marginTop: '0.25rem' }}>{email}</div>
      </div>
      <button
        type="button"
        onClick={handleFollowClick}
        style={{
          padding: '0.5rem 1.25rem',
          borderRadius: '6px',
          border: '1px solid #d1d5db',
          backgroundColor: isFollowing ? '#10b981' : '#fff',
          color: isFollowing ? '#fff' : '#374151',
          fontWeight: 500,
          cursor: 'pointer',
        }}
      >
        {isFollowing ? BUTTON_TEXT_FOLLOWING : BUTTON_TEXT_FOLLOW}
      </button>
    </div>
  );
}

export default UserProfile;
