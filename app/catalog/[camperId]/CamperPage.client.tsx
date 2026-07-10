'use client';

import { getCamperById } from '@/lib/api';
import css from './CamperPage.module.css';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import MainInfoBox from '@/components/MainInfoBox/MainInfoBox';
import ModalLoading from '@/components/ModalLoading/ModalLoading';
import GallerySwiper from '@/components/Gallery/GallerySwiper';
import VehicleDetails from '@/components/VehicleDetails/VehicleDetails';
import ReviewsList from '@/components/ReviewsList/ReviewsList';

function CamperPage() {
  const params = useParams();
  const camperId = params.camperId as string;
  const { data, isLoading, isError } = useQuery({
    queryKey: ['camperById', camperId],
    queryFn: () => getCamperById(camperId),
    refetchOnMount: false,
  });

  if (isLoading) {
    return <ModalLoading />;
  }
  if (isError || !data) {
    return <main className={css.mainBox}>Camper not found</main>;
  }
  return (
    <main className={css.mainBox}>
      <section className={css.wrapper}>
        <GallerySwiper images={data.gallery} />
        <div className={css.informationBox}>
          <MainInfoBox camper={data} />
          <VehicleDetails camper={data} />
        </div>
      </section>
      <section className={css.review}>
        <h2 className={css.reviewTitle}>Reviews</h2>
        <div className={css.reviewBox}>
          <ReviewsList />
        </div>
      </section>
    </main>
  );
}

export default CamperPage;
