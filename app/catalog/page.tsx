import CampersList from '@/components/CampersList/CampersList';
import css from './page.module.css';
import Filter from '@/components/Filter/Filter';

function page() {
  return (
    <main className={css.mainBox}>
      <Filter />
      <CampersList />
    </main>
  );
}

export default page;
