import axios from "axios";
import { useEffect, useState } from "react";

function ApiMethods(url: string) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    setLoading(true);
    axios
      .get(url, config)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [url]);

  const refetch = () => {
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    setLoading(true);
    axios
      .post(url, { name: "IONIC", price: 10 }, config)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const updateMethod = (id: any, name: any, address: any) => {
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    setLoading(true);
    axios
      .put(`${url}/${id}`, { name: name, address: address }, config)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const createMethod = (cartItems: any[]) => {
    const orderName = localStorage.getItem("name") || ""; // Retrieve the name from LocalStorage

    const order = {
      order_name: orderName, // Set the order_name to the retrieved name
      order_status: 0,
      order_products_attributes: cartItems.map((item) => ({
        product_id: item.product.id,
        quantity: item.quantity,
      })),
    };

    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    setLoading(true);
    axios
      .post(url, { order }, config)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return {
    data,
    loading,
    error,
    refetch,
    updateMethod,
    createMethod,
  };
}

export default ApiMethods;
