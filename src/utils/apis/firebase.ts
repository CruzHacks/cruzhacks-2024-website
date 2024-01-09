import type { User } from "@firebase/auth"
import {
  collection,
  collectionGroup,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  deleteDoc,
  setDoc,
} from "firebase/firestore"
import { db } from "../firebaseapp"
import {
  AppShortResponseSchema,
  ApplicationSchema,
  ApplicationStatus,
  InvitationProps,
  TeamFormationProps,
  TeamMember,
  TeamProps,
} from "../types"

/**
 * Function using Firebase sdk for checking if an application is
 * submitted.
 * @param user Firebase User
 * @returns True if application is submitted, false if not, otherwise an error
 * message
 */
export const checkApplicationSubmitted = async (user: User) => {
  if (!user) throw new Error("No user provided")

  const docRef = doc(db, `users/${user.email}/user_items/application`)
  const docSnap = await getDoc(docRef)

  console.log("docSnap.exists(): ", docSnap.exists())

  return docSnap.exists()
}

/**
 * Function using Firebase sdk to retrieve an application
 * @param user Firebase User
 * @returns An application if successful
 */
export const getApplication = async (email: string) => {
  if (!email) throw new Error("No user provided")

  const querySnapshot = await getDocs(
    collection(db, `users/${email}/user_items/application/sections`)
  )

  // Convert array of documents to object
  const application = querySnapshot.docs.reduce(
    (acc, doc) => ({ ...acc, [doc.id]: doc.data() }),
    {}
  )

  return application
}

/**
 * Function using Firebase sdk to retrieve an application
 * @param user Firebase User
 * @returns An application if successful
 */
export const getApplicationShortResponses = async (email: string) => {
  if (!email) throw new Error("No user provided")

  const querySnapshot = await getDoc(
    doc(db, `users/${email}/user_items/application/sections`, "short_response")
  )

  if (!querySnapshot.exists())
    throw new Error("No short responses found for applicant")

  const shortResponses = querySnapshot.data()

  return shortResponses as AppShortResponseSchema
}

/**
 * Function using Firebase sdk to retrieve information about all applications
 */
export const getApplications = async () => {
  // NOTE: using try catch to insure error is console logged, this is important
  // for geting the index creation link for the query
  try {
    // NOTE: This query requires a Firestore index
    // https://firebase.google.com/docs/firestore/query-data/queries#collection-group-query
    const q = query(collectionGroup(db, "user_items"), orderBy("_submitted"))
    const querySnapshot = await getDocs(q)

    const applications = querySnapshot.docs.map(doc => doc.data())

    return applications as ApplicationSchema[]
  } catch (error) {
    console.error(error)
    throw error
  }
}

/**
 * Function using Firebase sdk for checking if an application is
 * submitted.
 * @param user Firebase User
 * @returns True if application is submitted, false if not, otherwise an error
 * message
 */
export const approveApplication = async (email: string) => {
  try {
    if (!email) throw new Error("No user provided")

    const status: ApplicationStatus = "accepted"

    const docRef = doc(db, `users/${email}/user_items/application`)
    await updateDoc(docRef, {
      status: status,
    })

    console.log("docRef updated: ", docRef)

    return docRef
  } catch (error) {
    console.error("application", error)
    throw error as Error
  }
}

/**
 * Function using Firebase sdk for checking if an application is
 * accepted.
 * @param email Firebase User's Email
 * @returns True if application is submitted, false if not, otherwise an error
 * message
 */
export const denyApplication = async (email: string) => {
  try {
    if (!email) throw new Error("No user provided")

    const status: ApplicationStatus = "rejected"

    const docRef = doc(db, `users/${email}/user_items/application`)
    await updateDoc(docRef, {
      status: status,
    })

    console.log("docRef updated: ", docRef)

    return docRef
  } catch (error) {
    console.error("application", error)
    throw error as Error
  }
}

