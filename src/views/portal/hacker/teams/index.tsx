import React, { useEffect, useReducer, useState } from "react"
import { InvitationMode, TeamFormationProps } from "../../../../utils/types";
import { getTeamProfile } from "../../../../utils/apis/firebase";
import { TeamDisplay } from "../../../../components/teams/TeamDisplay";
import useAuth from "../../../../hooks/useAuth";
import { TeamBuilder } from "../../../../components/teams/TeamBuilder";
import { TeamInvite } from "../../../../components/teams/TeamInvite";

const TeamHacker = () => {
    const {
        auth: { user },
      } = useAuth()

  const initialTeamPage: TeamFormationProps = {
    teamName: "",
    teamMembers: [],
    invitedTeamMembers: [],
    teamLeader: "",
    lockedIn: false,
    invites: []
  }

  const teamPageReducer = (
    state: TeamFormationProps,
    action: Partial<TeamFormationProps>
  ) => {
    return { ...state, ...action }
  }

  const [render, setRender] = useState<boolean>(false);
  const [teamPage, setTeamPage] = useReducer(teamPageReducer, initialTeamPage)
  const [teamStatus, setTeamStatus] = useState<InvitationMode>("JOIN");

  useEffect(() => {
    if (!user) throw new Error("User could not be fetched from session")
    getTeamProfile(user).then((team) => {
        setTeamPage(team)
        setRender(true)
    })
  }, [])

  useEffect(() => {
    console.log('fromt useEffect', teamPage)
    teamPage.teamName !== "" ? setTeamStatus("INTEAM") : setTeamStatus("JOIN")
  }, [teamPage])

  
  if (render) {
    return (
        <div>
            <h1 className='font-title text-xl'>Team Formation</h1>
            <div className='flex flex-col flex-wrap gap-4'>
                <div className='w-auto pb-4 ps-4'>
                    <div className='text-l py-3 font-semibold'>Team Guidelines</div>
                        <ul className='list-disc ps-6'>
                            <li>
                                Must be comprised of 1-4 hackers
                            </li>
                            <li>
                                The project must completed at the event
                            </li>
                            <li>
                                All members must be a confirmed attendee
                            </li>
                            <li>
                                Please keep names appropriate or all members will be disqualified
                            </li>
                    </ul>
                </div>
                <div>
                    {teamStatus == "INTEAM" ? (
                        <div className="flex flex-row flex-wrap place-content-center justify-around rounded-xl border-2 border-[#DFDFF6] bg-[#FFF] p-5 drop-shadow-lg">
                            <div className="w-full rounded-lg border-2 border-[#DFDFDF] bg-[#DFDFDF] drop-shadow-sm sm:mb-4 md:mb-4 lg:mb-0 lg:w-1/2">
                                <TeamDisplay teamPage={teamPage} setTeamPage={setTeamPage} setTeamStatus={setTeamStatus} />
                            </div>
                                {teamPage.teamLeader === user?.email && (
                                <div className="w-full rounded-lg border-2 border-[#DFDFDF] bg-[#DFDFDF] drop-shadow-sm lg:w-1/3">
                                    <TeamInvite teamPage={teamPage} setTeamPage={setTeamPage} />
                                </div>

                                )}
                        </div>
                    ) : (
                        <div className="flex h-auto w-auto flex-row flex-wrap place-content-center rounded-xl border-2 border-[#DFDFF6] bg-[#FFF] p-3 drop-shadow-lg">
                            <TeamBuilder teamPage={teamPage} teamStatus={teamStatus} setTeamPage={setTeamPage} setTeamStatus={setTeamStatus} />
                        </div>
                    )}
                </div>
           </div>
        </div>
    )
  } else {
    return <div>loading</div>
  }
}


export default TeamHacker
