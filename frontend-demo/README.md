# Zyhuka — Frontend UI demo

Project React/Vite mandiri yang menampilkan UI bergaya API console dengan brand Zyhuka. Ini hanya frontend preview: tidak ada backend, tidak ada koneksi API, dan tidak ada request jaringan.

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
- `/playground` — filter/pencarian katalog sample berisi 197 path dan 394 operasi GET/POST; form dan respons disimulasikan lokal.
- `/monitor` — chart, event, dan metrik sample yang jelas ditandai sebagai data demo.
- `/terms` dan `/privacy` — placeholder UI copy dengan banner “Draft · not legally effective”.

Tombol **Simulate request** tidak memanggil server. Contoh cURL memakai host `.invalid` yang dicadangkan dan hanya untuk tampilan/copy; tidak dieksekusi. Katalog berasal dari snapshot OpenAPI yang sudah disalin ke file project, bukan diambil saat aplikasi berjalan.

Sebelum digunakan sebagai produk publik, ganti seluruh sample data dan draft policy; jangan menganggap angka demo atau teks kebijakan sebagai informasi operasional atau kebijakan yang berlaku.
