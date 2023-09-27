let cityNameDisplay = document.getElementById('cityNameSelect');

export function getHttpRequest(zipCodeDisplay){
    let url = 'https://geo.api.gouv.fr/communes?codePostal=' + zipCodeDisplay.value;
    fetch(url)
    .then(reponse => {
        if(!reponse.ok){
            throw new Error('Error something went wrong');
        } return reponse.json();
    })
    .then(data => {
        displayList(data)
    })
    .catch(error =>{
        console.error('Error : ', error);
    });
}

function displayList(data) {
    cityNameDisplay.innerHTML = '<option value="">Choose your city...</option>';
    for(let i = 0; i <= data.length-1; i++){
        let option = document.createElement('option');
        option.value = data[i].nom;
        option.textContent = data[i].nom;
        cityNameDisplay.appendChild(option);
    }
}
