import { User } from "parse";
import { navigate } from "gatsby";

export const isLoggedIn = () => {
  return User.current()
}

export const signUp = (email, password) => {
      User.signUp(email, password).catch(err => console.log(err));
};

export const logIn = (email, password) => {
    return User.logIn(email, password);
};

export const logOut = (email, password) => {
    User.logOut().catch(err => console.log(err));
};

export const setPrefrence = () => {
    User.logOut().catch(err => console.log(err));
};

