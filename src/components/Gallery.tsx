import type { CSSProperties } from 'react';
import Image from 'next/image';
import { wedding } from '@/config/wedding';
import { Reveal } from './Reveal';
import { Section } from './Section';
import { StoryArt } from './StoryArt';
import shared from './shared.module.css';
import styles from './Gallery.module.css';

export function Gallery({ previewAlbum = false }: { previewAlbum?: boolean }) {
  const { story, gallery: photos, photoAlbum } = wedding;
  // ?album=open shows the button before the day, for testing.
  const albumOpen = previewAlbum || Date.now() >= new Date(photoAlbum.opensAt).getTime();

  return (
    <Section id="story" eyebrow="Moments" title="Our Story in Frames" lead={wedding.storyLead}>
      <ol className={styles.story}>
        {story.map((chapter, index) => (
          <Reveal as="li" key={chapter.title} className={styles.chapter}>
            <figure className={styles.frame} style={{ '--tilt': index % 2 ? '1.2deg' : '-1.2deg' } as CSSProperties}>
              <StoryArt kind={chapter.art} id={`story-${index}`} />
            </figure>
            <div className={styles.text}>
              <p className={styles.when}>{chapter.when}</p>
              <h3 className={styles.title}>{chapter.title}</h3>
              <p className={styles.line}>{chapter.text}</p>
            </div>
          </Reveal>
        ))}
      </ol>

      <Reveal className={styles.album}>
        <img src="/ornaments/lotus-mark.svg" alt="" width={60} height={42} className={styles.albumMark} />
        <p className={shared.eyebrow}>On the day</p>
        <h3 className={styles.albumTitle}>Share your moments</h3>
        <p className={styles.albumText}>{photoAlbum.text}</p>
        {albumOpen && photoAlbum.url ? (
          <a
            className={`${shared.button} ${shared.buttonSolid}`}
            href={photoAlbum.url}
            target="_blank"
            rel="noreferrer"
          >
            Add your photos
          </a>
        ) : (
          <p className={styles.albumNote}>
            {albumOpen
              ? 'The album link will appear here shortly.'
              : `Opens on the wedding day · ${wedding.shortDateLabel}`}
          </p>
        )}
      </Reveal>

      {photos.length > 0 ? (
        <>
          <p className={`${shared.eyebrow} ${styles.photosLabel}`}>From the day</p>
          <Reveal className={styles.track} delay={100}>
            {photos.map((photo, index) => (
              <figure key={photo.src} className={styles.photoFrame}>
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 600px) 78vw, 340px"
                  className={styles.photo}
                  priority={index === 0}
                />
              </figure>
            ))}
          </Reveal>
        </>
      ) : null}
    </Section>
  );
}
