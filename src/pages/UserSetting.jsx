import React, { useState } from "react";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { Link } from "react-router-dom";

export const UserSetting = () => {
  const { user } = useGlobalContext();
  const [type, setType] = useState("buyurtma");
  const [buyurtmaType, setBuyurtmaType] = useState("barcha");
  return (
    <section>
      <div className="container ml-auto mr-auto">
        <h2 className="text-2xl font-semibold mb-5">
          {user.displayName} {user.displayFirst}
        </h2>
        <div className="flex gap-3">
          <div className="flex-2/6 flex-col flex items-start">
            <button
              className={`btn border-none hover:bg-gray-300 w-full justify-start ${
                type == "buyurtma" ? "bg-gray-300" : "bg-transparent"
              }`}
              onClick={() => {
                setType("buyurtma");
              }}
            >
              Buyurtmalarim
            </button>
            <button
              className={`btn border-none hover:bg-gray-300 w-full justify-start ${
                type == "sharx" ? "bg-gray-300" : "bg-transparent"
              }`}
              onClick={() => {
                setType("sharx");
              }}
            >
              Sharhlar
            </button>
            <button
              className={`btn border-none hover:bg-gray-300 w-full justify-start ${
                type == "malumot" ? "bg-gray-300" : "bg-transparent"
              }`}
              onClick={() => {
                setType("malumot");
              }}
            >
              Ma'lumotlarim
            </button>
          </div>
          <div className="flex-4/6 mb-10">
            {type == "buyurtma" && (
              <div className="w-full">
                <div className="flex gap-3 mb-3">
                  <button
                    className={`btn border-none justify-start rounded-3xl ${
                      buyurtmaType == "barcha"
                        ? "bg-black text-white hover:bg-black"
                        : "bg-transparent hover:bg-gray-300"
                    }`}
                    onClick={() => {
                      setBuyurtmaType("barcha");
                    }}
                  >
                    Barcha buyurtmalar
                  </button>
                  <button
                    className={`btn border-none justify-start rounded-3xl ${
                      buyurtmaType == "tolov_qilingan"
                        ? "bg-black text-white hover:bg-black"
                        : "bg-transparent hover:bg-gray-300"
                    }`}
                    onClick={() => {
                      setBuyurtmaType("tolov_qilingan");
                    }}
                  >
                    To'lov qilinmagan
                  </button>
                  <button
                    className={`btn border-none justify-start rounded-3xl ${
                      buyurtmaType == "faol"
                        ? "bg-black text-white hover:bg-black"
                        : "bg-transparent hover:bg-gray-300"
                    }`}
                    onClick={() => {
                      setBuyurtmaType("faol");
                    }}
                  >
                    Faol
                  </button>
                </div>
                <div className="p-5 border-2 border-gray-300 text-center">
                  <h2 className="text-3xl font-bold mb-3">Hech narsa yo'q</h2>
                  <p className="max-w-2xl text-xl mb-5">
                    Sizda faol buyurtma mavjut emas ! <br />
                    Barcha kerakli narsalarni topish uchun qidirishdan <br />
                    foydalaning !
                  </p>
                  <div className="text-center flex flex-col items-center gap-3">
                    <Link
                      to="/"
                      className="btn bg-purple-700 text-white text-base rounded-2xl border-none"
                    >
                      Xaridlarni boshlash
                    </Link>
                    <Link
                      to="/"
                      className="btn bg-transparent text-base rounded-2xl hover:bg-gray-300 border-none"
                    >
                      Bosh sahifaga qaytish
                    </Link>
                  </div>
                </div>
              </div>
            )}
            {type == "malumot" && <div></div>}
            {type == "sharx" && <div></div>}
          </div>
        </div>
      </div>
    </section>
  );
};
