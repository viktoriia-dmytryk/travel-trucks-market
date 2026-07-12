'use client';

import { useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import css from './Filter.module.css';
import Icon from '../Icon/Icon';
import { getCategories } from '@/lib/api';
import { formatLabel } from '@/lib/utils';
import type { Forms, Engines, Transmissions, Filters } from '@/types/types';
import { useFilterStore } from '@/lib/store';
import Loader from '../Loader/Loader';

function Filter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { data, isLoading } = useQuery({
    queryKey: ['category'],
    queryFn: () => getCategories(),
  });

  const {
    location,
    form,
    engine,
    transmission,
    resetKey,
    setFilters,
    syncFromUrl,
    clearFilters,
  } = useFilterStore();

  useEffect(() => {
    syncFromUrl({
      location: searchParams.get('location') ?? '',
      form: (searchParams.get('form') as Forms) ?? '',
      engine: (searchParams.get('engine') as Engines) ?? '',
      transmission: (searchParams.get('transmission') as Transmissions) ?? '',
    });

    return () => {
      clearFilters();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const values: Filters = {
      location: ((formData.get('location') as string) ?? '').trim(),
      form: (formData.get('form') as Forms) ?? '',
      engine: (formData.get('engine') as Engines) ?? '',
      transmission: (formData.get('transmission') as Transmissions) ?? '',
    };

    setFilters(values);

    const params = new URLSearchParams(
      Object.entries(values).filter(([, value]) => value)
    );

    router.push(
      params.toString() ? `${pathname}?${params.toString()}` : pathname,
      { scroll: false }
    );
  };

  const handleClear = () => {
    clearFilters();
    router.push(pathname, { scroll: false });
  };

  if (isLoading) return <Loader />;

  return (
    <aside className={css.sidebar}>
      <form className={css.form} key={resetKey} onSubmit={handleSubmit}>
        <div className={css.locationBlock}>
          <label htmlFor="location" className={css.label}>
            Location
          </label>

          <input
            id="location"
            name="location"
            className={css.input}
            placeholder="City"
            defaultValue={location}
            autoComplete="off"
          />

          <Icon id="icon-map" className={css.iconMap} />
        </div>

        <h2 className={css.filtersTitle}>Filters</h2>

        <div className={css.fieldsetWrapper}>
          <fieldset className={css.fieldset}>
            <legend className={css.legend}>Camper form</legend>

            {data?.forms.map(value => (
              <label key={value} className={css.radioLabel}>
                <input
                  className={css.radio}
                  type="radio"
                  name="form"
                  value={value}
                  defaultChecked={form === value}
                />
                {formatLabel(value)}
              </label>
            ))}
          </fieldset>

          <fieldset className={css.fieldset}>
            <legend className={css.legend}>Engine</legend>

            {data?.engines.map(value => (
              <label key={value} className={css.radioLabel}>
                <input
                  className={css.radio}
                  type="radio"
                  name="engine"
                  value={value}
                  defaultChecked={engine === value}
                />
                {formatLabel(value)}
              </label>
            ))}
          </fieldset>

          <fieldset className={css.fieldset}>
            <legend className={css.legend}>Transmission</legend>

            {data?.transmissions.map(value => (
              <label key={value} className={css.radioLabel}>
                <input
                  className={css.radio}
                  type="radio"
                  name="transmission"
                  value={value}
                  defaultChecked={transmission === value}
                />
                {formatLabel(value)}
              </label>
            ))}
          </fieldset>
        </div>

        <button className={css.searchBtn}>Search</button>
      </form>

      <button type="button" className={css.clearBtn} onClick={handleClear}>
        <Icon id="icon-close" className={css.closeIcon} /> Clear filters
      </button>
    </aside>
  );
}

export default Filter;
