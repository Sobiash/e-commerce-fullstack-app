var axios = require("axios");
var MockAdapter = require("axios-mock-adapter");
import { USER_SERVER } from "../components/utils/config";

import { registerUser } from "../actions/auth_actions";
var mock = new MockAdapter(axios);
import { testStore } from "./helper";

var mock = new MockAdapter(axios);

const registerUrl = `${USER_SERVER}/register`;

const email = "user6@email.com";
const invalidEmail = "user7email,com";
const password = "testpass";

describe("User registration behaviours", () => {
  let store;
  beforeEach(() => {
    store = testStore();
  });
  test("Successful registration", () => {
    const expectedState = {
      token: "someToken"
    };
    mock
      .onPost(registerUrl, {
        email,
        password
      })
      .reply(200, { response: expectedState });
    store
      .dispatch(
        registerUser({
          email,
          password
        })
      )
      .then(() => {
        const newState = store.getState();
        expect(newState).toEqual(expectedState);
        const historyMock = { push: jest.fn() };
        expect(historyMock.push.mock.calls[0]).toBeCalled();
      });
  });

  test("error message is stored in redux", () => {
    const expectedState = {
      auth: {
        isAuthenticated: false,
        user: {}
      },
      errors: { response: null },
      user: {
        cart: [],
        cartDetail: [],
        profile: {
          history: []
        },
        loading: false
      },
      products: { articles: [], product: {} }
    };
    mock
      .onPost(registerUrl, {
        invalidEmail,
        password
      })
      .reply(500, { response: null });

    store
      .dispatch(
        registerUser({
          invalidEmail,
          password
        })
      )
      .then(() => {
        const newState = store.getState();
        expect(newState).toEqual(expectedState);
      });
  });
});
