import "./button.css";

const Button = ({ text, type, iconName, event }) => {
  return (
    <button type={type} onClick={() => event(true)}>
      {text} <span className="material-icons">{iconName}</span>
    </button>
  );
};

export default Button;
