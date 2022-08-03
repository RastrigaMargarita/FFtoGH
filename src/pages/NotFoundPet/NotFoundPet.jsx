import { NotFoundPet__icon } from "../../components/SVG";

const NotFoundPet = () => {
  return (
    <div className="NotFoundPet">
      <div className="NotFoundPet__404">
        <div className="NotFoundPet__404--text">
          <span>Карточки этого животного не существует. Возможно, оно уже обрело новый дом.</span>
        </div>
      </div>
      <div className="NotFoundPet__icon">
        <NotFoundPet__icon />
      </div>
      <div className="NotFoundPet__buttons">
        <div className="NotFoundPet__buttons--main">Вернуться на главную</div>
        <div className="NotFoundPet__buttons--likes">Посмотреть лайки</div>
      </div>
    </div>
  );
};

export default NotFoundPet;
