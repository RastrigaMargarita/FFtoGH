import { makeAutoObservable, runInAction } from "mobx";

class BurgerStore {
    constructor() {
        makeAutoObservable(this);
    }

    isMenuOpen = false

    toggleMenu = (bool = !this.isMenuOpen) => {
        runInAction(() => {
            this.isMenuOpen = bool;
        });
    }


}

export default new BurgerStore();
