import type { FC } from 'react';
import { useState } from 'react';
import Button from '../Button/Button';
import styles from './PropertyForm.module.css';

interface Property {
  id?: string;
  title: string;
  city: string;
  price: number;
  currency?: string;
  image?: string;
  description?: string;
  bedrooms?: number;
  bathrooms?: number;
  size?: number;
  type?: string;
  yearBuilt?: number;
}

interface PropertyFormProps {
  property?: Property;
  onSave?: (property: Property) => void;
  onCancel?: () => void;
  isEdit?: boolean;
}

const PropertyForm: FC<PropertyFormProps> = ({
  property,
  onSave,
  onCancel,
  isEdit = false,
}) => {
  const [formData, setFormData] = useState<Property>({
    title: property?.title || '',
    city: property?.city || '',
    price: property?.price || 0,
    currency: property?.currency || '€',
    image: property?.image || '',
    description: property?.description || '',
    bedrooms: property?.bedrooms || 1,
    bathrooms: property?.bathrooms || 1,
    size: property?.size || 0,
    type: property?.type || 'Apartment',
    yearBuilt: property?.yearBuilt || new Date().getFullYear(),
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'bedrooms' || name === 'bathrooms' || 
              name === 'size'
        ? Number(value) 
        : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave?.(formData);
  };

  const propertyTypes = [
    'Apartment',
    'House',
    'Villa',
    'Studio',
    'Penthouse',
    'Townhouse',
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          {isEdit ? 'Modifier Propriété' : 'Créer Nouvelle Propriété'}
        </h1>
        <Button text="Cancel" variant="secondary" onClick={onCancel} />
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGrid}>
          {/* Basic Information */}
          <div className={styles.formSection}>
            <h2 className={styles.sectionTitle}>Basic Information</h2>
            
            <div className={styles.inputGroup}>
              <label htmlFor="title" className={styles.label}>
                Property Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className={styles.input}
                placeholder="Enter property title"
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="city" className={styles.label}>
                City *
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required
                className={styles.input}
                placeholder="Enter city"
              />
            </div>

            <div className={styles.inputRow}>
              <div className={styles.inputGroup}>
                <label htmlFor="price" className={styles.label}>
                  Price *
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  min="0"
                  className={styles.input}
                  placeholder="0"
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="currency" className={styles.label}>
                  Currency
                </label>
                <select
                  id="currency"
                  name="currency"
                  value={formData.currency}
                  onChange={handleInputChange}
                  className={styles.select}
                >
                  <option value="€">EUR (€)</option>
                  <option value="$">USD ($)</option>
                </select>
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="type" className={styles.label}>
                Property Type
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className={styles.select}
              >
                {propertyTypes.map(type => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Property Details */}
          <div className={styles.formSection}>
            <h2 className={styles.sectionTitle}>Property Details</h2>

            <div className={styles.inputRow}>
              <div className={styles.inputGroup}>
                <label htmlFor="bedrooms" className={styles.label}>
                  Bedrooms
                </label>
                <input
                  type="number"
                  id="bedrooms"
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleInputChange}
                  min="0"
                  className={styles.input}
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="bathrooms" className={styles.label}>
                  Bathrooms
                </label>
                <input
                  type="number"
                  id="bathrooms"
                  name="bathrooms"
                  value={formData.bathrooms}
                  onChange={handleInputChange}
                  min="0"
                  step="0.5"
                  className={styles.input}
                />
              </div>
            </div>

            <div className={styles.inputRow}>
              <div className={styles.inputGroup}>
                <label htmlFor="size" className={styles.label}>
                  Size (m²)
                </label>
                <input
                  type="number"
                  id="size"
                  name="size"
                  value={formData.size}
                  onChange={handleInputChange}
                  min="0"
                  className={styles.input}
                />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="image" className={styles.label}>
                Image URL
              </label>
              <input
                type="url"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                className={styles.input}
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>
        </div>

        {/* Description */}
        <div className={styles.inputGroup}>
          <label htmlFor="description" className={styles.label}>
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
            className={styles.textarea}
            placeholder="Enter property description..."
          />
        </div>

        {/* Form Actions */}
        <div className={styles.formActions}>
          <Button text="Cancel" variant="secondary" onClick={onCancel} />
          <Button text={isEdit ? 'Mettre à Jour Propriété' : 'Créer Propriété'} type="submit" />
        </div>
      </form>
    </div>
  );
};

export default PropertyForm;
