import { useGlobalContext } from "../hooks/useGlobalContext";
import { useState } from "react";
import toast from "react-hot-toast";
import { BiSolidHide } from "react-icons/bi";
import { Link, Navigate } from "react-router-dom";

export const SignUp = () => {
  const { dataUser, dispatch } = useGlobalContext();
  const [login, setLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    const name = formData.get("name");
    const first = formData.get("first");
    const url = formData.get("url");
    // console.log({
    //   email: email,
    //   displayName: name,
    //   displayFirst: first,
    //   password: password,
    //   photoUrl: url,
    // });
    dataUser.map((user) => {
      if (user.email != email) {
        dispatch({
          type: "SIGNUP",
          payload: {
            email: email,
            displayName: name,
            displayFirst: first,
            password: password,
            photoUrl: url,
          },
        });
        setLogin(true);
      } else {
        toast.error(
          "Kechirasiz siz kiritgan email allaqachon royhatdan o'tgan"
        );
      }
    });
  };

  if (login) {
    return <Navigate to="/login" replace />;
  }

  return (
    <section className="bg-gradient-to-br from-purple-900 via-purple-700 to-pink-500">
      <div className="container ml-auto mr-auto h-screen grid place-items-center ">
        <form
          onSubmit={handleSubmit}
          className="w-96 bg-white p-5 rounded-2xl items-center flex flex-col shadow-md"
        >
          <h1 className="text-3xl font-bold mb-5">Ro'yhatdan o'tish</h1>
          <fieldset className="fieldset w-full">
            <legend className="fieldset-legend">Ismingiz:</legend>
            <input
              type="text"
              name="name"
              required
              className="input w-full focus:outline-purple-800 focus:border-none"
              placeholder="Ismingizni kiriting!"
            />
          </fieldset>
          <fieldset className="fieldset w-full">
            <legend className="fieldset-legend">Familiyangiz:</legend>
            <input
              type="text"
              name="first"
              required
              className="input w-full focus:outline-purple-800 focus:border-none"
              placeholder="Familiyangizni kiriting!"
            />
          </fieldset>
          <fieldset className="fieldset w-full">
            <legend className="fieldset-legend">Emailingiz:</legend>
            <input
              type="email"
              name="email"
              required
              className="input w-full focus:outline-purple-800 focus:border-none"
              placeholder="Emailingizni kiriting!"
            />
          </fieldset>
          <fieldset className="fieldset w-full">
            <legend className="fieldset-legend">Parolingiz:</legend>
            <label htmlFor="" className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                className="input w-full focus:outline-purple-800 focus:border-none"
                placeholder="Parolingizni kiriting!"
              />
              <BiSolidHide
                className={`absolute right-3 text-2xl top-2.5 cursor-pointer z-10 ${
                  showPassword ? "text-purple-800" : ""
                }`}
                onClick={() => {
                  setShowPassword(showPassword ? false : true);
                }}
              />
            </label>
          </fieldset>
          <fieldset className="fieldset w-full">
            <legend className="fieldset-legend">Photo URL:</legend>
            <input
              type="url"
              name="url"
              required
              className="input w-full focus:outline-purple-800 focus:border-none"
              placeholder="Profil uchun rasm URL !"
            />
          </fieldset>
          <div className="my-5 w-full">
            <button className="btn bg-gradient-to-br from-purple-900 via-purple-700 to-pink-500 w-full bg-purple-800 text-white text-base">
              Ro'yhatdan o'tish
            </button>
          </div>
          <p className="gap-3 flex flex-col text-center">
            <span className="opacity-70">Akkauntingiz allaqachon bormi ?</span>{" "}
            <Link to={"/login"} className="text-purple-800 font-semibold">
              Tizimga kiring !
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};
