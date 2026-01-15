'use client';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { navigationData, NavItemData, MegaMenuData, MegaMenuColumn } from '@/lib/navigation-config';

function isMegaMenu(item: NavItemData | MegaMenuData): item is MegaMenuData {
  return (item as MegaMenuData).isMegaMenu === true && Array.isArray((item as MegaMenuData).children);
}
function isNavItem(item: any): item is NavItemData {
  return typeof item.label === 'string' && typeof item.href === 'string';
}
function isMegaMenuColumn(item: any): item is MegaMenuColumn {
  return typeof item.title === 'string' && Array.isArray(item.links);
}
function flattenNav(nav: (NavItemData | MegaMenuData)[]): { label: string; slug: string }[] {
  const result: { label: string; slug: string }[] = [];
  nav.forEach(item => {
    if (isMegaMenu(item)) {
      item.children.forEach((col) => {
        if (isMegaMenuColumn(col)) {
          col.links.forEach(link => {
            result.push({ label: link.label, slug: link.href });
          });
        }
      });
    } else if (isNavItem(item) && item.children && item.children.length) {
      item.children.forEach(child => {
        if (isNavItem(child)) {
          result.push({ label: child.label, slug: child.href });
        }
      });
    } else if (isNavItem(item)) {
      result.push({ label: item.label, slug: item.href });
    }
  });
  return result;
}

export default function SiteSettings() {
  const [robots, setRobots] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [exclude, setExclude] = useState<string[]>([]);
  const [excludeLoading, setExcludeLoading] = useState(true);
  const [excludeSaving, setExcludeSaving] = useState(false);
  const staticPages = flattenNav(navigationData);
  const [insightSlugs, setInsightSlugs] = useState<{ label: string; slug: string }[]>([]);

  useEffect(() => {
    fetch('/api/site-settings/robots-txt')
      .then(res => res.json())
      .then(data => {
        setRobots(data.value || '');
        setLoading(false);
      });
    // Fetch sitemap_exclude
    fetch('/api/site-settings/sitemap-exclude')
      .then(res => res.json())
      .then(data => {
        setExclude(data.value || []);
        setExcludeLoading(false);
      });
    // Fetch dynamic insight slugs
    fetch('/api/insights')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data.data)) {
          setInsightSlugs(data.data.map((i: any) => ({ label: i.title, slug: `/insights/${i.slug}` })));
        }
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    const res = await fetch('/api/site-settings/robots-txt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: robots }),
    });
    if (res.ok) {
      setMessage('robots.txt updated!');
    } else {
      setMessage('Failed to update robots.txt');
    }
    setSaving(false);
  };

  const handleRegenerateSitemap = () => {
    setMessage('Sitemap.xml is always up to date and generated dynamically!');
  };

  const handleExcludeChange = (slug: string, checked: boolean) => {
    setExclude(prev => checked ? [...prev, slug] : prev.filter(s => s !== slug));
  };

  const handleSaveExclude = async () => {
    setExcludeSaving(true);
    setMessage('');
    const res = await fetch('/api/site-settings/sitemap-exclude', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: exclude }),
    });
    if (res.ok) {
      setMessage('Sitemap settings updated!');
    } else {
      setMessage('Failed to update sitemap settings');
    }
    setExcludeSaving(false);
  };

  return (
    <section className="grid grid-cols-2 gap-4 container">
      <h3 className="col-span-2">Site Settings</h3>
      <hr className='col-span-2 border-dark/10 mb-5' />
      <div className="mb-6">
        <label className="block font-medium mb-2">Edit Robots.txt File</label>
        <textarea
          className="w-full border p-2 border-dark/10 min-h-[120px] font-mono bg-surface text-sm outline-0"
          value={robots}
          onChange={e => setRobots(e.target.value)}
          disabled={loading || saving}
        />
        <div className="flex gap-2 mt-2">
          <Button onClick={handleSave} disabled={loading || saving}>
            {saving ? 'Saving...' : 'Save'}
          </Button>
          <Button
            asChild
            variant="secondary"
          >
            <a href="/robots.txt" target="_blank" rel="noopener noreferrer">
              View robots.txt
            </a>
          </Button>
        </div>
      </div>
      <div className="mb-6">
        <label className="block font-medium mb-2">Edit Sitemap Settings</label>
        <div className="border p-4 border-dark/10 bg-surface mt-2">
          <div className="font-medium mb-2">Include/Exclude Pages from Sitemap</div>
          {excludeLoading ? (
            <div>Loading...</div>
          ) : (
            <>
              <div className="mb-2 text-xs text-gray-500">Uncheck to exclude a page from the sitemap.</div>
              <div className="max-h-48 overflow-y-auto">
                {[...staticPages, ...insightSlugs].map(page => (
                  <label key={page.slug} className="flex items-center gap-2 mb-1">
                    <input
                      type="checkbox"
                      checked={!exclude.includes(page.slug)}
                      onChange={e => handleExcludeChange(page.slug, !e.target.checked)}
                    />
                    <span className="truncate">{page.label} <span className="text-gray-400">({page.slug})</span></span>
                  </label>
                ))}
              </div>
              <div className="flex gap-2 mt-2 w-full">
                <Button onClick={handleSaveExclude} disabled={excludeSaving} className="!w-full mt-4 bg-white" variant='tertiary'>
                  {excludeSaving ? 'Saving...' : 'Save Sitemap Settings'}
                </Button>
              </div>
            </>
          )}
        </div>
        <div className="flex gap-2 mt-4">
          <Button onClick={handleRegenerateSitemap}>
            Regenerate Sitemap
          </Button>
          <Button
            asChild
            variant="secondary"
          >
            <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer">
              View Sitemap
            </a>
          </Button>
        </div>
      </div>
      {message && <div className="my-4 p-4 bg-surface col-span-2 border border-dark/10 text-dark capitalize">{message}</div>}
    </section>
  );
} 