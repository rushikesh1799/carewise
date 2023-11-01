import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { fetchPatients } from "../../Features/Patient/PatientSlice";
import AddPatient from "./AddPatient";
import { Button } from "@mui/material";

const PatientsList = () => {
    const patientState = useSelector((state) => state.patient);
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPatients());
    }, [dispatch]);

    return (
        <div className="patients-list-wrapper">
            <h2>Patients</h2>
            <AddPatient />
            <table className="patients-list-table">
                <tr>
                    <th>Patient Name</th>
                    <th>Assigned Ward</th>
                    <th>Details</th>
                </tr>
                {patientState?.patients.map((patient) => (
                    <tr key={patient?._id} className="patient-wrapper">
                        <td>{patient.name}</td>
                        <td>{patient.assignedWard}</td>
                        <td>
                            <Button
                                variant="contained"
                                color="success"
                                size="small"
                                onClick={() =>
                                    navigate(`patient-details/${patient._id}`, {
                                        state: location,
                                    })
                                }
                            >
                                Info
                            </Button>
                        </td>
                    </tr>
                ))}
            </table>
        </div>
    );
};

export default PatientsList;
