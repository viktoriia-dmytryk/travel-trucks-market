import { Camper } from '@/types/types';
import css from './VehicleDetails.module.css';
import { formatLabel } from '@/lib/utils';

function VehicleDetails({ camper }: { camper: Camper }) {
  return (
    <div className={css.box}>
      <h2 className={css.title}>Vehicle details</h2>
      <ul className={css.tagList}>
        {camper.amenities.map((item, index) => {
          return (
            <li className={css.tag} key={index}>
              {formatLabel(item)}
            </li>
          );
        })}
      </ul>
      <ul className={css.infoList}>
        <li className={css.infoItem}>
          Form
          <span>{formatLabel(camper.form)}</span>
        </li>
        <li className={css.infoItem}>
          Length
          <span>{parseFloat(camper.length)} m</span>
        </li>
        <li className={css.infoItem}>
          Width
          <span>{parseFloat(camper.width)} m</span>
        </li>
        <li className={css.infoItem}>
          Height
          <span>{parseFloat(camper.height)} m</span>
        </li>
        <li className={css.infoItem}>
          Tank
          <span>{parseFloat(camper.tank)} l</span>
        </li>
        <li className={css.infoItem}>
          Consumption
          <span>{parseFloat(camper.consumption)} l / 100km</span>
        </li>
      </ul>
    </div>
  );
}

export default VehicleDetails;
