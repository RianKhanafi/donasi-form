import React, { useState, useEffect } from "react";
import "./App.css";
import IstImage from "./assets/ist.png";
import LogoImage from "./assets/logo.png";
import axios from "axios";

function App() {
  const [donasiData, setDonasiData] = React.useState({
    email: null,
    password: null,
    donasi: null,
  });

  const [quots, setQuots] = useState({});

  const [error, setError] = useState([]);

  const onChange = (e) => {
    const label = e.target.name;
    const value = e.target.value;

    setDonasiData({
      ...donasiData,
      [label]: label === "donasi" ? value.replace(/[^0-9]/g, "") : value,
    });
  };

  function currencyFormat(num) {
    num = num === null ? 0 : Number(num);
    return (
      "Rp " + num?.toFixed(2)?.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") ?? 0
    );
  }

  const handleOnSubmit = () => {
    const arr = [];
    Object.keys(donasiData).forEach((key) => {
      if (donasiData[key] === null) {
        arr.push(key);
      }
    });

    setError(arr);
  };

  const getQuotsOfTheDay = async () => {
    try {
      const response = await axios.get("https://quotes.rest/qod");

      setQuots(response.data.contents.quotes[0]);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getQuotsOfTheDay();
  }, []);

  const errorvalidation = (key) => {
    if ((error ?? []).find((x) => x === key) !== undefined) {
      return {
        errorView:
          donasiData[key] === null ? (
            <p className="text-red-500 text-md">
              {latter(key)} tidak boleh kosong
            </p>
          ) : null,
        isError: true,
      };
    }
  };

  const latter = (first, ...rest) => {
    return first.charAt(0).toUpperCase() + first.slice(1) + rest.join("");
  };

  return (
    <div>
      <div className="w-full shadow-md">
        <div className="container mx-auto py-4">
          <div className="flex items-center">
            <img src={IstImage} width="50" />
            <div>
              <span className="text-2xl ml-4">Donasi</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-around">
        <div className="w-1/2 p-14">
          <div>
            <form className="bg-white shadow-lg rounded-md p-8">
              <div className="py-4">
                <span className="text-3xl">Mari Donasi</span>
              </div>
              <div className="p-8">
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-md font-bold mb-2"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    onChange={onChange}
                    className={[
                      "appearance-none border rounded w-full py-4 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline",
                      errorvalidation("email")?.isError
                        ? "border-red-500 "
                        : "",
                    ].join(" ")}
                    id="email"
                    type="text"
                    placeholder="email"
                    name="email"
                    value={donasiData.email}
                  />
                  {errorvalidation("email")?.errorView}
                </div>
                <div className="mb-6">
                  <label
                    className="block text-gray-700 text-md font-bold mb-2"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    onChange={onChange}
                    className={[
                      "appearance-none border rounded w-full py-4 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline",
                      errorvalidation("password")?.isError
                        ? "border-red-500 "
                        : "",
                    ].join(" ")}
                    id="password"
                    type="password"
                    placeholder="******************"
                    name="password"
                    value={donasiData.password}
                  />
                  {errorvalidation("password")?.errorView}
                </div>

                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="donasi"
                  >
                    Donasi
                  </label>
                  <input
                    onChange={onChange}
                    className={[
                      "appearance-none border rounded w-full py-4 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline",
                      errorvalidation("donasi")?.isError
                        ? "border-red-500 "
                        : "",
                    ].join(" ")}
                    id="donasi"
                    value={currencyFormat(donasiData.donasi)}
                    type="text"
                    placeholder="donasi"
                    name="donasi"
                  />
                  {errorvalidation("donasi")?.errorView}
                </div>
                <div className="flex items-center justify-between">
                  <button
                    onClick={handleOnSubmit}
                    className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-4 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                  >
                    Submit
                  </button>
                </div>
                <div className="text-center">
                  <div className="py-3">
                    <span className="text-3xl">Quotes of the day:</span>
                  </div>
                  <p className="text-center text-blue-500 text-md">
                    "{quots.quote}"
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="w-1/2 p-14">
          <img src={LogoImage} />
        </div>
      </div>
    </div>
  );
}

export default App;
