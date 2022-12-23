class Product {
  constructor(companyId, name, address, town, postcode, phone, imageUrl, title, subtitle, description, start, end, distance, bottomImage1, bottomImage2, logoUrl, directoryTitle, website, facebook, twitter, instagram) {
    this.id = companyId;
    this.name = name;
    this.address = address;
    this.town = town;
    this.postcode = postcode;
    this.phone = phone;
    this.imageUrl = imageUrl;
    this.title = title;
    this.subtitle = subtitle;
    this.description = description;
    this.start = start;
    this.end = end;
    this.distance = distance;
    this.bottomImage1 = bottomImage1;
    this.bottomImage2 = bottomImage2;
    this.logo = logoUrl;
    this.directoryTitle = directoryTitle;
    this.website = website;
    this.facebook = facebook;
    this.twitter = twitter;
    this.instagram = instagram;
  }
}

export default Product;
