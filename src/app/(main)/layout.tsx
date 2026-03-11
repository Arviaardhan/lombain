import Navbar from "@/components/layout/Navbar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main className="pb-20 md:pb-0">
          {children}
        </main>
    </>
  );
}
