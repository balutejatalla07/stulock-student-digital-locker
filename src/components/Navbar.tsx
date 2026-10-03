import React from 'react';
import { ActivePage, UserAccount } from '../types';
import { Sun, Moon, Mail, ShieldAlert, User, LogOut, FileText } from 'lucide-react';

interface NavbarProps {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  user: UserAccount | null;
  isDark: boolean;
  setIsDark: (dark: boolean) => void;
  onOpenPanicModal: () => void;
  onLogout: () => void;
  onOpenEmailConfig?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  setActivePage,
  user,
  isDark,
  setIsDark,
  onOpenPanicModal,
  onLogout,
  onOpenEmailConfig,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-200/80 dark:border-neutral-800/80 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        
        {/* Brand Wordmark */}
        <button
          onClick={() => setActivePage(user ? 'dashboard' : 'home')}
          className="text-base sm:text-lg font-bold tracking-tight text-neutral-900 dark:text-white hover:opacity-90 transition-opacity flex items-center gap-2.5 cursor-pointer"
          aria-label="StuLock Home"
        >
          <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 text-white flex items-center justify-center shadow-xs">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="font-extrabold tracking-tight text-neutral-900 dark:text-white">Stu</span>
            <span className="font-extrabold tracking-tight text-indigo-600 dark:text-indigo-400">Lock</span>
          </div>
        </button>

        {/* Right actions */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {user && (
            <>
              {/* Email & OTP Settings */}
              {onOpenEmailConfig && (
                <button
                  type="button"
                  onClick={onOpenEmailConfig}
                  className="p-2 rounded-xl text-neutral-600 dark:text-neutral-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors cursor-pointer"
                  title="Configure EmailJS & OTP Tools"
                  aria-label="Email Settings"
                >
                  <Mail className="w-4 h-4" />
                </button>
              )}

              {/* Emergency Panic Button */}
              <button
                type="button"
                onClick={onOpenPanicModal}
                className="p-2 rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                title="Emergency Panic Killswitch: Revoke all share links"
                aria-label="Panic Killswitch"
              >
                <ShieldAlert className="w-4 h-4" />
              </button>

              {/* User Profile Pill */}
              <button
                type="button"
                onClick={() => setActivePage('profile')}
                className={`hidden sm:flex items-center gap-2 pl-1.5 pr-3 py-1 rounded-full border text-xs font-semibold transition-all cursor-pointer ${
                  activePage === 'profile'
                    ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400'
                    : 'border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900'
                }`}
                title="View Profile Vault"
              >
                {user.avatarUrl ? (
                  <img src={user.avatarUrl} alt={user.name} className="w-5 h-5 rounded-full object-cover" />
                ) : (
                  <div className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-[10px]">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="truncate max-w-[120px]">{user.name}</span>
              </button>
            </>
          )}

          {/* Theme Toggle */}
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-xl text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors cursor-pointer"
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-label="Toggle color theme"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-neutral-700" />}
          </button>

          {/* Logout if authenticated */}
          {user && (
            <button
              type="button"
              onClick={onLogout}
              className="p-2 rounded-xl text-neutral-500 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors cursor-pointer"
              title="Sign Out"
              aria-label="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>
    </header>
  );
};
