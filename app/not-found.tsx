import Link from 'next/link';

function NotFound() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--inputs)',
        gap: '24px',
        marginTop: '120px',
        borderRadius: '16px',
        padding: '24px',
      }}
    >
      <h1
        style={{
          fontFamily: 'var(--font-family)',
          fontWeight: 600,
          fontSize: '24px',
          lineHeight: '133%',
          textAlign: 'center',
          color: 'var(--main)',
        }}
      >
        404
      </h1>

      <h2
        style={{
          fontFamily: 'var(--font-family)',
          fontWeight: 600,
          fontSize: '24px',
          lineHeight: '133%',
          textAlign: 'center',
          color: 'var(--main)',
        }}
      >
        Page Not Found
      </h2>

      <p
        style={{
          fontFamily: 'var(--font-family)',
          fontWeight: 500,
          fontSize: '16px',
          lineHeight: '150%',
          textAlign: 'center',
          color: 'var(--main)',
        }}
      >
        Sorry, the page you`re looking for doesn`t exist or may have been moved.
      </p>

      <Link
        href="/"
        className="notFoundBackLink"
        style={{
          borderRadius: '200px',
          padding: '16px 60px',
          fontWeight: 500,
          fontSize: '16px',
          lineHeight: '150%',
          letterSpacing: '-0.01em',
          color: 'var(--white)',
          transition: 'background 300ms cubic-bezier(0.31, 0.63, 0.78, 0.91)',
        }}
      >
        Go back to Home
      </Link>

      <style>{`
      .notFoundBackLink {
       background: var(--grey-green)}
        .notFoundBackLink:hover,
        .notFoundBackLink:focus-visible {
          background: var(--green-hover);
        }
      `}</style>
    </div>
  );
}

export default NotFound;
