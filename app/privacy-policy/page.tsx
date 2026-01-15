import HeroInner from '@/components/sections/HeroInner'
import React from 'react'
import { getSeoMetadata } from '@/lib/seo-config'
import { supabaseAdmin } from '@/lib/supabase/admin';

export async function generateMetadata() {
  let seo = {
    title: 'Privacy Policy | Platform01 Consulting',
    description: 'Description for Privacy Policy page.',
    keywords: 'platform01, Privacy Policy',
    og_title: '',
    og_description: '',
    og_image: '',
    twitter_title: '',
    twitter_description: '',
    twitter_image: '',
    canonical_url: '',
  };
  try {
    const { data } = await supabaseAdmin
      .from('static_pages')
      .select('seo')
      .eq('slug', '/privacy-policy')
      .single();
    if (data?.seo) {
      seo = { ...seo, ...data.seo, keywords: data.seo.keywords || '' };
    }
  } catch (e) {}
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
  };
}

const PrivacyPolicy = () => {
    const Hero = {
        title: "Privacy Policy",
    }
  return (
    <>
        <HeroInner title={Hero.title} />
        <div className='container flex flex-col gap-10 py-10 text-dark/50'>
            <p>Platform01 Consulting (“Platform01 Consulting”, “we”, “us”, or “our”) understands that your privacy is important to you. We are committed to respecting your privacy and protecting your personal data—any information capable of identifying you as an individual. This Privacy Policy outlines how we handle and protect your personal data in connection with Platform01 Consulting's business activities, including client services, events, and conferences, as well as through our websites, applications, and communications that link to this policy (collectively referred to as "the Sites"), in our capacity as a data controller. Please also refer to our Terms of Use for additional information about our online terms and policies.</p>
            <div>
                <h3 className="heading-4 mt-6 mb-2 text-dark">Collected Information</h3>
                <p>We collect personal data during our business activities, including when you engage with certain areas of our Sites. This may include when you subscribe to insights and alerts, complete assessment forms to schedule a session with our experts or submit information for job applications.</p>
                <p>In addition to information you voluntarily provide, we may automatically collect data such as your IP address, browser type, device identifiers, and browsing behavior using cookies and other tracking technologies like web beacons, clear GIFs, and pixels. This may include information about your interactions with the Sites, including pages viewed and search queries. Such data may be linked to a unique identifier and any personal data you have submitted.</p>
                <p>We may also collect personal data from third-party sources, such as data brokers, aggregators, and publicly available online platforms, including information you have made public on social media or online forums. This data may include demographic or professional information and may be combined with information already held by us. We ensure that any third-party data sources are transparent and legally compliant in their data collection and disclosure practices.</p>
            </div>
            <div>
                <h3 className="heading-4 mt-6 mb-2 text-dark">Use of Information</h3>
                <p>Platform01 Consulting uses personal data for a variety of legitimate business purposes. These include fulfilling your requests, sending tailored content and updates, improving our services, distributing insights and alerts, analyzing site performance, complying with legal obligations, and upholding the terms of use and other corporate policies.</p>
                <p>We may use personal data in connection with client services, research, analytics, or service delivery. Where necessary, we may combine or analyze your personal data to better understand your interests and provide content or offerings most relevant to you. Your personal data may be retained for follow-up communications, unless you choose to unsubscribe.</p>
                <p>We do not track your activity across third-party websites or platforms for profiling or advertising purposes.</p>
            </div>
            <div>
                <h3 className="heading-4 mt-6 mb-2 text-dark">Disclosure of Data</h3>
                <p>We do not sell your personal data. Platform01 Consulting will not intentionally disclose or transfer your personal data to third parties without your consent, except as permitted or required by law.</p>
                <p>We may share your data with trusted third-party service providers that support our Sites or business operations—including IT services, analytics, or client service delivery—under strict contractual and confidentiality obligations. Such processing will always align with this Privacy Policy and comply with relevant data protection laws.</p>
                <p>Additionally, we may disclose your data if required to:</p>
                <ul className="list-disc pl-6 mb-2 mt-4">
                <li>Comply with applicable laws or legal processes</li>
                <li>Respond to lawful requests by public authorities</li>
                <li>Prevent physical harm or financial loss</li>
                <li>Investigate or address suspected illegal activity or violations of our terms</li>
                <li>Protect our rights, property, or the safety of others</li>
                <li>Enforce corporate policies and legal agreements</li>
                <li>Support compliance, auditing, and governance obligations</li>
                </ul>
            </div>
            <div>
                <h3 className="heading-4 mt-6 mb-2 text-dark">Social Media</h3>
                <p>Our Sites may offer the option to link your social media accounts—such as LinkedIn, Twitter, Facebook, or YouTube—with Platform01 Consulting. By doing so, you allow us to access information you have made public in your profile, which may include your name, email address, profile image, gender, or location.</p>
                <p>We use such data in accordance with both the applicable platform's terms and this Privacy Policy. You are encouraged to review your social media account settings to manage the data shared with us. If you wish to disconnect your social media profile from our services, please refer to your platform's account settings.</p>
            </div>

            <div>
                <h3 className="heading-4 mt-6 mb-2 text-dark">Security</h3>
                <p>We implement appropriate technical and organizational safeguards to protect personal data from loss, misuse, unauthorized access, alteration, or destruction. Access to personal data is limited to authorized personnel and service providers, who are required to maintain confidentiality.</p>
                <p>While we make every effort to secure your data, no system or transmission over the internet is fully secure. Therefore, we cannot guarantee absolute security of your data.</p>
            </div>

            <div>
                <h3 className="heading-4 mt-6 mb-2 text-dark">Data Management</h3>
                <p>We retain personal data for as long as necessary to fulfill the purposes outlined in this Privacy Policy or to comply with legal, contractual, or operational obligations. In some cases, data may be retained longer for legal defense, record-keeping, or research purposes, in line with applicable data retention regulations.</p>
                <p>Once the data is no longer required, we will securely delete or anonymize it, unless further retention is legally required.</p>
            </div>
            <div>
                <h3 className="heading-4 mt-6 mb-2 text-dark">Your Rights</h3>
                <p>Subject to the laws of your jurisdiction—including the GDPR, UAE Federal Data Protection Law, and KSA PDPL—you may have the right to:</p>
                <ul className="list-disc pl-6 mb-2">
                    <li>Request access to your personal data</li>
                    <li>Request correction of inaccurate or incomplete data</li>
                    <li>Request deletion of your data</li>
                    <li>Object to or restrict processing of your data</li>
                    <li>Withdraw your consent at any time (where processing is based on consent)</li>
                    <li>Request a copy of your personal data in a portable format</li>
                    <li>Lodge a complaint with a relevant data protection authority</li>
                </ul>
                <p>To exercise these rights, please contact us at <a href="mailto:info@platform01consulting.com" className="text-dark">info@platform01consulting.com</a>. We will respond to all legitimate requests in accordance with applicable law.</p>
            </div>
            <div>
                <h3 className="heading-4 mt-6 mb-2 text-dark">Unsubscribe</h3>
                <p>If you are receiving insights, alerts, or event invitations and no longer wish to be contacted, you may unsubscribe by following the instructions included in our communications or by emailing <a href="mailto:info@platform01consulting.com" className="text-dark">info@platform01consulting.com</a>. We respect your preferences and will act promptly upon your request.</p>
            </div>
            <div>
                <h3 className="heading-4 mt-6 mb-2 text-dark">Consent & Changes</h3>
                <p>By using the Sites, you consent to the collection, use, and processing of your personal data as described in this Privacy Policy. We reserve the right to modify this policy to reflect legal or operational changes. Any material updates will be communicated either via your registered email address or through a prominent notice on our Sites.</p>
                <p>Your continued use of the Sites following such changes constitutes your acknowledgment and acceptance of the updated policy.</p>
            </div>
        </div>
    </>
  )
}

export default PrivacyPolicy