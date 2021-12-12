import { useContext } from "react";
import { EditPostContext, SignInContext } from "../utilities/Context";

function ForgotPasswordModal() {
  const {
    signInModal,
    setSignInModal,
    signUpModal,
    setSignUpModal,
    forgotPasswordModal,
    setForgotPasswordModal,
  } = useContext(SignInContext);

  return (
    <div
      className=" fixed min-h-screen flex justify-center bg-gray-200 items-center 
        bg-opacity-70 z-50 w-screen "
      onClick={() => setForgotPasswordModal(false)}
    >
      <div className="bg-white mb-96 p-10 flex flex-col max-w-sm shadow-lg">
        <div className="text-lg font-bold">
          Password reset link has been sent to your email
        </div>
        <button
          className="mt-10 bg-blue-600 hover:bg-blue-700 text-white
              font-bold py-2 
              rounded shadow-lg hover:shadow-xl transition duration-200"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default ForgotPasswordModal;
