import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Favorite, FavoriteBorder } from "@mui/icons-material/";

const LikeCount = () => {
  const [cookies] = useCookies(["myLikePets"]);
  return (
    <div className="PetsPage__likeCount">
      {cookies.myLikePets?.length ? (
        <Link to={"/pets/liked"}>
          <span
            className={
              cookies.myLikePets?.length < 10 ? "upToTen" : "tenAndMore"
            }
          >
            {cookies.myLikePets?.length}
          </span>
          <Favorite />
        </Link>
      ) : (
        <FavoriteBorder />
      )}
    </div>
  );
};

export default LikeCount;
