import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-white mb-6">About DevHub</h1>

      <div className="bg-gray-900/50 rounded-lg border border-gray-800 p-6 space-y-4">
        <p className="text-gray-300">
          A modern SPA dashboard showcasing various web technologies and API integrations.
        </p>

        <div>
          <h2 className="text-xl font-semibold text-white mb-3">Features</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-300">
            <li>User management with ReqRes API</li>
            <li>Real-time WebSocket chat</li>
            <li>SpaceX GraphQL data exploration</li>
            <li>Dark theme UI with Tailwind CSS</li>
            <li>TypeScript with strict typing</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-3">Technologies</h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-gray-800/30 rounded border border-gray-700">
              <div className="font-medium text-blue-400">Frontend</div>
              <div className="text-sm text-gray-400">React, TypeScript, Vite</div>
            </div>
            <div className="p-3 bg-gray-800/30 rounded border border-gray-700">
              <div className="font-medium text-purple-400">Routing</div>
              <div className="text-sm text-gray-400">TanStack Router</div>
            </div>
            <div className="p-3 bg-gray-800/30 rounded border border-gray-700">
              <div className="font-medium text-green-400">Data</div>
              <div className="text-sm text-gray-400">TanStack Query</div>
            </div>
            <div className="p-3 bg-gray-800/30 rounded border border-gray-700">
              <div className="font-medium text-red-400">GraphQL</div>
              <div className="text-sm text-gray-400">Apollo Sandbox</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
