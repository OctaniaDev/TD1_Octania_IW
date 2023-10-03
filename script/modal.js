export function setupModal() {
    document.addEventListener("DOMContentLoaded", function () {
        const openModalBtn = document.getElementById("open-modal-btn");
        const modal = document.getElementById("modal");
        const closeModalBtn = document.getElementById("close-modal-btn");

        openModalBtn.addEventListener("click", function () {
            modal.style.display = "block";
        });

        closeModalBtn.addEventListener("click", function () {
            modal.style.display = "none";
        });

        window.addEventListener("click", function (event) {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });
    });
}
