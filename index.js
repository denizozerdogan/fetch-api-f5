
const countriesList = document.getElementById("countries-list");

fetch("https://restcountries.com/v3.1/all")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((country) => {
      const countryName = country.name.common;
      const flagURL = country.flags.png;
      const officialName = country.name?.official;
      const region = country.region;
      const capital = country.capital ? country.capital[0] : "N/A";
      const subregion = country.subregion;
      const languages = Object.values(country.languages); 
      const countryCode = country.cca3;

      const countryElement = document.createElement("div");
      countryElement.classList.add("country-card");

      const countryCardHTML = `
          <h2>${countryName}</h2>
          <img src="${flagURL}" alt="${countryName} Flag" width="150">
        </div>
            <div class="country-details">
            <p><strong>Official Name:</strong> ${officialName}</p>
            <p><strong>Region:</strong> ${region}</p>
            <p><strong>Subregion:</strong> ${subregion}</p>
            <p><strong>Capital:</strong> ${capital}</p>
            <p><strong>Languages:</strong> ${languages}</p>
            </div>
        `;
        countryElement.innerHTML = countryCardHTML;

        countryElement.addEventListener('click', () => {
            fetch(`https://api.geodatasource.com/v2/neighboring-countries&country_code=${countryCode}`, {
            })
            .then(response => response.json())
            .then(neighbors => {
                const neighborsList = neighbors.map(neighbor => neighbor.countryName);
                const neighborsElement = document.createElement('div');
                neighborsElement.innerHTML = `
                    <h3>Países vecinos de ${countryName}:</h3>
                    <ul>
                        ${neighborsList.map(neighbor => `<li>${neighbor}</li>`).join('')}
                    </ul>
                `;
        
                countryElement.appendChild(neighborsElement);
            })
            .catch(error => console.error('Error:', error));
        });

      countriesList.appendChild(countryElement);
    });
  })

  .catch((error) => console.error("Error:", error));
