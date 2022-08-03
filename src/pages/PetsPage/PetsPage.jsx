import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { observer } from "mobx-react";
import { toJS } from "mobx";
import { useCookies } from "react-cookie";

import AllPetsStore from "../../store/AllPetsStore";

import { PetsCard, LikeCount, Loader } from "../../components";

const PetsPage = observer(() => {
  const [fetching, setFetching] = useState(1);
  const [cookies] = useCookies(["myLikePets"]);

  if (!cookies.gender || !cookies.type) {
    return <Navigate to="/type" />;
  }

  useEffect(() => {
    if (fetching) {
      (async () => {
        await AllPetsStore.fetchArrPets(
          cookies.gender,
          cookies.type /*cookies.shelter_id*/
        ); // отправляем запрос
        AllPetsStore.setLikePets(cookies.myLikePets ?? []); // Заполняем из куки массив лайкнутых животных
      })();
    }
  }, [fetching]);

  useEffect(() => {
    if (AllPetsStore.pets.length) {
      //если есть петсы
      document.addEventListener("scroll", scrollHandler); //добавляет по скролу новые карточки
      return () => {
        document.removeEventListener("scroll", scrollHandler); //перестает добавлять новые карточки пока не внизу
      };
    }
  }); //  при каждом рендеренге

  const scrollHandler = (e) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
      200
    ) {
      setFetching(() => AllPetsStore.pets.length);
    }
  };

  return (
    <>
      {AllPetsStore.isLoading ? (
        <Loader />
      ) : (
        <>
          {AllPetsStore.pets.map((p) => (
            <PetsCard p={toJS(p)} key={p.id} />
          ))}
          <LikeCount />
        </>
      )}
    </>
  );
});

export default PetsPage;
