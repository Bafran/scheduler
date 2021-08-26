import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import React from "react";
import { Route, Switch } from "react-router";
import { NavBar } from "./components/NavBar";
import CompanyHome from "./pages/companyHome";
import CompanyLogin from "./pages/companyLogin";
import CompanyRegister from "./pages/companyRegister";
import Home from "./pages/home";
import Login from "./pages/login";

// eslint-disable-next-line
const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

// eslint-disable-next-line
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
  credentials: "include",
});

export const App = () => {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/home/:id">
            <Home />
          </Route>
          <Route path="/registercompany">
            <CompanyRegister />
          </Route>
          <Route path="/logincompany">
            <CompanyLogin />
          </Route>
          <Route path="/companyhome">
            <CompanyHome />
          </Route>
        </Switch>
      </div>
    </ApolloProvider>
  );
};

export default App;
