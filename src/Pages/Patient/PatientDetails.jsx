import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router";
import Button from "@mui/material/Button";
import {
    deletePatient,
    setSelectedOption,
} from "../../Features/Patient/PatientSlice";
import AddPatient from "./AddPatient";

const PatientDetails = () => {
    const { patientId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const { patients, status, selectedOption } = useSelector(
        (state) => state.patient
    );

    const currentPatient = patients?.find(
        (patient) => patient._id === patientId
    );

    useEffect(() => {
        console.log(location.pathname.includes("patient-details"));
    }, [location]);

    return (
        <div className="patient-details-wrapper">
            <h2>Patient Details</h2>
            <table>
                <tr>
                    <th>Name</th>
                    <td>{currentPatient?.name}</td>
                </tr>
                <tr>
                    <th>Age</th>
                    <td>{currentPatient?.age}</td>
                </tr>
                <tr>
                    <th>Gender</th>
                    <td>{currentPatient?.gender}</td>
                </tr>
                <tr>
                    <th>Phone</th>
                    <td>{currentPatient?.phone}</td>
                </tr>
                <tr>
                    <th>Address</th>
                    <td>{currentPatient?.address}</td>
                </tr>
                <tr>
                    <th>Assigned Ward</th>
                    <td>{currentPatient?.assignedWard}</td>
                </tr>
            </table>
            <div className="action-btns">
                <AddPatient patient={currentPatient} />
                {/* <Button
                    variant="contained"
                    color="primary"
                    sx={{ marginTop: "1rem" }}
                    onClick={() => dispatch(setSelectedOption("edit"))}
                >
                    Edit
                </Button> */}
                <Button
                    variant="contained"
                    color="error"
                    sx={{ marginTop: "1rem" }}
                    onClick={async () => {
                        await dispatch(deletePatient(currentPatient._id));
                        if (status !== "loading") {
                            navigate("/");
                        }
                    }}
                >
                    {status === "loading" ? "Loading..." : "Delete"}
                </Button>
            </div>
            <Button
                variant="contained"
                sx={{ marginTop: "1rem" }}
                onClick={() => navigate("/")}
            >
                Back
            </Button>
        </div>
    );
};

export default PatientDetails;
