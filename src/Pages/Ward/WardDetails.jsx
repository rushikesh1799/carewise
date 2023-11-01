import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { deleteWard, fetchWards } from "../../Features/Ward/WardSlice";

const WardDetails = () => {
    const { wardId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { wards, status } = useSelector((state) => state.ward);

    const currentWard = wards?.find((ward) => ward._id === wardId);

    return (
        <div className="patient-details-wrapper">
            <h2>Ward Details</h2>
            <table>
                <tr>
                    <th>Name</th>
                    <td>{currentWard?.name}</td>
                </tr>
                <tr>
                    <th>Capacity</th>
                    <td>{currentWard?.capacity}</td>
                </tr>
                <tr>
                    <th>Specialization</th>
                    <td>{currentWard?.specialization}</td>
                </tr>
                <tr>
                    <th>Current Occupancy</th>
                    <td>{currentWard?.patients.length}</td>
                </tr>
            </table>
            <div className="action-btns">
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ marginTop: "1rem" }}
                    onClick={() => navigate("/")}
                >
                    Edit
                </Button>
                <Button
                    variant="contained"
                    color="error"
                    sx={{ marginTop: "1rem" }}
                    onClick={async () => {
                        await dispatch(deleteWard(currentWard._id));
                        if (status !== "loading") {
                            navigate("/wards");
                        }
                    }}
                >
                    {status === "loading" ? "Loading..." : "Delete"}
                </Button>
            </div>
            <Button
                variant="contained"
                sx={{ marginTop: "1rem" }}
                onClick={() => navigate("/wards")}
            >
                Back
            </Button>
        </div>
    );
};

export default WardDetails;