/**
 * Function using Firebase sdk for checking if an application is
 * accepted.
 * @param email Firebase User's Email
 * @returns True if application is accepted, false if not, otherwise not reviewed
 *
 */
export const checkStatus = async (email: string) => {
  try {
    if (!email) throw new Error("No user provided")

    const docRef = doc(db, `users/${email}/user_items/application`)
    const docSnap = await getDoc(docRef)

    const status = docSnap.data()?.status

    console.log("docSnap status: ", status)

    return status as any as ApplicationStatus
  } catch (error) {
    console.error(error)
    throw error
  }
}

/**
 * Function using Firebase sdk for returning the team information of a user
 * @param user Firebase User
 * @returns teamProfile if email found, otherwise an error is thrown
 *
 */
export const getTeamProfile = async (user: User) => {
  try {
    if (!user) throw new Error("No user provided")

    const userDocRef = doc(db, `users/${user.email}/user_items/team`)
    const userDocSnap = await getDoc(userDocRef)

    const userInvites = userDocSnap.data()?.invites
    const teamName = userDocSnap.data()?.teamName

    if (teamName == "") return {invites: userInvites}

    const teamDocRef = doc(db, `teams/${teamName}`)
    const teamDocSnap = await getDoc(teamDocRef)

    if (!teamDocSnap.exists()) return { }

    const teamRef = teamDocSnap.data()

    return {teamName: teamName, ...teamRef} as any as TeamFormationProps
  } catch (error) {
    console.error(error)
    throw error
  }
}

/**
 * Function using Firebase sdk to remove a member of the team
 * @param user Firebase User who is the team leader
 * @param email Firebase User's Email to be removed
 * @returns true if success, error thrown otherwise
 * 
 */
export const removeTeamMember = async (user: User, email: string) => {
  try {
    if (!email) throw new Error("No email provided")
    if (!user) throw new Error("No user provided")

    const userDocRef = doc(db, `users/${user.email}/user_items/team`)
    const userDocSnap = await getDoc(userDocRef)
    const userTeamName = userDocSnap.data()?.teamName
    const userTeamLeader = userDocSnap.data()?.teamLeader

    if (userTeamLeader !== user.email) throw new Error("User is not team leader of their team")
    if (user.email == email) throw new Error("User cannot remove themselves from the team")

    let teamDocRef = doc(db, `teams/${userTeamName}`)
    let teamDocSnap = await getDoc(teamDocRef)
    const teamLeader = teamDocSnap.data()?.teamLeader

    if (teamLeader !== user.email) throw new Error("User is not team leader of the team being deleted")

    const teamMembers = teamDocSnap.data()?.teamMembers

    const newTeamMembers = teamMembers.filter((teamMember: TeamMember) => teamMember.memberEmail !== email)
    
    const invitedTeamMembers = teamDocSnap.data()?.invitedTeamMembers

    const newInvitedTeamMembers = invitedTeamMembers.filter((teamMember: TeamMember) => teamMember.memberEmail !== email)

    await updateDoc(teamDocRef, {
      teamMembers: newTeamMembers,
      invitedTeamMembers: newInvitedTeamMembers
    })

    const oldMemberDocRef = doc(db, `users/${email}/user_items/team`)
    const oldMemberDocSnap = await getDoc(oldMemberDocRef)
    const oldMemberInvites = oldMemberDocSnap.data()?.invites
    const newOldMemberInvites = oldMemberInvites.filter((invites: InvitationProps) => invites.teamName !== userTeamName)


    await updateDoc(oldMemberDocRef, {
      teamName: "",
      teamLeader: "",
      invites: newOldMemberInvites
    })

    teamDocRef = doc(db, `teams/${userTeamName}`)
    teamDocSnap = await getDoc(teamDocRef)

    return teamDocSnap.data() as any as TeamFormationProps
  } catch (error) {
    console.error(error)
    throw error
  }
}

