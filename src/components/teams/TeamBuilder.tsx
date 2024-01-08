import React, { Dispatch, useState } from "react"
import {
  createTeam,
  rsvpInvite,
} from "../../utils/apis/firebase"
import { TeamBuilderProps, TeamFormationProps, InvitationMode, InvitationProps } from "../../utils/types"
import useAuth from "../../hooks/useAuth"


export const TeamBuilder = (props: TeamBuilderProps) => {
    return (
        <div className='flex flex-col gap-5 pb-5'>
            <InvitationTypeChooser
                teamStatus={props.teamStatus}
                setTeamStatus={props.setTeamStatus}
            />
            {props.teamStatus === "JOIN" ? (
                <JoinTeam
                invites={props.teamPage.invites}
                setTeamPage={props.setTeamPage}
                />
            ) : (
                <CreateTeam
                teamPage={props.teamPage}
                setTeamPage={props.setTeamPage}
                />
            )}
        </div>
    )
}


const InvitationTypeChooser = (props: {
  teamStatus: InvitationMode
  setTeamStatus: Dispatch<InvitationMode>
}) => {
  return (
    <div className='flex flex-col'>
        <div className='px-3 text-lg text-[#192F6F]'>
            Would you like to create or join a team?
        </div>
        <div className="flex flex-row flex-wrap place-content-center">
            <button
                className='px-3 pb-1 pt-3'
                onClick={() => {
                        props.setTeamStatus(props.teamStatus == "JOIN" ? "CREATE" : "JOIN")
                    }}
            >
                <div className='flex flex-row content-center gap-3 rounded-lg border-2 border-[#FFF] bg-[#E8EBEE] px-3 py-1 text-sm'>
                    <div className={`rounded-md px-3 py-1 ${props.teamStatus === 'JOIN' ? 'bg-blue-imperial/75' : 'text-blue-imperial/75'}`}>
                        JOIN
                    </div>
                    <div className={`rounded-md px-3 py-1 ${props.teamStatus === 'CREATE' ? 'bg-blue-imperial/75' : 'text-blue-imperial/75'}`}>
                        CREATE
                    </div>
                </div>
            </button>
        </div>
    </div>
  )
}

const JoinTeam = (props: {
  invites: Array<InvitationProps>
  setTeamPage: Dispatch<TeamFormationProps>
}) => {
  return (
    <div className='flex flex-col gap-2'>
        <div className='text-md px-4 text-[#192F6F]'>
            Pending Invitations
        </div>
        <div className='flex flex-col px-5'>
            {props.invites.length === 0 ?
               (
                <div className='border-blue-imperial text-blue-imperial rounded-md border-2 px-3 py-1 text-sm '>

                        No Pending Invitations
                </div>
                ) : (
                    props.invites.map(invite => (
                    <Invitation
                    key={invite.teamName}
                    teamName={invite.teamName}
                    setTeamPage={props.setTeamPage}
                    />
                    ))
                )
            }
        </div>
    </div>
  )
}

const Invitation = (props: {
  teamName: string
  setTeamPage: Dispatch<TeamFormationProps>
}) => {
    const {
        auth: { user },
    } = useAuth()
    
    if (!user) throw new Error("User could not be fetched from session")

  return (
    <div className='flex flex-row justify-between border-2 p-2'>
        
      <div className='text-md text-[#192F6F]'>{props.teamName}</div>
      <div className='flex flex-row gap-2'>
        <button
          className='rounded-md border-2 border-[#10E926] px-1.5 py-0.5 text-sm text-[#10E926] hover:bg-[#10E926] hover:text-[#FFF]'
          onClick={() => {
            rsvpInvite(
                user,
              props.teamName,
              "ACCEPTED",
            ).then((team) => {
                console.log(team)
                props.setTeamPage(team)
            })
          }}
        >
          Accept
        </button>
        <button
          className='rounded-md border-2 border-[#F81A16] px-1.5 py-0.5 text-sm text-[#F81A16] hover:bg-[#F81A16] hover:text-[#FFF]'
          onClick={() => {
            rsvpInvite(
                user,
                props.teamName,
                "DECLINED",
              ).then((team) => {
                console.log(team)
                props.setTeamPage(team)
              })
          }}
        >
          Decline
        </button>
      </div>
    </div>
  )
}

const CreateTeam = (props: {
  teamPage: TeamFormationProps
  setTeamPage: Dispatch<TeamFormationProps>
}) => {
    const {
        auth: { user },
    } = useAuth()
    
    if (!user) throw new Error("User could not be fetched from session")

    const [teamNameInput, setTeamNameInput] = useState<string>("")

    return (
        <div className='flex flex-col flex-wrap place-content-center gap-3 px-4 py-1'>
                <div className='text-md text-[#192F6F]'>
                    Please Input Your Team Name
                </div>
                <input
                    type='text'
                    placeholder='Enter Name'
                    className='rounded-2xl text-[#000]'
                    onChange={e => setTeamNameInput(e.target.value)}
                />
                <div className="flex flex-wrap place-content-center">
                    <button
                        className='hover:border-blue-imperial/75 hover:text-blue-imperial/75 rounded-md border-2 border-[#89a1f9] px-3 py-1 text-sm text-[#89a1f9] '
                        onClick={() =>
                            createTeam(
                                user,
                                teamNameInput,
                            ).then((team) =>
                                props.setTeamPage(team))
                            }
                    >
                        CREATE
                    </button>
                </div>
        </div>
    )
}
