export default function PageLayout({ children, className = '' }) {
  return (
    <main className="main-content">
      <div className={`page-layout ${className}`}>
        {children}
      </div>
    </main>
  );
}
