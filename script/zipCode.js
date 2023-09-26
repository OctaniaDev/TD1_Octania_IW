let zipCode = document.getElementById('zipCodeInput');
let cityName = document.getElementById('cityNameSelect');

// zipCodeHttpRequest();

// LISTENER
zipCode.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      zipCodeHttpRequest();
      console.log(zipCode.value);
    }
});



/**
 * Use geo.api to return all city for an zip code and display it in the console
 */
function zipCodeHttpRequest(){
    let url = 'https://geo.api.gouv.fr/communes?codePostal=' + zipCode.value;
    cityName.innerHTML = '<option value="">Choose your city...</option>';
    fetch(url)
    .then(reponse => {
        if(!reponse.ok){
            throw new Error('Error something went wrong');
        } return reponse.json();
    })
    .then(data => {
        for(let i = 0; i <= data.length-1; i++){
            console.log(data[i].nom + " - " + data[i].code)
            let option = document.createElement('option');
            option.value = data[i].nom;
            option.textContent = data[i].nom;
            cityName.appendChild(option);
        }
    })
    .catch(error =>{
        console.error('Error : ', error);
    });
}
