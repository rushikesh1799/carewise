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
                    id: response.data.data.assignedWardId,
                    patient: response.data.data,
                })
            );
            return response.data.data;
        }
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

        if (response.status === 200) {
            return response.data.data;
        }
    }
);

const initialState = {
    patients: [],
    patientDetails: {},
    status: "idle",
    error: null,
};

export const patientSlice = createSlice({
    name: "patients",
    initialState,
    reducers: {},
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
            });
    },
});

export default patientSlice.reducer;
