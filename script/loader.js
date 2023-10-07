window.addEventListener('load', async function () {
    hideContent();
    await setTimeout(function () {
        hideLoader();
        showContent();
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
    document.querySelector('header').style.display = 'none'
    document.querySelector('main').style.display = 'none'
    document.querySelector('footer').style.display = 'none'
}

/**
 * This function is used to display the content of the page
 */
function showContent() {
    document.querySelector('header').style.display = ''
    document.querySelector('main').style.display = ''
    document.querySelector('footer').style.display = ''
}