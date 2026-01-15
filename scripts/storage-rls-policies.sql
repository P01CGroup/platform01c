-- RLS Policies for blog-images Storage Bucket
-- Run this in your Supabase SQL Editor

-- Enable RLS on storage.objects (if not already enabled)
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Policy 1: Public read access for blog images
CREATE POLICY "Public read access for blog images" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'blog-images');

-- Policy 2: Authenticated users can upload blog images
CREATE POLICY "Authenticated users can upload blog images" 
ON storage.objects FOR INSERT 
WITH CHECK (
  bucket_id = 'blog-images' 
  AND auth.role() = 'authenticated'
);

-- Policy 3: Users can delete their own uploads
CREATE POLICY "Users can delete their own uploads" 
ON storage.objects FOR DELETE 
USING (
  bucket_id = 'blog-images' 
  AND auth.uid() = owner
);

-- Policy 4: Users can update their own uploads
CREATE POLICY "Users can update their own uploads" 
ON storage.objects FOR UPDATE 
USING (
  bucket_id = 'blog-images' 
  AND auth.uid() = owner
);

-- Verify policies were created
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual
FROM pg_policies 
WHERE tablename = 'objects' 
AND schemaname = 'storage'
ORDER BY policyname; 