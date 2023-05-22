export const GET_INFO = "GET_INFO";

import Apikey from "../../constants/Apikey";

const apiKey = Apikey.apiKey;
const API_URL = "https://app.disclosurediscounts.co.uk/api/v2";

export const getInitial = () => {
  return async (dispatch) => {
    const response = await fetch(`${API_URL}/magazine/initial`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        "Accept-Encoding": "gzip,deflate,br",
        Connection: "keep-alive",
        apiKey: apiKey,
      },
    });

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    const resData = await response.json();

    let loadedOffers = [];

    for (const key in resData.offers) {
      loadedOffers.push({
        id: resData.offers[key].company_id,
        name: resData.offers[key].name,
        town: resData.offers[key].town,
        postcode: resData.offers[key].postcode,
        phone: resData.offers[key].phone,
        mainImage: resData.offers[key].main_image,
        title: resData.offers[key].offer_title,
        subtitle: resData.offers[key].offer_subtitle,
        description: resData.offers[key].offer_desc,
        end: resData.offers[key].end_date,
        distance: resData.offers[key].distance,
        directoryTitle: resData.offers[key].directory_title,
        website: resData.offers[key].website,
        facebook: resData.offers[key].facebook,
        twitter: resData.offers[key].twitter,
        instagram: resData.offers[key].instagram,
        featured: resData.offers[key].featured,
        discountCode: resData.offers[key].discount_code,
        discountAvailable: resData.offers[key].discount_available,
        backgroundImage: resData.offers[key].background_image,
        updatedAt: resData.offers[key].updated_at,
      });
    }

    dispatch({
      type: GET_INFO,
      offers: loadedOffers,
      // featured: loadedFeatured,
      magazine: resData.magazine,
    });
  };
};
