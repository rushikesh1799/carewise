import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";

const PatientsList = () => {
    const patientState = useSelector((state) => state.patient);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        console.log(patientState);
    }, []);

    return (
        <div>
            <h2>Patients</h2>
            {patientState?.patients.map((patient) => (
                <div
                    key={patient?._id}
                    className="patient-wrapper"
                    onClick={() =>
                        navigate(`patient-details/${patient._id}`, {
                            state: location,
                        })
                    }
                >
                    {patient?.name}
                </div>
            ))}
        </div>
    );
};

export default PatientsList;
