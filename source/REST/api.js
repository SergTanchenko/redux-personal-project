import { MAIN_URL, TOKEN } from "./config";

export const api = {
    tasks: {
        fetch () {
            return fetch(`${MAIN_URL}/`, {
                method:  "GET",
                headers: {
                    Authorization: TOKEN,
                },
            });
        },

        create (taskMessage) {
            return fetch(`${MAIN_URL}/`, {
                method:  "POST",
                headers: {
                    Authorization:  TOKEN,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message: taskMessage }),
            });
        },
    },
};
