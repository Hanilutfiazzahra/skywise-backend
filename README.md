# Skywise Backend

Backend NestJS untuk Skywise, platform belajar astronomi untuk pemula dan anak-anak. Backend ini mengelola data **Materi (Lesson)** dengan struktur MVC (Controller, Service, Entity) dan dipakai oleh frontend React di repo skywise-react.

Frontend: https://github.com/Hanilutfiazzahra/skywise-react

## Menjalankan

```
npm install
npm run start:dev
```

Server berjalan di http://localhost:3000. Frontend (http://localhost:5173) diizinkan lewat CORS.

Data disimpan sementara dalam array di memori, jadi kembali ke data awal setiap server dijalankan ulang.

## Endpoint

| Method | Path | Fungsi |
|---|---|---|
| GET | /lessons | Ambil semua materi |
| GET | /lessons/:id | Ambil satu materi |
| POST | /lessons | Tambah materi |
| PATCH | /lessons/:id | Ubah sebagian data materi |
| DELETE | /lessons/:id | Hapus materi |

## Data Materi

| Field | Tipe | Keterangan |
|---|---|---|
| id | string | dibuat otomatis oleh server |
| title | string | 3 sampai 100 karakter, tidak boleh kembar |
| theme | string | salah satu dari lima tema Skywise |
| description | string | 5 sampai 300 karakter |
| icon | string | opsional |
| content | string | opsional |
| funFact | string | opsional |
| level | number | opsional, 1 sampai 3 |
| published | boolean | opsional |
| publishedAt | string tanggal | opsional, format ISO |

## Validasi dan Error

- Validasi memakai class-validator (`@IsString`, `@IsNotEmpty`, `@MinLength`, `@MaxLength`, `@IsIn`, `@IsOptional`, `@IsInt`, `@Min`, `@Max`, `@IsBoolean`, `@IsDateString`) dan `ValidationPipe` global di `main.ts`.
- 404 `NotFoundException` saat id materi tidak ditemukan.
- 409 `ConflictException` saat judul materi sudah ada.

## Pengujian

Seluruh request tes ada di `docs/lessons.http` (ekstensi REST Client di VS Code). Screenshot hasilnya ada di `docs/screenshots`.
