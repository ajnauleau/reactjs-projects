
// async await POST

async function getData() {
  try {
    const response = await fetch('https://api-to-call.com/endpoint', {
      method: 'POST',
      body: JSON.stringify({id: '200'})
    });
    if (response.ok) {
      const jsonResponse = await response.json();
      //Code to be executed with jsonResponse
    }
    throw new Error('Request Failed!');
  } catch (error) {
    console.log(error);
  }
}
