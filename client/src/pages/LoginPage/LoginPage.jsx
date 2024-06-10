import { Button, Input } from "@headlessui/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'

export default function LoginPage() {
  const [formError, setFormError] = useState({
    email: false,
    password: false,
  });

  let navigate = useNavigate();

  function onChange(e) {
    e.preventDefault();
    const { id, value } = e.target;
    // regex tests
    const emailregex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const passregex = /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/;
    if (id === "email") {
      setFormError({
        ...formError,
        email: !emailregex.test(value),
      });
    }
    if (id === "password") {
      setFormError({
        ...formError,
        password: !passregex.test(value),
      });
    }
  }

  async function onSubmit(event) {
    event.preventDefault();

    if (!(formError.email && formError.password)) {
      const values = {
        email: event.target[0].value,
        password: event.target[1].value,
      };

      await axios.post('http://localhost:5000/auth/login', {
        "email": values.email,
        "password": values.password
      }).then((responsive) => {
        console.log(responsive.data.message);
        navigate('/');
      }).catch((error) => console.log(error))

    }
  }
  return (
    <div className="LoginPage flex items-center justify-center h-screen w-full">
      <div className="wrapped w-[345px]">
        <Link to='/'>
          <img
            src="https://pomofocus.io/images/brandlogo-white.png"
            alt="Pomofocus logo"
            className="max-w-[280px] mx-auto"
          />
        </Link>
        <h6 className="mt-5 mb-7 text-center font-semibold">Login</h6>
        <div className=" rounded-xl flex flex-col px-4 py-6 bg-white w-full">
          <Button
            className={`flex items-center justify-center gap-3 text-center rounded-md cursor-pointer shadow-sm opacity-90 text-sm p-3 min-w-[70px] bg-white text-gray-500 leading-tight w-full border border-gray-200 font-semibold`}
          >
            <img
              src="https://pomofocus.io/icons/g-logo.png"
              alt=""
              className=""
              width={20}
            />{" "}
            Login with Google
          </Button>
          <form action="" method="POST" onSubmit={onSubmit}>
            <div className="line flex gap-2 items-center my-3">
              <hr className="border border-slate-300 w-full"></hr>
              <span className="text-slate-500">or</span>
              <hr className="border border-slate-300 w-full"></hr>
            </div>
            <div className="formItem mt-4">
              <label
                htmlFor="email"
                className=" mb-2 uppercase text-[#c4c4c4] text-xs font-semibold"
              >
                Email
              </label>

              <Input
                id="email"
                type="email"
                required
                placeholder="example@email.com"
                onChange={onChange}
                className={`px-3 py-2 outline-none rounded-lg bg-[#efefef] text-black w-full`}
              />
              {formError.email && (
                <i className="text-red-400">Please enter a valid email</i>
              )}
            </div>

            <div className="formItem mt-4">
              <label
                htmlFor="password"
                className=" mb-2 uppercase text-[#c4c4c4] text-xs font-semibold"
              >
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="******"
                required
                onChange={onChange}
                className={`px-3 py-2 outline-none rounded-lg bg-[#efefef] text-black w-full`}
              />

              {formError.password && (
                <i className="text-red-400">Please enter a valid password</i>
              )}
            </div>
            <Button
              type="submit"
              className={`flex items-center justify-center text-center rounded-md cursor-pointer shadow-sm opacity-90 text-sm p-3 min-w-[70px] bg-gray-900 border-2 border-gray-900 w-full mt-7`}
            >
              Login with Email
            </Button>
          </form>
          <a href="" className=" text-center text-[#c4c4c4] underline mt-5 ">
            Forgot Password
          </a>
        </div>
        <div className="text-center mt-5">
          <p>Do not have an account ?</p>
          <Button className={`font-semibold underline`}>
            <Link to={`/register`}> Create account</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
