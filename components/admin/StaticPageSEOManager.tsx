'use client'
import StaticPageSEOForm from './StaticPageSEOForm';
import Modal from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { navigationData, NavItemData, MegaMenuData, MegaMenuColumn } from '@/lib/navigation-config';
import { useEffect, useState } from 'react';
import HeroAdmin from './HeroAdmin';

interface SEOData {
  title?: string;
  description?: string;
  keywords?: string;
  canonical_url?: string;
  og_title?: string;
  og_description?: string;
  og_image?: string;
  twitter_title?: string;
  twitter_description?: string;
  twitter_image?: string;
  noindex?: boolean;
  nofollow?: boolean;
}

interface StaticPageSEO {
  slug: string;
  seo: SEOData;
}

// Type guards
function isMegaMenu(item: NavItemData | MegaMenuData): item is MegaMenuData {
  return (item as MegaMenuData).isMegaMenu === true && Array.isArray((item as MegaMenuData).children);
}
function isNavItem(item: any): item is NavItemData {
  return typeof item.label === 'string' && typeof item.href === 'string';
}
function isMegaMenuColumn(item: any): item is MegaMenuColumn {
  return typeof item.title === 'string' && Array.isArray(item.links);
}

// Helper to flatten navigation config into a list of { label, slug }, excluding main slugs of megamenu items
function flattenNav(nav: (NavItemData | MegaMenuData)[]): { label: string; slug: string }[] {
  const result: { label: string; slug: string }[] = [];
  nav.forEach(item => {
    if (isMegaMenu(item)) {
      // Mega menu: flatten all links, skip the main menu item
      item.children.forEach((col) => {
        if (isMegaMenuColumn(col)) {
          col.links.forEach(link => {
            result.push({ label: link.label, slug: link.href });
          });
        }
      });
      // Do NOT add the main menu item (e.g., /services)
    } else if (isNavItem(item) && item.children && item.children.length) {
      // Regular menu with children: skip the main menu item, add children
      item.children.forEach(child => {
        if (isNavItem(child)) {
          result.push({ label: child.label, slug: child.href });
        }
      });
    } else if (isNavItem(item)) {
      // Simple link
      result.push({ label: item.label, slug: item.href });
    }
  });
  return result;
}

// Additional pages that need SEO management beyond navigation config
const additionalPages: { label: string; slug: string }[] = [
  { label: 'MA Consulting Services', slug: '/ma-consulting-services' },
  { label: 'Privacy Policy', slug: '/privacy-policy' },
  { label: 'Terms of Use', slug: '/terms-of-use' },
];

export default function StaticPageSEOManager() {
  const [seoData, setSeoData] = useState<StaticPageSEO[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingPage, setEditingPage] = useState<{ label: string; slug: string } | null>(null);
  const [editingSEO, setEditingSEO] = useState<SEOData | null>(null);

  const navPages = flattenNav(navigationData);
  // Combine navigation pages with additional pages
  const allPages = [...navPages, ...additionalPages];

  // Fetch all SEO data
  const fetchSEOData = () => {
    setLoading(true);
    fetch('/api/static-pages')
      .then(res => res.json())
      .then(data => {
        setSeoData(data.data || []);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load SEO data');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchSEOData();
  }, []);

  // Open modal for edit
  const openModal = (page: { label: string; slug: string }) => {
    const found = seoData.find(s => s.slug === page.slug);
    setEditingPage(page);
    setEditingSEO(found?.seo || null);
    setShowModal(true);
  };
  const closeModal = () => {
    setEditingPage(null);
    setEditingSEO(null);
    setShowModal(false);
  };

  return (
    <section className="my-8 bg-surface">
      <HeroAdmin title="SEO Management" description="Add, edit, and manage your Platform01 static SEO"  />
      <div className='container py-20'>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <div className="w-full overflow-x-auto bg-white">
            <div
              className="grid grid-cols-9 bg-dark text-white text-sm px-4 "
              style={{ minWidth: 900 }}
            >
              <div className="py-4 text-left font-semibold col-span-2">Page</div>
              <div className="py-4 text-left font-semibold col-span-2">Slug</div>
              <div className="py-4 text-left font-semibold col-span-2">Title</div>
              <div className="py-4 text-left font-semibold col-span-2">Description</div>
              <div className="py-4 text-left font-semibold">Actions</div>
            </div>
            {allPages.map(page => {
              const found = seoData.find(s => s.slug === page.slug);
              return (
                <div
                  key={page.slug}
                  className="grid grid-cols-9 border-t border-dark/10 items-center px-4"
                  style={{ minWidth: 900 }}
                >
                  <div className="py-4 col-span-2">{page.label}</div>
                  <div className="py-4 truncate col-span-2 pr-10">{page.slug}</div>
                  <div className="py-4 truncate col-span-2 pr-5">{found?.seo?.title || '-'}</div>
                  <div className="py-4 truncate col-span-2 pr-5">{found?.seo?.description || '-'}</div>
                  <div className="py-4">
                    <Button size="default" onClick={() => openModal(page)}>
                      {found ? 'Edit' : 'Add'}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      {showModal && editingPage && (
        <Modal isOpen={showModal} onClose={closeModal} title={`SEO for ${editingPage.label}`}>
          <StaticPageSEOForm
            initialData={editingSEO ? { slug: editingPage.slug, seo: editingSEO } : { slug: editingPage.slug, seo: {} }}
            onSuccess={() => {
              closeModal();
              fetchSEOData();
            }}
            onCancel={closeModal}
          />
        </Modal>
      )}
    </section>
  );
} 