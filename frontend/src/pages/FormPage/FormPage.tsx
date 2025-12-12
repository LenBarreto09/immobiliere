import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Button, Input } from '../../components';
import { usePropertyStore } from '../../stores/propertyStore';
import type { Property } from '../../types/Property';
import styles from './FormPage.module.css';

const FormPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  // Determine if we're in edit mode based on route
  const isEdit = location.pathname.includes('/edit');

  const { fetchPropertyById, createProperty, updateProperty, deleteProperty } = usePropertyStore();

  const [formData, setFormData] = useState<Partial<Property>>({
    title: '',
    city: '',
    price: 0,
    currency: '€',
    image: '',
    description: '',
    bedrooms: 1,
    bathrooms: 1,
    size: 0,
    type: 'Apartment',
  });

  const [loading, setLoading] = useState(isEdit); // Load data if editing
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load existing property data for edit mode
  useEffect(() => {
    const loadProperty = async () => {
      if (!isEdit || !id) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const property = await fetchPropertyById(id);
        if (property) {
          setFormData({
            title: property.title || '',
            city: property.city || '',
            price: property.price || 0,
            currency: property.currency || '€',
            image: property.image || '',
            description: property.description || '',
            bedrooms: property.bedrooms || 1,
            bathrooms: property.bathrooms || 1,
            size: property.size || 0,
            type: property.type || 'Apartment',
          });
        } else {
          setError('Propriété non trouvée');
        }
      } catch (err) {
        setError('Échec du chargement de la propriété');
        console.error('Error loading property:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProperty();
  }, [id, isEdit, fetchPropertyById]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // Truncate title to 60 characters to fit in 2 lines
    const processedValue = name === 'title' && value.length > 60
      ? value.substring(0, 60)
      : name === 'price' || name === 'bedrooms' || name === 'bathrooms' || name === 'size'
      ? Number(value)
      : value;

    setFormData((prev) => ({
      ...prev,
      [name]: processedValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError(null);

      if (isEdit && id) {
        // Update existing property
        await updateProperty(id, formData);
        navigate(`/property/${id}`);
      } else {
        // Create new property
        const newProperty = await createProperty(formData as Omit<Property, 'id'>);
        navigate(`/property/${newProperty.id}`);
      }
    } catch (err) {
      setError('Échec de la sauvegarde de la propriété');
      console.error('Error saving property:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (isEdit && id) {
      // Navigate back to detail page
      navigate(`/property/${id}`);
    } else {
      // Navigate back to list page
      navigate('/');
    }
  };

  const handleDelete = async () => {
    if (!isEdit || !id) return;

    const confirmDelete = window.confirm('Êtes-vous sûr de vouloir supprimer cette propriété ?');
    if (!confirmDelete) return;

    try {
      setSaving(true);
      setError(null);
      await deleteProperty(id);
      navigate('/');
    } catch (err) {
      setError('Échec de la suppression de la propriété');
      console.error('Error deleting property:', err);
    } finally {
      setSaving(false);
    }
  };

  const propertyTypes = [
    { value: 'Apartment', label: 'Apartment' },
    { value: 'House', label: 'House' },
    { value: 'Villa', label: 'Villa' },
    { value: 'Studio', label: 'Studio' },
    { value: 'Penthouse', label: 'Penthouse' },
    { value: 'Townhouse', label: 'Townhouse' },
  ];

  const currencyOptions = [
    { value: '€', label: 'EUR (€)' },
    { value: '$', label: 'USD ($)' },
  ];

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            {isEdit ? 'Edit Property' : 'Create New Property'}
          </h1>
          <Button text="Cancel" variant="secondary" onClick={handleCancel} />
        </div>
        <div className={styles.loading}>
          Chargement des données de propriété...
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          {isEdit ? 'Modifier Propriété' : 'Créer Nouvelle Propriété'}
        </h1>
        <Button text="Annuler" variant="secondary" onClick={handleCancel} />
      </div>

      {error && (
        <div className={styles.error}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGrid}>
          {/* Basic Information */}
          <div className={styles.formSection}>
            <h2 className={styles.sectionTitle}>Basic Information</h2>
            
            <Input
              label="Property Title"
              name="title"
              type="text"
              value={formData.title || ''}
              onChange={handleInputChange}
              placeholder="Enter property title"
              maxLength={60}
              required
            />

            <Input
              label="City"
              name="city"
              type="text"
              value={formData.city || ''}
              onChange={handleInputChange}
              placeholder="Enter city"
              required
            />

            <div className={styles.inputGroup}>
              <Input
                label="Price"
                name="price"
                type="number"
                value={formData.price?.toString() || '0'}
                onChange={handleInputChange}
                placeholder="0"
                min={0}
                required
              />

              <Input
                label="Currency"
                name="currency"
                type="select"
                value={formData.currency || '€'}
                onChange={handleInputChange}
                options={currencyOptions}
              />
            </div>

            <Input
              label="Property Type"
              name="type"
              type="select"
              value={formData.type || 'Apartment'}
              onChange={handleInputChange}
              options={propertyTypes}
            />
          </div>

          {/* Property Details */}
          <div className={styles.formSection}>
            <h2 className={styles.sectionTitle}>Property Details</h2>

            <div className={styles.inputGroup}>
              <Input
                label="Bedrooms"
                name="bedrooms"
                type="number"
                value={(formData.bedrooms || 0).toString()}
                onChange={handleInputChange}
                min={0}
              />

              <Input
                label="Bathrooms"
                name="bathrooms"
                type="number"
                value={(formData.bathrooms || 0).toString()}
                onChange={handleInputChange}
                min={0}
                step={0.5}
              />
            </div>

            <div className={styles.inputGroup}>
              <Input
                label="Size (m²)"
                name="size"
                type="number"
                value={(formData.size || 0).toString()}
                onChange={handleInputChange}
                min={0}
              />
            </div>

            <Input
              label="Image URL"
              name="image"
              type="url"
              value={formData.image || ''}
              onChange={handleInputChange}
              placeholder="https://example.com/image.jpg"
            />
          </div>
        </div>

        {/* Description */}
        <Input
          label="Description"
          name="description"
          type="textarea"
          value={formData.description || ''}
          onChange={handleInputChange}
          placeholder="Enter property description..."
          rows={4}
          className={styles.fullWidth}
        />

        {/* Form Actions */}
        <div className={styles.formActions}>
          {isEdit && (
            <Button
              text="Supprimer"
              variant="danger"
              onClick={handleDelete}
              disabled={saving}
            />
          )}
          <Button
            text={saving ? 'Sauvegarde...' : (isEdit ? 'Mettre à Jour Propriété' : 'Créer Propriété')}
            type="submit"
            disabled={saving}
          />
        </div>
      </form>
    </div>
  );
};

export default FormPage;
