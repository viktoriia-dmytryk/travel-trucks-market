import { Camper } from '@/types/types';
import css from './MainInfoBox.module.css';
import Icon from '@/components/Icon/Icon';

function MainInfoBox({ camper }: { camper: Camper }) {
  return (
    <div className={css.titleInfoBox}>
      <div className={css.titleBox}>
        <h2 className={css.name}>{camper.name}</h2>

        <div className={css.infoBox}>
          <p className={css.location}>
            <Icon id="icon-star-yellow" className={css.map} />
            {camper.rating} ({camper.totalReviews} Reviews)
          </p>

          <p className={css.location}>
            <Icon id="icon-map" className={css.map} />
            {camper.location}
          </p>
        </div>
      </div>

      <p className={css.price}>€{camper.price}</p>

      <p className={css.description}> {camper.description}</p>
    </div>
  );
}

export default MainInfoBox;
