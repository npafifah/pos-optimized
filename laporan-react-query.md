# 🧾 Laporan Praktikum – Optimasi POS dengan React Query

## 📊 Perbandingan Sebelum & Sesudah React Query

Sebelum menggunakan **React Query**, data produk dan hasil pencarian dikelola manual dengan `useState`, `useEffect`, dan custom cache (menggunakan `Map` atau `localStorage`).  
Setiap kali pengguna mengetik kata kunci baru, aplikasi mem-filter ulang seluruh 10.000 data produk.

**🔹 Hasil Pengamatan (dari DevTools Network & Profiler):**
- **Sebelum React Query:** rerender & re-filter terjadi setiap perubahan input, waktu respons sekitar **120–250 ms**.  
- **Sesudah React Query (cache aktif):** hasil pencarian yang sama langsung diambil dari cache React Query tanpa filter ulang, waktu respons turun menjadi **< 20 ms**.

📸 **Screenshot Network Tab:** menunjukkan “(memory cache)” pada pencarian kedua. 

![Network Cache](./public/screenshots/network-cache.png)

📸 **Screenshot Profiler Tab:** render time menurun drastis setelah cache aktif.

![Profiler Cache](./public/screenshots/profiler-cache.png)

---

## 2. Cara React Query Mengelola Cache
React Query otomatis:
- Menyimpan hasil query berdasarkan `queryKey`.
- Mengembalikan data dari cache bila `queryKey` sama.
- Memperbarui cache saat data berubah (revalidate).
- Menghapus cache lama berdasarkan `staleTime`.

---

## 3. Keuntungan React Query dibanding Custom Cache
| Custom Cache (Map/localStorage) | React Query |
|----------------------------------|--------------|
| Harus buat logika cache sendiri. | Cache otomatis & efisien. |
| Tidak ada invalidation otomatis. | Ada revalidate & TTL bawaan. |
| Tidak sinkron antar komponen. | Sinkron antar komponen otomatis. |

---

## 4. Kesimpulan
Menggunakan cache (React Query / localStorage) **meningkatkan performa aplikasi**,  
karena data tidak selalu difilter ulang.  
React Query lebih baik karena memiliki mekanisme cache otomatis, validasi data, dan optimasi render.
