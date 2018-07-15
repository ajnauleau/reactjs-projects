const apiKey = 'GOTZqYuacQBW6HdnHzTGx6b-4g5zdFUA9-sHabKZEYmamrHww7HuDNlqcxiiLInRT13tlzp7zknmaGrQwR7drf8aJgmjeSbX9vBoUp7GIIb7yORB3XGWx3KNPJ9LW3Yx';

const Yelp = {
  search(term, location, sortBy) {

    // const url = `https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`;
    // const CORS = "https://cors-anywhere.herokuapp.com/";
    // const urlAppended = CORS + url;

    return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`
      }
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      if(jsonResponse.businesses) {
          return jsonResponse.businesses.map(business => ({
            id: business.id,
            imageSrc: business.image_url,
            term: business.name,
            address: business.location.address1,
            city:  business.location.city,
            state:  business.location.state,
            zipCode:  business.location.zip_code,
            category: business.categories[0].title,
            rating: business.rating,
            reviewCount:  business.review_count
        }));
      }
    });
  }
};

export default Yelp;


/*

const yelpAPI = async() {

  const
  const promise = await fetch(CORS + url, {
    method: 'POST',
    body: JSON.stringify(data),
    status: ({id: 200})
  });

  try {

    if(response.ok) {

      let responded = response.json();

  } catch(error) {

    console.log(error);

    }

    throw new error('Network connection error');

  }.then(networkError,)

}

*/
