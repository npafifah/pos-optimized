# Laporan React Query – Optimasi Cache POS

## 1. Perbandingan Waktu Respons
      Sebelum menggunakan React Query, proses pencarian produk masih memakai state dan custom cache (Map/localStorage). Setiap perubahan input menyebabkan filter ulang terhadap 10 000 data produk.
•	Sebelum React Query: rerender & filter ulang terjadi di setiap ketikan, waktu respons ± 150 – 250 ms.
•	Sesudah React Query (cache aktif): hasil pencarian yang sama diambil langsung dari cache React Query, waktu respons turun jadi < 20 ms.
   ->	Network (Cache Hit)
      Menunjukkan hasil pencarian kedua tidak mengirim request baru ke jaringan → data diambil dari cache memori React Query.


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
