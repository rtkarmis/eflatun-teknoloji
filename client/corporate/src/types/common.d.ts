export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface MenuItem {
  label: string;
  href: string;
  subLinks?: MenuItem[];
}
