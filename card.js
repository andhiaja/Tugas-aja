const app = document.getElementById("app");

// ====== DATA ======
function getAbsensi() {
    return JSON.parse(localStorage.getItem("absensi")) || [];
}

function saveAbsensi(data) {
    localStorage.setItem("absensi", JSON.stringify(data));
}

// ====== COMPONENT ======
function HomeCard() {
    return `
        <h3>Home</h3>
        <p>Aplikasi ini digunakan untuk mencatat kehadiran mahasiswa.</p>
    `;
}

function FormAbsenCard() {
    return `
        <h3>Form Absensi</h3>
        <input id="nama" placeholder="Nama Mahasiswa">
        <input id="nim" placeholder="NIM">
        <input id="kelas" placeholder="Kelas">
        <button onclick="submitAbsen()">Absen</button>
    `;
}

function DataAbsenCard() {
    const data = getAbsensi();
    const rows = data.map(d => `
        <tr>
            <td>${d.nama}</td>
            <td>${d.nim}</td>
            <td>${d.kelas}</td>
            <td>${d.waktu}</td>
        </tr>
    `).join("");

    return `
        <h3>Data Kehadiran</h3>
        <table>
            <tr>
                <th>Nama</th>
                <th>NIM</th>
                <th>Kelas</th>
                <th>Waktu</th>
            </tr>
            ${rows}
        </table>
    `;
}

// ====== ACTION ======
function submitAbsen() {
    const nama = document.getElementById("nama").value;
    const nim = document.getElementById("nim").value;
    const kelas = document.getElementById("kelas").value;

    if (!nama || !nim || !kelas) {
        alert("Data belum lengkap!");
        return;
    }

    const data = getAbsensi();
    data.push({
        nama,
        nim,
        kelas,
        waktu: new Date().toLocaleString()
    });

    saveAbsensi(data);
    alert("Absensi berhasil!");
    location.hash = "#/data";
}

// ====== ROUTING ======
function router() {
    const route = location.hash;

    if (route === "#/absen") {
        app.innerHTML = FormAbsenCard();
    } else if (route === "#/data") {
        app.innerHTML = DataAbsenCard();
    } else {
        app.innerHTML = HomeCard();
    }
}

window.addEventListener("hashchange", router);
router();
