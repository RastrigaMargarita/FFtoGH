import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { observable, action, runInAction } from "mobx";
import { useParams } from "react-router-dom";
import style from "./addAnimal.module.scss";
import Header from "../../components/Header/Header";
import ComeBack from "../../components/ComeBack/ComeBack";
import Title from "../../components/Title/Title";
import Input from "../../components/buttons/Input/Input";
import Select from "../../components/buttons/Select/Select";
import Textarea from "../../components/buttons/Textarea/Textarea";
import Button from "../../components/buttons/Button/Button";
import DetailPageStore from "../../store/DetailPageStore";
import Auth from "../../store/helper/Auth";

const AddAnimal = observer(() => {
  const { id } = useParams();
  let sh_id = Auth.token?.shelter_id;
  let [imageAnimalArr, setImageArr] = useState([]); //массив с данными о загружаемой картинке

  const addPhotoInput = () => {
    // переключение клика с кнопки на инпут
    document.getElementById("add-photo").click();
  };
  const getPhoto = (event) => {
    //преобразует в правильный формат картинку и создает id
    const reader = new FileReader();
    reader.onload = (ev) => {
      setImageArr([
        ...imageAnimalArr,
        { src: ev.target.result, id: makeId(6) },
      ]); //перезаписывает массив
      console.log("add img");
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  function makeId(length) {
    //генерирует id
    let result = "";
    let characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  useEffect(() => {
    //обновляет массив картинок
    console.log(imageAnimalArr);
  }, [imageAnimalArr]);

  // const addImage = ((event) => {
  //     event.stopPropagation();
  //     // event.preventDefault();
  //     console.log('add img');
  //     const edit_card_wrapId = document.getElementById('edit_card_wrapId');
  //     edit_card_wrapId.style.display = 'block';
  //     console.log('edit_card_wrapId', edit_card_wrapId);
  // });

  const deleteImage = (event, idAnim) => {
    //удаляет картинку
    event.stopPropagation();
    event.preventDefault();
    const newArr = imageAnimalArr.filter((item) => item.id !== idAnim);
    console.log(newArr);
    setImageArr(newArr);

    console.log("del image");
  };

  const handleSubmitForm = action(async (e) => {
    e.preventDefault();
    console.log("submit form");
    const formData = {
      name: "",
      gender: "male",
      phone_number: "89876543210",
      href: "string",
      description: "string",
      animal_type_id: 2,
      shelter_id: sh_id,
    };
    /*const formData = new FormData(e.CurrentTarget);*/

    try {
      DetailPageStore.fetchInsert(formData);
    } catch (error) {
      console.error("Error ", error);
      throw error;
    }
  });

  return (
    <div className={style.container}>
      <div className={style.addAnimal}>
        <Header />
        <ComeBack path={"/admin"} />
        <div className={style.addAnimal__title_wrap}>
          {id === undefined ? (
            <Title title="Добавить животное" />
          ) : (
            <Title title="Изменить данные" />
          )}
        </div>
        <form className={style.form} onSubmit={handleSubmitForm}>
          <div className={style.form__main}>
            <Input
              name="name"
              labelName="Имя"
              inpType="text"
              placeholder="Имя"
            />
            <Select
              options="type"
              labelName="Тип"
              inpType="text"
              placeholder="Выбрать"
            />
            <Select
              options="sex"
              labelName="Пол (Мальчик/Девочка)"
              inpType="text"
              placeholder="Выбрать"
            />
            <Select
              options="color"
              labelName="Окрас"
              inpType="text"
              placeholder="Выбрать"
            />
            <Input
              name="tel"
              labelName="Телефон для связи"
              inpType="text"
              placeholder="Телефон"
            />
            <Input
              name="link"
              labelName="Ссылка для связи с куратором"
              inpType="text"
              placeholder="Ссылка"
            />
            <Textarea
              labelName="Описание"
              inpType="text"
              placeholder="Описание"
            />
            <div className={style.form__addDelFile_wrap}>
              <span className={style.form__countFile}>
                Фотографии (от 1 до 10)
              </span>
              <input
                onChange={(ev) => getPhoto(ev)}
                id="add-photo"
                accept="image/*"
                type="file"
                className={style.form__inputFileHidden}
              />
              <div className={style.form__btns_wrap}>
                <Button
                  btnName="Загрузить фото"
                  img="clip"
                  onClick={() => addPhotoInput()}
                />
                <Button
                  btnName="Удалить фото"
                  img="basket"
                  onClick={(event) => deleteImage(event)}
                />
              </div>
            </div>
            {/*<div className={style.addAnimal__files_wrap}>*/}
            {/*    {imageAnimalArr.length !== 0 ?*/}
            {/*        imageAnimalArr.map(({ src, id }) => <AddImage srcImage={src} id={id} key={id} deleteImage={deleteImage} />) :*/}
            {/*        null*/}
            {/*    }*/}
            {/*</div>*/}
            {/*<div id='edit_card_wrapId' className={`${style.form__btns_wrap} ${style.edit_card_wrap}`}>*/}
            {/*    <Button className={style.edit_card} btnName='Скрыть карточку' />*/}
            {/*    <Button btnName='Удалить карточку' />*/}
            {/*</div>*/}
          </div>
          <Button
            btnName="Добавить"
            colorBtn="red"
            typeBtn="middle"
            submit="submit"
          />
        </form>
      </div>
    </div>
  );
});

export default AddAnimal;
