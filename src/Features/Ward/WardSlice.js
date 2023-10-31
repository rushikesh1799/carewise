import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchWards = createAsyncThunk("wards/fetchWard", async () => {
    const response = await axios.get(
        "https://patientsync-backend-api.rushikeshbunge1.repl.co/ward" // Assuming you have a Ward API
    );
    console.log(response);
    if (response.status === 201) {
        return response.data.wards;
    }
});

export const fetchWardDetails = createAsyncThunk(
    "wards/fetchWardDetails",
    async (id) => {
        const response = await axios.get(
            `https://patientsync-backend-api.rushikeshbunge1.repl.co/ward/${id}` // Update API endpoint
        );

        if (response.status === 201) {
            return response.data.data;
        }
    }
);

export const addWard = createAsyncThunk("wards/addWard", async (newWard) => {
    const response = await axios.post(
        "https://patientsync-backend-api.rushikeshbunge1.repl.co/ward", // Update API endpoint
        newWard
    );

    if (response.status === 201) {
        return response.data.data;
    }
});

export const updateWard = createAsyncThunk(
    "wards/updateWard",
    async ({ id, updatedData }) => {
        const response = await axios.put(
            `https://patientsync-backend-api.rushikeshbunge1.repl.co/ward/${id}`, // Update API endpoint
            updatedData
        );

        if (response.status === 201) {
            return response.data.data;
        }
    }
);

export const deleteWard = createAsyncThunk("wards/deleteWard", async (id) => {
    const response = await axios.delete(
        `https://patientsync-backend-api.rushikeshbunge1.repl.co/ward/${id}` // Update API endpoint
    );

    if (response.status === 201) {
        return response.data.data;
    }
});

export const addPatientToWard = createAsyncThunk(
    "wards/addPatientToWard",
    async ({ id, patient }) => {
        console.log("worked", id, patient);
        const response = await axios.post(
            `https://patientsync-backend-api.rushikeshbunge1.repl.co/ward/${id}/patient`,
            patient
        );

        if (response.status === 201) {
            console.log("response");
        }
    }
);

const initialState = {
    wards: [],
    wardDetails: {},
    status: "idle",
    error: null,
};

export const wardSlice = createSlice({
    name: "wards",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchWards.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchWards.fulfilled, (state, action) => {
                state.status = "success";
                state.wards = action.payload;
            })
            .addCase(fetchWards.rejected, (state, action) => {
                state.status = "idle";
                state.error = action.error.message;
            });
    },
});

export default wardSlice.reducer;
