import { getCampersCatalog } from '@/lib/api';
import css from './CampersList.module.css';
import Image from 'next/image';
import Icon from '../Icon/Icon';

function formatLabel(value: string): string {
  return value
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
async function CampersList() {
  const data = await getCampersCatalog();
  const campers = data.campers;

  return (
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

            <p className={css.attention}>
              The pictures shown here are example vehicles of the respective...
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
            <button className={css.button} type="button">
              Show more
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default CampersList;
