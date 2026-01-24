import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Home,  Users,  MessageSquare,  Info,  Menu,  X,  Rocket} from 'lucide-react'
import { useState } from 'react'

const navItems = [
  { path: '/', label: 'Dashboard', icon: Home },
  { path: '/users', label: 'Users', icon: Users },
  { path: '/chat', label: 'Chat', icon: MessageSquare },
  { path: '/space', label: 'Space', icon: Rocket },
  { path: '/about', label: 'About', icon: Info },
]

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-gray-900 text-white border-b border-gray-800">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold">DevHub</h1>
              <p className="text-sm text-gray-400">User Management Dashboard</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Button
                key={item.path}
                asChild
                variant="ghost"
                size="sm"
                className="text-gray-300 hover:text-white hover:bg-gray-800 [&.active]:bg-gray-800 [&.active]:text-white"
              >
                <Link to={item.path} className="flex items-center gap-2">
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              </Button>
            ))}
          </nav>

          {/* User Info */}
          <div className="hidden md:flex items-center space-x-3">
            <div className="h-8 w-8 bg-gray-700 rounded-full flex items-center justify-center">
              <Users className="h-4 w-4" />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-gray-300 hover:text-white hover:bg-gray-800"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-3 border-t border-gray-800 pt-3">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  asChild
                  variant="ghost"
                  className="justify-start text-gray-300 hover:text-white hover:bg-gray-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Link to={item.path} className="flex items-center gap-3">
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                </Button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
