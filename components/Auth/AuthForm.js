import { useState } from 'react';
import { LockClosedIcon } from "@heroicons/react/solid";
import { useAuth } from "../../hooks/useAuth";

export default function AuthForm() {
  const [submitting, setSubmitting] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [user, setUser] = useState(null);
  const [mfa, setMFA] = useState(false);
  const [confirmCode, setConfirmCode] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { confirmMFA, logUserIn } = useAuth();

  const handleValidSubmit = async (event) => {
    console.log("doing it");
    event.preventDefault();
    setSubmitting(true);
    setAuthError(null);
    if (confirmCode) {
      let res;
      if (mfa) {
        res = await confirmMFA(cogUser, code);
      } else {
        //  Should not get here since we're not doing sign up here.
      }
      if (res.success) {
        setSubmitting(false);
        // props.history.push("/authenticate");
      } else {
        setSubmitting(false);
        setAuthError(res.error.message);
      }
    } else {
      const result = await logUserIn(email, password);
      console.log(result);
      setSubmitting(false);
      if (result.user && result.user.challengeName) {
        //  Indicates the user has MFA enabled
        setMFA(true);
        setUser(result.user);
        setConfirmCode(true);
      } else if (
        result.error &&
        result.error.code &&
        result.error.code === "UserNotConfirmedException"
      ) {
        setAuthError(
          "Account has not been confirmed, enter code that was previously emailed or request a new one"
        );
        setConfirmCode(true);
      } else if (!result.success) {
        setAuthError(result.error.message);
      } else {
        // props.history.push("/authenticate");
        //REDIRECT HERE
      }
    }
  };

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-50">
        <body class="h-full">
        ```
      */}
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in with your Pinata account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{" "}
              <a
                href="https://app.pinata.cloud"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                sign up here.
              </a>
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleValidSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    aria-hidden="true"
                  />
                </span>
                {submitting ? "Signing in..." : "Sign in"}              
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}