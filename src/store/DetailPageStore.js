import { makeAutoObservable, runInAction } from "mobx";
import { getHostInformation, CORS, POSTCORS } from "./helper/getHostInformation";

const host = getHostInformation();

class DetailPageStore {
  constructor() {
    makeAutoObservable(this);
  }

  petInfo = null;
  images = [];
  probability = [];

  fetchInfo = async (id) => {
    this.setLoading(true);
    const petReq = await fetch(`${host}/pets/${id}`, CORS);
    const petRes = await petReq.json();
    if (petReq.ok && petRes !== null) {
      runInAction(() => {
        this.petInfo = {
          name: petRes.name,
          description: petRes.description,
          gender: petRes.gender,
          age: petRes.age,
          shelter_logo: petRes.shelter_logo,
          shelter_id: petRes.shelter_id,
          hyperlink: petRes.hyperlink,
          number: petRes.phone_number,
        };

        this.images = petRes.image_list;
        this.probability = petRes.probability;
      });
      await this.fetchShelter();
    }
    this.setLoading(false);
  };

  shelter_link = null;
  fetchShelter = async () => {
    const shelterReq = await fetch(
      `${host}/shelter?id=${this.petInfo.shelter_id}`,
      CORS
    );
    const shelterRes = await shelterReq.json();
    if (shelterReq.ok) {
      runInAction(() => {
        this.shelter_link = shelterRes.shelter_href;
      });
    }
  };

  isLoading = true;
  setLoading = (bool) => {
    runInAction(() => {
      this.isLoading = bool;
    });
  };

   /*fetchInfo = async (data) => {*/
 async fetchInsert  (data) { 
    this.setLoading(true);

    fetch(`${host}/insert_animal`, POSTCORS(data));
      
    this.setLoading(false);
  };


}

export default new DetailPageStore();
