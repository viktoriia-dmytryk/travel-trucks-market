import Icon from '../Icon/Icon';
import css from './StarRating.module.css';

type Props = {
  rating: number;
};

function StarRating({ rating }: Props) {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className={css.stars} aria-label={`Rating - ${rating}`}>
      {stars.map(star => (
        <Icon
          key={star}
          id={star <= rating ? 'icon-star-yellow' : 'icon-star'}
          className={css.star}
        />
      ))}
    </div>
  );
}

export default StarRating;
