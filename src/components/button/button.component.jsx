/**
 * Three buttons:
 * Default.
 * Inverted.
 * Google sign in
 *
 * @format
 */
import './button.styles.scss';

const BUTTON_TYPE_CLASSES = {
  google: 'google-sign-in',
  inverted: 'inverted',
  new: 'new-chat',
  existing: 'existing-chat',
};

const Button = ({ children, buttonType, onClick, ...otherProps }) => {
  return (
    <button
      onClick={onClick}
      className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}
    >
      {children}
    </button>
  );
};

export default Button;
