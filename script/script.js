document.addEventListener("DOMContentLoaded", function(){
    const submitForm = document.getElementById("inputBook");
    submitForm.addEventListener("submit", function(event) {
        event.preventDefault();
        addBook();
    });

    // fitur pencarian
    const submitSearch = document.getElementById("searchBook");
    submitSearch.addEventListener("submit", function(event) {
        event.preventDefault();
        searchBook();
    });

    if (isStorageExist()) {
        loadDataFromStorage();
    }
});

// Mengganti tulisan di tombol submit
const isFinished = document.querySelector("input[name=check]");
const shelfName = document.getElementById("keterangan");
isFinished.addEventListener("change", function() {
    if (this.checked) {
        shelfName.innerText = "Selesai dibaca";
    } else {
        shelfName.innerText = "Belum selesai dibaca";
    }
});

document.addEventListener("ondatasaved", () => {
    console.log("Data berhasil disimpan.");
});

document.addEventListener("ondataloaded", () => {
    refreshDataFromTodos();
});