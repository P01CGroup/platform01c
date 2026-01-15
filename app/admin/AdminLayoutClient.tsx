'use client';

import { usePathname } from 'next/navigation';
import AdminNavbarClient from './AdminNavbarClient';

export default function AdminLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';

  return (
    <div className="admin-layout">
      {!isLoginPage && <AdminNavbarClient />}
      {children}
    </div>
  );
} 