export default function PageContainer({ children, className = "" }) {
  return (
    <div className={`mx-auto w-full max-w-[1312px] px-3 sm:px-8 xl:px-0 ${className}`}>
      {children}
    </div>
  );
}
