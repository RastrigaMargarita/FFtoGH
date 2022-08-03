import { makeAutoObservable, runInAction, toJS } from "mobx";
import { getHostInformation, POSTCORS } from "./helper/getHostInformation";

const host = getHostInformation();

class SearchPetsStore {
  isLoading = true;
  tenPets = [];
  pets = [];

  constructor() {
    makeAutoObservable(this);
  }

  petSearch = async (shelter_id, search_pattern, start_name, start_id) => {
    const petReq = await fetch(
      `${host}/pet_search`,
      POSTCORS({ shelter_id, search_pattern, start_name, start_id })
    );
    const petRes = await petReq.json();
    if (petReq.ok) {
      runInAction(() => {
        this.tenPets = petRes;
      });
    }
    this.setLoading(false);
  };

  setLoading = (bool) => {
    runInAction(() => {
      this.isLoading = bool;
    });
  };
}

export default new SearchPetsStore();
