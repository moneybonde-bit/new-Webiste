# Luxavian Studio - Form Integration Guide

Untuk integrasi form Contact ke Google Sheets dengan metode paling mudah (tanpa backend rumit), kami menggunakan metode submit form ke endpoint custom.

Berikut adalah langkah-langkah **Google Apps Script (Option 2)** yang sangat mudah:

### 1. Buat Spreadsheet Baru
1. Buka [Google Sheets](https://docs.google.com/spreadsheets).
2. Buat file baru dengan nama "Luxavian Project Requests".
3. Di baris pertama (Row 1), buat header kolom yang sama persis dengan name field pada form:
   - `name`
   - `email`
   - `whatsapp`
   - `company`
   - `projectType`
   - `budget`
   - `description`
   - `date` (opsional)

### 2. Buat Google Apps Script
1. Di Google Sheets, klik menu **Extensions > Apps Script**.
2. Hapus semua kode default dan paste kode berikut:

```javascript
var sheetName = 'Sheet1'; // Ganti jika nama sheet berbeda
var scriptProp = PropertiesService.getScriptProperties();

function initialSetup () {
  var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  scriptProp.setProperty('key', activeSpreadsheet.getId());
}

function doPost (e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var doc = SpreadsheetApp.openById(scriptProp.getProperty('key'));
    var sheet = doc.getSheetByName(sheetName);

    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var nextRow = sheet.getLastRow() + 1;

    var newRow = headers.map(function(header) {
      return header === 'date' ? new Date() : e.parameter[header];
    });

    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow]);

    // Opsi: Kirim Email Notifikasi
    MailApp.sendEmail({
      to: "email_anda@gmail.com", // Ganti dengan email Anda
      subject: "New Project Request - Luxavian Studio",
      body: "Ada request baru dari " + e.parameter.name + "\\nEmail: " + e.parameter.email + "\\nProject Type: " + e.parameter.projectType + "\\n\\nCek selengkapnya di Google Sheet."
    });

    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success', 'row': nextRow }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  catch (e) {
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': e }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  finally {
    lock.releaseLock();
  }
}
```

### 3. Deploy Script
1. Jalankan fungsi `initialSetup` terlebih dahulu (pilih `initialSetup` di dropdown fungsi lalu klik tombol Run). Anda akan diminta untuk memberikan izin otorisasi.
2. Klik **Deploy > New deployment**.
3. Pilih tipe deployment: **Web app**.
4. Description: "v1".
5. Execute as: **Me**.
6. Who has access: **Anyone**.
7. Klik **Deploy**.
8. Salin **Web app URL** yang diberikan.

### 4. Hubungkan dengan Website
Buka file `src/sections/Contact.tsx`. Pada fungsi `onSubmit`, Anda hanya perlu memanggil URL tersebut (ganti `YOUR_WEB_APP_URL` dengan URL yang Anda salin):

```javascript
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      const formData = new FormData();
      Object.keys(data).forEach(key => formData.append(key, data[key]));

      await fetch("YOUR_WEB_APP_URL", {
        method: "POST",
        body: formData,
        mode: "no-cors"
      });

      setSuccess(true);
      reset();
      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };
```

Dengan integrasi ini, data klien akan secara otomatis masuk ke dalam Google Sheets dan Anda akan menerima email notifikasi, semua tanpa backend database tambahan.
