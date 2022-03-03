import * as ActionTypes from './ActionTypes';


export const studentRegister = (firstName, lastName, email, password, faculty, address, gucian) => ({
    type: ActionTypes.STUDENT_REGISTER,
    payload: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        faculty: faculty,
        address: address,
        gucian: gucian
    }
});

export const addStudent = (firstName, lastName, email, password, faculty, address, gucian) => {
    const newStudent = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        faculty: faculty,
        address: address,
        gucian: gucian
    }
    return fetch("http://localhost:9000/testApi", {
        method: "POST",
        body: JSON.stringify(newStudent),
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "same-origin",
    })
        .then(
            (response) => {
                if (response.ok) return response;
                else {
                    var error = new Error(
                        "Error " + response.status + ": " + response.statusText
                    );
                    error.response = response;
                    throw error;
                }
            },
            (error) => {
                var errMess = new Error(error.message)
                throw error;
            }
        )
        .then((response) => response.json())
        .then((response) => {
            alert("Thank you for your FeedBack\n: " + JSON.stringify(response));
        })
        .catch((error) => {
            alert("Your Feedback could not be posted\nError: " + error.message);
        });
};
