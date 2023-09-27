export function getHttpRequest(zipCodeDisplay, cityListDisplay){
    let url = 'https://geo.api.gouv.fr/communes?codePostal=' + zipCodeDisplay.value;
    console.log(url)
    fetch(url)
    .then(reponse => {
        if(!reponse.ok){
            throw new Error('Error something went wrong');
        } return reponse.json();
    })
    .then(data => {
        createList(data, cityListDisplay)
    })
    .catch(error =>{
        console.error('Error : ', error);
    });
}

function createList(data, cityListDisplay) {
    for(let i = 0; i <= data.length-1; i++){
        let option = document.createElement('option');
        option.value = data[i].code;
        option.textContent = data[i].nom;
        cityListDisplay.appendChild(option);
    }
}
