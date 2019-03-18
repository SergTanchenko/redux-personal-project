import { combineForms } from "react-redux-form";

export const formsReducer = combineForms(
    {
        addTask: {
            newTask: "",
        },
    },
    "forms"
);
