import Link from 'next/link';
import css from './NotFound.module.css';

function NotFound() {
  return (
    <div className={css.box}>
      <h1 className={css.title}>404</h1>

      <h2 className={css.title}>Page Not Found</h2>

      <p className={css.description}>
        Sorry, the page you`re looking for doesn`t exist or may have been moved.
      </p>

      <Link href="/" className={css.backLink}>
        Go back to Home
      </Link>
    </div>
  );
}

export default NotFound;
