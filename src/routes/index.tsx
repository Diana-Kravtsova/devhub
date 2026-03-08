import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, MessageSquare, Rocket, Info } from 'lucide-react'
import { Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Index,
})

const features = [
  {
    title: 'Users',
    description: 'Manage user profiles and data',
    icon: Users,
    to: '/users',
    color: 'bg-blue-900/30 text-blue-400 border-blue-800'
  },
  {
    title: 'Chat',
    description: 'Real-time WebSocket communication',
    icon: MessageSquare,
    to: '/chat',
    color: 'bg-purple-900/30 text-purple-400 border-purple-800'
  },
  {
    title: 'Space',
    description: 'SpaceX data via GraphQL API',
    icon: Rocket,
    to: '/space',
    color: 'bg-red-900/30 text-red-400 border-red-800'
  },
  {
    title: 'About',
    description: 'Project information and details',
    icon: Info,
    to: '/about',
    color: 'bg-gray-800/30 text-gray-400 border-gray-700'
  },
]

function Index() {
  return (
    <div className="p-6">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white mb-3">Dashboard</h1>
        <p className="text-gray-400">Welcome to your user management dashboard</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature) => (
          <Link key={feature.title} to={feature.to}>
            <Card className={`border ${feature.color} bg-gray-900/50 hover:bg-gray-800/50 transition-all hover:scale-[1.02] cursor-pointer`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">{feature.title}</CardTitle>
                  <div className={`p-2 rounded-lg border ${feature.color}`}>
                    <feature.icon className="h-5 w-5" />
                  </div>
                </div>
                <CardDescription className="text-gray-400">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-500">
                  Click to explore →
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="mt-10 p-6 bg-gray-900/50 rounded-lg border border-gray-800">
        <h2 className="text-xl font-semibold text-white mb-4">Tech Stack</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-gray-800/30 rounded border border-gray-700">
            <div className="text-2xl font-bold text-blue-400">React</div>
            <div className="text-sm text-gray-400">+ TypeScript</div>
          </div>
          <div className="p-4 bg-gray-800/30 rounded border border-gray-700">
            <div className="text-2xl font-bold text-purple-400">TanStack</div>
            <div className="text-sm text-gray-400">Router + Query</div>
          </div>
          <div className="p-4 bg-gray-800/30 rounded border border-gray-700">
            <div className="text-2xl font-bold text-red-400">GraphQL</div>
            <div className="text-sm text-gray-400">Apollo Sandbox</div>
          </div>
          <div className="p-4 bg-gray-800/30 rounded border border-gray-700">
            <div className="text-2xl font-bold text-green-400">WebSocket</div>
            <div className="text-sm text-gray-400">Real-time Chat</div>
          </div>
        </div>
      </div>
    </div>
  )
}
