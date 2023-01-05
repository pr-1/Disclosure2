export const SET_COUNT = "SET_COUNT";
export const SET_PRODUCTS = "SET_PRODUCTS";
export const CLEAR_PRODUCTS = "CLEAR_PRODUCTS";
export const SET_CATEGORIES = "SET_CATEGORIES";

import Apikey from "../../constants/Apikey";

const apiKey = Apikey.apiKey;

export const fetchProducts = (
  longitude,
  latitiude,
  filter,
  filterValue,
  value,
  page,
  category,
  token,
  clear
) => {
  if (clear) {
    clear = true;
  } else {
    clear = false;
  }

  if (value) {
    clear = true;
    page = 1;
  }
  console.log(
    { longitude },
    { latitiude },
    { filter },
    { filterValue },
    { value },
    { page },
    { category },
    { token },
    { clear }
  );
  return async (dispatch) => {
    const response = await fetch(
      "https://app.disclosurediscounts.co.uk/api/v2/companies/distance",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
          "Accept-Encoding": "gzip,deflate,br",
          Connection: "keep-alive",
          apiKey: apiKey,
          token: token,
        },
        body: JSON.stringify({
          longitude: longitude,
          latitude: latitiude,
          filter: filter,
          filtervalue: filterValue,
          value: value,
          page: page,
          category: category,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const resData = await response.json();
    const loadedProducts = [];
    console.log({ resData });
    for (const key in resData.companies) {
      loadedProducts.push({
        id: resData.companies[key].company_id,
        name: resData.companies[key].name,
        address: resData.companies[key].address,
        town: resData.companies[key].town,
        postcode: resData.companies[key].postcode,
        phone: resData.companies[key].phone,
        imageUrl: resData.companies[key].main_image,
        title: resData.companies[key].offer_title,
        subtitle: resData.companies[key].offer_subtitle,
        description: resData.companies[key].offer_desc,
        start: resData.companies[key].start_date,
        end: resData.companies[key].end_date,
        distance: resData.companies[key].distance,
        bottomImge1: resData.companies[key].bottom_image_1,
        bottomImge2: resData.companies[key].bottom_image_2,
        logo: resData.companies[key].logo_url,
        directoryTitle: resData.companies[key].directory_title,
        website: resData.companies[key].website,
        facebook: resData.companies[key].facebook,
        twitter: resData.companies[key].twitter,
        instagram: resData.companies[key].instagram,
        featured: resData.companies[key].featured,
        discountCode: resData.companies[key].discount_code,
        backgroundImage: resData.companies[key].background_image,
      });
    }

    dispatch({
      type: SET_PRODUCTS,
      products: loadedProducts,
      clear: clear,
    });
    dispatch({
      type: SET_COUNT,
      count: parseInt(resData.count),
    });
  };
};

export const fetchCategories = () => {
  return async (dispatch) => {
    const response = await fetch(
      "https://app.disclosurediscounts.co.uk/api/v2/companies/categories",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
          "Accept-Encoding": "gzip,deflate,br",
          Connection: "keep-alive",
          apiKey: apiKey,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    const resData = await response.json();

    const productCategories = [];
    productCategories.push({
      id: "0",
      name: "All categories",
      url: "https://disclosureapp.s3.eu-west-2.amazonaws.com/disclosure/uploaded_images/all.png",
    });
    for (const key in resData.clients) {
      productCategories.push({
        id: resData.clients[key].id,
        name: resData.clients[key].category_name,
        url: resData.clients[key].icon_url,
      });
    }

    dispatch({
      type: SET_CATEGORIES,
      categories: productCategories,
    });
  };
};

export const clearProducts = () => {
  return (dispatch) => {
    dispatch({
      type: CLEAR_PRODUCTS,
    });
  };
};
