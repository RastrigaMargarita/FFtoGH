import React, {useEffect} from "react";
import {Routes, Route, Navigate} from "react-router-dom";
import {
    AnimalType,
    BeginPage,
    DetailPage,
    GenderFilter,
    LikePetsPage,
    LoadPage,
    PetsPage,
    Team,
    NotFoundPage,
    SheltersPage,
} from "./pages";
import {ComponentWithHeader} from "./components";
import AuthPage from "./pages/AuthPage/AuthPage";
import AdminPage from "./pages/AdminPage/AdminPage";
import AddAnimal from "./pages/AddAnimal/AddAnimal";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import Auth from "./store/helper/Auth";
import {observer} from "mobx-react";
import EditPage from "./pages/EditPage/EditPage";

const App = observer(() => {
    let token = Auth.token

    const getToken = async () => {
        token = await Auth.getTokenFromRefresh()
    }

    useEffect(() => {
        getToken().then()
    });

    return (
        <>
            <Routes>
                <Route path="/" element={<BeginPage/>}/>
                <Route path="/registration" element={<RegistrationPage title="Смена пароля"/>}/>
                <Route path="/login" element={token ? <Navigate to="/admin" replace/> : <AuthPage/>}/>
                <Route path="/edit" element={<EditPage />} />
                <Route path="/type" element={<AnimalType/>}/>
                <Route path="/gender" element={<GenderFilter/>}/>
                <Route path="/loadpage" element={<LoadPage/>}/>
                <Route path="/team" element={<Team/>}/>

                <Route path="/" element={<ComponentWithHeader/>}>
                    <Route path="pets/" element={<PetsPage/>}/>
                    <Route path="pets/:id" element={<DetailPage/>}/>
                    <Route path="pets/liked" element={<LikePetsPage/>}/>
                    <Route path="admin/pets" element={token ? <SheltersPage/> : <Navigate to="/login" replace/>}/>
                    <Route path="admin/add" element={token ? <AddAnimal /> : <Navigate to="/login" replace />} />
                    <Route path="admin/edit/:id" element={token ? <AddAnimal/> : <Navigate to="/login" replace/>}/>
                    <Route path="admin" element={token ? <AdminPage/> : <Navigate to="/login" replace/>}/>
                </Route>
                <Route path="*" element={<NotFoundPage/>}/>
            </Routes>
        </>
    );
});

export default App;
