import type { FC } from 'react';
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import { usePropertyStore } from '../../stores/propertyStore';
import styles from './DetailPage.module.css';

const DetailPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentProperty: property, loading, error, fetchPropertyById } = usePropertyStore();

  useEffect(() => {
    if (id) {
      fetchPropertyById(id);
    }
  }, [id, fetchPropertyById]);

  // Fallback property for error states
  const fallbackProperty = {
    id: id || '1',
    title: 'Propriété Non Trouvée',
    city: 'Inconnue',
    price: 0,
    currency: '€',
    description: 'Propriété non trouvée dans la base de données.',
  };

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency === '€' ? 'EUR' : 'USD',
    }).format(price);
  };

  const handleBack = () => {
    navigate('/');
  };

  const handleEdit = () => {
    if (property) {
      navigate(`/property/${property.id}/edit`);
    }
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <Button text="← Back to List" onClick={handleBack} />
        </div>
        <div className={styles.loading}>
          Chargement de la propriété...
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <Button text="← Retour à la Liste" onClick={handleBack} />
        </div>
        <div className={styles.error}>
          {error || 'Propriété non trouvée'}
        </div>
      </div>
    );
  }

  const currentProperty = property || fallbackProperty;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Button text="← Retour à la Liste" onClick={handleBack} />
        <Button text="Modifier Propriété" variant="secondary" onClick={handleEdit} />
      </div>

      <div className={styles.propertyDetail}>
        <div className={styles.contentSection}>
          <div className={styles.titleSection}>
            <h1 className={styles.propertyTitle}>{currentProperty.title}</h1>
            <p className={styles.propertyLocation}>📍 {currentProperty.city}</p>
            <div className={styles.propertyPrice}>
              {formatPrice(currentProperty.price, currentProperty.currency || '€')}
            </div>
          </div>

          <ul className={styles.detailsList}>
            {currentProperty.type && (
              <li className={styles.detailListItem}>
                <span className={styles.detailLabel}>Type:</span>
                <span className={styles.detailValue}>{currentProperty.type}</span>
              </li>
            )}

            {currentProperty.bedrooms && (
              <li className={styles.detailListItem}>
                <span className={styles.detailLabel}>Chambres:</span>
                <span className={styles.detailValue}>{currentProperty.bedrooms}</span>
              </li>
            )}

            {currentProperty.bathrooms && (
              <li className={styles.detailListItem}>
                <span className={styles.detailLabel}>Salles de bain:</span>
                <span className={styles.detailValue}>{currentProperty.bathrooms}</span>
              </li>
            )}

            {currentProperty.size && (
              <li className={styles.detailListItem}>
                <span className={styles.detailLabel}>Surface:</span>
                <span className={styles.detailValue}>{currentProperty.size} m²</span>
              </li>
            )}
          </ul>

          {currentProperty.description && (
            <div className={styles.descriptionSection}>
              <h2 className={styles.sectionTitle}>Description:</h2>
              <p className={styles.description}>{currentProperty.description}</p>
            </div>
          )}

          {currentProperty.image && (
            <div className={styles.imageSection}>
              <img src={currentProperty.image} alt={currentProperty.title} className={styles.mainImage} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
