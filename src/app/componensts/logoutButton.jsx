'use client'

import { logout } from '@/lib/session'
import { useRouter } from 'next/navigation'
import { FiLogOut } from 'react-icons/fi'

export default function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    await logout() 
    router.push('/login') 
  }

  return (
    <button
      className="w-full text-left flex items-center gap-2 cursor-pointer"
      onClick={handleLogout}
    >
      <FiLogOut className="text-xl" />
      <span>Logout</span>
    </button>
  )
}
