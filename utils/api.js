//const API_URL = process.env.GATSBY_MMC_API_URL; //Strapi instance//api url
const API_URL = "https://app.disclosurediscounts.co.uk/api/v2";
const apiKey = "12345";

function getHeaders() {
  let headers = {
    "Content-Type": "application/json",
    Accept: "*/*",
    "Accept-Encoding": "gzip,deflate,br",
    Connection: "keep-alive",
    apiKey: apiKey,
  };

  // const jwt = localStorage.getItem("jwt");
  // if (jwt) {
  //   headers.Authorization = `Bearer ${jwt}`;
  // }
  return headers;
}

async function get(url) {
  const headers = getHeaders();
  try {
    const response = await fetch(`${API_URL}/${url}`, { headers });
    if (response.status !== 200) return null;

    return await response.json();
  } catch (error) {
    return null;
  }
}

async function fetchWithBody(method, url, data) {
  method = method.toUpperCase();
  const headers = getHeaders();
  try {
    const response = await fetch(`${API_URL}/${url}`, {
      headers,
      method,
      body: JSON.stringify(data),
    });
    if (response.status !== 200) return null;
    const resData = await response.json();
    console.log({ resData });
    return resData;
  } catch (error) {
    return null;
  }
}

const post = async (url, data) => fetchWithBody("post", url, data);
const patch = async (url, data) => fetchWithBody("patch", url, data);
const put = async (url, data) => fetchWithBody("put", url, data);
const del = async (url, data) => fetchWithBody("delete", url, data);

export const me = () => get("users/me");
export const updateMe = (data) => put(`users-permissions/users/me`, { data });
export const users = () => get("bookings/users");
export const login = (email, password) =>
  post("users/login", { email, password });
export const signUp = (data) => post("users/signup", { data });

export const miniCart = () => get("carts/mini");
export const fullCart = () => get("carts/full");
export const guestCart = (data) => post("carts/guest", { data });
export const addToCart = (id) => patch("carts/items/add", { id });
export const removeFromCart = (id) => patch("carts/items/remove", { id });
export const clearCart = () => patch("carts/items/clear");

export const addToOwned = (id) => post("owned-product/create", { id });
export const removeFromOwned = (id) => patch("owned-product/delete", { id });
export const ownedProducts = () => get("owned-product");
export const getDocument = (id) => get(`documents?id=${id}`);

export const stripePay = () =>
  post("stripe/pay").then((body) => body.clientSecret);
export const guestStripePay = (data) =>
  post("stripe/guestpay", { data }).then((body) => body.clientSecret);
export const getPaymentIntent = (id) => post("payment-intent", { id });
export const sendEmail = (data) => post("emails/emailSend", { data });

export const addAvailableDate = (data) => post("bookings/add", { data });
export const removeAvailableDate = (id) => del(`bookings/${id}`);
export const allocateDate = (data) => put("bookings/allocate", { data }); // add user to available date
export const unAllocateDate = (id) => put("bookings/unallocate", { id });
export const getAvailableDates = (startDate) =>
  get(`bookings/date?date=${startDate}`);
