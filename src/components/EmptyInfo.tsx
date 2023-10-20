import { useContext, memo } from "react";
import UnsplashContext from "../appContext";

interface Props {
  result?: boolean;
}

const EmptyInfo: React.FC<Props> = ({ result }) => {
  const { isDark } = useContext(UnsplashContext);

  return (
    <h4
      style={{ color: isDark ? "#e2e8f0" : "#4a044e" }}
      className="text-center my-5 w-100"
    >
      {result ? "no result!" : "no photos yet!"}
    </h4>
  );
};
export default memo(EmptyInfo);
