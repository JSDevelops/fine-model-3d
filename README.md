# FINEVERSE

**AR + 3D Hospitality Training Platform**
React · Vite · Three.js · Web Speech API

---

## โครงสร้างโปรเจค

```
fineverse/
├── .github/
│   └── workflows/
│       ├── ci.yml               ← Build check ทุก PR
│       ├── deploy-admin.yml     ← Auto deploy Admin → GitHub Pages
│       └── deploy-student.yml   ← Auto deploy Student → GitHub Pages
├── fineverse-admin/             ← Admin Dashboard (port 5173)
└── fineverse-student/           ← Student App (port 5174)
```

---

## เริ่มใช้งานในเครื่อง

```bash
# Admin
cd fineverse-admin && npm install && npm run dev
# → http://localhost:5173

# Student (terminal ใหม่)
cd fineverse-student && npm install && npm run dev
# → http://localhost:5174
```

---

## ขึ้น GitHub (ครั้งแรก)

```bash
git init
git add .
git commit -m "feat: initial FINEVERSE project"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/fineverse.git
git push -u origin main
```

---

## ตั้งค่า GitHub Pages

1. GitHub repo → **Settings → Pages → Source: GitHub Actions**
2. แก้ `vite.config.js` ทั้ง 2 app:
   ```js
   const BASE = process.env.NODE_ENV === 'production' ? '/fineverse/' : '/'
   ```
3. Push → GitHub Actions deploy อัตโนมัติ

---

## Deploy ทางเลือก — Vercel (แนะนำ)

```bash
cd fineverse-admin   && npx vercel   # → https://fineverse-admin.vercel.app
cd fineverse-student && npx vercel   # → https://fineverse-student.vercel.app
```

Auto-deploy ทุกครั้งที่ push to main

---

## Environment Variables (Phase 3 — Firebase)

สร้างไฟล์ `.env` ในแต่ละ app (อย่า commit):

```env
VITE_FIREBASE_API_KEY=xxx
VITE_FIREBASE_AUTH_DOMAIN=xxx.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=xxx
VITE_FIREBASE_APP_ID=xxx
```

---

## Phase Roadmap

| Phase | สถานะ | รายละเอียด |
|-------|--------|-----------|
| 1 — Admin Dashboard | ✅ Done | Mission CRUD, Students, Charts |
| 2 — Student UI + AI | ✅ Done | Three.js, Web Speech API, Progress |
| 3 — AR + Firebase | 🔜 Next | AR.js, Firebase Auth + Firestore |
