# Zyhuka — Frontend UI demo

Project React/Vite mandiri yang menampilkan UI bergaya API console dengan brand Zyhuka. Ini frontend demo tanpa backend dan tanpa panggilan ke API/upstream. Browser tetap memuat aset situs; katalog JSON statis baru dimuat saat membuka Playground.

## Menjalankan

```bash
npm install
npm run dev
```

Buka alamat lokal yang ditampilkan Vite. Untuk build dan preview statis:

```bash
npm run build
npm run preview
```

## Route

- `/` — landing page dan FAQ untuk frontend demo.
- `/playground` — filter/pencarian katalog sample berisi 197 path dan 394 operasi GET/POST; katalog dimuat saat route dibuka, lalu form dan respons disimulasikan lokal.
- `/monitor` — chart, event, dan metrik sample yang jelas ditandai sebagai data demo.
- `/terms` dan `/privacy` — placeholder UI copy dengan banner “Draft · not legally effective”.

Tombol **Simulate request** tidak memanggil server. Contoh cURL memakai host `.invalid` yang dicadangkan dan hanya untuk tampilan/copy; tidak dieksekusi. Katalog berasal dari snapshot OpenAPI yang disalin ke file project, bukan diambil saat aplikasi berjalan.

Sebelum digunakan sebagai produk publik, ganti seluruh sample data dan draft policy; jangan menganggap angka demo atau teks kebijakan sebagai informasi operasional atau kebijakan yang berlaku.
