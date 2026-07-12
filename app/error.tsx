'use client';

interface ErrorProps {
  error: Error;
}

function Error({ error }: ErrorProps) {
  return (
    <p
      style={{
        display: 'flex',
        fontFamily: 'var(--font-family)',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'black',
        fontSize: '24px',
        fontWeight: 500,
        marginTop: '120px',
      }}
    >
      {error.message}
    </p>
  );
}

export default Error;
