import { User } from "parse";

export const isLoggedIn = () => {
  return User.current()
}

export const signUp = (email, password) => {
      return User.signUp(email, password, {email});
};

export const logIn = (email, password) => {
    return User.logIn(email, password);
};

export const logOut = (email, password) => {
    User.logOut().catch(err => console.log(err));
};

export const setPrefrence = (userPreference) => {
    if(User.current()){
        User.current().set({userPreference})
        User.current().save()
            .then(x => console.log(x))
            .catch( err => console.log(err))
    }
};


export const getCurrentUser = () => {
    return User.current()
}

