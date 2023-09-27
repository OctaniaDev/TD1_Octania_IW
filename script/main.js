import * as zipCode from "./zipCode.js"

let zipCodeDisplay = document.getElementById('zipCodeInput');

zipCodeDisplay.addEventListener('keypress', e => {
    if (e.key === 'Enter')
        zipCode.getHttpRequest(zipCodeDisplay)
})