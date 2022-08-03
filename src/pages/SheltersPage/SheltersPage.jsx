import { useEffect, useState } from "react";
import { toJS } from "mobx";
import { observer } from "mobx-react";
import SearchPetsStore from "../../store/SearchPetsStore";

import { Back, Loader, PetsCard } from "../../components";
import { DefaultSheltersIcon } from "../../components/SVG/DefaultSheltersIcon";
import { Search } from "../../components/SVG/Search";
import Auth from "../../store/helper/Auth";

const SheltersPage = observer(() => {
  const [startSearch, setStartSearch] = useState(1);
  const [fetching, setFetching] = useState(1);
  const [search_pattern, setsearch_pattern] = useState("");
  let shelter_id = Auth.token?.shelter_id;
  console.log(Auth.token)
  let start_id = 1;
  let start_name = "";

  useEffect(() => {
    if (toJS(SearchPetsStore.tenPets.length)) {
      start_name = toJS(SearchPetsStore.tenPets[9]?.name);
      start_id = toJS(SearchPetsStore.tenPets[9]?.id);
    }
    if (fetching) {
      (async () => {
        await SearchPetsStore.petSearch(
          shelter_id,
          search_pattern,
          start_name,
          start_id
        );
      })();
    }
    setStartSearch(0);
  }, [fetching, startSearch]);

  useEffect(() => {
    if (toJS(SearchPetsStore.tenPets.length)) {
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
      setFetching(() => toJS(SearchPetsStore.tenPets.length));
    }
  };

  return (
    <div className="SheltersPage">
      <Back />
      <div className="SheltersPage__title">
        <span>Лента приюта</span>
        <div className="SheltersPage__title-icon">
          {<DefaultSheltersIcon /> ||
            toJS(SearchPetsStore.tenPets[0].shelter_logo)}
        </div>
      </div>
      {SearchPetsStore.isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="SheltersPage__searchBox">
            <input
              type="text"
              className="SheltersPage__searchBox-searchTxt"
              placeholder="Поиск"
              onChange={(e) => setsearch_pattern(e.target.value)}
            />
            <div
              className="SheltersPage__searchBox-searchBtn"
              onClick={() => setStartSearch(1)}
            >
              <Search />
            </div>
          </div>
          {toJS(SearchPetsStore.tenPets).map((p) => (
            <PetsCard p={toJS(p)} key={p.id} />
          ))}
        </>
      )}
    </div>
  );
});

export default SheltersPage;
