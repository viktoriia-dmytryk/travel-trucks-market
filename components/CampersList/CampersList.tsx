'use client';

import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { getCampersCatalog } from '@/lib/api';
import type { Forms, Engines, Transmissions } from '@/types/types';
import css from './CampersList.module.css';
import Image from 'next/image';
import Icon from '../Icon/Icon';
import Link from 'next/link';
import ModalLoading from '../ModalLoading/ModalLoading';
import NotFoundCampers from '../NotFoundCampers/NotFoundCampers';
import { formatLabel } from '@/lib/utils';

const PER_PAGE = 4;

function CampersList() {
  const searchParams = useSearchParams();

  const location = searchParams.get('location') ?? '';
  const form = (searchParams.get('form') as Forms) ?? '';
  const engine = (searchParams.get('engine') as Engines) ?? '';
  const transmission =
    (searchParams.get('transmission') as Transmissions) ?? '';

  const filters = { location, form, engine, transmission };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ['campers', filters],
    queryFn: ({ pageParam }) =>
      getCampersCatalog({
        page: pageParam,
        perPage: PER_PAGE,
        location: location || undefined,
        form: form || undefined,
        engine: engine || undefined,
        transmission: transmission || undefined,
      }),
    initialPageParam: 1,
    refetchOnMount: false,
    placeholderData: keepPreviousData,
    getNextPageParam: lastPage =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
  });

  const campers = data?.pages.flatMap(page => page.campers) ?? [];

  if (isLoading) {
    return <ModalLoading />;
  }

  if (isError) {
    return (
      <p className={css.attention}>Failed to load campers. Try again later.</p>
    );
  }

  if (campers.length === 0) {
    return <NotFoundCampers />;
  }

  return (
    <div className={css.wrapper}>
      {isFetching && <ModalLoading />}
      <ul className={css.listCampers}>
        {campers.map(camp => (
          <li className={css.listItem} key={camp.id}>
            <Image
              src={camp.coverImage}
              alt={camp.name}
              className={css.coverImage}
              width={219}
              height={240}
            />

            <div className={css.infoWrapper}>
              <div className={css.titleInfoBox}>
                <h2 className={css.name}>
                  {camp.name} <span className={css.price}>€{camp.price}</span>
                </h2>

                <div className={css.infoBox}>
                  <p className={css.location}>
                    <Icon id="icon-star-yellow" className={css.map} />
                    {camp.rating} ({camp.totalReviews} Reviews)
                  </p>

                  <p className={css.location}>
                    <Icon id="icon-map" className={css.map} />
                    {camp.location}
                  </p>
                </div>
              </div>

              <p className={css.description}>
                {camp.description.length > 60
                  ? `${camp.description.slice(0, 60)}...`
                  : camp.description}
              </p>

              <div className={css.tagBox}>
                <p className={css.tag}>
                  <Icon id="icon-station" className={css.tagIcon} />
                  {formatLabel(camp.engine)}
                </p>
                <p className={css.tag}>
                  <Icon id="icon-network" className={css.tagIcon} />
                  {formatLabel(camp.transmission)}
                </p>
                <p className={css.tag}>
                  <Icon id="icon-car" className={css.tagIcon} />
                  {formatLabel(camp.form)}
                </p>
              </div>

              <Link
                className={css.link}
                href={`/catalog/${camp.id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Show more
              </Link>
            </div>
          </li>
        ))}
      </ul>

      {hasNextPage && (
        <button
          className={css.loadMoreBtn}
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          Load more
        </button>
      )}

      {isFetchingNextPage && <ModalLoading />}
    </div>
  );
}

export default CampersList;
