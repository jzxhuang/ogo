import { edgeConfigLimits } from '@/constants'
import { z } from 'zod'

export type GoLink = {
  url: string
  description?: string
  /** ms since epoch */
  createdAt: number
}

export const goLinkNameSchema = z
  .string()
  .trim()
  .min(1)
  .regex(edgeConfigLimits.keyRegex)
  .max(edgeConfigLimits.maxKeyLength)

export const newGoLinkSchema = z.object({
  name: goLinkNameSchema,
  url: z.string().url(),
  description: z.string().optional(),
})

export type NewGoLink = z.infer<typeof newGoLinkSchema>
