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
        delete (taskId) {
            return fetch(`${MAIN_URL}/${taskId}`, {
                method:  "DELETE",
                headers: {
                    Authorization: TOKEN,
                },
            });
        },
        update (task) {
            return fetch(`${MAIN_URL}/`, {
                method:  "PUT",
                headers: {
                    Authorization:  TOKEN,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify([task]),
            });
        },
        updateBulk (tasks) {
            return fetch(`${MAIN_URL}/`, {
                method:  "PUT",
                headers: {
                    Authorization:  TOKEN,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(tasks),
            });
        },
    },
};
