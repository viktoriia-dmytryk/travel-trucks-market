'use client';

import Image from 'next/image';
import css from './NotFoundCampers.module.css';
import Icon from '../Icon/Icon';
import { useRouter } from 'next/navigation';

function NotFoundCampers() {
  const router = useRouter();

  return (
    <div className={css.wrapper}>
      <Image
        src="/images/not-found@2x.png"
        alt="No campers found for the selected filters"
        width={488}
        height={463}
        className={css.image}
        sizes="(max-width: 1439px) 10vw, 488px"
      />

      <h2 className={css.title}>No campers found</h2>
      <p className={css.description}>
        We couldn`t find any campers that match your filters. Try adjusting your
        search or clearing some filters.
      </p>

      <div className={css.btnWrapper}>
        <button
          className={css.clearBtn}
          type="button"
          onClick={() => {
            router.push('/catalog');
          }}
        >
          <Icon id="icon-close" className={css.closeIcon} /> Clear filters
        </button>
        <button
          className={css.viewAllBtn}
          type="button"
          onClick={() => {
            router.push('/catalog');
          }}
        >
          View all campers
        </button>
      </div>
    </div>
  );
}

export default NotFoundCampers;
