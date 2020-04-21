import { User, Object } from "parse";

export const isLoggedIn = () => {
  return User.current();
};

export const signUp = (email, password) => {
  return User.signUp(email, password, { email });
};

export const logIn = (email, password) => {
  return User.logIn(email, password);
};

export const logOut = (email, password) => {
  User.logOut().catch((err) => console.log(err));
};

export const ResetPaswword = (email) => {
  return User.requestPasswordReset(email);
};

export const setPrefrence = (userPreference) => {
  if (User.current()) {
    User.current().set({ userPreference });
    User.current()
      .save()
      .then((x) => {
        var OneSignal = window.OneSignal || [];
        let tags = {};

        OneSignal.deleteTags([
          "physicalActivityGoal",
          "timeExerciseEachDay",
          "hasNotificationsPush",
          "hasNotificationsEmail",
          "hasChildFriendlyContent",
        ]).then(() => {
          if (userPreference.hasNotificationsPush) {
            tags.hasNotificationsPush = "hasNotificationsPush";
          }
          if (userPreference.hasNotificationsEmail) {
            tags.hasNotificationsEmail = "hasNotificationsEmail";
          }
          if (userPreference.hasChildFriendlyContent) {
            tags.hasChildFriendlyContent = "hasChildFriendlyContent";
          }
          tags.physicalActivityGoal = userPreference.physicalActivityGoal.value;
          tags.timeExerciseEachDay = userPreference.timeExerciseEachDay.value;

          OneSignal.sendTags(tags);
        });

        // OneSignal.push(function() {
        //   let tags = {}
        // //   OneSignal.getUserId(function(userId) {
        // //     console.log("OneSignal User ID:", userId);
        // //     // (Output) OneSignal User ID: 270a35cd-4dda-4b3f-b04e-41d7463a2316
        // //   });

        // //     if(userPreference.hasNotificationsPush){
        // //         tags.hasNotificationsPush = 'Notification'
        // //     } else if (userPreference.hasNotificationsEmail) {

        // //     } else if(userPreference.hasChildFriendlyContent) {

        // //     }

        // //.then(r => {

        // //     if(userPreference.hasNotificationsPush){
        // //         tags.hasNotificationsPush = 'Notification'
        // //     } else if (userPreference.hasNotificationsEmail) {

        // //     } else if(userPreference.hasChildFriendlyContent) {

        // //     }
        // //     OneSignal.sendTags({});
        // //   })
        //   //OneSignal.setEmail("a@b.com");
        //   //OneSignal.sendTag("toto", "titi");
        // });
      })
      .catch((err) => console.log(err));
  }
};

export const sendSurvey = (data) => {
    debugger
    const Survey = Object.extend("Survey");

    let dataTosend = {};

    if(User.current()){
        dataTosend.email = User.current().get('email')
    }

    dataTosend.howfellCheckedIndex = data.howfellCheckedIndex;
    dataTosend.manydaywillsportCheckedIndex = data.manydaywillsportCheckedIndex;
    dataTosend.manydaydidsportCheckedIndex = data.manydaydidsportCheckedIndex;
    dataTosend.preferedMessage = data.preferedMessage;

  let newSurvey = new Survey();
  return newSurvey.save(dataTosend);

};

export const getCurrentUser = () => {
  return User.current();
};