/**
 * Function using Firebase sdk to remove a member of the team
 * @param user Firebase User who is the team leader
 * @param email Firebase User's Email to be removed
 * @returns true if team deletion successful, error thrown otherwise
 * 
 */
export const deleteTeam = async (user: User, teamName: string) => {
  try {
    if (!user) throw new Error("No user provided")
    if (!teamName || teamName == "") throw new Error("No team name provided")
    
    const userDocRef = doc(db, `users/${user.email}/user_items/team`)
    const userDocSnap = await getDoc(userDocRef)
    const userTeamName = userDocSnap.data()?.teamName
    const userTeamLeader = userDocSnap.data()?.teamLeader

    if (userTeamName !== teamName) throw new Error("User is not apart of the team")
    if (userTeamLeader !== user.email) throw new Error("User is not team leader of their team")

    const teamDocRef = doc(db, `teams/${teamName}`)
    const teamDocSnap = await getDoc(teamDocRef)

    const teamLeader = teamDocSnap.data()?.teamLeader
    const teamMembers = teamDocSnap.data()?.teamMembers
    const teamInvites = teamDocSnap.data()?.invitedTeamMembers

    if (teamLeader !== user.email) throw new Error("User is not team leader of the team being deleted")
    if (teamMembers.length > 1) throw new Error("All other team members must be removed before deletion")
    if (teamInvites.length >= 1) throw new Error("All pending invites must be removed before deletion")

    await updateDoc(userDocRef, {
      teamName: "",
      teamLeader: "",
    })

    await deleteDoc(doc(db, `teams/${teamName}`));
    
    return { invitationType: "JOIN", teamName: "", teamMembers: [], invitedTeamMembers: [], teamLeader: "", lockedIn: false, invites: []} as TeamFormationProps
  } catch (error) {
    console.error(error)
    throw error
  }
}

/**
 * Function using Firebase sdk for returning the team information of a user
 * @param user Firebase User
 * @returns teamProfile if email found, otherwise an error is thrown
 *
 */
export const lockTeam = async (user: User, teamName: string) => {
  try {
    if (!user) throw new Error("No user provided")
    if (!teamName || teamName == "") throw new Error("No team name provided")

    const userDocRef = doc(db, `users/${user.email}/user_items/team`)
    const userDocSnap = await getDoc(userDocRef)

    const userTeamName = userDocSnap.data()?.teamName
    const userTeamLeader = userDocSnap.data()?.teamLeader

    if (userTeamName !== teamName) throw new Error("User is not apart of the team")
    if (userTeamLeader !== user.email) throw new Error("User is not team leader of their team")

    let teamDocRef = doc(db, `teams/${teamName}`)
    let teamDocSnap = await getDoc(teamDocRef)

    const teamLeader = teamDocSnap.data()?.teamLeader

    if (teamLeader !== user.email) throw new Error("User is not team leader of the team being deleted")

    const invitedTeamMembers = teamDocSnap.data()?.invitedTeamMembers

    if (invitedTeamMembers.length > 0) throw new Error("All pending invites must be removed before lock in")

    await updateDoc(teamDocRef, {
      lockedIn: true,
    })
    
    teamDocRef = doc(db, `teams/${teamName}`)
    teamDocSnap = await getDoc(teamDocRef)

    return teamDocSnap.data() as any as TeamFormationProps
  } catch (error) {
    console.error(error)
    throw error
  }
}

/**
 * Function using Firebase sdk for returning the team information of a user
 * @param user Firebase User
 * @returns teamProfile if email found, otherwise an error is thrown
 *
 */
