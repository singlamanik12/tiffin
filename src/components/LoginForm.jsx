import React, { useContext, useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DataContext from "../api/context";
import FirebaseUI from "./FirebaseUI";
import jwt_decode from "jwt-decode";
import InfoForm from "./InfoForm";
import { login } from "../api/customer";
const LoginForm = () => {
  const { open, setOpen, user, setUser } = useContext(DataContext);
  const [PhoneNumber, setPhoneNumber] = useState();
  const [step, setStep] = useState(1);
  const handleClose = () => {
    setOpen(false);
  };
  // const handleChange = (event) => {
  //   setData(Object.assign({}, data, { [event.target.id]: event.target.value }));
  // };
  // const handleSubmit = async () => {
  //   try {
  //     console.log(await signup(data));
  //     setOpen(false);
  //     handlePhoneVerification(data.PhoneNumber);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  const handlePhoneVerification = async (phoneNumber) => {
    try {
      var values = { PhoneNumber: phoneNumber };
      const { data } = await login(values);
      if (data) {
        setUser(jwt_decode(data));
        localStorage.setItem("user", JSON.stringify(jwt_decode(data)));
        setOpen(false);
      }
    } catch (err) {
      setPhoneNumber(phoneNumber);
      setStep(2);
    }
  };
  useEffect(() => {
    if (!!user) {
      setOpen(false);
    }
  });
  // useEffect(() => {
  //   window.recaptchaVerifier = new RecaptchaVerifier(
  //     "sign-in-button",
  //     {
  //       size: "invisible",
  //       callback: (response) => {
  //         // reCAPTCHA solved, allow signInWithPhoneNumber.
  //         // onSignInSubmit();
  //       },
  //     },
  //     auth
  //   );
  // }, []);

  // const phoneNumber = "+17057703061";
  // const appVerifier = window.recaptchaVerifier;
  // signInWithPhoneNumber(auth, phoneNumber, appVerifier)
  //   .then((confirmationResult) => {
  //     // SMS sent. Prompt user to type the code from the message, then sign the
  //     // user in with confirmationResult.confirm(code).
  //     window.confirmationResult = confirmationResult;
  //     // ...
  //   })
  //   .catch((error) => {
  //     // Error; SMS not sent
  //     // ...
  //   });

  return (
    <div>
      <Dialog open={open}>
        {
          {
            1: <FirebaseUI handlePhoneVerification={handlePhoneVerification} />,
            2: (
              <InfoForm
                PhoneNumber={PhoneNumber}
                setOpen={setOpen}
                handlePhoneVerification={handlePhoneVerification}
              />
            ),
          }[step]
        }
      </Dialog>
    </div>
  );
};
export default LoginForm;
