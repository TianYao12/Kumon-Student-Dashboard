import googleIcon from "../assets/google-icon.png"

const GoogleSignIn = () => {

  return (
    <div className="google-signin-button-container">
        <img src={googleIcon} className="google-icon" alt="Google Sign In" />
    </div>
  );
}
export default GoogleSignIn;