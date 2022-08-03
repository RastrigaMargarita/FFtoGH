import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import AllPetsStore from "../../store/AllPetsStore";
import { PetPhotos } from "../index";
import { observer } from "mobx-react";

import { Home, FavoriteBorder, Favorite } from "@mui/icons-material/";
import { FEMALE, MALE } from "../SVG";
import { Gear } from "../SVG/Gear";
import { toJS } from "mobx";

const PetsCard = observer(({ p }) => {
  const [cookies, setCookie] = useCookies(["myLikePets"]);

  return (
    <div className="PetsCard">
      <Link to={`/pets/${p.id}`}>
        <PetPhotos images={toJS(p.image_list)} />

        <div className="card__imageline" />
        <div className="card__about">
          {window.location.href.includes("admin") ? (
            <div
              className="card__photo--like">
             
                <Link to={`../admin/edit/${p.id}`}>
            
              <Gear /></Link>
            </div>
          ) : (
            <div
              className="card__photo--like"
              onClick={(e) => {
                e.preventDefault();
                AllPetsStore.toggleMyLike(p.id);
                setCookie("myLikePets", AllPetsStore.likesPetsArr, {
                  path: "/",
                });
              }}
            >
              {cookies.myLikePets?.includes(p.id) ? (
                <Favorite />
              ) : (
                <FavoriteBorder />
              )}
            </div>
          )}
          <div className="card__about--name">{p.name}</div>
          <div className="card__about--description">{p.short_description}</div>
          <div className="card__about--genders">
            {p.gender === "male" ? ( //Проверка пола
              <MALE />
            ) : p.gender === "female" ? (
              <FEMALE />
            ) : (
              ""
            )}
          </div>
          <div className="card__about--gendersName">
            {p.gender === "male" //Проверка пола
              ? "Мальчик"
              : p.gender === "female"
              ? "Девочка"
              : ""}
          </div>
        </div>
      </Link>
      <div className="card__line--wrapper">
        <div className="card__line" />
      </div>
      <div className="card__footer">
        <div className="card__footer--home">
          <a target="_blank" rel="noreferrer" href={p.hyperlink}>
            {p.shelter_logo ? (
              <img src={p.shelter_logo} alt="Лого приюта" />
            ) : (
              <Home />
            )}
          </a>
        </div>
      </div>
    </div>
  );
});

export default PetsCard;
