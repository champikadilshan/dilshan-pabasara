import Image from 'next/image';
import { wedding } from '@/config/wedding';
import { Reveal } from './Reveal';
import { Section } from './Section';
import styles from './Gallery.module.css';

const placeholderCount = 3;

export function Gallery() {
  const photos = wedding.gallery;

  return (
    <Section id="gallery" eyebrow="Moments" title="Our Story in Frames">
      <Reveal className={styles.track} delay={100}>
        {photos.length > 0
          ? photos.map((photo, index) => (
              <figure key={photo.src} className={styles.frame}>
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 600px) 78vw, 340px"
                  className={styles.photo}
                  priority={index === 0}
                />
              </figure>
            ))
          : Array.from({ length: placeholderCount }, (_, index) => (
              <figure key={index} className={`${styles.frame} ${styles.placeholder}`}>
                <img src="/ornaments/mandala-full.svg" alt="" className={styles.placeholderMark} />
                <figcaption>Photos coming soon</figcaption>
              </figure>
            ))}
      </Reveal>
    </Section>
  );
}
