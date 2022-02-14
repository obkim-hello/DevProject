import React, { useState, useEffect } from "react";
// import { getProduct } from "./Data/data";
// import Image from "./Assets/image.jpeg";
import axios from "axios";

export default function Home() {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [msg, setmsg] = useState("");

  const params = {
    api_key: "384E6B7BED574F0DA54452A5BA589D69",
    type: "product",
    asin: "B084MKGMSQ",
    amazon_domain: "amazon.com",
  };
  // make the http GET request to Rainforest API

  const getProduct = () => {
    return axios
      .get("https://api.rainforestapi.com/request", { params })
      .then((response) => {
        // print the JSON response from Rainforest API
        if (response.status == 200) {
          console.log(response.data);
          setProduct(response.data.product);
        }
        console.log(JSON.stringify(response.data, 0, 2));
      })
      .catch((error) => {
        // catch and print the error
        console.log(error);
      });
  };

  useEffect(() => {
    let unmounted = false;
    const fetchData = async () => {
      getProduct()
        .then((res) => {
          if (!unmounted) setIsLoading(false);
        })
        .catch((err) => {
          console.log(err.message);
        });
    };
    fetchData();
    return () => {
      unmounted = true;
    };
  }, []);

  var Mdemand = -1000;
  var Bdemand = 10000;
  var Msupply = 0; // what if ABC can hire more people when price goes up?
  var Bsupply = 8000;
  var consumption;
  var supply;

  function calculateOutput(priceOptions) {
    var price = priceOptions.target.value;
    var message = "";

    consumption = price * Mdemand + Bdemand;
    supply = price * Msupply + Bsupply;

    if (consumption > supply) {
      consumption = supply;
      message =
        product.brand +
        " Company canot make enough " +
        product.title.split(" ")[0] +
        " " +
        product.title.split(" ")[1] +
        " " +
        product.title.split(" ")[2] +
        " " +
        product.title.split(" ")[3];
    }

    if (consumption <= 0) {
      consumption = 0;
      message =
        "No one will buy " +
        product.title.split(" ")[0] +
        " " +
        product.title.split(" ")[1] +
        " " +
        product.title.split(" ")[2] +
        " " +
        product.title.split(" ")[3] +
        " at this price";
    }

    // if (maxRevenue) {
    //   message = "This is the equilibrium price"
    // }

    var revenue = consumption * price;

    message =
      product.title.split(" ")[0] +
      " " +
      product.title.split(" ")[1] +
      " " +
      product.title.split(" ")[2] +
      " " +
      product.title.split(" ")[3] +
      " sold: " +
      consumption +
      "/month \n Revenue: " +
      revenue +
      "/month \n \n" +
      message;

    setmsg((msg) => message);
  }

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div className="bg-black ml-24 mr-24 mt-12 rounded-tl-lg rounded-tr-lg m-24">
      <div className="text-left text-white text-4xl lg:text-5xl font-anc-ul p-8">
        Equillibrium Price
      </div>

      <div className="bg-white text-black p-8 font-anc-ul flex grid grid-row-2 lg:grid-cols-2">
        <div className="text-left text-2xl lg:text-3xl font-Teko-m">
          Definition of Equillibrium Price
          <br />
          <p className="text-lg lg:text-xl font-anc-ul">
            In economics, economic equilibrium is a situation in which economic
            forces such as supply and demand are balanced and in the absence of
            external influences the (equilibrium) values of economic variables
            will not change. For example, in the standard text perfect
            competition, equilibrium occurs at the point at which quantity
            demanded and quantity supplied are equal. Market equilibrium in this
            case is a condition where a market price is established through
            competition such that the amount of goods or services sought by
            buyers is equal to the amount of goods or services produced by
            sellers. This price is often called the competitive price or market
            clearing price and will tend not to change unless demand or supply
            changes, and quantity is called the "competitive quantity" or market
            clearing quantity. But the concept of equilibrium in economics also
            applies to imperfectly competitive markets, where it takes the form
            of a Nash equilibrium.
          </p>
        </div>
        <img src="https://cdn.corporatefinanceinstitute.com/assets/equilibrium-quantity-1024x1024.jpeg"></img>
      </div>

      <div className="text-left bg-white text-black text-2xl lg:text-3xl font-Teko-m p-8">
        {product.brand} has just invented the{" "}
        <p className=" font-anc-ul">
          {product.title.split(" ")[0] +
            " " +
            product.title.split(" ")[1] +
            " " +
            product.title.split(" ")[2] +
            " " +
            product.title.split(" ")[3]}
          .
        </p>
        <br />A revolutionary product that will change the lives of everyone
        that buys it. <br />
        <p className="text-lg lg:text-xl">
          In this exercise, you will help {product.brand} choose the correct
          equillibrium price for the new product.
        </p>
      </div>
      <div className="flex grid lg:grid-cols-2 items-center justify-center bg-white">
        <img
          className="rounded-bl-lg bg-gray-100"
          src={product.main_image.link}
        />
        <div className="flex grid grid-row-3 pt-3">
          <div className="text-center text-2xl lg:text-3xl font-anc-ul pb-12">
            Price for{" "}
            {product.title.split(" ")[0] +
              " " +
              product.title.split(" ")[1] +
              " " +
              product.title.split(" ")[2] +
              " " +
              product.title.split(" ")[3]}
            :
          </div>
          <div class="text-black flex grid grid-cols-2 pl-8 pr-8">
            <div className=" grid grid-row-5 gap-3 lg:pt-3 pr-3 pl-3">
              <button
                value={1}
                class="bg-gray-300 hover:bg-blue-700 hover:text-white font-bold py-2 px-4 rounded-full"
                onClick={calculateOutput}
              >
                $1
              </button>
              <button
                value={2}
                class="bg-gray-300 hover:bg-blue-700 hover:text-white font-bold py-2 px-4 rounded-full"
                onClick={calculateOutput}
              >
                $2
              </button>
              <button
                value={3}
                class="bg-gray-300 hover:bg-blue-700 hover:text-white font-bold py-2 px-4 rounded-full"
                onClick={calculateOutput}
              >
                $3
              </button>
              <button
                value={4}
                class="bg-gray-300 hover:bg-blue-700 hover:text-white font-bold py-2 rounded-full"
                onClick={calculateOutput}
              >
                $4
              </button>
              <button
                value={5}
                class="bg-gray-300 hover:bg-blue-700 hover:text-white font-bold py-2 rounded-full"
                onClick={calculateOutput}
              >
                $5
              </button>
            </div>
            <div className=" grid grid-row-5 gap-3 lg:pt-3 pr-3 pl-3">
              <button
                value={6}
                class="bg-gray-300 hover:bg-blue-700 hover:text-white font-bold py-2 rounded-full"
                onClick={calculateOutput}
              >
                $6
              </button>
              <button
                value={7}
                class="bg-gray-300 hover:bg-blue-700 hover:text-white font-bold py-2 rounded-full"
                onClick={calculateOutput}
              >
                $7
              </button>
              <button
                value={8}
                class="bg-gray-300 hover:bg-blue-700 hover:text-white font-bold py-2 rounded-full"
                onClick={calculateOutput}
              >
                $8
              </button>
              <button
                value={9}
                class="bg-gray-300 hover:bg-blue-700 hover:text-white font-bold py-2 rounded-full"
                onClick={calculateOutput}
              >
                $9
              </button>
              <button
                value={10}
                class="bg-gray-300 hover:bg-blue-700 hover:text-white font-bold py-2 rounded-full"
                onClick={calculateOutput}
              >
                $10
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white text-center text-lg lg:text-2xl font-Poppins-l pt-12 pl-8 pr-8">
        {msg}
      </div>
    </div>
  );
}
