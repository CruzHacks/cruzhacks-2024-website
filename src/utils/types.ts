import validator from "validator"
import { z } from "zod"

export type ErrorResponse = { message: string }

export type CheckRoleSynced = {
  customClaimRole: string
  firestoreRole: string
  synced: boolean
}

export type UserBasics = {
  uid: string
  displayName?: string
  email: string
  role: string
}

// Schema pulled from 2023 Hacker Application form:
// https://docs.google.com/forms/d/1qtk6kBBq6jZ9rprDl-U_4Pvl5vhJ30PH2B759A-xA1k/edit

// Section 1 - Demographics
export const AppDemographicsSchema = z.object({
  first_name: z.string().min(1, "First name must be at least 1 character."),
  last_name: z.string(),
  phone_number: z
    .string()
    .refine(validator.isMobilePhone, "Invalid phone number."),

  age: z
    .number()
    .min(12, "Must be at least 12 years old.")
    .max(120, "Invalid age."),
  country: z.string(),
  school: z.string(),

  year_in_school: z.string(),

  education_level: z.string(),

  ucsc_student: z.boolean(),
  ucsc_college_affiliation: z.string().optional(),

  graduation_year: z.number().optional(),

  area_of_study: z.string().array(),

  first_hackathon: z.boolean(),
  hackathon_experience: z.string(),
  tech_experience: z.string().max(1500, "Character limit exceeded."),

  ethnic_background: z.string().array(),

  pronouns: z.string(),

  gender: z.string(),

  sexual_orientation: z.string().optional(),

  underepresented_group: z.string().optional(),
})
export type AppDemographicsSchema = z.infer<typeof AppDemographicsSchema>

// Section 2 - short response
export const AppShortResponseSchema = z.object({
  responses: z
    .object({
      question: z.string().max(1500, "Question supplied is too long."),
      answer: z
        .string()
        .min(0, "Please provide an answer.")
        .max(1500, "Charater limit exceeded."),
    })
    .array(),
})

export type AppShortResponseSchema = z.infer<typeof AppShortResponseSchema>

// Section 3 - logistcs
export const AppLogisticsSchema = z.object({
  need_travel_reimbursement: z.string(),
  need_charter_bus: z.string(),
  attendence_possible_wo_reimbursement: z.string(),

  need_campus_parking_permit: z.string(),
  travel_plan: z.string().max(1500, "Character limit exceeded."),

  tshirt_size: z.string(),
  dietary_restrictions: z.string(),
})
export type AppLogisticsSchema = z.infer<typeof AppLogisticsSchema>

// Section 4 - socials
export const AppSocialsSchema = z.object({
  resume_drop_form: z.boolean(),

  linked_in: z.string().url().optional(),
  github: z.string().url().optional(),
  discord: z.string().optional(),

  cruzhacks_referral: z.string().optional(), // how did you hear about CruzHacks
  // email of person who referred
  cruzhacks_refferal_email: z.string().optional(),
  cruzhacks_refferal_organization: z.string().optional(),
})
export type AppSocialsSchema = z.infer<typeof AppSocialsSchema>

// This is the schema for the entire application consumed from the frontend, in
// reality it is stored in firestore in subcollections as specified above.
export const ApplicationSchema = z.object({
  email: z.string(),
  password: z.string(),
  demographics: AppDemographicsSchema,
  short_responses: AppShortResponseSchema,
  logistics: AppLogisticsSchema,
  socials: AppSocialsSchema,
})
export type ApplicationSchema = z.infer<typeof ApplicationSchema>
