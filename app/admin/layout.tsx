export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* We removed the old Sidebar here. 
         The new Dashboard (page.tsx) now handles its own navigation.
      */}
      {children}
    </div>
  );
}
