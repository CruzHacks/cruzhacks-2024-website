import React, { useEffect, useState } from "react"
import { TeamFormationProps, TeamMemberProps, TeamDisplayProps, TeamMemberTagProps } from "../../utils/types"
import useAuth from "../../hooks/useAuth"
import { deleteTeam, lockTeam, removeTeamMember } from "../../utils/apis/firebase"
import { isInterfaceDeclaration } from "typescript"
// import { ConfirmationModal } from "../../../Dashboard/components/ConfirmationModal/ConfirmationModal"
// import { deleteTeam, lockTeam, removeTeamMember } from "../../api"

export const TeamDisplay = (props: TeamDisplayProps) => {
    const {
        auth: { user },
      } = useAuth()
      
  const [open, setOpen] = useState<boolean>(false)

  if (!user) throw new Error("User could not be fetched from session")
  console.log('from display', props.teamPage)


  console.log('from team display', props.teamPage)

  return (
    <div>
      {/* <ConfirmationModal
        open={open}
        setOpen={setOpen}
        header='Lock In Team'
        primaryButtonText='Lock In'
        primaryButtonHandler={() => {
          lockTeam(
            props.teamPage.teamName,
          )
        }}
        secondaryButtonText='Cancel'
        secondaryButtonHandler={() => setOpen(false)}
        body='Are you sure you want to lock in your team?'
      /> */}
    <div className='flex flex-col flex-wrap place-content-center py-3'>
        <div className='text-center text-lg text-[#192F6F]'>
          {props.teamPage.teamName || "<- No Team ->"}
        </div>
    </div>
      <div className='flex flex-col gap-2 px-5'>
        {props.teamPage.teamMembers.map((member: TeamMemberProps) => {
          return (
            <TeamMemberTag
              key={member.memberEmail}
              email={member.memberEmail}
              name={member.memberName}
              type='ACCEPTED'
              teamLeader={props.teamPage.teamLeader}
              setTeamPage={props.setTeamPage}
            />
          )
        })}
        {props.teamPage.invitedTeamMembers.map((member: TeamMemberProps) => {
          return (
            <TeamMemberTag
              key={member.memberEmail}
              email={member.memberEmail}
              name={member.memberName}
              type='INVITED'
              teamLeader={props.teamPage.teamLeader}
              setTeamPage={props.setTeamPage}
            />
          )
        })}
      </div>
      {props.teamPage.teamLeader === user?.email ? (
        <div className='flex w-full flex-row flex-wrap place-content-center gap-5 py-5'>
          <button
          className='rounded-md border-2 border-[#F81A16] bg-[#F81A16] px-1.5 py-0.5 text-sm text-[#FFF] hover:bg-[#FFF] hover:text-[#F81A16]'
            onClick={() =>
              deleteTeam(
                user,
                props.teamPage.teamName,
              ).then((newTeamPage: TeamFormationProps) => {
                props.setTeamPage(newTeamPage)
                props.setTeamStatus("JOIN")
              })
            }
          >
            DELETE TEAM
          </button>
          <div>
            {!props.teamPage.lockedIn ? (
                <button
                className='rounded-md border-2 border-[#10E926] bg-[#10E926] px-1.5 py-0.5 text-sm text-[#FFF] hover:bg-[#FFF] hover:text-[#10E926]'
                onClick={() => lockTeam(
                    user,
                    props.teamPage.teamName,
                ).then((newTeamPage: TeamFormationProps) => {
                    props.setTeamPage(newTeamPage)
                })}
                >
                LOCK IN TEAM
                </button>
            ) : null}
        </div>
      </div>
      ) : null}
    </div>
  )
}

const TeamMemberTag = (props: TeamMemberTagProps) => {
    const {
        auth: { user },
    } = useAuth()

    const [type, setType] = useState<string>("")
    
    useEffect(() => {
        if (props.teamLeader === props.email)
            setType("LEADER")
        else if (props.type === "ACCEPTED")
            setType("MEMBER")
        else if (props.type === "INVITED")
            setType("INVITED")
    },[props.setTeamPage])

  return (
    <div className='flex w-full flex-row justify-between rounded-md border-2 border-[#C2C6C4] p-2'>
        <div className='text-md text-center text-[#192F6F]'>
        {props.name || "<Empty>"}
      </div>
      <div className='flex flex-row flex-wrap place-content-center gap-1'>
      {props.teamLeader === user?.email && props.email !== props.teamLeader  ? (
        <button
        className='rounded-md border-2 border-[#F81A16] px-1.5 py-0.5 text-sm text-[#F81A16] hover:bg-[#F81A16] hover:text-[#FFF]'
        onClick={() => {
            removeTeamMember(
              user,
              props.email,
              ).then((newTeamPage: TeamFormationProps) => {
                props.setTeamPage(newTeamPage)
              })
          }}
        >
          Remove
        </button>
      ) : null}
        <TeamMemberBadge type={type}></TeamMemberBadge>
      </div>
    </div>
  )
}

export interface BadgeProps {
    type: string
}


const TeamMemberBadge = (props: BadgeProps) => {
    if (props.type === 'LEADER')
        return (
            <div className='rounded-md border-2 border-[#ECCC2B] bg-[#ECCC2B] px-1.5 py-0.5 text-sm text-[#FFF]'>
                LEADER
            </div>
        )
    else if (props.type === 'MEMBER')
        return (
            <div className='rounded-md border-2 border-[#139A43] bg-[#139A43] px-1.5 py-0.5 text-sm text-[#FFF]'>
                    MEMBER
            </div>
            
        )
    else if (props.type === 'INVITED')
        return (
            <div className='rounded-md border-2 border-[#FA4437] bg-[#FA4437] px-1.5 py-0.5 text-sm text-[#FFF]'>
                    INVITED
            </div>
        )
}
