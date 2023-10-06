window.addEventListener('load', async function () {
    hideContent();
    await setTimeout(function () {
        hideLoader();
        showContent();
    }, 2000);
});

function hideLoader() {
    const loaderContainer = document.querySelector('.loader-container');
    loaderContainer.style.display = 'none';
}

function hideContent() {
    document.querySelector('header').style.display = 'none'
    document.querySelector('main').style.display = 'none'
    document.querySelector('footer').style.display = 'none'
}

function showContent() {
    document.querySelector('header').style.display = ''
    document.querySelector('main').style.display = ''
    document.querySelector('footer').style.display = ''
}