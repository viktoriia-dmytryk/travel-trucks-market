import { Suspense } from 'react';
import CampersList from '@/components/CampersList/CampersList';
import css from './page.module.css';
import Filter from '@/components/Filter/Filter';
import ModalLoading from '@/components/ModalLoading/ModalLoading';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'TravelTrucks | Catalog',
  icons: '/favicon.ico',
  description:
    'Catalog TravelTrucks. Browse, compare, and find the perfect camper for your next adventure.',
  openGraph: {
    title: 'TravelTrucks | Catalog',
    description:
      'Catalog TravelTrucks. Browse, compare, and find the perfect camper for your next adventure.',
    url: process.env.NEXT_PUBLIC_API_URL + '/catalog',
    siteName: 'TravelTrucks',
    images: [
      {
        url: '/images/not-found@1x.png',
        width: 1200,
        height: 630,
        alt: 'TravelTrucks - Camper Rental Catalog',
      },
    ],
  },
};

function page() {
  return (
    <main className={css.mainBox}>
      <Suspense fallback={<ModalLoading />}>
        <Filter />
        <CampersList />
      </Suspense>
    </main>
  );
}

export default page;
