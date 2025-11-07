import NextTopLoader from 'nextjs-toploader';

export default function LoaderProvider({ children }) {
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