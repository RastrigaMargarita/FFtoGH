import { makeAutoObservable, runInAction } from "mobx";
import { getHostInformation, CORS } from "./helper/getHostInformation";
import Auth from "./helper/Auth";

const host = getHostInformation();

class AdminMainStore {
  constructor() {
    makeAutoObservable(this);
  }

  shelterInfo = null;

  fetchInfo = async () => {
    this.setLoading(true);
    const id = Auth.token?.shelter_id
    const shelterReq = await fetch(`${host}/shelter?id=${id}`, CORS);
    const shelterRes = await shelterReq.json();
    if (shelterReq.ok && shelterRes !== null) {
      runInAction(() => {
        this.shelterInfo = {
          name: shelterRes.name,
          shelter_logo: shelterRes.shelter_logo,
          shelter_href: shelterRes.shelter_href,
          phone_number: shelterRes.phone_number,
          address: shelterRes.address,
          description: shelterRes.description,
        };

      });
    }
    this.setLoading(false);
  };



  isLoading = true;
  setLoading = (bool) => {
    runInAction(() => {
      this.isLoading = bool;
    });
  };
}

export default new AdminMainStore();
