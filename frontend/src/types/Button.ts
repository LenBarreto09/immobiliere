export interface ButtonProps {
  text: React.ReactNode;
  onClick?: () => void;
  variant?: 'secondary' | 'danger';
  size?: 'medium';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}
