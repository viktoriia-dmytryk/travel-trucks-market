import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import CamperPage from './CamperPage.client';
import { getCamperById } from '@/lib/api';

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
