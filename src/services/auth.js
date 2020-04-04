import { User } from "parse";

export const isLoggedIn = () => {
  return User.current()
}

export const signUp = (email, password) => {
      User.signUp(email, password).catch(err => console.log(err));
};

export const logIn = (email, password) => {
    User.logIn(email, password).catch(err => console.log(err));
};

export const logOut = (email, password) => {
    User.logOut().catch(err => console.log(err));
};

export const setPrefrence = () => {
    User.logOut().catch(err => console.log(err));
};

