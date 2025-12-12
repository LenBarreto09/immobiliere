export interface InputProps {
  label: string;
  name: string;
  type?: 'text' | 'number' | 'email' | 'url' | 'textarea' | 'select';
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  placeholder?: string;
  required?: boolean;
  min?: number;
  max?: number;
  maxLength?: number;
  step?: number;
  rows?: number;
  options?: { value: string; label: string }[];
  className?: string;
}
