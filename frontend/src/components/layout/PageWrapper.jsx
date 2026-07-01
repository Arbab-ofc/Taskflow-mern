import Navbar from "./Navbar";

const PageWrapper = ({ children, className = "" }) => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className={`mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10 ${className}`}>
        {children}
      </main>
    </div>
  );
};

export default PageWrapper;
