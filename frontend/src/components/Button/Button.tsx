import type { FC } from 'react';
import type { ButtonProps } from '../../types/Button';
import styles from './Button.module.css';

const Button: FC<ButtonProps> = ({
  text,
  variant,
  size,
  onClick,
  disabled = false,
  type = 'button',
}) => {
  const classes = [
    styles.btn,
    variant === 'secondary' && styles.secondary,
    variant === 'danger' && styles.danger,
    size === 'medium' && styles.medium,
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
