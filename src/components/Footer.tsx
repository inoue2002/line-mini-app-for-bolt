import { Link, useLocation } from 'react-router-dom';
import { Home, User } from 'lucide-react';

export function Footer() {
  const location = useLocation();

  const navItems = [
    {
      path: '/',
      icon: Home,
      label: 'ホーム',
    },
    {
      path: '/profile',
      icon: User,
      label: 'プロフィール',
    },
  ];

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
      <nav className="flex justify-around">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={`flex flex-col items-center py-2 px-4 rounded-lg transition-colors ${
                isActive
                  ? 'text-blue-500 bg-blue-50'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon size={20} />
              <span className="text-xs mt-1">{label}</span>
            </Link>
          );
        })}
      </nav>
    </footer>
  );
}