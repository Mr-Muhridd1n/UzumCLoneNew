import toast from "react-hot-toast";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { useState } from "react";
import { BiSolidHide } from "react-icons/bi";
import { Link } from "react-router-dom";

export const Login = () => {
  const { dataUser, dispatch } = useGlobalContext();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    console.log(dataUser);

    const dataEmail = dataUser.find((item) => item.email == email);
    const dataPassword =
      dataUser && dataUser.find((item) => item.password == password);
    if (dataEmail && dataPassword) {
      dispatch({
        type: "LOGIN",
        payload: {
          email: email,
          displayName: dataUser.displayName,
          displayFirst: dataUser.displayFirst,
          password: password,
          photoUrl: dataUser.photoUrl,
        },
      });
    } else {
      toast.error(
        "Kechirasiz nimadur xato parol yoki email qayta tekshiring !"
      );
    }
  };

  return (
    <section className="bg-gradient-to-br from-purple-900 via-purple-700 to-pink-500">
      <div className="container ml-auto mr-auto h-screen grid place-items-center ">
        <form
          onSubmit={handleSubmit}
          className="w-96 bg-white p-5 rounded-2xl items-center flex flex-col shadow-md"
        >
          <h1 className="text-3xl font-bold mb-5">Login</h1>
          <fieldset className="fieldset w-full">
            <legend className="fieldset-legend">Emailingiz:</legend>
            <input
              type="email"
              name="email"
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
          <div className="my-5 w-full">
            <button className="btn bg-gradient-to-br from-purple-900 via-purple-700 to-pink-500 w-full bg-purple-800 text-white text-base">
              Kirish
            </button>
          </div>
          <p className="gap-3 flex">
            <span className="opacity-70">Akkauntingiz yoqmi ?</span>{" "}
            <Link to={"/signup"} className="text-purple-800 font-semibold">
              Royhatdan o'ting !
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};
