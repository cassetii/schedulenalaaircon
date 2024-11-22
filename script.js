document.getElementById('scheduleForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Ambil data dari form
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const acType = document.getElementById('acType').value;
    const serviceType = document.getElementById('serviceType').value;
    const unitCount = document.getElementById('unitCount').value;
    const scheduleDate = document.getElementById('scheduleDate').value;
    const scheduleTime = document.getElementById('scheduleTime').value;

    // Konversi jenis layanan ke teks
    const serviceTypeText = {
        cuci_ac: "Cuci AC",
        servis_ac: "Servis AC",
        bongkar_pasang_ac: "Bongkar Pasang AC",
        isi_freon: "Isi Freon"
    }[serviceType];

    if (name && phone && address && acType && serviceType && unitCount && scheduleDate && scheduleTime) {
        // Format pesan untuk pop-up
        const confirmationText = 
            `Terima kasih, ${name}. Pemesanan Anda untuk ${unitCount} unit AC tipe ${acType} dengan layanan ${serviceTypeText} telah dijadwalkan pada ${scheduleDate} pukul ${scheduleTime}.`;
        
        // Tampilkan pesan di modal
        document.getElementById('confirmationMessage').innerText = confirmationText;
        const modal = document.getElementById('confirmationModal');
        modal.style.display = 'block';

        // Siapkan data untuk WhatsApp
        const waMessage = 
            `Halo, saya ingin memesan jasa dengan rincian berikut:\n\n` +
            `Nama: ${name}\n` +
            `Nomor Telepon: ${phone}\n` +
            `Alamat: ${address}\n` +
            `Tipe AC: ${acType}\n` +
            `Jenis Layanan: ${serviceTypeText}\n` +
            `Jumlah Unit: ${unitCount}\n` +
            `Tanggal Pemesanan: ${scheduleDate}\n` +
            `Waktu Pemesanan: ${scheduleTime}\n\nTerima kasih.`;
        const waLink = `https://wa.me/6282348926717?text=${encodeURIComponent(waMessage)}`;

        // Klik tombol "Kirim Pemesanan" mengarahkan ke WhatsApp
        setTimeout(() => {
            window.location.href = waLink;
        }, 3000); // Tunggu 3 detik sebelum diarahkan ke WhatsApp
    } else {
        alert("Mohon isi semua data dengan benar!");
    }

    // Tutup modal saat klik 'x'
    document.getElementById('closeModal').onclick = function() {
        document.getElementById('confirmationModal').style.display = 'none';
    };

    // Tutup modal saat klik di luar modal
    window.onclick = function(event) {
        const modal = document.getElementById('confirmationModal');
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
});
