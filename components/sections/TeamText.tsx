import React from 'react'
import TeamCard from '../ui/team-card'
import Header from '../ui/header'
import { teamMembers, corporateTeamMembers } from '@/lib/data/team-data'

interface TeamTextProps {
  bgSurface?: boolean
  className?: string
  header?: string
  parentClasses?: string
  teamMember?: string
  children: React.ReactNode
}

const TeamText = ({bgSurface = true, children, className, parentClasses, header, teamMember = 'mustafa-nadeem'}: TeamTextProps) => {
  console.log(teamMembers)
  
  // Check if teamMember exists in either teamMembers or corporateTeamMembers
  const member = teamMembers[teamMember] || corporateTeamMembers[teamMember]
  
  return (
    <div className={`${bgSurface ? 'bg-surface' : ''} ${parentClasses}`}>
      <div className={`container ${header ? 'pt-5 pb-16' : 'py-16'}`}>
            {header && (
              <Header text={header} className='mb-26' />
            )}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-16'>
            <div className={`md:col-span-2 flex flex-col justify-center gap-16 ${className}`}>
              {children}
            </div>
            {member && (
              <TeamCard member={member} bgSurface={!bgSurface} />
            )}
        </div>
      </div>
    </div>
  )
}

export default TeamText