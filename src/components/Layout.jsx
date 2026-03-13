import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Users, CalendarCheck, MessageCircle, User, Handshake } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Layout.css';

const NAV_ITEMS = [
  { to: '/circles', icon: Users, label: 'Circles' },
  { to: '/checkin', icon: CalendarCheck, label: 'Check-in' },
  { to: '/vent', icon: MessageCircle, label: 'Vent' },
  { to: '/profile', icon: User, label: 'Profile' },
];

export default function Layout() {
  const { profile } = useAuth();
  const initials = (profile?.display_name || 'A')
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const avatarUrl = profile?.avatar_url;

  return (
    <div className="app-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="brand-mark">
            <Handshake size={18} />
          </div>
          <span className="brand-name">WithMe</span>
        </div>

        <div className="sidebar-section">Navigation</div>
        <nav className="sidebar-nav">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `sidebar-link${isActive ? ' active' : ''}`
              }
            >
              <item.icon size={18} className="link-icon" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-user">
            <div className="avatar avatar-sm">
              {avatarUrl ? (
                <img src={avatarUrl} alt={profile?.display_name} />
              ) : (
                initials
              )}
              <span className="status-dot status-online" />
            </div>
            <div className="sidebar-user-info">
              <span className="sidebar-user-name">{profile?.display_name || 'Anonymous'}</span>
              <span className="sidebar-user-status">Online</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="main-content">
        <Outlet />
      </main>

      {/* Bottom Nav */}
      <nav className="bottom-nav">
        <div className="bottom-nav-inner">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `bottom-nav-link${isActive ? ' active' : ''}`
              }
            >
              <item.icon size={20} className="nav-icon" />
              <span className="nav-label">{item.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}
