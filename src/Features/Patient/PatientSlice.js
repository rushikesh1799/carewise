import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addPatientToWard } from "../Ward/WardSlice";

export const fetchPatients = createAsyncThunk(
    "patients/fetchPatient",
    async () => {
        const response = await axios.get(
            "https://patientsync-backend-api.rushikeshbunge1.repl.co/patient"
        );
        if (response.status === 201) {
            return response.data.patients;
        }
    }
);

export const fetchPatientDetails = createAsyncThunk(
    "patients/fetchPatientDetails",
    async (id) => {
        const response = await axios.get(
            `https://patientsync-backend-api.rushikeshbunge1.repl.co/patient/${id}`
        );

        // console.log(response.data.data);
        if (response.status === 201) {
            return response.data.patient;
        }
    }
);

export const addPatient = createAsyncThunk(
    "patients/addPatient",
    async (newPatient, { dispatch }) => {
        const response = await axios.post(
            "https://patientsync-backend-api.rushikeshbunge1.repl.co/patient",
            newPatient
        );

        if (response.status === 201) {
            dispatch(
                addPatientToWard({
                    id: response.data.patient.assignedWardId,
                    patient: response.data.patient,
                })
            );
        }
        return response.data.patient;
    }
);

export const updatePatient = createAsyncThunk(
    "patients/updatePatient",
    async ({ id, updatedData }, { dispatch }) => {
        const response = await axios.put(
            `https://patientsync-backend-api.rushikeshbunge1.repl.co/patient/${id}`,
            updatedData
        );

        // console.log("updated", response.data.data);
        if (response.status === 200) {
            dispatch(
                addPatientToWard({
                    id: response.data.data.assignedWardId,
                    patient: response.data.data,
                })
            );
            return response.data.data;
        }
    }
);

export const deletePatient = createAsyncThunk(
    "patients/deletePatient",
    async (id) => {
        const response = await axios.delete(
            `https://patientsync-backend-api.rushikeshbunge1.repl.co/patient/${id}`
        );

        if (response.status === 201) {
            return response.data.deletedPatient;
        }
    }
);

const initialState = {
    patients: [],
    patientDetails: {},
    selectedOption: "",
    status: "idle",
    error: null,
};

export const patientSlice = createSlice({
    name: "patients",
    initialState,
    reducers: {
        setSelectedOption(state, action) {
            state.selectedOption = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPatients.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchPatients.fulfilled, (state, action) => {
                state.status = "success";
                state.patients = action.payload;
            })
            .addCase(fetchPatients.rejected, (state, action) => {
                state.status = "idle";
                state.error = action.error.message;
            })
            .addCase(fetchPatientDetails.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchPatientDetails.fulfilled, (state, action) => {
                state.status = "success";
                state.patientDetails = action.payload;
            })
            .addCase(fetchPatientDetails.rejected, (state, action) => {
                state.status = "idle";
                state.error = action.error.message;
            })
            .addCase(addPatient.pending, (state) => {
                state.status = "loading";
            })
            .addCase(addPatient.fulfilled, (state, action) => {
                state.status = "success";
                state.patients.push(action.payload);
            })
            .addCase(addPatient.rejected, (state, action) => {
                state.status = "idle";
                state.error = action.error.message;
            })
            .addCase(deletePatient.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deletePatient.fulfilled, (state, action) => {
                state.status = "success";
                state.patients = state.patients.filter(
                    (patient) => patient._id !== action.payload._id
                );
            })
            .addCase(deletePatient.rejected, (state, action) => {
                state.status = "idle";
                state.error = action.error.message;
            });
    },
});

export const { setSelectedOption } = patientSlice.actions;

export default patientSlice.reducer;
