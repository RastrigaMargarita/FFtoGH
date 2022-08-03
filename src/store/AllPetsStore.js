import { makeAutoObservable, runInAction, toJS } from "mobx";
import { getHostInformation, POSTCORS } from "./helper/getHostInformation";

const host = getHostInformation();

class AllPetsStore {
  isLoading = true;
  myLike = 0;
  likesPetsArr = [];
  tenPets = [];
  pets = [];

  constructor() {
    makeAutoObservable(this);
  }

  setUniqPets = () => {
    runInAction(() => {
      let uniqPets = Object.values(this.tenPets).filter(
        (pet) => !this.pets.find((item) => item.id === pet.id)
      );
      this.pets = [...this.pets, ...uniqPets];
    });
  };

  setLikePets = (likePets) => {
    runInAction(() => {
      this.likesPetsArr = likePets;
    });
  };

  delPets = () => {
    runInAction(() => {
      this.pets = [];
    });
  };

  toggleMyLike = (id) => {
    id = +id;
    runInAction(() => {
      if (this.likesPetsArr.includes(id)) {
        this.myLike -= 1;
        this.likesPetsArr = this.likesPetsArr.filter((i) => i !== id);
      } else {
        this.myLike += 1;
        this.likesPetsArr.push(id);
      }
    });
    return toJS(this.likesPetsArr).includes(id);
  };

  fetchArrPets = async (gender, animal_type_id, shelter_id) => {
    const petReq = await fetch(
      `${host}/animals_type/gender`,
      POSTCORS({ gender, animal_type_id, shelter_id })
    );
    const petRes = await petReq.json();
    if (petReq.ok) {
      runInAction(() => {
        this.tenPets = petRes;
      });
    }
    this.setLoading(false);
    this.setUniqPets(); // Cравниваем id на уникальность
  };

  setLoading = (bool) => {
    runInAction(() => {
      this.isLoading = bool;
    });
  };
}

export default new AllPetsStore();
