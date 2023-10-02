import { Spinner as BootstrapSpinner } from "react-bootstrap";
import { useContext, memo } from "react";
import UnsplashContext from "../appContext";

interface Props {
  bottomSpiner?: boolean;
}

const Spinner: React.FC<Props> = ({ bottomSpiner }) => {
  const { isDark } = useContext(UnsplashContext);
  return (
    <div
      className={`spinner-container w-100 d-flex justify-content-center my-5 ${
        bottomSpiner && "spinner-bottom"
      }`}
    >
      <BootstrapSpinner
        style={{ color: isDark ? "#e2e8f0" : "#240227" }}
        className="spinner"
        animation="grow"
      />
    </div>
  );
};
export default memo(Spinner);
