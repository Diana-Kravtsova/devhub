import { createFileRoute } from '@tanstack/react-router';
import { ApolloSandbox } from '@apollo/sandbox/react';

export const Route = createFileRoute('/space')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="p-2 space-y-4">
      <h1 className="text-3xl font-bold text-white mb-4">GraphQL Space</h1>

      <div className="bg-gray-900/50 rounded-lg border border-gray-800 p-4">
        <p className="text-gray-400 mb-4">
          Explore SpaceX data using GraphQL API with Apollo Sandbox
        </p>
      </div>

      <div className="h-[600px] rounded-lg overflow-hidden border border-gray-700">
        <ApolloSandbox
          initialEndpoint="https://spacex-production.up.railway.app/"
          className="h-full"
        />
      </div>
      <div className="bg-blue-900/20 border border-blue-800 rounded p-4">
        <p className="text-blue-400">
          Using SpaceX's public GraphQL API: https://spacex-production.up.railway.app/
        </p>
      </div>
    </div>
  );
}
