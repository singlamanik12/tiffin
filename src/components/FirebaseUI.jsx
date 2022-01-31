import React, { useEffect, useContext } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import DataContext from "./../api/context";
import { Dialog } from "@mui/material";
// Configure Firebase.

// Configure FirebaseUI.

const FirebaseUI = ({ handlePhoneVerification }) => {
  // Local signed-in state.

  const config = {
    apiKey: "AIzaSyCPsXN6zpGpFQB0MOsu3n9ISxFunBBjbp0",
    authDomain: "daily-cater.firebaseapp.com",
    projectId: "daily-cater",
    storageBucket: "daily-cater.appspot.com",
    messagingSenderId: "684779909122",
    appId: "1:684779909122:web:73adf4203aed0eba61b71b",
  };
  firebase.initializeApp(config);
  // Listen to the Firebase Auth state and set the local state.
  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: "popup",
    // We will display Google and Facebook as auth providers.
    callbacks: {
      signInSuccessWithAuthResult: (authResult) => {
        var user = authResult.user;
        handlePhoneVerification(user.phoneNumber);
      },
    },
    signInOptions: [firebase.auth.PhoneAuthProvider.PROVIDER_ID],
  };
  return (
    <div>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </div>
  );
};

export default FirebaseUI;
