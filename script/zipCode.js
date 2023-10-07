/**
 * This function make the request to the API
 * @param {String} zipCodeDisplay Values from input
 * @returns {Array} Array with all datas about the zip code
 */
export function getRequestResult(zipCodeDisplay){
    let url = 'https://geo.api.gouv.fr/communes?codePostal=' + zipCodeDisplay.value;
    return fetch(url)
    .then(reponse => {
        if(!reponse.ok)
            throw new Error('Error something went wrong');
        return reponse.json();
    })
}

/**
 * This function takes numbers from the input and make
 * @param {Array} data Information about zip code like city name, insee code, ...
 * @param {Element} list Select elements
 */
export function createList(data, list) {
    list.innerHTML ='<option value="default">Choose your city...</option>'
    for(let i = 0; i <= data.length-1; i++){
        let option = document.createElement('option');
        option.value = data[i].code;
        option.textContent = data[i].nom;
        list.appendChild(option);
    }
}
