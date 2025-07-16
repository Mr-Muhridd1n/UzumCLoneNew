import { createContext, useEffect, useReducer } from "react";
import toast from "react-hot-toast";

export const GlobalContext = createContext();

const changeState = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "ADD_PRODUCT":
      toast.success("Yangi mahsulot qo'shildi !");

      return {
        ...state,
        card: [...state.card, payload],
      };
    case "ADD_PRODUCT_ID":
      toast.success("Mahsulot 1 taga ko'paytirildi !");

      return {
        ...state,
        card: state.card.map((item) => {
          if (item.id == payload) {
            return { ...item, amound: item.amound + 1 };
          } else {
            return item;
          }
        }),
      };
    case "DEL_PRODUCT_ID":
      toast.success("Mahsulot 1 taga kamaytirildi !");

      return {
        ...state,
        card: state.card.map((item) => {
          if (item.id == payload) {
            return { ...item, amound: item.amound - 1 };
          } else {
            return item;
          }
        }),
      };
    case "DEL_PRODUCT":
      toast.success("Savatchadan 1 ta maxsulot o'chirildi !");

      return {
        ...state,
        card: state.card.filter((item) => item.id != payload),
      };
    case "ADD_LIKE":
      const isLiked = state.like.some((item) => item.id === payload);
      return {
        ...state,
        like: isLiked
          ? state.like.filter((item) => item.id !== action.payload)
          : [...state.like, { id: payload }],
      };
    case "LOGIN":
      toast.success("Hisobingizga kirdingiz !");
      return { ...state, user: payload };
    case "LOGOUT":
      return { ...state, user: null };
    case "SIGNUP":
      return {
        ...state,
        dataUser: [...state.dataUser, payload],
      };
    case "CALCULATE_TOTAL":
      const { allProduct, allPrice } = state.card.reduce(
        (acc, curVal) => {
          const { amound, price } = curVal;
          const itemTotal = amound * price;

          acc.allPrice += itemTotal;
          acc.allProduct += amound;

          return acc;
        },
        { allPrice: 0, allProduct: 0 }
      );
      return { ...state, allProduct, allPrice };
    default:
      return state;
  }
};

const initalState = {
  card: [],
  like: [],
  user: false,
  dataUser: [
    {
      displayName: "Muhriddin",
      displayFirst: "Sayfuddinov",
      email: "msayfuddinov7@gmail.com",
      password: 111,
      photoUrl:
        "https://images.unsplash.com/photo-1654649451086-dd75d8170a27?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ],
  allProduct: 0,
  allPrice: 0,
};

export const GlobalContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(changeState, initalState);
  useEffect(() => {
    dispatch({ type: "CALCULATE_TOTAL" });
  }, [state.card]);

  return (
    <GlobalContext.Provider value={{ ...state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};
