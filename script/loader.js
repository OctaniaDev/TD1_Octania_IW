window.addEventListener('load', async function () {
    hideContent();
    await setTimeout(function () {
        hideLoader();
        showContent();
        animateTitlesAndInputOnLoad();
    }, 2000);
});

/**
 * This function is used to hide the loader
 */
function hideLoader() {
    const loaderContainer = document.querySelector('.loader-container');
    loaderContainer.style.display = 'none';
}

/**
 * This function is used to hide the content of the page
 */
function hideContent() {
    document.querySelector('header').style.display = 'none';
    document.querySelector('main').style.display = 'none';
    document.querySelector('footer').style.display = 'none';
}

/**
 * This function is used to display the content of the page
 */
function showContent() {
    document.querySelector('header').style.display = '';
    document.querySelector('main').style.display = '';
    document.querySelector('footer').style.display = '';
}

function animateTitlesAndInputOnLoad() {
    const h1Title = document.querySelector(".h1-title");
    const heroTitle = document.querySelector(".hero-title-main");
    const zipCodeInput = document.getElementById("zip-code-input");
    const button = document.getElementById("open-modal-btn")

    h1Title.style.opacity = "0";
    h1Title.style.transform = "translateY(20px)";

    button.style.opacity = "O";
    button.style.transform = "translateY(20px)";


    heroTitle.style.opacity = "0";
    heroTitle.style.transform = "translateY(20px)";

    zipCodeInput.style.opacity = "0";
    zipCodeInput.style.transform = "translateY(20px)";

    setTimeout(() => {
        heroTitle.style.opacity = "1";
        heroTitle.style.transform = "translateY(0)";
    }, 300);

    setTimeout(() => {
        h1Title.style.opacity = "1";
        h1Title.style.transform = "translateY(0)";
    }, 500);

    setTimeout(() => {
        zipCodeInput.style.opacity = "1";
        zipCodeInput.style.transform = "translateY(0)";
    }, 700);

    setTimeout(() => {
        button.style.opacity = "1";
        button.style.transform = "translateY(0)";
    }, 900);
}
