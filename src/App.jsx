import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { Route, Routes } from "react-router";
import { useEffect } from "react";
import { fetchPatients } from "./Features/Patient/PatientSlice";
import Home from "./Pages/Home/Home";
import WardsList from "./Pages/Ward/WardsList";
import HospitalDetails from "./Pages/Hospital/HospitalDetails";
import Navbar from "./Pages/Navbar/Navbar";
import { fetchWards } from "./Features/Ward/WardSlice";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPatients());
        dispatch(fetchWards());
    }, []);

    return (
        <div className="App">
            <h1>CareWise App</h1>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/wards" element={<WardsList />}></Route>
                <Route path="/hospital" element={<HospitalDetails />}></Route>
            </Routes>
        </div>
    );
}

export default App;
