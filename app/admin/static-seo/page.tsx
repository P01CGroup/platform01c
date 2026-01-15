import SiteSettings from '@/components/admin/SiteSettings';
import StaticPageSEOManager from '@/components/admin/StaticPageSEOManager';

export default function StaticSEOAdminPage() {
  return (
    <>
      <StaticPageSEOManager />
      {/* Add <SiteSettings /> at the bottom or as a new section */}
      <SiteSettings />
    </>
  );
} 