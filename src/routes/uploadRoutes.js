const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const fs = require('fs');

// 📦 استوریج عکس‌ها
const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/images'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + Math.round(Math.random() * 1e9) + path.extname(file.originalname))
});
const imageFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
  allowedTypes.includes(file.mimetype) ? cb(null, true) : cb(new Error('فرمت عکس مجاز نیست'), false);
};
const uploadImage = multer({ storage: imageStorage, fileFilter: imageFilter });

// 📦 استوریج ویدیوها
const videoStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/videos'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + Math.round(Math.random() * 1e9) + path.extname(file.originalname))
});
const videoFilter = (req, file, cb) => {
  const allowedTypes = ['video/mp4', 'video/webm', 'video/ogg'];
  allowedTypes.includes(file.mimetype) ? cb(null, true) : cb(new Error('فرمت ویدیو مجاز نیست'), false);
};
const uploadVideo = multer({ storage: videoStorage, fileFilter: videoFilter });

// 📦 استوریج فایل‌های عمومی
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/files'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + Math.round(Math.random() * 1e9) + path.extname(file.originalname))
});
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'text/plain'
  ];
  allowedTypes.includes(file.mimetype) ? cb(null, true) : cb(new Error('فرمت فایل مجاز نیست'), false);
};
const uploadFile = multer({ storage: fileStorage, fileFilter });

// 📸 آپلود چندعکس
router.post('/image', uploadImage.array('files', 5), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: 'فایلی آپلود نشده است.' });
  }

  const fileInfos = req.files.map(file => ({
    url: `/uploads/images/${file.filename}`,
    size: file.size,
    mimeType: file.mimetype,
    originalName: file.originalname
  }));

  res.status(200).json(fileInfos);
});

// 🎥 آپلود چندویدیو
router.post('/video', uploadVideo.array('files', 3), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: 'فایلی آپلود نشده است.' });
  }

  const fileInfos = req.files.map(file => ({
    title: {
      fa: req.body.titleFa || '',
      en: req.body.titleEn || ''
    },
    path: `/uploads/videos/${file.filename}`,
    size: file.size,
    mimeType: file.mimetype,
    originalName: file.originalname
  }));

  res.status(200).json(fileInfos);
});

// 📄 آپلود چندفایل عمومی
router.post('/file', uploadFile.array('files', 10), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: 'فایلی آپلود نشده است.' });
  }

  const fileInfos = req.files.map(file => ({
    url: `/uploads/files/${file.filename}`,
    size: file.size,
    mimeType: file.mimetype,
    originalName: file.originalname
  }));

  res.status(200).json(fileInfos);
});

// 🗑 حذف فایل
router.delete('/delete', (req, res) => {
  const { filePath } = req.body;

  if (!filePath) {
    return res.status(400).json({ message: 'مسیر فایل مشخص نشده است.' });
  }

  const fullPath = path.join(__dirname, '..', '..', filePath);

  fs.unlink(fullPath, (err) => {
    if (err) {
      console.error('❌ خطا در حذف فایل:', err);
      return res.status(500).json({ message: 'خطا در حذف فایل.', error: err });
    }

    res.status(200).json({ message: '✅ فایل با موفقیت حذف شد.' });
  });
});

module.exports = router;
