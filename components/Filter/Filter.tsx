'use client';

import { useRef } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import css from './Filter.module.css';
import Icon from '../Icon/Icon';
import { useQuery } from '@tanstack/react-query';
import { getCategories } from '@/lib/api';
import { formatLabel } from '@/lib/utils';

function Filter() {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { data } = useQuery({
    queryKey: ['category'],
    queryFn: () => getCategories(),
  });

  const location = searchParams.get('location') ?? '';
  const form = searchParams.get('form') ?? '';
  const engine = searchParams.get('engine') ?? '';
  const transmission = searchParams.get('transmission') ?? '';

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const params = new URLSearchParams(
      [...formData.entries()]
        .filter(([, value]) => value.toString().trim())
        .map(([key, value]) => [key, value.toString()])
    );

    router.push(
      params.toString() ? `${pathname}?${params.toString()}` : pathname,
      { scroll: false }
    );
  };

  const handleClear = () => {
    formRef.current?.reset();
    router.push(pathname, { scroll: false });
  };

  return (
    <aside className={css.sidebar}>
      <form
        ref={formRef}
        className={css.form}
        key={searchParams.toString()}
        onSubmit={handleSubmit}
      >
        <div className={css.locationBlock}>
          <label htmlFor="location" className={css.label}>
            Location
          </label>

          <Icon id="icon-map" className={css.iconMap} />

          <input
            id="location"
            name="location"
            className={css.input}
            placeholder="City"
            defaultValue={location}
          />
        </div>

        <h3 className={css.filtersTitle}>Filters</h3>

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
