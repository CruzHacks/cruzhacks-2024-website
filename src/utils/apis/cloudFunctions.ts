import type { User } from "@firebase/auth"
import {
  ApplicationSchema,
  CheckRoleSynced,
  ErrorResponse,
  UserBasics,
} from "../types"
import axios, { isAxiosError } from "axios"

// This URL resolve to the Firebase Functions emulator in development is hacky
// but works, prefer to have static URLs at build
// TODO: Find a better way to do this
export const PROJECT_ID = import.meta.env.VITE_FIREBASE_PROJECT_ID
export const API_URL = import.meta.env.DEV
  ? `http://localhost:5001/${PROJECT_ID}/us-central1`
  : `https://us-central1-${PROJECT_ID}.cloudfunctions.net`

/**
 * CruzHacks-2024-Backend API endpoint for checking if a user's custom claim
 * role is synced with their corresponding Firestore user/:uid role
 * @param user Firebase User
 * @returns The custom claim role, the firestore role, and whether or not they
 * are synced as a boolean if successful, otherwise an error message
 */
export const checkRoleSynced = async (user: User) => {
  try {
    if (!user) throw new Error("No user provided")

    const idToken = await user.getIdToken(false)
    const response = await fetch(`${API_URL}/auth/checkRoleSynced`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
    })
    const data: CheckRoleSynced | ErrorResponse = await response.json()
    if ("message" in data) throw new Error(data.message)
    return data
  } catch (err) {
    console.error(err)
    return err as Error
  }
}

/**
 * CruzHacks-2024-Backend API endpoint for retrieving a list of users
 * @param user Firebase User
 * @param pageToken OPTIONAL - The page token (used for pagination)
 * @returns The list of users if successful, otherwise an error message
 */
export const getUsers = async (user: User, pageToken?: string) => {
  try {
    const idToken = await user.getIdToken(false)

    const response = await axios.get(`${API_URL}/auth/users`, {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
      params: {
        pageToken,
      },
    })

    const { data, error } = response.data

    if (error) {
      throw new Error(error)
    }

    return data.users as UserBasics[]
  } catch (err) {
    if (isAxiosError(err)) {
      throw err.message
    }

    throw err
  }
}

/**
 * CruzHacks-2024-Backend API endpoint for submitting an application for an
 * authenticated user
 * @param user Firebase User
 * @param application Application data
 * @returns Success message if successful, otherwise an error message
 */
export const submitApplicationAuthed = async (
  user: User,
  application: ApplicationSchema
) => {
  try {
    if (!user) throw new Error("No user provided")
    if (!application) throw new Error("No application provided")

    // Validate the application data (throws error if invalid)
    const applicationParsed = ApplicationSchema.parse(application)

    const idToken = await user.getIdToken(false)
    const response = await axios.post(
      `${API_URL}/application/authenticated`,
      applicationParsed,
      {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      }
    )
    const { data, error } = response.data

    if (error) throw new Error(error)

    return data.message as string
  } catch (err) {
    if (isAxiosError(err)) {
      console.error(err)
      throw err.message
    }
    return err as Error
  }
}

/**
 * CruzHacks-2024-Backend API endpoint for submitting an application and
 * creating an account for an unauthenticated user
 * @param application Application data
 * @returns Success message if successful, otherwise an error message
 */
export const submitApplicationUnauthed = async (
  application: ApplicationSchema
) => {
  try {
    if (!application) throw new Error("No application provided")

    // Validate the application data (throws error if invalid)
    const applicationParsed = ApplicationSchema.parse(application)

    const response = await axios.post(
      `${API_URL}/application/unauthenticated`,
      applicationParsed
    )
    const { data, error } = response.data

    if (error) throw new Error(error)

    return data.message as string
  } catch (err) {
    if (isAxiosError(err)) {
      console.error(err)
      throw err.message
    }
    return err as Error
  }
}
