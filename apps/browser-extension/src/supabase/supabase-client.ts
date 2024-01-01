/**
 * @see https://docs.plasmo.com/quickstarts/with-supabase
 */
import { Storage } from '@plasmohq/storage'
import { createClient } from '@supabase/supabase-js'

const storage = new Storage({
  area: 'local',
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-non-null-assertion -- ignore
export const supabase = createClient(process.env.PLASMO_PUBLIC_SUPABASE_URL!, process.env.PLASMO_PUBLIC_SUPABASE_KEY!, {
  auth: {
    storage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
})
