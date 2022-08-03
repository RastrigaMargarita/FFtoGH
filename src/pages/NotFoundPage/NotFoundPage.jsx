import { Link } from "react-router-dom";
import { NotFound404, NotFoundDog } from "../../components/SVG";

const NotFoundPage = () => {
  return (
    <>
      <div className="NotFooundPage">
        <div className="NotFooundPage__404">
          <div className="NotFooundPage__404--icon">
            <NotFound404 />
          </div>
          <div className="NotFooundPage__404--text">
            <span>
              Что-то пошло не так! <br /> Страница не найдена.
            </span>
          </div>
        </div>
        <div className="NotFooundPage__icon">
          <NotFoundDog />
        </div>
        <div className="NotFooundPage__buttons">
          <Link to={"/pets"}>
            <div className="NotFooundPage__buttons--main">
              Вернуться на главную
            </div>
          </Link>
          <Link to={"/pets/liked"}>
            <div className="NotFooundPage__buttons--likes">
              Посмотреть лайки
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
