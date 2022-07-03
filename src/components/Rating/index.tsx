import styles from "../../styles/Rating.module.scss";

interface RatingProps {
  starsNumber: 0 | 1 | 2 | 3 | 4 | 5;
}

const Rating: React.FC<RatingProps> = ({ starsNumber }) => {
  const getOnStars = () => {
    return Array.from(Array(starsNumber).keys()).map((_, index) => {
      return (
        <img
          key={`${index}_on`}
          src="/assets/avaliacao_on.svg"
          alt="Filled Star"
          width={16}
          height={15}
        />
      );
    });
  };

  const getOffStars = () => {
    return Array.from(Array(5 - starsNumber).keys()).map((_, index) => {
      return (
        <img
          key={`${index}_off`}
          src="/assets/avaliacao_off.svg"
          alt="Empty Star"
          width={16}
          height={15}
        />
      );
    });
  };

  return (
    <div className={styles.container}>
      {getOnStars()}
      {getOffStars()}
    </div>
  );
};

export default Rating;
