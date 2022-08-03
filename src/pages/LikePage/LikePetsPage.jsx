import {Back, LikeCount, Loader, PetsCard} from "../../components";
import {useCookies} from "react-cookie";
import {NotLike, Trash} from "../../components/SVG";
import {toJS} from "mobx";
import React, {useEffect} from "react";
import LikePetsStore from "../../store/LikePetsStore";
import {observer} from "mobx-react";
import AllPetsStore from "../../store/AllPetsStore";

const LikePetsPage =  observer(() => {
    const [cookies, , removeCookie] = useCookies(["myLikePets"]);
    // const [likePets, setLikePets] = useState([]);

    useEffect(() => {
        //Нужны ли здесь async await???
        (async () => {
            await LikePetsStore.fetchLikeArrPets(cookies.myLikePets); // отправляем запрос
            // setLikePets(LikePetsStore.likePets); // Читаем значения ключей json файла от сервера
            AllPetsStore.setLikePets(cookies.myLikePets ?? []);
        })();
    }, [cookies.myLikePets, LikePetsStore.likePets]);

    return (
        <>
            <Back/>
            <div className="LikePage__likeCount">
        <span>
          {cookies.myLikePets?.length > 0 ? "Вот кого ты лайкнул" : "Тут пока никого нет"}
        </span>
                <LikeCount/>
            </div>

            {cookies.myLikePets?.length > 0 ?
                LikePetsStore.isLoading ? (
                    <Loader/>
                ) : (
                    <>
                        <div
                            className="LikePage__trash"
                            onClick={() => {
                                removeCookie("myLikePets", { path: '/' });
                            }}
                        >
                            <span>Удалить все лайки</span>
                            <Trash/>
                        </div>
                        {Object.values(LikePetsStore.likePets).map((p) => (
                            <PetsCard p={toJS(p)} key={p.id}/>
                        ))}
                    </>
                ) : (
                    <NotLike/>
                )}
        </>
    );
});

export default LikePetsPage;
