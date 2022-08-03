import {makeAutoObservable, runInAction} from "mobx";
import {getHostInformation, CORS} from "./helper/getHostInformation";

const host = getHostInformation();

class Choice {
    constructor() {
        makeAutoObservable(this);
    }

    isFetch = false;
    cats = {
        male: 0,
        female: 0,
    };
    dogs = {
        male: 0,
        female: 0,
    };

    choice = {
        type: "",
        gender: "",
    };

    setType = (type) => {
        runInAction(() => {
            this.choice.type = type
        })
    }

    setGender = (gender) => {
        runInAction(() => {
            this.choice.gender = gender
        })
    }

    fetchCount = async () => {
        const typeReq = await fetch(`${host}/animals_type`, CORS);
        const typeRes = await typeReq.json();

        const genReq = await fetch(`${host}/genders`, CORS);
        const genRes = await genReq.json();

        if (typeReq.ok && genReq) {
            runInAction(() => {
                typeRes["animal_types"].forEach((item) => {
                    if (item.type === "cat") {
                        if (genRes["genders"].includes("male")) {
                            this.cats.male = 1;
                        }
                        if (genRes["genders"].includes("female")) {
                            this.cats.female = 1;
                        }
                    }

                    if (item.type === "dog") {
                        if (genRes["genders"].includes("male")) {
                            this.dogs.male = 1;
                        }
                        if (genRes["genders"].includes("female")) {
                            this.dogs.female = 1;
                        }
                    }

                    if (item.type === "unknown") {
                        if (
                            genRes["genders"].includes("male") ||
                            genRes["genders"].includes("unknown")
                        ) {
                            this.cats.male = 1;
                            this.dogs.male = 1;
                        }

                        if (
                            genRes["genders"].includes("female") ||
                            genRes["genders"].includes("unknown")
                        ) {
                            this.cats.male = 1;
                            this.dogs.male = 1;
                        }
                    }

                    if (
                        this.cats.female > 0 &&
                        this.cats.male > 0 &&
                        this.dogs.female > 0 &&
                        this.dogs.male > 0
                    ) {
                        this.isFetch = true;
                    }
                });
                this.isFetch = true;
            });
        }
    };

    setDefault = async () => {
        runInAction(() => {
            this.choice = {
                type: 0,
                gender: 0,
            };
        });
    };
}

const choiceStore = new Choice();

export default choiceStore;
