//Replace 14930 by input id
let zipCode = "14930";

zipCodeHttpRequest();

/**
 * Use geo.api to return all city for an zip code and display it in the console
 */
async function zipCodeHttpRequest(){
    let url = 'https://geo.api.gouv.fr/communes?codePostal=' + zipCode;
    fetch(url)
    .then(reponse => {
        if(!reponse.ok){
            throw new Error('Error something went wrong');
        } return reponse.json();
    })
    .then(data => {
        for(let i = 0; i <= data.length-1; i++){
            console.log(data[i].nom + " - " + data[i].code)
        }
    })
    .catch(error =>{
        console.error('Error : ', error);
    });
}
