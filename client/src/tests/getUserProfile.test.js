var axios = require("axios");
var MockAdapter = require("axios-mock-adapter");
import { USER_SERVER } from "../components/utils/config";
import { getUserProfile } from "../actions/user_actions";
var mock = new MockAdapter(axios);
import { testStore } from "./helper";

const id = "5affe783a49ebd0355359913";
const usrURL = `${USER_SERVER}/dashboard`;
const user = {
  _id: id,
  email: "exampleuser.com",
  password: "$2a$10$9I.01mSr9DwLzanz8KAhUuE6rkM9er9j9N16n4LSaeO12j4SL2BYG",
  history: []
};

const initialState = {
  cart: [],
  cartDetail: [],
  profile: {
    history: []
  },
  loading: false
};

describe("getUser action creater", () => {
  let store;
  beforeEach(() => {
    store = testStore();
  });

  test("User is stored after successful login", () => {
    const expectedState = {
      profile: {
        _id: user._id,
        email: user.email,
        password: user.password,
        history: []
      },
      loading: false
    };

    mock.onGet(usrURL).reply(200, { response: expectedState });

    store.dispatch(getUserProfile()).then(() => {
      const newState = store.getState();
      expect(newState.user.profile.response).toEqual(expectedState);
    });
  });
  test("User does not store after unsuccessful login", () => {
    const expectedState = {
      ...initialState,
      loading: true
    };

    mock;
    mock.onGet(usrURL).reply(500, { response: expectedState });

    store.dispatch(getUserProfile()).then(() => {
      const newState = store.getState();
      expect(newState.user).toEqual(expectedState);
    });
  });
});
