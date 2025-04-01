
import { useLocation, useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger
} from "@/components/ui/sidebar";
import { navigationItems } from "./navigation/navigationData";

export function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Sidebar side="left" variant="floating" collapsible="icon">
      <SidebarHeader className="flex h-14 items-center justify-between px-4">
        <h2 className="text-lg font-bold text-foreground">MRC Formation</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton 
                    isActive={location.pathname === item.path}
                    tooltip={item.label}
                    onClick={() => navigate(item.path)}
                  >
                    {item.getIcon()}
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">© 2023 MRC</p>
          <SidebarTrigger />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
