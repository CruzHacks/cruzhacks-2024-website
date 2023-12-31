import {
  collection,
  collectionGroup,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore"
import { db } from "../firebaseapp"
import {
  AppShortResponseSchema,
  ApplicationSchema,
  ApplicationStatus,
} from "../types"

/**
 * Function using Firebase sdk for checking if an application is
 * submitted.
 * @param user Firebase User
 * @returns True if application is submitted, false if not, otherwise an error
 * message
 */
export const checkApplicationSubmitted = async (email: string) => {
  if (!email) throw new Error("No email provided")

  const docRef = doc(db, `users/${email}/user_items/application`)
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
 * @returns updated application if successful
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
 * @returns updated application if successful
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
 * @returns updated application if successful
 */
export const getApplicationStatus = async (email: string) => {
  try {
    if (!email) throw new Error("No user provided")

    const docRef = doc(db, `users/${email}/user_items/application`)
    const docSnap = await getDoc(docRef)

    if (!docSnap.exists()) throw new Error("No application found")
    if (!docSnap.data()?.status)
      throw new Error("Application found but no status field")

    const status = {
      status: docSnap.data()?.status,
      rsvp: docSnap.data()?.rsvp,
    }

    return status as { status: ApplicationStatus; rsvp?: boolean }
  } catch (error) {
    console.error(error)
    throw error as Error
  }
}

/**
 * Function using Firebase sdk to update an application rsvp
 * @param email Firebase User's Email
 * @param rsvp Boolean
 * @returns updated application if successful
 */
export const updateApplicationRsvp = async (email: string, rsvp: boolean) => {
  try {
    if (!email) throw new Error("No user provided")

    const docRef = doc(db, `users/${email}/user_items/application`)
    await updateDoc(docRef, {
      rsvp: rsvp,
    })

    console.log("docRef updated: ", docRef)

    return rsvp
  } catch (error) {
    console.error("application", error)
    throw error as Error
  }
}
