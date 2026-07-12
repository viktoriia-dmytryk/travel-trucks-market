import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import CamperPage from './CamperPage.client';
import { getCamperById } from '@/lib/api';
import type { Metadata } from 'next';

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ camperId: string }>;
}): Promise<Metadata> => {
  const { camperId } = await params;

  try {
    const camper = await getCamperById(camperId);
    const imageSet = camper.gallery[0].original;

    return {
      title: `${camper.name} | TravelTrucks`,
      description: camper.description,
      openGraph: {
        title: `${camper.name} | TravelTrucks`,
        description: camper.description,
        url: `${process.env.NEXT_PUBLIC_API_URL}/catalog/${camperId}`,
        siteName: 'TravelTrucks',
        images: [
          {
            url: imageSet,
            width: 1200,
            height: 630,
            alt: camper.name,
          },
        ],
      },
    };
  } catch {
    return {
      title: 'Camper not found | TravelTrucks',
    };
  }
};

async function page({ params }: { params: Promise<{ camperId: string }> }) {
  const { camperId } = await params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['camperById', camperId],
    queryFn: () => getCamperById(camperId),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CamperPage />
    </HydrationBoundary>
  );
}

export default page;
