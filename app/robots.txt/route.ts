// import { NextResponse } from 'next/server';
// import { supabaseAdmin } from '@/lib/supabase/admin';

// export async function GET() {
//   const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://yourdomain.com';
//   let robots = '';
//   try {
//     const { data } = await supabaseAdmin
//       .from('site_settings')
//       .select('value')
//       .eq('key', 'robots_txt')
//       .single();
//     if (data && data.value) {
//       robots = data.value;
//     }
//   } catch (e) {}
//   if (!robots) {
//     robots = `User-agent: *\nAllow: /\nSitemap: ${baseUrl}/sitemap.xml`;
//   }
//   return new NextResponse(robots, {
//     status: 200,
//     headers: {
//       'Content-Type': 'text/plain',
//     },
//   });
// }

import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function GET() {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://www.platform01consulting.com";

  let robots = "";

  try {
    const { data } = await supabaseAdmin
      .from("site_settings")
      .select("value")
      .eq("key", "robots_txt")
      .single();
    if (data && data.value) {
      robots = data.value;
    }
  } catch (e) {}

  if (!robots) {
    robots = [
      `User-agent: *`,
      `Allow: /`,
      `Disallow: /api/`,
      `Disallow: /admin/`,
      ``,
      `User-agent: Googlebot`,
      `Allow: /`,
      ``,
      `User-agent: Google-Extended`,
      `Allow: /`,
      ``,
      `User-agent: GPTBot`,
      `Allow: /`,
      ``,
      `User-agent: OAI-SearchBot`,
      `Allow: /`,
      ``,
      `User-agent: ChatGPT-User`,
      `Allow: /`,
      ``,
      `User-agent: ClaudeBot`,
      `Allow: /`,
      ``,
      `User-agent: Claude-SearchBot`,
      `Allow: /`,
      ``,
      `User-agent: Claude-User`,
      `Allow: /`,
      ``,
      `User-agent: PerplexityBot`,
      `Allow: /`,
      ``,
      `User-agent: Perplexity-User`,
      `Allow: /`,
      ``,
      `User-agent: Applebot`,
      `Allow: /`,
      ``,
      `User-agent: Applebot-Extended`,
      `Allow: /`,
      ``,
      `User-agent: FacebookBot`,
      `Allow: /`,
      ``,
      `Sitemap: ${baseUrl}/sitemap.xml`,
    ].join("\n");
  }

  return new NextResponse(robots, {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
