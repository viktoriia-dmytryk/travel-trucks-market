'use client';

import Image from 'next/image';
import { BlossomCarousel, BlossomDots } from '@blossom-carousel/react';
import '@blossom-carousel/react/style.css';
import css from './GallerySwiper.module.css';

type Props = {
  images: {
    thumb: string;
    original: string;
  }[];
};

export default function GallerySwiper({ images }: Props) {
  return (
    <div className={css.gallery}>
      <div className={css.carouselWrapper}>
        <BlossomCarousel id="gallery" className={css.carousel}>
          {images.map((image, index) => (
            <div key={index} data-blossom-slide className={css.slide}>
              <Image
                src={image.original}
                alt={`Photo ${index + 1}`}
                fill
                loading="eager"
                draggable={false}
                sizes="(max-width: 1439px) 100vw, 638px"
                className={css.image}
              />
            </div>
          ))}
        </BlossomCarousel>
      </div>

      <div className={css.dots}>
        <BlossomDots for="gallery">
          {({ index, active }) => (
            <span className={css.thumb} data-active={active}>
              <Image
                src={images[index].thumb}
                alt={`Thumbnail ${index + 1}`}
                loading="lazy"
                fill
                draggable={false}
                className={css.imageDots}
                sizes="(max-width: 1439px) 25vw, 136px"
              />
            </span>
          )}
        </BlossomDots>
      </div>
    </div>
  );
}
