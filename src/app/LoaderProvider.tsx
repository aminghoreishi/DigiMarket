import NextTopLoader from 'nextjs-toploader';

export default function LoaderProvider({ children } : { children: React.ReactNode }) {
  return (
    <>
      {children}
      <NextTopLoader
        color="#2299DD"
        height={3}
        showSpinner={false}
        
      />
    </>
  );
}