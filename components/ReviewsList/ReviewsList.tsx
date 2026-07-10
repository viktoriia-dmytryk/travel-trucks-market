'use client';
import { getReviews } from '@/lib/api';
import css from './ReviewsList.module.css';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import Loader from '../Loader/Loader';
import StarRating from '../StarRating/StarRating';

function ReviewsList() {
  const { camperId } = useParams();
  const { data: reviews, isLoading } = useQuery({
    queryKey: ['reviews', camperId],
    queryFn: () => getReviews(camperId as string),
  });

  if (isLoading) {
    return <Loader />;
  }
  return (
    <ul className={css.reviewsList}>
      {reviews?.map(item => (
        <li className={css.item} key={item.id}>
          <div className={css.wrapper}>
            <span className={css.avatar} aria-hidden={true}>
              {item.reviewer_name[0]}
            </span>
            <div className={css.nameBox}>
              <p className={css.name}>{item.reviewer_name}</p>
              <StarRating rating={item.reviewer_rating} />
            </div>
          </div>
          <p className={css.comment}>{item.comment}</p>
        </li>
      ))}
    </ul>
  );
}

export default ReviewsList;
