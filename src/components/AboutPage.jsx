// src/components/AboutPage.jsx
import React from 'react';

const AboutPage = () => {
  return (
    <div style={{ padding: '20px', lineHeight: 1.6 }}>
      <h2>Tentang Aplikasi POS Ini</h2>
      <p>
        Aplikasi <strong>Point of Sales (POS)</strong> ini dikembangkan menggunakan React.js
        dengan berbagai teknik optimasi performa modern, seperti:
      </p>
      <ul>
        <li><strong>localStorage</strong> – menyimpan keranjang agar tetap ada setelah refresh</li>
        <li><strong>Memoization</strong> – mencegah render ulang yang tidak perlu</li>
        <li><strong>Code Splitting</strong> – mempercepat waktu muat awal dengan lazy loading</li>
        <li><strong>Virtualization</strong> – menampilkan ribuan data tanpa lag</li>
        <li><strong>Caching</strong> – mempercepat pencarian dengan penyimpanan sementara hasil</li>
      </ul>
      <p>
        Dengan teknik ini, aplikasi mampu menangani hingga <strong>10.000 produk</strong> secara efisien
        dan memberikan pengalaman pengguna yang tetap cepat dan responsif.
      </p>
      <p>
        Dibuat untuk pembelajaran optimasi performa di React sebagai bagian dari Praktik 02 & 03.
      </p>
    </div>
  );
};

export default AboutPage;
