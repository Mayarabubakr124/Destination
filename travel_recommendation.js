

function searchKeyword() {

  const input = document.getElementById('conditionInput').value.toLowerCase();
  const resultDiv = document.getElementById('results');
  resultDiv.innerHTML = '';


  fetch('travel_recommendation_api.json')
    .then(response => response.json())
    .then(data => {

      // 4. Match the keyword to a category  (replaces condition.find() from practice lab)
      let recommendations = [];

      if (input.includes('beach')) {
        recommendations = data.beaches;

      } else if (input.includes('temple')) {
        recommendations = data.temples;

      } else if (input.includes('country') || input.includes('countri')) {
        // countries have nested cities — flatten them all into one array
        data.countries.forEach(country => {
          recommendations = recommendations.concat(country.cities);
        });

      } else {
        // no match found  (same else block as practice lab)
        resultDiv.innerHTML = 'Condition not found.';
        return;
      }

      // 5. Build the HTML and inject it  (same innerHTML pattern as practice lab)
      resultDiv.innerHTML = '<h2>Search Results</h2>';

      const grid = document.createElement('div');
      grid.classList.add('results-grid');

      recommendations.forEach(place => {
        grid.innerHTML += `
          <div class="result-card">
            <img src="${place.imageUrl}" alt="${place.name}">
            <h3>${place.name}</h3>
            <p>${place.description}</p>
          </div>
        `;
      });

      resultDiv.appendChild(grid);
    })

    .catch(error => {
      console.error('Error:', error);
      const resultDiv = document.getElementById('results');
      resultDiv.innerHTML = 'An error occurred while fetching data.';
    });
}

function clearResults() {
  document.getElementById('results').innerHTML = '';
  document.getElementById('conditionInput').value = '';
}

document.getElementById('btnSearch').addEventListener('click', searchKeyword);
document.getElementById('btnClear').addEventListener('click', clearResults);