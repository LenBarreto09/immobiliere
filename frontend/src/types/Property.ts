export interface Property {
  id: string;
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
}
