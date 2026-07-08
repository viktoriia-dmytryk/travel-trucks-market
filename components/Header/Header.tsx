'use client';

import Link from 'next/link';
import css from './Header.module.css';
import Icon from '../Icon/Icon';
import { usePathname } from 'next/navigation';

function Header() {
  const pathname = usePathname();
  return (
    <header className={css.headerBox}>
      <nav className={css.navigation}>
        <Link href={'/'}>
          {' '}
          <Icon id="icon-TravelTrucks" className={css.logo} />
        </Link>
        <div className={css.wrapper}>
          <Link
            href={'/'}
            className={css.headerLink}
            data-active={pathname === '/'}
          >
            Home
          </Link>
          <Link
            href={'/catalog'}
            className={css.headerLink}
            data-active={pathname === '/catalog'}
          >
            Catalog
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
