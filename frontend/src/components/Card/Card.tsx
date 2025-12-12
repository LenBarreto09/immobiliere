import type { FC } from 'react';
import Button from '../Button/Button';
import type { CardProps } from '../../types/Card';
import styles from './Card.module.css';

const Card: FC<CardProps> = ({
  property,
  onView,
  onEdit,
}) => {
  const { id, title, city, price, image } = property;

  const handleView = () => {
    onView?.(id);
  };

  const handleEdit = () => {
    onEdit?.(id);
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardImage}>
        {image ? (
          <img src={image} alt={title} />
        ) : (
          <div className={styles.imagePlaceholder}>
            <span>🏠</span>
          </div>
        )}
      </div>

      <div className={styles.cardContent}>
        <div className={styles.cardMain}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>{title}</h3>
            <p className={styles.cardCity}>
              📍 {city}
            </p>
          </div>

          <div className={styles.cardPrice}>
            <span className={styles.cardPriceValue}>
              €{price.toLocaleString()}
            </span>
          </div>
        </div>

        <div className={styles.cardActions}>
          <Button
            text="Voir"
            size="medium"
            onClick={handleView}
          />
          <Button
            text="Modifier"
            variant="secondary"
            size="medium"
            onClick={handleEdit}
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
