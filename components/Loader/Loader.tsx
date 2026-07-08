import styles from './Loader.module.css';

export default function Loader() {
  return (
    <div className={styles.loader}>
      <svg viewBox="0 0 100 100">
        <circle className={styles.loaderTrack} cx="50" cy="50" r="42" />
        <circle className={styles.loaderArc} cx="50" cy="50" r="42" />
      </svg>
    </div>
  );
}