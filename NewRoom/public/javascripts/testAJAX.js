function testsubmit() {
  const xhttp = new XMLHttpRequest();
  xhttp.onload = function() {
    document.getElementById("result").innerHTML =
    this.responseText;
  }
  xhttp.open("GET", "submit?username=te&password=1234");
  xhttp.send();
}

function getImg() {
  fetch('https://api.nasa.gov/planetary/apod?api_key=xrZOC6NXnFP0PbRQ3AgFoCdXdR89vxagq3nG5u2q')
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }

      // Examine the text in the response
      response.json().then(function(data) {
        var imgSource = data.url;
        document.getElementById('img').innerHTML = `<img src="${data.url}"/>`;
        document.getElementById('title').innerHTML = `<h1>${data.title}</h1>`;
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
}