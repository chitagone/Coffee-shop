export const Button = ({
  label,
  iconURL,
  backgroundColor,
  textColor,
  borderColor,
  fullWidth,
  font,
}) => {
  return (
    <button
      className={`flex justify-center items-center gap-2 px-7 py-4 border font-montserrat text-lg leading-none
        ${
          backgroundColor
            ? `${backgroundColor} ${textColor} ${borderColor} ${font}  hover:scale-105 duration-200`
            : "bg-primary text-white border-primary/100 font-cursive2 hover:scale-105 duration-200"
        } rounded-full ${fullWidth && "w-full"}`}
    >
      {label}

      {iconURL && (
        <img
          src={iconURL}
          alt="arrow right icon"
          className="ml-2 rounded-full bg-white w-5 h-5"
        />
      )}
    </button>
  );
};

export default Button;
