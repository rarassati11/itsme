const labels = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
];
const datasets = [
    {
        label: "2022",
        data: [4017, 6135, 7091, 5841, 5036, 4547, 3467, 3970, 6313, 3595, 9207, 5945],
        backgroundColor: "rgba(54, 162, 235, 1)",
    },
    {
        label: "2023",
        data: [2416, 4136, 7935, 8004, 9505, 5026, 6108, 6343, 9404, 9280, 9287, 8689],
        backgroundColor: "rgba(255, 99, 132, 1)",
    }
];

const ctx = document.getElementById("penjualanChart").getContext("2d");
const penjualanChart = new Chart(ctx, {
    type: "bar",
    data: {
        labels: labels,
        datasets: datasets
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                suggestedMax: 10000
            }
        }
    }
});





// Menyimpan dataset yang baru ditambahkan untuk dihapus berdasarkan tahun
let tahunDatasetMap = {}; 

function addData() {
    const tahun = document.getElementById("tahun").value;
    const data = [
        document.getElementById("januari").value,
        document.getElementById("februari").value,
        document.getElementById("maret").value,
        document.getElementById("april").value,
        document.getElementById("mei").value,
        document.getElementById("juni").value,
        document.getElementById("juli").value,
        document.getElementById("agustus").value,
        document.getElementById("september").value,
        document.getElementById("oktober").value,
        document.getElementById("november").value,
        document.getElementById("desember").value
    ];

    // Validasi input
    if (!tahun || data.includes("") || data.some(isNaN)) {
        alert("Harap isi semua bulan dengan data yang valid!");
        return;
    }

    // Tambahkan ke dataset grafik
    const newDataset = {
        label: tahun,
        data: data.map(Number), // Mengubah data menjadi angka
        backgroundColor: getRandomColor()
    };

    datasets.push(newDataset);
    tahunDatasetMap[tahun] = newDataset; // Simpan dataset yang baru ditambahkan berdasarkan tahun

    // Update dropdown tahun untuk memilih tahun yang akan dihapus
    const tahunHapusSelect = document.getElementById("tahunHapus");
    const option = document.createElement("option");
    option.value = tahun;
    option.textContent = tahun;
    tahunHapusSelect.appendChild(option);

    penjualanChart.update();

    // Tambahkan ke tabel
    const table = document.getElementById("salesTable").getElementsByTagName("tbody")[0];
    let newRow = `<tr><td>${tahun}</td>`;
    data.forEach(value => newRow += `<td>${value}</td>`);
    newRow += `</tr>`;
    table.innerHTML += newRow;

    // Bersihkan input
    document.getElementById("tahun").value = "";
    document.querySelectorAll("#bulanInputs input").forEach(input => input.value = "");
}

// Fungsi untuk menghapus data berdasarkan tahun yang dipilih
function hapusData() {
    const tahunHapus = document.getElementById("tahunHapus").value;

    if (!tahunHapus) {
        alert("Harap pilih tahun yang ingin dihapus!");
        return;
    }

    // Hapus dataset yang dipilih berdasarkan tahun
    const datasetIndex = datasets.findIndex(dataset => dataset.label === tahunHapus);
    if (datasetIndex !== -1) {
        datasets.splice(datasetIndex, 1); // Hapus dataset dari array
        penjualanChart.update();
    }

    // Hapus baris tabel berdasarkan tahun
    const table = document.getElementById("salesTable").getElementsByTagName("tbody")[0];
    const rows = table.getElementsByTagName("tr");
    for (let i = 0; i < rows.length; i++) {
        const yearCell = rows[i].cells[0];
        if (yearCell && yearCell.textContent === tahunHapus) {
            table.deleteRow(i);
            break;
        }
    }

    // Hapus tahun dari dropdown
    const tahunHapusSelect = document.getElementById("tahunHapus");
    const optionToRemove = tahunHapusSelect.querySelector(`option[value="${tahunHapus}"]`);
    if (optionToRemove) {
        tahunHapusSelect.removeChild(optionToRemove);
    }
}

    
// Fungsi untuk menghasilkan warna acak
function getRandomColor() {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgba(${r}, ${g}, ${b}, 1)`;
}