export const createTeam = async (user: User, teamName: string) => {
  try {
    if (!user) throw new Error("No user provided")
    if (!teamName || teamName == "") throw new Error("No team name provided")

    const userDocRef = doc(db, `users/${user.email}/user_items/team`)
    const userDocSnap = await getDoc(userDocRef)

    const userTeamName = userDocSnap.data()?.teamName
    const userTeamLeader = userDocSnap.data()?.teamLeader

    if (userTeamName !== "") throw new Error("User is on a team")
    if (userTeamLeader !== "") throw new Error("User is a team leader")

    let teamDocRef = doc(db, `teams/${teamName}`)
    let teamDocSnap = await getDoc(teamDocRef)

    if (teamDocSnap.exists()) throw new Error("Team name already in use")

    await setDoc(teamDocRef, {
      teamName: teamName,
      teamMembers: [{ memberName: user.displayName, memberEmail: user.email }],
      invitedTeamMembers: [],
      teamLeader: user.email,
      lockedIn: false,
    });

    await updateDoc(userDocRef, {
      teamName: teamName,
      teamLeader: user.email,
      invites: []
    });
    
    teamDocRef = doc(db, `teams/${teamName}`)
    teamDocSnap = await getDoc(teamDocRef)

    return teamDocSnap.data() as any as TeamFormationProps
  } catch (error) {
    console.error(error)
    throw error
  }
}

/**
 * Function using Firebase sdk for returning the team information of a user
 * @param user Firebase User
 * @returns teamProfile if email found, otherwise an error is thrown
 *
 */
export const inviteTeamMember = async (user: User, email: string) => {
  try {
    if (!user) throw new Error("No user provided")
    if (!email || email == "") throw new Error("No user email provided")

    const userDocRef = doc(db, `users/${user.email}/user_items/team`)
    const userDocSnap = await getDoc(userDocRef)
    const userTeamName = userDocSnap.data()?.teamName
    const userTeamLeader = userDocSnap.data()?.teamLeader

    if (userTeamLeader !== user.email) throw new Error("User is not the team leader")
    if (email == user.email) throw new Error("Cannot invite yourself to the team")


    const otherUserDocRef = doc(db, `users/${email}/user_items/team`)
    const otherUserDocSnap = await getDoc(otherUserDocRef)

    const otherUserRoleDocRef = doc(db, `users/${email}/user_items/role`)
    const otherUserRoleDocSnap = await getDoc(otherUserRoleDocRef)
    const role = otherUserRoleDocSnap.data()?.role.toLowerCase()

    if (!otherUserDocSnap.exists()) throw new Error("Invited user does not exist")
    if (otherUserDocSnap.data()?.teamName === userTeamName) throw new Error("User is already on the team")
    if (otherUserDocSnap.data()?.teamName !== "") throw new Error("Invited user is already on a team")
    if (role !== "hacker") throw new Error("Invited user is not a participant of the hackathon")

    const teamName = userDocSnap.data()?.teamName
    
    let teamDocRef = doc(db, `teams/${teamName}`)
    let teamDocSnap = await getDoc(teamDocRef)

    const teamMembers = teamDocSnap.data()?.teamMembers
    const invitedTeamMembers = teamDocSnap.data()?.invitedTeamMembers
    const lockedIn = teamDocSnap.data()?.lockedIn

    if (lockedIn) throw new Error("Team is locked in, cannot invite new members")
    if (teamMembers.length + invitedTeamMembers.length >= 4) throw new Error("Team is full, remove a team member or univnite a member to invite a new member")
    if (otherUserDocSnap.data()?.invites !== undefined && otherUserDocSnap.data()?.invites.some((team: TeamProps) => team.teamName == teamName)) throw new Error("User has already been invited to the team")
    if (invitedTeamMembers !== undefined && invitedTeamMembers.some((member: TeamMember) => member.memberEmail == email)) throw new Error("User has already been invited to the team")
    const invitedTeams = otherUserDocSnap.data()?.invites

    await updateDoc(otherUserDocRef, {
      invites: [...invitedTeams, { teamName: teamName, teamLeader: user.email }]
    })

    const otherUserNameDocRef = doc(db, `users/${email}/user_items/application`)
    const otherUserNameDocSnap = await getDoc(otherUserNameDocRef)
    const fullName = otherUserNameDocSnap.data()?.fullname

    await updateDoc(teamDocRef, {
        invitedTeamMembers: [...invitedTeamMembers, { memberName: fullName, memberEmail: email }],
    })
    
    teamDocRef = doc(db, `teams/${teamName}`)
    teamDocSnap = await getDoc(teamDocRef)

    return teamDocSnap.data() as any as TeamFormationProps
  } catch (error) {
    console.error(error)
    throw error
  }
}

