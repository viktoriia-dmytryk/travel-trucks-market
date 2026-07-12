import css from './ModalLoading.module.css';
import Loader from '../Loader/Loader';

export default function ModalLoading() {
  return (
    <div className={css.backdrop} role="dialog" aria-modal="true">
      <div className={css.modal}>
        <Loader />
        <p>Loading trucks...</p>
        <p>Please wait while we fetch the best travel trucks for you</p>
      </div>
    </div>
  );
}
