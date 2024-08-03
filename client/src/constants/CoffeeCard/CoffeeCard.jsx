export const CoffeeCard = ({ imgURL, changeCoffeeImage, cofeeCup }) => {
  const handleClick = () => {
    if (cofeeCup !== imgURL.cofees) {
      changeCoffeeImage(imgURL.cofees);
    }
  };

  return (
    <div
      className={`border-2 ${
        cofeeCup === imgURL.cofees
          ? "border-primary rounded-2xl  "
          : "border-transparent rounded-xl"
      } cursor-pointer max-sm:flex-1 sm:w-24 sm:h-24 lg:w-32 lg:h-32`}
      onClick={handleClick}
    >
      <div className="flex justify-center items-center bg-card bg-center bg-cover sm:w-24 sm:h-24 lg:w-32 lg:h-32 rounded-2xl max-sm:p-2 lg:p-4">
        <img
          src={imgURL.thumbnail}
          alt="coffee"
          width={96}
          height={78}
          className="object-contain"
        />
      </div>
    </div>
  );
};

export default CoffeeCard;
