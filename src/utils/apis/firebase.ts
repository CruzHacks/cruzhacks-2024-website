import type { User } from "@firebase/auth"
import { collection, doc, getDoc, getDocs } from "firebase/firestore"
import { db } from "../firebaseapp"

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

  return docSnap.exists()
}

/**
 * Function using Firebase sdk to retrieve an application
 * @param user Firebase User
 * @returns An application if successful
 */
export const getApplication = async (user: User) => {
  if (!user) throw new Error("No user provided")

  const querySnapshot = await getDocs(
    collection(db, `users/${user.email}/user_items/application/sections`)
  )

  // Convert array of documents to object
  const application = querySnapshot.docs.reduce(
    (acc, doc) => ({ ...acc, [doc.id]: doc.data() }),
    {}
  )

  return application
}
