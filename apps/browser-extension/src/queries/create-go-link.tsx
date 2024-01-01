import { useMutation } from '@tanstack/react-query'

import { supabase } from '../supabase/supabase-client'

type CreateGoLinkArgs = {
  destination: string
  slug: string
  description?: string
}

export async function createGoLink(args: CreateGoLinkArgs) {
  const res = await supabase.from('golinks').insert({ ...args })
  // eslint-disable-next-line @typescript-eslint/no-throw-literal -- ignore
  if (res.error) throw res.error
  return res
}

export function useCreateGoLinkMutation() {
  return useMutation({
    mutationFn: createGoLink,
  })
}
