import { CircleUser } from 'lucide-react'

import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@repo/ui'

import { useAuth } from './auth-provider'

export function ProfileDropdown() {
  const { isLoadingAuth, user, signOut } = useAuth()

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
        {user ? (
          <DropdownMenuItem onClick={signOut}>Sign Out</DropdownMenuItem>
        ) : (
          <DropdownMenuItem asChild>
            <a href="/tabs/auth.html" rel="noreferrer" target="_blank">
              Sign In
            </a>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
