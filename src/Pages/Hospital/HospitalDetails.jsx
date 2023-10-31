import React from "react";
import { useSelector } from "react-redux";

const HospitalDetails = () => {
    const { patients } = useSelector((state) => state.patient);
    const { wards } = useSelector((state) => state.ward);

    const totalBeds = wards.reduce((acc, curr) => acc + curr.capacity, 0);
    const occupancyRate = (patients.length / totalBeds) * 100;

    return (
        <div>
            <h2>Hospital</h2>
            <p>Total patients: {patients.length}</p>
            <p>Total Wards: {wards.length}</p>
            <p>Total Beds: {totalBeds}</p>
            <p>Occupancy Rate: {Math.ceil(occupancyRate)}%</p>
        </div>
    );
};

export default HospitalDetails;
