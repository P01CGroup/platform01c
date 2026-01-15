import HeroInner from '@/components/sections/HeroInner'
import React from 'react'
import { getSeoMetadata } from '@/lib/seo-config'
import { supabaseAdmin } from '@/lib/supabase/admin';

export async function generateMetadata() {
  let seo = {
    title: 'Terms of Use | Platform01 Consulting',
    description: 'Description for Terms of Use page.',
    keywords: 'platform01, Terms of Use',
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
      .eq('slug', '/terms-of-use')
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

const TermsOfUse = () => {
    const Hero = {
        title: "Terms of Use",
    }
  return (
    <>
        <HeroInner title={Hero.title} />
        <div className='container flex flex-col gap-10 py-10 text-dark/50'>
            <p>These Terms of Use ("Terms") govern your access to and use of Platform01 Consulting's websites, applications, services, and communications (collectively, "the Services") operated by Platform01 Consulting ("Platform01 Consulting", "we", "us", or "our"). By accessing or using our Services, you agree to be bound by these Terms. If you disagree with any part of these Terms, you may not access or use our Services.</p>
            
            <div>
                <h3 className="heading-4 mt-6 mb-2 text-dark">Acceptance of Terms</h3>
                <p>By accessing, browsing, or using our Services, you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy. These Terms constitute a legally binding agreement between you and Platform01 Consulting. If you are using our Services on behalf of an organization, you represent and warrant that you have the authority to bind that organization to these Terms.</p>
            </div>

            <div>
                <h3 className="heading-4 mt-6 mb-2 text-dark">Description of Services</h3>
                <p>Platform01 Consulting provides consulting services, including but not limited to business strategy, digital transformation, technology advisory, and professional development services. Our Services may include:</p>
                <ul className="list-disc pl-6 mb-2 mt-4">
                    <li>Consulting and advisory services</li>
                    <li>Digital content, insights, and publications</li>
                    <li>Event registration and participation</li>
                    <li>Assessment forms and expert session scheduling</li>
                    <li>Newsletter subscriptions and communications</li>
                    <li>Professional networking and community features</li>
                </ul>
                <p>We reserve the right to modify, suspend, or discontinue any aspect of our Services at any time without prior notice.</p>
            </div>

            <div>
                <h3 className="heading-4 mt-6 mb-2 text-dark">User Accounts and Registration</h3>
                <p>Certain features of our Services may require you to create an account or provide personal information. You are responsible for:</p>
                <ul className="list-disc pl-6 mb-2 mt-4">
                    <li>Providing accurate, current, and complete information</li>
                    <li>Maintaining the security of your account credentials</li>
                    <li>All activities that occur under your account</li>
                    <li>Notifying us immediately of any unauthorized use</li>
                </ul>
                <p>You may not share your account credentials with others or allow others to access your account. We reserve the right to terminate accounts that violate these Terms.</p>
            </div>

            <div>
                <h3 className="heading-4 mt-6 mb-2 text-dark">Acceptable Use</h3>
                <p>You agree to use our Services only for lawful purposes and in accordance with these Terms. You agree not to:</p>
                <ul className="list-disc pl-6 mb-2 mt-4">
                    <li>Use the Services for any illegal or unauthorized purpose</li>
                    <li>Violate any applicable laws, regulations, or third-party rights</li>
                    <li>Transmit harmful, offensive, or inappropriate content</li>
                    <li>Attempt to gain unauthorized access to our systems or networks</li>
                    <li>Interfere with or disrupt the Services or servers</li>
                    <li>Use automated systems to access the Services without permission</li>
                    <li>Impersonate any person or entity or misrepresent your affiliation</li>
                    <li>Collect or harvest personal information without consent</li>
                </ul>
            </div>

            <div>
                <h3 className="heading-4 mt-6 mb-2 text-dark">Intellectual Property Rights</h3>
                <p>All content, features, and functionality of our Services, including but not limited to text, graphics, logos, images, software, and design elements, are owned by Platform01 Consulting or its licensors and are protected by copyright, trademark, and other intellectual property laws.</p>
                <p>You may access and view our content for personal, non-commercial use only. You may not:</p>
                <ul className="list-disc pl-6 mb-2 mt-4">
                    <li>Reproduce, distribute, or create derivative works</li>
                    <li>Modify, adapt, or reverse engineer our content</li>
                    <li>Remove or alter any copyright or proprietary notices</li>
                    <li>Use our content for commercial purposes without permission</li>
                </ul>
                <p>Any content you submit to our Services remains your intellectual property, but you grant us a non-exclusive, worldwide, royalty-free license to use, reproduce, and distribute such content in connection with our Services.</p>
            </div>

            <div>
                <h3 className="heading-4 mt-6 mb-2 text-dark">Consulting Services</h3>
                <p>When engaging our consulting services, additional terms and conditions may apply as specified in separate service agreements. Our consulting services are provided on an "as-is" basis, and we make no guarantees regarding specific outcomes or results.</p>
                <p>Client confidentiality is paramount. We maintain strict confidentiality regarding client information and business matters, subject to applicable legal requirements and our Privacy Policy.</p>
            </div>

            <div>
                <h3 className="heading-4 mt-6 mb-2 text-dark">Disclaimers and Limitations</h3>
                <p>Our Services are provided "as is" and "as available" without warranties of any kind, either express or implied. Platform01 Consulting disclaims all warranties, including but not limited to:</p>
                <ul className="list-disc pl-6 mb-2 mt-4">
                    <li>Warranties of merchantability and fitness for a particular purpose</li>
                    <li>Warranties that the Services will be uninterrupted or error-free</li>
                    <li>Warranties regarding the accuracy or completeness of content</li>
                    <li>Warranties that defects will be corrected</li>
                </ul>
                <p>In no event shall Platform01 Consulting be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or use, arising from your use of our Services.</p>
            </div>

            <div>
                <h3 className="heading-4 mt-6 mb-2 text-dark">Third-Party Links and Services</h3>
                <p>Our Services may contain links to third-party websites, applications, or services. We do not endorse, control, or assume responsibility for the content, privacy policies, or practices of any third-party sites or services.</p>
                <p>Your interactions with third-party services are governed by their respective terms and privacy policies. We encourage you to review these policies before engaging with third-party services.</p>
            </div>

            <div>
                <h3 className="heading-4 mt-6 mb-2 text-dark">Indemnification</h3>
                <p>You agree to indemnify, defend, and hold harmless Platform01 Consulting and its officers, directors, employees, and agents from and against any claims, damages, losses, liabilities, costs, or expenses (including reasonable attorneys' fees) arising from:</p>
                <ul className="list-disc pl-6 mb-2 mt-4">
                    <li>Your use of our Services</li>
                    <li>Your violation of these Terms</li>
                    <li>Your violation of any third-party rights</li>
                    <li>Any content you submit or transmit through our Services</li>
                </ul>
            </div>

            <div>
                <h3 className="heading-4 mt-6 mb-2 text-dark">Termination</h3>
                <p>We may terminate or suspend your access to our Services immediately, without prior notice or liability, for any reason, including if you breach these Terms.</p>
                <p>Upon termination, your right to use the Services will cease immediately. All provisions of these Terms which by their nature should survive termination shall survive, including but not limited to intellectual property rights, disclaimers, indemnification, and limitations of liability.</p>
            </div>

            <div>
                <h3 className="heading-4 mt-6 mb-2 text-dark">Governing Law and Jurisdiction</h3>
                <p>These Terms shall be governed by and construed in accordance with the laws of the jurisdiction where Platform01 Consulting is incorporated, without regard to its conflict of law provisions.</p>
                <p>Any disputes arising from these Terms or your use of our Services shall be resolved through binding arbitration in accordance with the rules of the relevant arbitration association, unless otherwise required by applicable law.</p>
            </div>

            <div>
                <h3 className="heading-4 mt-6 mb-2 text-dark">Severability</h3>
                <p>If any provision of these Terms is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary so that these Terms will otherwise remain in full force and effect.</p>
            </div>

            <div>
                <h3 className="heading-4 mt-6 mb-2 text-dark">Changes to Terms</h3>
                <p>We reserve the right to modify these Terms at any time. We will notify users of any material changes by posting the updated Terms on our Services or by sending notice via email.</p>
                <p>Your continued use of our Services after such modifications constitutes your acceptance of the updated Terms. If you do not agree to the modified Terms, you should discontinue using our Services.</p>
            </div>

            <div>
                <h3 className="heading-4 mt-6 mb-2 text-dark">Contact Information</h3>
                <p>If you have any questions about these Terms of Use, please contact us at <a href="mailto:info@platform01consulting.com" className="text-dark">info@platform01consulting.com</a>.</p>
                <p>These Terms of Use were last updated on [Date]. Please review them periodically for any changes.</p>
            </div>
        </div>
    </>
  )
}

export default TermsOfUse 