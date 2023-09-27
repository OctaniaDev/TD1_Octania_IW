export function getHttpRequest(zipCodeDisplay){
    let url = 'https://geo.api.gouv.fr/communes?codePostal=' + zipCodeDisplay.value;
    return fetch(url)
    .then(reponse => {
        if(!reponse.ok)
            throw new Error('Error something went wrong');
        return reponse.json();
    })
}

export function createList(data, list) {
    list.innerHTML ='<option value="default">Choose your city...</option>'
    for(let i = 0; i <= data.length-1; i++){
        let option = document.createElement('option');
        option.value = data[i].code;
        option.textContent = data[i].nom;
        list.appendChild(option);
    }
}
