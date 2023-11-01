import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPatient } from "../../Features/Patient/PatientSlice";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import { MenuItem } from "@mui/material";
import { useLocation } from "react-router";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    borderRadius: "8px",
    color: "#000",
    p: 4,
    "@media (max-width: 768px)": {
        width: 300,
    },
};

const AddPatient = ({ patient }) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { wards } = useSelector((state) => state.ward);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const locationEdit = location.pathname.includes("patient-details");

    const [assignedWard, setAssignedWard] = useState(
        patient ? patient.assignedWard : ""
    );

    const currWard = wards.find((ward) => assignedWard === ward.name);
    const [newPatient, setNewPatient] = useState({
        name: patient ? patient.name : "",
        age: patient ? patient.age : "",
        gender: patient ? patient.gender : "",
        phone: patient ? patient.phone : "",
        address: patient ? patient.address : "",
        medicalHistory: patient ? patient.medicalHistory : "",
        assignedWardId: currWard,
        assignedWard: assignedWard,
    });

    const newPatient1 = {
        name: newPatient.name,
        age: newPatient.age,
        gender: newPatient.gender,
        phone: newPatient.phone,
        address: newPatient.address,
        medicalHistory: newPatient.medicalHistory,
        assignedWardId: currWard?._id,
        assignedWard,
    };

    const condition =
        newPatient1.name === "" ||
        newPatient1.age === "" ||
        newPatient1.gender === "" ||
        newPatient1.phone === "" ||
        newPatient1.address === "" ||
        newPatient1.medicalHistory === "" ||
        newPatient1.assignedWard === "";

    const handleSubmit = () => {
        if (condition) {
            alert("Kindly please fill in all the details");
        } else if (currWard.patients.length >= currWard.capacity) {
            alert(
                "Selected ward's capacity is already reached!, We can not register patient due to unavailibility of bed."
            );
            handleClose();
        } else {
            dispatch(addPatient(newPatient1));
            handleClose();
        }
    };

    return (
        <div>
            {locationEdit ? (
                <Button
                    variant="contained"
                    onClick={handleOpen}
                    color="primary"
                    sx={{ marginTop: "1rem" }}
                >
                    Edit
                </Button>
            ) : (
                <Button variant="contained" onClick={handleOpen} color="info">
                    <AddCircleRoundedIcon sx={{ marginRight: "4px" }} />
                    Add Patient
                </Button>
            )}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                    >
                        {locationEdit
                            ? "Edit patient details"
                            : "Register Patient"}
                    </Typography>
                    <hr />
                    <Typography
                        id="modal-modal-description"
                        sx={{
                            mt: 2,
                            display: "flex",
                            flexDirection: "column",
                            gap: "1rem",
                        }}
                        component="div"
                    >
                        <div className="modal_input">
                            <label htmlFor="address1">Name:</label>
                            <TextField
                                id="outlined-required"
                                label="Name"
                                variant="outlined"
                                required
                                size="small"
                                value={newPatient.name}
                                onChange={(e) =>
                                    setNewPatient((prev) => ({
                                        ...prev,
                                        name: e.target.value,
                                    }))
                                }
                                sx={{ width: "50%" }}
                            />
                        </div>
                        <div className="modal_input">
                            <label htmlFor="address1">Age:</label>
                            <TextField
                                id="outlined-required"
                                label="Age"
                                variant="outlined"
                                required
                                size="small"
                                type="number"
                                value={newPatient.age}
                                onChange={(e) =>
                                    setNewPatient((prev) => ({
                                        ...prev,
                                        age: e.target.value,
                                    }))
                                }
                                sx={{ width: "50%" }}
                            />
                        </div>
                        <div className="modal_input">
                            <label htmlFor="address1">Gender:</label>
                            <TextField
                                id="outlined-required"
                                select
                                label="Gender"
                                variant="outlined"
                                required
                                size="small"
                                value={newPatient.gender}
                                onChange={(e) =>
                                    setNewPatient((prev) => ({
                                        ...prev,
                                        gender: e.target.value,
                                    }))
                                }
                                sx={{ width: "50%" }}
                            >
                                <MenuItem value="Male">Male</MenuItem>
                                <MenuItem value="Female">Female</MenuItem>
                            </TextField>
                        </div>

                        <div className="modal_input">
                            <label htmlFor="address1">Phone:</label>
                            <TextField
                                id="outlined-required"
                                label="Phone"
                                variant="outlined"
                                required
                                size="small"
                                value={newPatient.phone}
                                type="number"
                                onChange={(e) =>
                                    setNewPatient((prev) => ({
                                        ...prev,
                                        phone: e.target.value,
                                    }))
                                }
                                sx={{ width: "50%" }}
                            />
                        </div>
                        <div className="modal_input">
                            <label htmlFor="address1">Address:</label>
                            <TextField
                                id="outlined-required"
                                label="Address"
                                variant="outlined"
                                required
                                size="small"
                                value={newPatient.address}
                                onChange={(e) =>
                                    setNewPatient((prev) => ({
                                        ...prev,
                                        address: e.target.value,
                                    }))
                                }
                                sx={{ width: "50%" }}
                            />
                        </div>
                        <div className="modal_input">
                            <label htmlFor="address1">Medical History:</label>
                            <TextField
                                id="outlined-required"
                                label="Medical History"
                                variant="outlined"
                                required
                                size="small"
                                value={newPatient.medicalHistory}
                                onChange={(e) =>
                                    setNewPatient((prev) => ({
                                        ...prev,
                                        medicalHistory: e.target.value,
                                    }))
                                }
                                sx={{ width: "50%" }}
                            />
                        </div>
                        <div className="modal_input">
                            <label htmlFor="address1">Assigned Ward:</label>
                            <TextField
                                id="outlined-required"
                                select
                                label="Assigned Ward"
                                variant="outlined"
                                required
                                size="small"
                                value={assignedWard}
                                onChange={(e) =>
                                    setAssignedWard(e.target.value)
                                }
                                sx={{ width: "50%" }}
                            >
                                {wards.map((ward) => (
                                    <MenuItem value={ward.name} key={ward._id}>
                                        {ward.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </div>
                    </Typography>
                    <Typography
                        id="modal-modal-footer"
                        sx={{ mt: 2, display: "flex", gap: "1rem" }}
                        component="div"
                    >
                        <Button
                            variant="outlined"
                            color="error"
                            size="small"
                            onClick={handleClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="outlined"
                            color="success"
                            size="small"
                            onClick={() => {
                                handleSubmit();
                            }}
                        >
                            Add
                        </Button>
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
};

export default AddPatient;
