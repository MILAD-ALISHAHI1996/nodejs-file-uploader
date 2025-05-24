# 📁 File Upload API with Node.js + Express + Multer

This project is a complete solution for uploading files (images, videos, documents) to a Node.js server using Express and Multer. It supports multiple uploads, format filtering, and file deletion.

---

## ✨ Features

✅ Upload multiple **images**, **videos**, or **documents**  
✅ File type filtering (MIME type checking)  
✅ Get file info like size, original name, and server URL  
✅ Delete uploaded files from the server  
✅ Simple, clean, and modular structure  
✅ Easy to extend and integrate

---

## ⚙️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Node.js** | Server-side runtime |
| **Express.js** | HTTP API framework |
| **Multer** | Middleware for handling multipart/form-data |
| **fs** | File system operations |
| **path** | Resolve file paths |

---

## 📦 Folder Structure
file-upload-app/
├── uploads/
│ ├── images/
│ ├── videos/
│ └── files/
├── src/
│ ├── routes/
│ │ └── uploadRoutes.js
│ └── app.js
├── .gitignore
├── README.md
├── package.json
└── package-lock.json

yaml
Copy
Edit

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/file-upload-app.git
cd file-upload-app
2. Install Dependencies
bash
Copy
Edit
npm install
3. Run the Server
bash
Copy
Edit
npm run dev
Server runs at: http://localhost:3000

4. Create Upload Folders
bash
Copy
Edit
mkdir -p uploads/images uploads/videos uploads/files
🔌 API Endpoints
📷 Upload Images
Method: POST

URL: /api/upload/image

Body Type: form-data (field name: files)

Max Files: 5

Allowed Types: image/jpeg, image/png, image/webp

✅ Sample Response:

json
Copy
Edit
[
  {
    "url": "/uploads/images/1685632-image.png",
    "size": 234230,
    "mimeType": "image/png",
    "originalName": "sample.png"
  }
]
🎥 Upload Videos
Method: POST

URL: /api/upload/video

Body Type: form-data (field name: files)

Extra Fields: titleFa, titleEn (optional)

Max Files: 3

Allowed Types: video/mp4, video/webm, video/ogg

✅ Sample Response:

json
Copy
Edit
[
  {
    "title": { "fa": "Persian Title", "en": "English Title" },
    "path": "/uploads/videos/1685-video.mp4",
    "size": 4000000,
    "mimeType": "video/mp4",
    "originalName": "sample.mp4"
  }
]
📄 Upload Documents
Method: POST

URL: /api/upload/file

Body Type: form-data (field name: files)

Max Files: 10

Allowed Types:

application/pdf

application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document

application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet

text/plain

✅ Sample Response:

json
Copy
Edit
[
  {
    "url": "/uploads/files/sample.pdf",
    "size": 100000,
    "mimeType": "application/pdf",
    "originalName": "resume.pdf"
  }
]
🗑 Delete Uploaded File
Method: DELETE

URL: /api/upload/delete

Content-Type: application/json

Request Body:

json
Copy
Edit
{
  "filePath": "/uploads/images/sample.png"
}
✅ Sample Response:

json
Copy
Edit
{
  "message": "✅ File successfully deleted."
}
⚠️ Error Handling
Returns 400 if no file is uploaded.

Returns error if file type is not allowed.

Returns 500 if file deletion fails.

🔐 Security & Best Practices (Recommendations)
Add file size limits via limits in Multer

Add authentication (e.g. JWT) to protect routes

Sanitize file names to avoid conflicts or security issues

Consider moving to cloud storage (e.g., AWS S3, Cloudinary)

Use rate limiting to prevent abuse

🚧 Future Improvements
 Add file size limit (e.g. max 5MB)

 Upload to cloud storage (S3/Cloudinary)

 Add file preview and metadata extraction

 Protect upload/delete routes with authentication

 Swagger/OpenAPI documentation

🧾 License
MIT – Free to use, modify and distribute.

✍️ Author
Made with ❤️ by Your Name

yaml
Copy
Edit

---

This version is professional, organized, and ready for GitHub or public documentation. Let me know if you want the same content converted into:

- GitHub Pages format
- Docz / Docusaurus integration
- PDF version for offline use
- `.zip` ready-to-upload package

Just say the word!






