var axios = require("axios");
var MockAdapter = require("axios-mock-adapter");
import { USER_SERVER } from "../components/utils/config";
import { loginUser } from "../actions/auth_actions";
var mock = new MockAdapter(axios);
import { testStore } from "./helper";

const loginUrl = `${USER_SERVER}/login`;

const email = "user6@email.com";
const invalidEmail = "user?@email.com";
const password = "testpass";

describe("User login behaviours", () => {
  let store;
  beforeEach(() => {
    store = testStore();
  });

  test("User will be stored after successful login", () => {
    const expectedState = {
      isAuthenticated: true,
      user: { token: "someToken" }
    };

    mock
      .onPost(loginUrl, {
        email,
        password
      })
      .reply(200, { response: expectedState });

    store
      .dispatch(
        loginUser({
          email,
          password
        })
      )
      .then(() => {
        const newState = store.getState();
        expect(newState.auth).toEqual(expectedState);
      });
  });

  test("User will not be stored after unsuccessful login", () => {
    const expectedState = {
      isAuthenticated: false,
      user: {}
    };

    mock
      .onPost(loginUrl, {
        invalidEmail,
        password
      })
      .reply(500, { response: expectedState });

    store
      .dispatch(
        loginUser({
          invalidEmail,
          password
        })
      )
      .then(() => {
        const newState = store.getState();
        expect(newState.auth).toEqual(expectedState);
      });
  });
});
