import {
  SidebarInset,
  SidebarProvider,
} from "../ui/sidebar"
import { Outlet } from "react-router-dom"

export default function QueueLayout() {


  return (
    <SidebarProvider>
      <SidebarInset>
        <main className="flex flex-1 flex-col gap-4">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}