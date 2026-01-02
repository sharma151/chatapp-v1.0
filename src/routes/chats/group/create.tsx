import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/chats/group/create')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/chats/group/create"!</div>
}
