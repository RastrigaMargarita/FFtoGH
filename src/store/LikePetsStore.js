import { makeAutoObservable, runInAction } from "mobx";
import { getHostInformation, POSTCORS } from "./helper/getHostInformation";

const host = getHostInformation();

class LikePetsStore {
  constructor() {
    makeAutoObservable(this);
  }

  likePets = []
  isLoading = true;

  fetchLikeArrPets = async (pets_id) => {
    const likePetReq = await fetch(`${host}/pets_info`, POSTCORS({ pets_id }));
    const likePetRes = await likePetReq.json();
    if (likePetReq.ok) {
      runInAction(() => {
        this.likePets = likePetRes;
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

export default new LikePetsStore();
