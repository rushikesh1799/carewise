import { configureStore } from "@reduxjs/toolkit";
import PatientSlice from "../Patient/PatientSlice";
import WardSlice from "../Ward/WardSlice";

export default configureStore({
    reducer: {
        patient: PatientSlice,
        ward: WardSlice,
    },
});
