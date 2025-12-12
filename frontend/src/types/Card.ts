import type { Property } from './Property';

export interface CardProps {
  property: Property;
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
}
