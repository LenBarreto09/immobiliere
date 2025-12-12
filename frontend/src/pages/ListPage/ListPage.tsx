import type { FC } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button } from '../../components';
import { usePropertyStore } from '../../stores/propertyStore';
import styles from './ListPage.module.css';

const ListPage: FC = () => {
  const navigate = useNavigate();
  const { properties, loading, error, fetchProperties } = usePropertyStore();

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  const handleView = (id: string) => {
    navigate(`/property/${id}`);
  };

  const handleEdit = (id: string) => {
    navigate(`/property/${id}/edit`);
  };

  const handleCreate = () => {
    navigate('/create');
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            Propriétés Immobilières
          </h1>
        </div>
        <div className={styles.loading}>
          Chargement des propriétés...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            Propriétés Immobilières
          </h1>
        </div>
        <div className={styles.error}>
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          Propriétés Immobilières
        </h1>
        <Button text="Créer Propriété" onClick={handleCreate} />
      </div>

      {/* Property Grid */}
      <div className={styles.propertyGrid}>
        {properties.map((property) => (
          <Card
            key={property.id}
            property={property}
            onView={handleView}
            onEdit={handleEdit}
          />
        ))}
      </div>
    </div>
  );
};

export default ListPage;
