import { Button, Input } from "@headlessui/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [formError, setFormError] = useState({
    email: false,
  });

  function onChange(e) {
    e.preventDefault();
    const { id, value } = e.target;
    // regex tests
    const emailregex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (id === "email") {
      setFormError({
        ...formError,
        email: !emailregex.test(value),
      });
    }

    setEmail(e.target.value);
  }



  async function onSubmit(e) {
    e.preventDefault();
    if (!formError.email) {
      const values = {
        email: e.target[0].value,
      };

      await axios.post('http://localhost:5000/register/')

    }
  }


  return (
    <div className="SignupPage flex items-center justify-center h-screen w-full">
      <div className="wrapped w-[345px]">
        <Link to='/'>
          <img
            src="https://pomofocus.io/images/brandlogo-white.png"
            alt="Pomofocus logo"
            className="max-w-[280px] mx-auto"
          />
        </Link>
        <h6 className="mt-5 mb-7 text-center font-semibold">Create account</h6>
        <div className="rounded-xl flex flex-col px-4 py-6 bg-white w-full">
          <a
            className={`flex items-center justify-center gap-3 text-center rounded-md cursor-pointer shadow-sm opacity-90 text-sm p-3 min-w-[70px] bg-white text-gray-500 leading-tight w-full border border-gray-200 font-semibold`}
          >
            <img
              src="https://pomofocus.io/icons/g-logo.png"
              alt=""
              className=""
              width={20}
            />{" "}
            Sign up with Google
          </a>
          <form method="POST" onSubmit={onSubmit}>
            <div className="line flex gap-2 items-center my-3">
              <hr className="border border-slate-300 w-full"></hr>
              <span className="text-slate-500">or</span>
              <hr className="border border-slate-300 w-full"></hr>
            </div>
            <div className="formItem">
              <label
                htmlFor="email"
                className="mt-4 mb-2 uppercase text-[#c4c4c4] text-xs font-semibold"
              >
                Email
              </label>
              <Input
                id="email"
                type="email"
                required
                placeholder="example@email.com"
                className={`px-3 py-2 outline-none rounded-lg bg-[#efefef] text-black w-full`}
                value={email}
                onChange={onChange}
              />
              {formError.email && (
                <i className="text-red-500">Please enter a valid email</i>
              )}
            </div>
            <Button
              type="submit"
              className={`flex items-center justify-center text-center rounded-md cursor-pointer shadow-sm opacity-90 text-sm p-3 min-w-[70px] bg-gray-900 border-2 border-gray-900 w-full mt-7`}
            >
              Sign up with Email
            </Button>
          </form>
        </div>
        <div className="text-center mt-5">
          <p>Already have an account?</p>
          <Button className={`font-semibold underline`}>
            <Link to={`/login`}>Log In</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
