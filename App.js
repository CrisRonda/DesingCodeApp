import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import AppNavigator from "./navigator/AppNavigator";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

const client = new ApolloClient({
  uri: `https://graphql.contentful.com/content/v1/spaces/ldcl3ayg0mhx`,
  credentials: "same-origin",
  headers: {
    Authorization: `Bearer 93f3808c25c1f5bdb95476ca8576c6eaa12b5587efb956efb242ceead7cb3840`
  }
});
const initialState = {
  action: "",
  name: "",
  photo:
    "https://www.trzcacak.rs/myfile/full/214-2143887_png-file-svg-transparent-user-icon-png.png",
  actionCard: "closeCard"
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "OPEN_MENU":
      return {
        ...state,
        action: "openMenu"
      };
    case "CLOSE_MENU":
      return {
        ...state,
        action: "closeMenu"
      };
    case "UPDATE_NAME":
      return {
        ...state,
        name: action.name
      };
    case "OPEN_CARD":
      return {
        ...state,
        actionCard: "openCard"
      };
    case "CLOSE_CARD":
      return {
        ...state,
        actionCard: "closeCard"
      };
    case "OPEN_LOGIN":
      return {
        ...state,
        action: "openLogin"
      };
    case "CLOSE_LOGIN":
      return {
        ...state,
        action: "closeLogin"
      };
    case "OPEN_NOTIF":
      return { ...state, action: "openNotif" };
    case "CLOSE_NOTIF":
      return { ...state, action: "closeNotif" };
    default:
      return state;
  }
};
const store = createStore(reducer);

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    </ApolloProvider>
  );
};
export default App;