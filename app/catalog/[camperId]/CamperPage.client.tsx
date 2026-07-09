'use client';

import { getCamperById } from '@/lib/api';
import css from './CamperPage.module.css';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import MainInfoBox from '@/components/MainInfoBox/MainInfoBox';
import ModalLoading from '@/components/ModalLoading/ModalLoading';
import GallerySwiper from '@/components/Gallery/GallerySwiper';

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
      <div className={css.wrapper}>
        <GallerySwiper images={data.gallery} />
        <MainInfoBox camper={data} />
      </div>
    </main>
  );
}

export default CamperPage;
