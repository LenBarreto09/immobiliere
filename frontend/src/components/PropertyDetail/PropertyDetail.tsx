import type { FC } from 'react';
import Button from '../Button/Button';
import type { PropertyDetailProps } from '../../types/PropertyDetail';
import styles from './PropertyDetail.module.css';

const PropertyDetail: FC<PropertyDetailProps> = ({
  property,
  onBack,
  onEdit,
}) => {
  const {
    id,
    title,
    city,
    price,
    currency = '€',
    image,
    description,
    bedrooms,
    bathrooms,
    size,
    type
  } = property;

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency === '€' ? 'EUR' : 'USD',
    }).format(price);
  };

  const handleEdit = () => {
    onEdit?.(id);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Button text="← Retour à la Liste" onClick={onBack} />
        <Button text="Modifier Propriété" variant="secondary" onClick={handleEdit} />
      </div>

      <div className={styles.propertyDetail}>
        {image && (
          <div className={styles.imageSection}>
            <img src={image} alt={title} className={styles.mainImage} />
          </div>
        )}

        <div className={styles.contentSection}>
          <div className={styles.titleSection}>
            <h1 className={styles.propertyTitle}>{title}</h1>
            <p className={styles.propertyLocation}>📍 {city}</p>
            <div className={styles.propertyPrice}>
              {formatPrice(price, currency)}
            </div>
          </div>

          <div className={styles.detailsGrid}>
            {type && (
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Type:</span>
                <span className={styles.detailValue}>{type}</span>
              </div>
            )}
            
            {bedrooms && (
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Bedrooms:</span>
                <span className={styles.detailValue}>{bedrooms}</span>
              </div>
            )}
            
            {bathrooms && (
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Bathrooms:</span>
                <span className={styles.detailValue}>{bathrooms}</span>
              </div>
            )}
            
            {size && (
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Size:</span>
                <span className={styles.detailValue}>{size} m²</span>
              </div>
            )}
          </div>

          {description && (
            <div className={styles.descriptionSection}>
              <h2 className={styles.sectionTitle}>Description</h2>
              <p className={styles.description}>{description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
