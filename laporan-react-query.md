# Laporan React Query – Optimasi Cache POS

## 1. Perbandingan Waktu Respons
- Sebelum React Query: filtering dilakukan manual pada 10.000 produk.
  - Rerender terjadi tiap input berubah.
  - Waktu respons ± 150–250 ms.
- Sesudah React Query: data pencarian disimpan di cache.
  - Jika keyword sama, data diambil langsung dari cache.
  - Waktu respons turun menjadi < 20 ms.

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
