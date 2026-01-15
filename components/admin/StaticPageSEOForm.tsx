'use client'
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import ImageUpload from './ImageUpload';

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

interface StaticPageSEOFormProps {
  initialData?: { slug: string; seo: SEOData } | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function StaticPageSEOForm({ initialData, onSuccess, onCancel }: StaticPageSEOFormProps) {
  const isEdit = !!(initialData && Object.keys(initialData.seo).length > 0);
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [seo, setSeo] = useState<SEOData>(initialData?.seo || {});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [deleting, setDeleting] = useState(false);

  function isInputElement(target: EventTarget): target is HTMLInputElement {
    return (target as HTMLInputElement).checked !== undefined;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (name === 'slug') setSlug(value);
    else if (type === 'checkbox') {
      setSeo((prev) => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setSeo((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const method = isEdit ? 'PUT' : 'POST';
      const body = { slug, seo };
      const res = await fetch('/api/static-pages', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save');
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Failed to save');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!slug) return;
    setDeleting(true);
    setError('');
    try {
      const res = await fetch(`/api/static-pages?slug=${encodeURIComponent(slug)}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to delete');
      }
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Failed to delete');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Slug is always shown but disabled */}
      <div>
        <label className="block font-medium mb-1">Slug</label>
        <input
          name="slug"
          value={slug}
          className="w-full border p-2 rounded bg-gray-100"
          disabled
        />
      </div>
      <div>
        <label className="block font-medium mb-1">Title</label>
        <input
          name="title"
          value={seo.title || ''}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
      </div>
      <div>
        <label className="block font-medium mb-1">Description</label>
        <textarea
          name="description"
          value={seo.description || ''}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
      </div>
      <div>
        <label className="block font-medium mb-1">Keywords (comma separated)</label>
        <input
          name="keywords"
          value={seo.keywords || ''}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>
      <div>
        <label className="block font-medium mb-1">Canonical URL</label>
        <input
          name="canonical_url"
          value={seo.canonical_url || ''}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-medium mb-1">OG Title</label>
          <input
            name="og_title"
            value={seo.og_title || ''}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">OG Description</label>
          <input
            name="og_description"
            value={seo.og_description || ''}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <ImageUpload
            label="OG Image"
            currentImage={seo.og_image || ''}
            onUploadComplete={url => setSeo(prev => ({ ...prev, og_image: url }))}
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Twitter Title</label>
          <input
            name="twitter_title"
            value={seo.twitter_title || ''}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Twitter Description</label>
          <input
            name="twitter_description"
            value={seo.twitter_description || ''}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <ImageUpload
            label="Twitter Image"
            currentImage={seo.twitter_image || ''}
            onUploadComplete={url => setSeo(prev => ({ ...prev, twitter_image: url }))}
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="noindex"
            checked={!!seo.noindex}
            onChange={handleChange}
          />
          Noindex
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="nofollow"
            checked={!!seo.nofollow}
            onChange={handleChange}
          />
          Nofollow
        </label>
      </div>
      {error && <div className="text-red-500">{error}</div>}
      <div className="flex gap-2 justify-end">
        {isEdit && (
          <Button
            type="button"
            variant="ghost"
            onClick={handleDelete}
            disabled={deleting || loading}
          >
            {deleting ? 'Deleting...' : 'Delete'}
          </Button>
        )}
        <Button type="button" variant="secondary" onClick={onCancel} disabled={loading || deleting}>
          Cancel
        </Button>
        <Button type="submit" disabled={loading || deleting}>
          {loading ? 'Saving...' : isEdit ? 'Update' : 'Add'}
        </Button>
      </div>
    </form>
  );
} 