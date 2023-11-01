import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { fetchWards } from "../../Features/Ward/WardSlice";

const WardsList = () => {
    const wardState = useSelector((state) => state.ward);
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchWards());
    }, [dispatch]);

    return (
        <div>
            <h2>Wards</h2>
            {wardState?.wards.map((ward) => (
                <div
                    key={ward?._id}
                    className="ward-wrapper"
                    onClick={() =>
                        navigate(`/ward-details/${ward._id}`, {
                            state: location,
                        })
                    }
                >
                    {ward?.name}
                </div>
            ))}
        </div>
    );
};

export default WardsList;