/**
 * Function using Firebase sdk for returning the team information of a user
 * @param user Firebase User
 * @returns teamProfile if email found, otherwise an error is thrown
 *
 */
export const rsvpInvite = async (user: User, teamName: string, status: string) => {
  try {
    if (!user) throw new Error("No user provided")
    if (!teamName || teamName == "") throw new Error("No team name provided")
    const userDocRef = doc(db, `users/${user.email}/user_items/team`)
    const userDocSnap = await getDoc(userDocRef)
    const userTeamName = userDocSnap.data()?.teamName
      if (userTeamName !== "") throw new Error("User is already on a team")
    let teamDocRef = doc(db, `teams/${teamName}`)
    let teamDocSnap = await getDoc(teamDocRef)
    if (!teamDocSnap.exists()) throw new Error("Team does not exist")
    const invitedTeamMembers = teamDocSnap.data()?.invitedTeamMembers
    const newInvitedTeamMembers = invitedTeamMembers.filter((teamMember: TeamMember) => teamMember.memberEmail !== user.email)

    if (status === "ACCEPTED") {
      const lockedIn = teamDocSnap.data()?.lockedIn
      if (lockedIn) throw new Error("Team is locked in, cannot join, please contact team leader")
      
      const teamMembers = teamDocSnap.data()?.teamMembers
      const teamLeader = teamDocSnap.data()?.teamLeader

      const userNameDocRef = doc(db, `users/${user.email}/user_items/application`)
      const userNameDocSnap = await getDoc(userNameDocRef)
      const fullName = userNameDocSnap.data()?.fullname


      await updateDoc(teamDocRef, {
        teamMembers: [...teamMembers, { memberName: fullName, memberEmail: user.email }],
        invitedTeamMembers: newInvitedTeamMembers
      })

      const invitedTeams = userDocSnap.data()?.invites

      for (let i = 0; i < invitedTeams.length; i++) {
          if (invitedTeams[i].teamName != teamName) {
            const tempTeamDocRef = doc(db, `teams/${invitedTeams[i].teamName}`)
            const tempTeamDocSnap = await getDoc(tempTeamDocRef)
            const tempInvitedTeamMembers = tempTeamDocSnap.data()?.invitedTeamMembers
            const tempNewInvitedTeamMembers = tempInvitedTeamMembers.filter((teamMember: TeamMember) => teamMember.memberEmail !== user.email)
            await updateDoc(tempTeamDocRef, {
              invitedTeamMembers: tempNewInvitedTeamMembers
            })
          }
        }

      await updateDoc(userDocRef, {
          invites: [],
          teamName: teamName,
          teamLeader: teamLeader,
      })

      teamDocRef = doc(db, `teams/${teamName}`)
      teamDocSnap = await getDoc(teamDocRef)
  
      return teamDocSnap.data() as any as TeamFormationProps
  
    } else if (status === "DECLINED") {

      await updateDoc(teamDocRef, {
        invitedTeamMembers: newInvitedTeamMembers
        }
      )

        const invites = userDocSnap.data()?.invites
        const newInvites = invites.filter((teams: TeamProps) => teams.teamName !== teamName)
        await updateDoc(userDocRef, {
          invites: newInvites
      })
      return { invites: newInvites } as any as TeamFormationProps

    } else {
      throw new Error("Invalid status")
    }


  } catch (error) {
    console.error(error)
    throw error
  }
}
