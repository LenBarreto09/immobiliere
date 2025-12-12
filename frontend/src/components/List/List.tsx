import type { FC } from 'react';
import { Card, Button } from '../index';
import styles from './List.module.css';

// Example usage of the Card and Button components
interface ListProps {
  onCreateProperty?: () => void;
  onViewProperty?: (id: string) => void;
  onEditProperty?: (id: string) => void;
}

const List: FC<ListProps> = ({
  onCreateProperty,
  onViewProperty,
  onEditProperty,
}) => {
  // Sample property data
  const sampleProperties = [
    {
      id: '1',
      title: 'Modern Apartment in City Center',
      city: 'Paris',
      price: 850000,
      currency: '€',
      image: 'https://via.placeholder.com/400x300/4f46e5/white?text=Property+Image',
    },
    {
      id: '2',
      title: 'Luxury Villa with Garden',
      city: 'Nice',
      price: 1200000,
      currency: '€',
      image: 'https://via.placeholder.com/400x300/059669/white?text=Villa+Image',
    },
    {
      id: '3',
      title: 'Cozy Studio Near Metro',
      city: 'Lyon',
      price: 320000,
      currency: '€',
    },
    {
      id: '4',
      title: 'Penthouse with Terrace',
      city: 'Cannes',
      price: 2500000,
      currency: '€',
      image: 'https://via.placeholder.com/400x300/6366f1/white?text=Penthouse',
    },
  ];

  const handleView = (id: string) => {
    console.log('View property:', id);
    onViewProperty?.(id);
  };

  const handleEdit = (id: string) => {
    console.log('Edit property:', id);
    onEditProperty?.(id);
  };

  const handleCreate = () => {
    console.log('Create property');
    onCreateProperty?.();
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.mainTitle}>
          Propriétés Immobilières
        </h1>
        <Button text="Créer Propriété" onClick={handleCreate} />
      </div>

      {/* Card Grid */}
      <div className={styles.cardGrid}>
        {sampleProperties.map((property) => (
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

export default List;
