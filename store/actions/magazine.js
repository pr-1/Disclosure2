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
    let loadedFeatured = [];

    for (const key in resData.offers) {
      loadedOffers.push({
        id: resData.offers[key].company_id,
        name: resData.offers[key].name,
        address: resData.offers[key].address,
        town: resData.offers[key].town,
        postcode: resData.offers[key].postcode,
        phone: resData.offers[key].phone,
        imageUrl: resData.offers[key].main_image,
        title: resData.offers[key].offer_title,
        subtitle: resData.offers[key].offer_subtitle,
        description: resData.offers[key].offer_desc,
        start: resData.offers[key].start_date,
        end: resData.offers[key].end_date,
        distance: resData.offers[key].distance,
        bottomImge1: resData.offers[key].bottom_image_1,
        bottomImge2: resData.offers[key].bottom_image_2,
        logo: resData.offers[key].logo_url,
        directoryTitle: resData.offers[key].directory_title,
        website: resData.offers[key].website,
        facebook: resData.offers[key].facebook,
        twitter: resData.offers[key].twitter,
        instagram: resData.offers[key].instagram,
        featured: resData.offers[key].featured,
        discountCode: resData.offers[key].discount_code,
        backgroundImage: resData.offers[key].background_image,
      });
    }

    for (const key in resData.featured) {
      loadedFeatured.push({
        id: resData.featured[key].company_id,
        name: resData.featured[key].name,
        address: resData.featured[key].address,
        town: resData.featured[key].town,
        postcode: resData.featured[key].postcode,
        phone: resData.featured[key].phone,
        imageUrl: resData.featured[key].main_image,
        title: resData.featured[key].offer_title,
        subtitle: resData.featured[key].offer_subtitle,
        description: resData.featured[key].offer_desc,
        start: resData.featured[key].start_date,
        end: resData.featured[key].end_date,
        distance: resData.featured[key].distance,
        bottomImge1: resData.featured[key].bottom_image_1,
        bottomImge2: resData.featured[key].bottom_image_2,
        logo: resData.featured[key].logo_url,
        directoryTitle: resData.featured[key].directory_title,
        website: resData.featured[key].website,
        facebook: resData.featured[key].facebook,
        twitter: resData.featured[key].twitter,
        instagram: resData.featured[key].instagram,
        featured: resData.featured[key].featured,
        discountCode: resData.featured[key].discount_code,
        backgroundImage: resData.featured[key].background_image,
      });
    }

    dispatch({
      type: GET_INFO,
      offers: loadedOffers,
      featured: loadedFeatured,
      magazine: resData.magazine,
    });
  };
};
