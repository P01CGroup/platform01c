import HeroInner from '@/components/sections/HeroInner'
import Header from '@/components/ui/header'
import React from 'react'
import TeamCard from '@/components/ui/team-card'
import { getCorporateTeamDataForPage } from '@/lib/data/team-data'
import { supabaseAdmin } from '@/lib/supabase/admin';

export async function generateMetadata() {
  let seo = {
    title: 'Corporate Team | Platform01 Consulting',
    description: 'Description for Corporate Team page.',
    keywords: 'platform01, Corporate Team',
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
      .eq('slug', '/corporate-team') // <-- leading slash
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

const CorporateTeam = () => {
    const Hero = {
        title: "Visionary. Trusted. Strategic Excellence.",
        supportingText: "At Platform01 Consulting, our Corporate & Commercial team blends deep industry expertise with a people-first approach. We prioritize clarity, speed, and partnership—fostering open dialogue and delivering smart, streamlined solutions. Guided by integrity and collaboration, we help clients navigate complexity with confidence."
    }

    const Advisors = getCorporateTeamDataForPage('corporate-advisors')
    const Team = getCorporateTeamDataForPage('corporate-team')
    const ManagingDirector = getCorporateTeamDataForPage('corporate-managing-director')
  return (
    <>
        <HeroInner title={Hero.title} supportingText={Hero.supportingText} />
        <div className="container pt-5">
            <Header text="Our Corporate Team" className="mb-26" />
            <div className="mb-10">
                <h2 className="heading-2 mb-4">Our Corporate Team</h2>
                <p className="max-w-2xl text-dark/50">
                  Our Corporate Team plays a critical role in delivering a seamless client experience by overseeing all matters related to Commercial and Corporate affairs. With a strong focus on process integrity and operational discipline, it empowers our Consulting Team to focus on delivering exceptional value to clients.
                </p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-5 mt-20'> 
                {ManagingDirector.map((member) => (
                  <React.Fragment key={member.id}>
                    <TeamCard
                      member={member}
                      className='md:col-start-2'
                    />
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-5 md:col-span-2 md:max-h-[455px]'>
                      <div className='md:col-span-2 flex flex-col gap-2'>
                        <h6 className='!font-sans !text-md text-dark'>Background</h6>
                        <p className='text-dark/50 leading-tight max-w-[615px]'>
                          {member.background}
                        </p>
                      </div>
                      <div className='flex flex-col gap-2'>
                        <h6 className='!font-sans !text-md text-dark'>Background</h6>
                        <p className='text-dark/50 leading-tight max-w-[250px]'>
                        Dubai UAE, Singapore, Malaysia 
                        </p>
                      </div>
                      <div className='flex flex-col gap-2'>
                        <h6 className='!font-sans !text-md text-dark'>Prior Experience</h6>
                        <p className='text-dark/50 leading-tight max-w-[615px]'>
                          {member.priorExperience}
                        </p>
                      </div>
                      <div className='md:col-span-2 flex flex-col gap-2'>
                        <h6 className='!font-sans !text-md text-dark'>Sectors</h6>
                        <p className='text-dark/50 leading-tight max-w-[615px]'>
                          {member.sectorsOfExpertise}
                        </p>
                      </div>
                      <div className='md:col-span-2 flex flex-col gap-2'>
                        <h6 className='!font-sans !text-md text-dark'>Education</h6>
                        <p className='text-dark/50 leading-tight max-w-[615px]'>
                          {member.education}
                        </p>
                      </div>
                      <div className='flex flex-col gap-2'>
                        <h6 className='!font-sans !text-md text-dark'>Professional Qualification</h6>
                        <p className='text-dark/50 leading-tight max-w-[615px]'>
                          {member.professionalQualifications}
                        </p>
                      </div>
                    </div>
                  </React.Fragment>
                ))}
            </div>
            <hr className='border-dark/10 my-20' />
            <h2 className='heading-3 mb-4 max-w-[1060px] pb-10'>Our Commercial & Corporate team features industry Leaders with over 30 years of Corporate Management experience, supported by a Dynamic and Professional staff dedicated to assisting our clients</h2>
            <div className='grid grid-cols-1 md:grid-cols-5 gap-5'>
                <div className='md:col-start-2 md:col-span-4 grid grid-cols-1 md:grid-cols-3 gap-5 gap-y-10'>
                    {Team.map((member, index) => (
                        <TeamCard
                            key={member.id}
                            member={member}
                        />
                    ))}
                </div>
            </div>
            <hr className='border-dark/10 my-20' />
            <h2 className='heading-3 mb-4 max-w-[1060px] pb-10'>Our External Advisors & Partners have deep rooted industry relationships, connections and expertise from reputable Global Corporations and Financial Institutions</h2>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-5 pb-20'>
                <div className='md:col-start-2 md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-5'>
                    {Advisors.map((member, index) => (
                        <TeamCard
                            key={member.id}
                            member={member}
                        />
                    ))}
                </div>
            </div>
        </div>
    </>
  )
}

export default CorporateTeam