import type { ZodType } from 'zod'
import { z } from 'zod'

export enum UserKey {
  UserId = 'id',
  Username = 'username',
  Team = 'team',
  Area = 'area',
  Position = 'position',
  Department = 'department',
  Phone = 'phone',
  Email = 'email',
  // MonthlyOperatingHours = 'monthlyOperatingHours',
}

export type User = {
  [UserKey.UserId]: string
  [UserKey.Username]: string
  [UserKey.Team]: string
  [UserKey.Area]: string
  [UserKey.Position]: string
  [UserKey.Department]: string
  [UserKey.Phone]: string
  [UserKey.Email]: string
  // [UserKey.MonthlyOperatingHours]: number
}

export const userSchema = z.object({
  [UserKey.UserId]: z.string().ulid(),
  [UserKey.Username]: z.string(),
  [UserKey.Team]: z.string(),
  [UserKey.Area]: z.string(),
  [UserKey.Position]: z.string(),
  [UserKey.Department]: z.string(),
  [UserKey.Phone]: z.string(),
  [UserKey.Email]: z.string(),
  // [UserKey.MonthlyOperatingHours]: z.number(),
}) satisfies ZodType<User>

export enum UserSearchKey {
  Username = 'username',
  Team = 'team',
  Position = 'position',
  Department = 'department',
}

export type UserSearchParams = {
  [UserSearchKey.Username]: string
  [UserSearchKey.Team]: string
  [UserSearchKey.Position]: string
  [UserSearchKey.Department]: string
}

export const userSearchSchema = z.object({
  [UserSearchKey.Username]: z.string(),
  [UserSearchKey.Team]: z.string(),
  [UserSearchKey.Position]: z.string(),
  [UserSearchKey.Department]: z.string(),
}) satisfies ZodType<UserSearchParams>
