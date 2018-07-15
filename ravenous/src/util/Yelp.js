
const url = `https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sort_by}`;
const apiKey = "GOTZqYuacQBW6HdnHzTGx6b-4g5zdFUA9-sHabKZEYmamrHww7HuDNlqcxiiLInRT13tlzp7zknmaGrQwR7drf8aJgmjeSbX9vBoUp7GIIb7yORB3XGWx3KNPJ9LW3Yx";
const CORS = "https://cors-anywhere.herokuapp.com/";

const Yelp = {
  function search(term, location, sortBy) {
    return fetch(CORS + url, {
      headers: {
        Authorization: `Bearer ${apiKey}`;
      }
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      if(jsonResponse['business']) {
          jsonResponse.business.map(business => {
          const response = {
            id: business.id,
            imageSrc: business.image_url,
            term: business.name,
            location: {
              business.address,
              business.city,
              business.state,
              business.zipCode
            },
            sortBy: {
              business.category,
              business.rating,
              business.reviewCount
            }
          };
          return response;
        });
      };
    });
  }
};

export default Yelp;

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
