import Header from "../header";

function CommonLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-6 lg:px-8">
      <Header />
      <main className="overflow-auto max-w-7xl mx-auto">{children}</main>
    </div>
  );
}

export default CommonLayout;
