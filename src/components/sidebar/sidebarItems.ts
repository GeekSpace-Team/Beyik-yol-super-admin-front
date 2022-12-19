export interface SidebarItem {
  id: number;
  link: string;
  icon: any;
  text: string;
  subnav?: SidebarItem[];
}
