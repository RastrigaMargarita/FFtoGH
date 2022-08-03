import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { observer } from "mobx-react";
import DetailPageStore from "../../store/DetailPageStore";
import AllPetsStore from "../../store/AllPetsStore";
import ModalPopupUni from "../../components/ModalPopupUni"
import { RobotIcon, Chain, ChainRotated } from '../../components/SVG';
import Popup from "./Popup";
import { Back, Loader, PetPhotos } from "../../components";
import { ShareLink, Telephone } from "../../components/SVG";
import { FavoriteBorder, Favorite, AlignHorizontalCenter } from "@mui/icons-material/";
import { Container } from "@mui/material";
import { FEMALE, MALE } from "../../components/SVG";
import { NotFoundPet } from "../../pages";
import { style } from "@mui/system";

const DetailPage = observer(() => {
    const { id } = useParams();
    const [, setCookie] = useCookies(["myLikePets"]);
    const [ModalActive, setModalActive] = useState(false);
    const [ContentPopup = "", setContentPopup] = useState(false);
    const AIMessage = <><div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0px 0px 16px 0px'
    }}><RobotIcon /></div>
        <p>
            ИИ&nbsp;&mdash; Искусственный Интеллект, разра- ботанный нашей командой. Распознаёт породы кошек и&nbsp;собак. Большинство животных- метисы, ИИ&nbsp;бывает сложно определить породу, поэтому он&nbsp;выдаёт топ-3 схожих на&nbsp;неё.<br />
        </p></>;

    const ShareMessage = <>

        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',

        }}><Chain />
            <ChainRotated />
            <p className="HoverText" onClick={() => {
                navigator.clipboard.writeText(window.location.href)
            }}>
                &nbsp;&nbsp;Копировать ссылку
            </p>
        </div></>;

    useEffect(() => {
        (async () => {
            await DetailPageStore.fetchInfo(id);
        })();
    }, [id]);

    const images = DetailPageStore.images;

    return (

        <>

            {DetailPageStore.isLoading ? (
                <Container className='loader-container'><Loader /></Container>
            ) : (!DetailPageStore.petInfo) ?
                <NotFoundPet /> : (
                    <Container maxWidth="xs" className="DetailPets">
                        <Back />
                        <Popup>
                            <PetPhotos images={images} />
                        </Popup>
                        <div className="card__about">
                            <div
                                className="card__photo--like"
                                onClick={async () => {
                                    AllPetsStore.toggleMyLike(id);
                                    setCookie("myLikePets", AllPetsStore.likesPetsArr, { path: '/' });
                                }}
                            >
                                {AllPetsStore.likesPetsArr.includes(+id) ? (
                                    <Favorite />
                                ) : (
                                    <FavoriteBorder />
                                )}
                            </div>
                            <div className="card__about--name">
                                {DetailPageStore.petInfo.name}
                            </div>
                            <div className="card__about__col">
                                <div className="card__about__col--first">
                                    <div className="card__about--item">
                                        <div className="card__about--icon">
                                            {DetailPageStore.petInfo.gender === "male" ? (
                                                <MALE />
                                            ) : (
                                                <FEMALE />
                                            )}
                                        </div>
                                        <span className="card__about--iconName">
                                            {DetailPageStore.petInfo.gender === "male"
                                                ? "Мальчик"
                                                : "Девочка"}
                                        </span>
                                    </div>
                                    <div className="card__about--item">
                                        <div className="card__about--icon">
                                            <Telephone />
                                        </div>
                                        <div className="card__about--iconName">
                                            <a href={`tel:${DetailPageStore.petInfo.number}`}>
                                                {DetailPageStore.petInfo.number}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="card__about__col--second">
                                    <a
                                        href={DetailPageStore.shelter_link}
                                        target="_blank"
                                        rel="noreferrer"
                                        onClick={() => window.ym(89132299, 'reachGoal', 'ToShelter')}
                                    >
                                        <img
                                            src={DetailPageStore.petInfo.shelter_logo}
                                            alt="лого приюта"
                                        />
                                    </a>
                                </div>
                            </div>
                            <div className="card__about__breeds">
                                <div className="card__about__breeds--discription">
                                    <div>
                                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M25 6H17V2C17 1.73478 16.8946 1.48043 16.7071 1.29289C16.5196 1.10536 16.2652 1 16 1C15.7348 1 15.4804 1.10536 15.2929 1.29289C15.1054 1.48043 15 1.73478 15 2V6H7C5.94015 6.0033 4.92465 6.42578 4.17521 7.17521C3.42578 7.92465 3.0033 8.94015 3 10V24C3.0033 25.0599 3.42578 26.0754 4.17521 26.8248C4.92465 27.5742 5.94015 27.9967 7 28H25C26.0599 27.9967 27.0754 27.5742 27.8248 26.8248C28.5742 26.0754 28.9967 25.0599 29 24V10C28.9967 8.94015 28.5742 7.92465 27.8248 7.17521C27.0754 6.42578 26.0599 6.0033 25 6V6ZM9 13.5C9 13.2033 9.08797 12.9133 9.2528 12.6666C9.41762 12.42 9.65189 12.2277 9.92597 12.1142C10.2001 12.0006 10.5017 11.9709 10.7926 12.0288C11.0836 12.0867 11.3509 12.2296 11.5607 12.4393C11.7704 12.6491 11.9133 12.9164 11.9712 13.2074C12.0291 13.4983 11.9994 13.7999 11.8858 14.074C11.7723 14.3481 11.58 14.5824 11.3334 14.7472C11.0867 14.912 10.7967 15 10.5 15C10.1022 15 9.72064 14.842 9.43934 14.5607C9.15804 14.2794 9 13.8978 9 13.5ZM12.5 23H11.5C10.9696 23 10.4609 22.7893 10.0858 22.4142C9.71071 22.0391 9.5 21.5304 9.5 21C9.5 20.4696 9.71071 19.9609 10.0858 19.5858C10.4609 19.2107 10.9696 19 11.5 19H12.5V23ZM17.5 23H14.5V19H17.5V23ZM20.5 23H19.5V19H20.5C21.0304 19 21.5391 19.2107 21.9142 19.5858C22.2893 19.9609 22.5 20.4696 22.5 21C22.5 21.5304 22.2893 22.0391 21.9142 22.4142C21.5391 22.7893 21.0304 23 20.5 23ZM21.5 15C21.2033 15 20.9133 14.912 20.6666 14.7472C20.42 14.5824 20.2277 14.3481 20.1142 14.074C20.0007 13.7999 19.9709 13.4983 20.0288 13.2074C20.0867 12.9164 20.2296 12.6491 20.4393 12.4393C20.6491 12.2296 20.9164 12.0867 21.2074 12.0288C21.4983 11.9709 21.7999 12.0006 22.074 12.1142C22.3481 12.2277 22.5824 12.42 22.7472 12.6666C22.912 12.9133 23 13.2033 23 13.5C23 13.8978 22.842 14.2794 22.5607 14.5607C22.2794 14.842 21.8978 15 21.5 15Z"
                                                fill="#80CFCE" />
                                        </svg>
                                    </div>
                                    <div className="card__about__breeds--discriptiontext"><span>На основе визуального анализа наш ИИ говорит, что:</span>
                                    </div>
                                    <div onClick={() => {
                                        setContentPopup(AIMessage)
                                        setModalActive(true)
                                    }} className="card__about__breeds--discriptionquestion">
                                        <svg width="14" height="23" viewBox="0 0 14 23" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M4.97 13.9C4.97 13.14 5.17 12.46 5.57 11.86C5.97 11.24 6.62 10.55 7.52 9.79C8.24 9.17 8.8 8.63 9.2 8.17C9.62 7.71 9.83 7.17 9.83 6.55C9.83 5.79 9.58 5.18 9.08 4.72C8.6 4.24 7.89 4 6.95 4C6.09 4 5.39 4.24 4.85 4.72C4.33 5.18 4.07 5.84 4.07 6.7H0.05C0.05 5.88 0.22 5.11 0.56 4.39C0.92 3.65 1.4 3 2 2.44C2.62 1.88 3.35 1.44 4.19 1.12C5.03 0.799999 5.95 0.64 6.95 0.64C8.03 0.64 8.99 0.789999 9.83 1.09C10.69 1.37 11.42 1.77 12.02 2.29C12.62 2.81 13.07 3.42 13.37 4.12C13.69 4.82 13.85 5.58 13.85 6.4C13.85 6.94 13.8 7.43 13.7 7.87C13.6 8.31 13.43 8.73 13.19 9.13C12.97 9.53 12.67 9.94 12.29 10.36C11.91 10.76 11.45 11.2 10.91 11.68C10.45 12.08 10.09 12.42 9.83 12.7C9.57 12.96 9.37 13.2 9.23 13.42C9.11 13.62 9.03 13.81 8.99 13.99C8.95 14.15 8.93 14.32 8.93 14.5V15.1H4.97V13.9ZM6.95 22.36C6.25 22.36 5.65 22.11 5.15 21.61C4.65 21.11 4.4 20.51 4.4 19.81C4.4 19.07 4.65 18.46 5.15 17.98C5.65 17.5 6.25 17.26 6.95 17.26C7.65 17.26 8.25 17.5 8.75 17.98C9.25 18.46 9.5 19.07 9.5 19.81C9.5 20.51 9.25 21.11 8.75 21.61C8.25 22.11 7.65 22.36 6.95 22.36Z"
                                                fill="#F48070" />
                                        </svg>
                                    </div>

                                </div>
                                <div className="card__about__breeds--percents_breeds">
                                    {Object.keys(DetailPageStore.probability).map(item =>
                                        <div className="card__about__breeds--percent_breed">
                                            <span>на</span>
                                            <div className="percents">
                                                <span
                                                    id={DetailPageStore.probability[item].id}>{DetailPageStore.probability[item][1]}%</span>
                                            </div>
                                            <span>это</span>
                                            <div className="breeds">
                                                <span>{DetailPageStore.probability[item][0]}</span>
                                            </div>
                                        </div>)}
                                </div>
                            </div>
                            <div className="card__line" />
                            <div className="card__about--description">
                                {DetailPageStore.petInfo.description}
                            </div>

                            <ModalPopupUni open={ModalActive} setOpen={setModalActive} contentInfo={ContentPopup} />

                            <div className="card__about--share">
                                <div />
                                <div onClick={() => {
                                    setContentPopup(ShareMessage)
                                    setModalActive(true)
                                }
                                } className="card__about--shareimage">
                                    <ShareLink />
                                </div>
                            </div>


                            <a
                                className="card__button"
                                href={DetailPageStore.petInfo.hyperlink}
                                target="_blank"
                                rel="noreferrer"
                                onClick={() => window.ym(89132299, 'reachGoal', 'writeCurator')}
                            >
                                Написать куратору
                            </a>
                        </div>
                    </Container>
                )
            }
        </>
    );
});

export default DetailPage;
