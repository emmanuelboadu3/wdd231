// Extract query parameters from the URL
const myInfo = new URLSearchParams(window.location.search);

// Log extracted values (optional for debugging)
console.log({
    first: myInfo.get('first'),
    last: myInfo.get('last'),
    ordinance: myInfo.get('ordinance'),
    date: myInfo.get('date'),
    location: myInfo.get('location'),
    phone: myInfo.get('phone'),
    email: myInfo.get('email')
});

// Display the information in the results section
document.querySelector('#results').innerHTML = `
  <p>Appointment for ${myInfo.get('first')} ${myInfo.get('last')}</p>
  <p>Proxy ${myInfo.get('ordinance')} on ${myInfo.get('date')} in the ${myInfo.get('location')}</p>
  <p>Your Phone: ${myInfo.get('phone')}</p>
  <p>Your email is ${myInfo.get('email')}</p>
`;

