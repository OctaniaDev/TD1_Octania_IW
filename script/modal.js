/**
 * This is used to setup the modal window and it as event listeners to see if options are selected
 */
export function setupModal() {
    document.addEventListener("DOMContentLoaded", function () {
        const openModalBtn = document.getElementById("open-modal-btn");
        const modal = document.getElementById("modal");
        const closeModalBtn = document.getElementById("close-modal-btn");
        const closeCross = document.getElementById("close-cross");
        const saveModalBtn = document.getElementById("save-modal-btn");
        const resetModalBtn = document.getElementById("reset-modal-btn");

        openModalBtn.addEventListener("click", function () {
            modal.style.display = "block";
        });

        closeModalBtn.addEventListener("click", function () {
            modal.style.display = "none";
        });

        closeCross.addEventListener("click", function () {
            modal.style.display = "none";
        });

        resetModalBtn.addEventListener("click", function () {
            modal.style.display = "none";
        });

        saveModalBtn.addEventListener("click", function () {
            modal.style.display = "none";
        });

        window.addEventListener("click", function (event) {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });
    });
}
