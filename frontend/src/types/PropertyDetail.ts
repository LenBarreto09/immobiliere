import type { Property } from './Property';

export interface PropertyDetailProps {
  property: Property;
  onBack?: () => void;
  onEdit?: (id: string) => void;
}
