import { CircleUser } from 'lucide-react'

import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@repo/ui'

import { useAuth } from '../providers/auth-provider'

export function ProfileDropdown() {
  const { isLoadingAuth, session, signOut } = useAuth()

  if (isLoadingAuth) return null
  if (!session) {
    return (
      <Button asChild size="sm" type="button" variant="outline">
        <a href="/tabs/auth.html" rel="noreferrer" target="_blank">
          Sign In
        </a>
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="h-auto w-auto cursor-pointer p-1.5 text-gray-500"
          disabled={isLoadingAuth}
          size="icon"
          type="button"
          variant="ghost"
        >
          <CircleUser size={16} />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent collisionPadding={8}>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => {
            void signOut()
          }}
        >
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
