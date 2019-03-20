/* Setup files module.
 **
 ** This module will be executed before each test.
 **
 ** This module contains a code to configure or set up the
 ** testing environment before each test. Since every test
 ** runs in its own environment, these scripts will be
 ** executed in the testing environment immediately before
 ** executing the test code itself.
 **
 ** This module excutes before setupFramework module.
 **
 */

global.__ENV__ = global.__PROD__ = process.env.NODE_ENV;

const errorMessage = "TEST_ERROR_MESSAGE";
const error = new Error(errorMessage);

const mockedTask = {
    id:        "5c92a92c1ec3ce8659b3197e",
    message:   "sort tasks by date",
    completed: true,
    favorite:  false,
    created:   "2019-03-20T20:57:16.767Z",
};

const responseDataSuccess = {
    data:    mockedTask,
    message: "TEST_SUCCESS_MESSAGE",
};

const responseDataFail = {
    message: errorMessage,
};

const fetchResponseSuccess = {
    status: 200,
    json:   jest.fn(() => Promise.resolve(responseDataSuccess)),
};

const fetchResponseFail400 = {
    status: 400,
    json:   jest.fn(() => Promise.resolve(responseDataFail)),
};

global.__ = {
    mockedTask,
    error,
    fetchResponseSuccess,
    fetchResponseFail400,
};
