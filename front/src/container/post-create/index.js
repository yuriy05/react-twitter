import { useState, useReducer } from "react";

import "./index.css";

import FieldForm from "../../component/field-form";
import Grid from "../../component/grid";

import {Alert, Loader, LOAD_STATUS} from "../../component/load";

import {
    requestInitialState,
    requestReducer,
    REQUEST_ACTION_TYPE,
} from "../../util/request";

export default function Container({ onCreate, placeholder, button, id = null}) {
    const [state, dispatch] = useReducer(requestReducer, requestInitialState)
    
    const handleSubmit = (value) => {
        return sendData({ value });
    }

    const sendData = async (dataToSend) => {
        dispatch({type: REQUEST_ACTION_TYPE.PROGRESS});

        try {
            const res = await fetch("http://localhost:4000/post-create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: convertData(dataToSend),
            });

            const data = await res.json();

            if (res.ok) {
                dispatch({type: REQUEST_ACTION_TYPE.RESET});

                if (onCreate) onCreate();
            } else {
                dispatch({type: REQUEST_ACTION_TYPE.ERROR, message: data.message});
            }

        } catch(error) {
            dispatch({type: REQUEST_ACTION_TYPE.ERROR, message: error.message});
        }
    };

    const convertData = ({ value }) =>
        JSON.stringify({
            text: value,
            username: "user",
            postId: id,
        });

    return(
        <Grid>
            <FieldForm
                placeholder={placeholder}
                button={button}
                onSubmit={handleSubmit} 
            />
            {state.status === REQUEST_ACTION_TYPE.ERROR &&  (
                <Alert status={state.status} message={state.message} />
            )}
            {state.status === REQUEST_ACTION_TYPE.PORGRESS && <Loader/>}
        </Grid>
    );
} 