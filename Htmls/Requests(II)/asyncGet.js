
//async await GET

async function getData() {
  try {
    const response = await fetch('https://apit-to-capp.com/endpoint');
    if(response.ok) {
      const jsonResponse = await response.json();
      //Code to execute with jsonResponse
    }
    throw new Error('Request Failed!');
  } catch(error) {
    console.log(error);
  }
}
