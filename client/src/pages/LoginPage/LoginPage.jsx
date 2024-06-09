import { Button, Input } from "@headlessui/react";
import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div className="LoginPage flex items-center justify-center h-screen w-full">
      <div className="wrapped w-[345px]">
        <img
          src="https://pomofocus.io/images/brandlogo-white.png"
          alt="Pomofocus logo"
          className="max-w-[280px] mx-auto"
        />
        <h6 className="mt-5 mb-7 text-center font-semibold">Login</h6>
        <form
          action=""
          method="POST"
          className=" rounded-xl flex flex-col px-4 py-6 bg-white  w-full"
        >
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
          <div className="line flex gap-2 items-center my-3">
            <hr className="border border-slate-300 w-full"></hr>
            <span className="text-slate-500">or</span>
            <hr className="border border-slate-300 w-full"></hr>
          </div>
          <label
            htmlFor="email"
            className="mt-4 mb-2 uppercase text-[#c4c4c4] text-xs font-semibold"
          >
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="example@email.com"
            className={`px-3 py-2 outline-none rounded-lg bg-[#efefef] text-black w-full`}
          />
          <label
            htmlFor="password"
            className="mt-4 mb-2 uppercase text-[#c4c4c4] text-xs font-semibold"
          >
            Password
          </label>
          <Input
            id="password"
            type="password"
            className={`px-3 py-2 outline-none rounded-lg bg-[#efefef] text-black w-full`}
          />
          <Button
            type="submit"
            className={`flex items-center justify-center text-center rounded-md cursor-pointer shadow-sm opacity-90 text-sm p-3 min-w-[70px] bg-gray-900 border-2 border-gray-900 w-full mt-7`}
          >
            Login with Email
          </Button>
          <a href="" className="text-center text-[#c4c4c4] underline mt-5">
            Forgot Password
          </a>
        </form>
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
