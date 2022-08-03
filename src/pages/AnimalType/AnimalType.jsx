import { Container } from "@mui/material";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import HeaderChoice from "../../components/Filter/HeaderChoice";
import StepChoice from "../../components/Filter/StepChoice";
import { observer } from "mobx-react";
import SelfButton from "../../components/Filter/SelfButton";
import CatIcon from "../../components/Filter/CatIcon";
import DogIcon from "../../components/Filter/DogIcon";
import RatIcon from "../../components/Filter/RatIcon";
import choiceStore from "../../store/Choice";
import { useCookies } from "react-cookie";
import AllPetsStore from "../../store/AllPetsStore";

const AnimalType = observer(() => {
  AllPetsStore.delPets();
  const [cookie, setCookie] = useCookies(["type"]);
  if (cookie.type) {
    switch (cookie.type) {
      case "1":
        choiceStore.setType("dogs");
        break;
      case "2":
        choiceStore.setType("cats");
        break;
      case "3":
        choiceStore.setType("unknown");
        break;
      default:
        choiceStore.setType("unknown");
    }
  }
  const page = "type";

  useEffect(() => {
    (async () => {
      await choiceStore.fetchCount().then();
    })();
  }, [page]);

  return (
    <Container style={{ maxWidth: "360px", marginTop: "-4rem" }}>
      <HeaderChoice />
      <div className="AnimalTypeBlock">
        <div className="">
          <p className="AnimalTypeBlock__text">Кого ищем?</p>
          <div className="AnimalTypeBlockButtonBlock">
            <Link
              to={
                choiceStore.cats.male + choiceStore.cats.female <= 0
                  ? ""
                  : "/gender"
              }
              className={
                choiceStore.choice.type === "cats"
                  ? "ButtonChoiceBlock ButtonChoiceBlock-active"
                  : "ButtonChoiceBlock ButtonChoiceBlock-nonactive"
              }
              onClick={() => {
                choiceStore.setType("cats");
                setCookie("type", "2");
              }}
            >
              <p
                className={
                  choiceStore.choice.type === "cats"
                    ? "ButtonChoiceBlock__text ButtonChoiceBlock__text-active"
                    : " ButtonChoiceBlock__text ButtonChoiceBlock__text-nonactive"
                }
              >
                Кошку
              </p>
              <CatIcon active={choiceStore.choice.type === "cats"} />
              {choiceStore.cats.male + choiceStore.cats.female <= 0 && (
                <div className="ChoiceHiddenBlock"> </div>
              )}
            </Link>
            <Link
              to={
                choiceStore.dogs.male + choiceStore.dogs.female <= 0
                  ? ""
                  : "/gender"
              }
              className={
                choiceStore.choice.type === "dogs"
                  ? "ButtonChoiceBlock ButtonChoiceBlock-active"
                  : "ButtonChoiceBlock ButtonChoiceBlock-nonactive"
              }
              disabled={
                choiceStore.isFetch
                  ? choiceStore.dogs.male + choiceStore.dogs.female <= 0
                  : true
              }
              onClick={() => {
                choiceStore.setType("dogs");
                setCookie("type", "1");
              }}
            >
              <p
                className={
                  choiceStore.choice.type === "dogs"
                    ? "ButtonChoiceBlock__text ButtonChoiceBlock__text-active"
                    : " ButtonChoiceBlock__text ButtonChoiceBlock__text-nonactive"
                }
              >
                Собаку
              </p>
              <DogIcon active={choiceStore.choice.type === "dogs"} />
              {choiceStore.dogs.male + choiceStore.dogs.female <= 0 && (
                <div className="ChoiceHiddenBlock"> </div>
              )}
            </Link>
            <Link
              to={
                choiceStore.dogs.male + choiceStore.dogs.female <= 0
                  ? ""
                  : "/gender"
              }
              className={
                choiceStore.choice.type === "dogs"
                  ? "ButtonChoiceBlock ButtonChoiceBlock-active"
                  : "ButtonChoiceBlock ButtonChoiceBlock-nonactive"
              }
              disabled={
                choiceStore.isFetch
                  ? choiceStore.dogs.male + choiceStore.dogs.female <= 0
                  : true
              }
              onClick={() => {
                choiceStore.setType("dogs");
                setCookie("type", "1");
              }}
            >
              <p
                className={
                  choiceStore.choice.type === "dogs"
                    ? "ButtonChoiceBlock__text ButtonChoiceBlock__text-active"
                    : " ButtonChoiceBlock__text ButtonChoiceBlock__text-nonactive"
                }
              >
                Крысу
              </p>
              <RatIcon active={choiceStore.choice.type === "dogs"} />
              {choiceStore.dogs.male + choiceStore.dogs.female <= 0 && (
                <div className="ChoiceHiddenBlock"> </div>
              )}
            </Link>
          </div>
        </div>
        <div className="FooterChoice">
          <div className="AnimalTypeBlockActionBlock">
            <div />
            <Link to={choiceStore.choice.type === "" ? "" : "/gender"}>
              <SelfButton width={"100%"} text={"Далее"} color={false} />
            </Link>
          </div>
          <StepChoice page={"type"} />
        </div>
      </div>
    </Container>
  );
});

export default AnimalType;
