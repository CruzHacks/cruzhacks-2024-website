import React, { useState } from "react"
import useAuth from "../../hooks/useAuth"
import { inviteTeamMember } from "../../utils/apis/firebase"
import { TeamInviteProps } from "../../utils/types"

export const TeamInvite = (props: TeamInviteProps) => {
    const {
        auth: { user },
    } = useAuth()

    if (!user) throw new Error("User could not be fetched from session")

    const [invitedMemberEmail, setInvitedMemberEmail] = useState<string>("")

    return (
    <div className='flex w-full flex-col flex-wrap place-content-center gap-4 py-3'>
        <div className='text-center text-lg text-[#192F6F]'>
            Invite Members
        </div>
          <input
            type='text'
            placeholder='Enter Email'
            className='w-3/4 rounded-xl text-[#000]'
            value={invitedMemberEmail}
            onChange={e => setInvitedMemberEmail(e.target.value)}
          />
          <div className="flex flex-wrap place-content-center">
            <button
                className='border-blue-imperial text-blue-imperial hover:bg-blue-imperial rounded-md border-2 bg-[#FFF] px-1.5 py-0.5 text-center text-sm hover:text-[#FFF]'
                onClick={() => {
                    inviteTeamMember(
                    user,
                    invitedMemberEmail,
                    ).then((team) => props.setTeamPage(team))
                }}
            >
            INVITE MEMBER
            </button>
        </div>
      </div>
    )
}
