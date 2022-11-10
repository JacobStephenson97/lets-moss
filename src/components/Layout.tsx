import Navbar from "./Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navbar />
      <main className="my-0 mx-auto flex flex-1 flex-col justify-center px-20 sm:w-full lg:w-8/12">
        {children}
      </main>
    </>
  );
}
