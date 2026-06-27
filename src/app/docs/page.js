"use client";

import React, { useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  BookOpen,
  Smartphone,
  GraduationCap,
  Shield,
  Check,
  ExternalLink,
  Key,
  FileText,
  Layers,
  Activity,
  Camera,
  Mic,
  Play,
  Database,
  Server,
  Info,
  Terminal,
  Settings,
  Users,
  ArrowRightLeft,
  Cpu,
  Bookmark
} from 'lucide-react'

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState('system-overview')
  const [activeDbTable, setActiveDbTable] = useState('users')

  const groups = [
    {
      title: "บทนำ & บัญชีผู้ใช้",
      items: [
        { id: "system-overview", label: "ภาพรวมระบบ (System Overview)", icon: Info },
        { id: "simulation-accounts", label: "บัญชีทดสอบ (Simulation Accounts)", icon: Key },
      ]
    },
    {
      title: "พอร์ทัลนักเรียน (Student App)",
      items: [
        { id: "student-login", label: "การเข้าใช้งานพอร์ทัลผู้เรียน", icon: Smartphone },
        { id: "student-familiarize", label: "F - Familiarize (3D & AI Scanner)", icon: Camera },
        { id: "student-interact", label: "I - Interact (Live Voice Coach)", icon: Mic },
        { id: "student-navigate", label: "N - Navigate (3D Restaurant)", icon: Play },
        { id: "student-exhibit", label: "E - Exhibit (Rubrics & Portfolio)", icon: FileText },
      ]
    },
    {
      title: "พอร์ทัลครูผู้สอน (Teacher Portal)",
      items: [
        { id: "teacher-lesson", label: "Lesson Plan Builder (CRUD)", icon: GraduationCap },
        { id: "teacher-scenario", label: "AI Scenario Builder", icon: Layers },
        { id: "teacher-analytics", label: "Class Analytics (รายงานผล)", icon: Activity },
        { id: "teacher-assessment", label: "Assessment Builder (เกณฑ์)", icon: Bookmark },
        { id: "teacher-ar-manager", label: "AR & 3D Items Manager", icon: Settings },
      ]
    },
    {
      title: "หลังบ้าน & โครงสร้างระบบ (Admin Console)",
      items: [
        { id: "admin-flow", label: "System Flowchart (ผังไหลเวียน)", icon: Server },
        { id: "admin-access", label: "Role & Access Control", icon: Shield },
        { id: "admin-schema", label: "Database Schema (MySQL)", icon: Database },
        { id: "tech-stack", label: "Technology Stack (สแตกระบบ)", icon: Terminal },
      ]
    }
  ]

  const credentials = [
    { role: "นักเรียน (Student)", email: "student.siriwan@fine-model.com", password: "รหัสผ่านใดก็ได้ (เช่น 123456)", desc: "สวมบทบาทเป็นผู้เรียนในการหมุนภาพโฮโลแกรม 3D, ใช้กล้อง AI Scanner ถ่ายภาพวิเคราะห์อุปกรณ์จริง, ฝึกสนทนาโต้ตอบเสียงสตรีมมิ่งสองทางกับ AI Coach, และประเมิน Rubrics ทักษะ" },
    { role: "ครูผู้สอน (Teacher)", email: "pimjai@fine-model.com", password: "รหัสผ่านใดก็ได้ (เช่น 123456)", desc: "ใช้ออกแบบหลักสูตรวิชาบริการอาหารโรงแรมรายสัปดาห์ (F-I-N-E), กำหนด Prompt ทิศทางการแนะแนวของ AI Coach, ตรวจสอบรายงานผลสัมฤทธิ์ของนักเรียนรายห้อง, และออกแบบโมเดล 3D แบบเรียลไทม์" },
    { role: "ผู้ดูแลระบบ (Admin)", email: "admin@fine-model.com", password: "รหัสผ่านใดก็ได้ (เช่น 123456)", desc: "ใช้ควบคุมผังการเชื่อมโยงระบบ (System Diagram), กำหนดสวิตช์เปิด-ปิดสิทธิ์แยกตามผู้ใช้ และสังเกตโครงสร้างตารางฐานข้อมูลหลัก in MySQL" }
  ]

  const dbTables = {
    users: {
      name: "users",
      desc: "ตารางเก็บข้อมูลสมาชิกและประเภทตำแหน่งของนักเรียน ครู และผู้ดูแลระบบ",
      columns: [
        { name: "id", type: "INT (PK)", desc: "รหัสผู้ใช้หลัก (Primary Key)" },
        { name: "name", type: "VARCHAR(255)", desc: "ชื่อและนามสกุลผู้ใช้งาน" },
        { name: "email", type: "VARCHAR(255) (UNIQUE)", desc: "อีเมลสําหรับใช้ตรวจสอบและเข้าใช้งานระบบ" },
        { name: "password", type: "VARCHAR(255)", desc: "รหัสผ่านแฮช (สําหรับระบบจำลอง จะอนุญาตให้ป้อนผ่านรหัสผ่านใดๆ ได้)" },
        { name: "avatar", type: "VARCHAR(255)", desc: "ที่อยู่อยู่พาธไฟล์รูปภาพโปรไฟล์" },
        { name: "status", type: "ENUM('active', 'suspended')", desc: "สถานะการเข้าถึงระบบของผู้ใช้" }
      ]
    },
    courses: {
      name: "courses",
      desc: "ตารางบันทึกหัวข้อวิชาเรียนบริการโรงแรมและการกำหนดครูผู้สอนที่รับผิดชอบ",
      columns: [
        { name: "id", type: "INT (PK)", desc: "รหัสหลักสูตรวิชาเรียน" },
        { name: "title", type: "VARCHAR(255)", desc: "ชื่อรายวิชาเรียนวิชาชีพบริการ" },
        { name: "description", type: "TEXT", desc: "รายละเอียดเนื้อหาหลักสูตรโดยย่อ" },
        { name: "teacher_id", type: "INT (FK)", desc: "เชื่อมโยงรหัสครูผู้สอน (อ้างอิง users.id)" },
        { name: "status", type: "VARCHAR(50)", desc: "สถานะการเปิดใช้งานหลักสูตร" }
      ]
    },
    lessons: {
      name: "lessons",
      desc: "ตารางเก็บแผนการเรียนการสอนสัปดาห์ (1-18) และขั้นตอนการสอนแบบ F-I-N-E",
      columns: [
        { name: "id", type: "INT (PK)", desc: "รหัสบทเรียนย่อย" },
        { name: "course_id", type: "INT (FK)", desc: "เชื่อมโยงรหัสวิชาเรียน (อ้างอิง courses.id)" },
        { name: "week_no", type: "INT", desc: "สัปดาห์ที่การเรียนรู้ (สัปดาห์ที่ 1 - 18)" },
        { name: "topic", type: "VARCHAR(255)", desc: "หัวข้อวิชาเรียนประจำสัปดาห์" },
        { name: "objective", type: "TEXT", desc: "วัตถุประสงค์เชิงพฤติกรรมของการเรียน" },
        { name: "fine_stage", type: "VARCHAR(50)", desc: "เฟสการจำลองการสอนที่เน้น เช่น F, I, N หรือ E" },
        { name: "content", type: "JSON", desc: "เนื้อหาบทเรียนจำลองและสื่อการสอนที่เก็บบันทึกแบบ Object" }
      ]
    },
    ar_objects: {
      name: "ar_objects",
      desc: "ตารางเก็บคลังสื่อ 3D โฮโลแกรม และแบบจำลองอุปกรณ์ที่ครูสร้างขึ้น",
      columns: [
        { name: "id", type: "INT (PK)", desc: "รหัสโมเดลอุปกรณ์ AR" },
        { name: "lesson_id", type: "INT (FK)", desc: "เชื่อมโยงบทเรียนที่เหมาะสม (อ้างอิง lessons.id)" },
        { name: "title", type: "VARCHAR(255)", desc: "ชื่ออุปกรณ์บริการภาษาอังกฤษและภาษาไทย" },
        { name: "category", type: "VARCHAR(100)", desc: "หมวดหมู่อุปกรณ์ (เช่น equipment, glassware, cutlery)" },
        { name: "model_url", type: "VARCHAR(255)", desc: "ลิงก์ที่อยู่ไฟล์โมเดล Three.js หรือรูปร่างที่กำหนดสร้าง" },
        { name: "thumbnail", type: "VARCHAR(255)", desc: "รูปภาพจำลองตัวอย่างโมเดล" },
        { name: "audio_url", type: "VARCHAR(255)", desc: "ไฟล์คลิปเสียงออกเสียงสัทอักษรพรีเซต" },
        { name: "description", type: "TEXT", desc: "คำอธิบายประวัติการใช้อุปกรณ์และคำศัพท์ภาษาอังกฤษ" }
      ]
    },
    simulations: {
      name: "simulations",
      desc: "ตารางเก็บข้อมูลเนื้อหาด่านแก้ปัญหา 3 มิติ และลำดับการรับออเดอร์ในด่าน Navigate",
      columns: [
        { name: "id", type: "INT (PK)", desc: "รหัสสถานการณ์จำลอง" },
        { name: "title", type: "VARCHAR(255)", desc: "ชื่อด่านสถานการณ์ท้าทาย" },
        { name: "description", type: "TEXT", desc: "ข้อมูลประวัติเหตุการณ์บริการ" },
        { name: "level", type: "VARCHAR(50)", desc: "ระดับความยากง่าย (Easy, Medium, Hard)" },
        { name: "scenario_json", type: "JSON", desc: "สคริปต์โต้ตอบคำถามและการกำหนดความพึงพอใจของลูกค้า" },
        { name: "created_by", type: "INT (FK)", desc: "ผู้สร้างโจทย์ปัญหาการตัดสินใจ (อ้างอิง users.id)" }
      ]
    },
    assessments: {
      name: "assessments",
      desc: "ตารางกำหนดแบบประเมินและรูบริกสำหรับประเมินทักษะความรู้ผู้เรียน",
      columns: [
        { name: "id", type: "INT (PK)", desc: "รหัสแบบทดสอบเกณฑ์กลาง" },
        { name: "lesson_id", type: "INT (FK)", desc: "เชื่อมโยงรหัสบทเรียนกลาง (อ้างอิง lessons.id)" },
        { name: "type", type: "VARCHAR(50)", desc: "ประเภทการทดสอบ (quiz, speaking, roleplay)" },
        { name: "rubric", type: "JSON", desc: "เกณฑ์คะแนนทักษะ KSA-C และรายละเอียดเกณฑ์เกรดระดับการประเมิน" },
        { name: "max_score", type: "INT", desc: "คะแนนรวมเต็มของแบบทดสอบ" },
        { name: "status", type: "VARCHAR(50)", desc: "สถานะการเปิดให้สอบออนไลน์" }
      ]
    },
    attempts: {
      name: "attempts",
      desc: "ตารางจัดเก็บบันทึกประวัติการส่งสอบการพูด การทำกิจกรรม และผลสัมฤทธิ์รายบุคคล",
      columns: [
        { name: "id", type: "INT (PK)", desc: "รหัสการเข้าสอบแต่ละครั้ง" },
        { name: "user_id", type: "INT (FK)", desc: "เชื่อมรหัสนักเรียน (อ้างอิง users.id)" },
        { name: "assessment_id", type: "INT (FK)", desc: "เชื่อมรหัสแบบประเมินทักษะ (อ้างอิง assessments.id)" },
        { name: "score", type: "INT", desc: "คะแนนที่ระบบวิเคราะห์ประเมินส่งสอบได้" },
        { name: "feedback", type: "TEXT", desc: "ความคิดเห็นปรับปรุงทักษะการออกเสียงจากปัญญาประดิษฐ์หรือครู" },
        { name: "created_at", type: "TIMESTAMP", desc: "วันเวลาที่ผู้เรียนทำกิจกรรมสอบ" }
      ]
    },
    portfolios: {
      name: "portfolios",
      desc: "แฟ้มสะสมงานดิจิทัลเก็บผลการเรียน รายงานคะแนนสะสม และใบรับรอง Certificate",
      columns: [
        { name: "id", type: "INT (PK)", desc: "รหัสใบรายงานแฟ้มผลงาน" },
        { name: "user_id", type: "INT (FK)", desc: "เชื่อมโยงรหัสนักเรียนผู้รับสิทธิ์ (อ้างอิง users.id)" },
        { name: "title", type: "VARCHAR(255)", desc: "หัวข้อประกาศนียบัตรหรือผลงานวิชาชีพ" },
        { name: "file_url", type: "VARCHAR(255)", desc: "ลิงก์พาธเก็บเอกสารรายงานหรือไฟล์ PDF ใบรับรอง" },
        { name: "type", type: "VARCHAR(50)", desc: "ประเภทไฟล์บันทึกผลงาน (เช่น pdf, voice_record, link)" },
        { name: "created_at", type: "TIMESTAMP", desc: "วันเวลาที่ระบบอนุมัติประกาศนียบัตร" }
      ]
    }
  }

  const renderContent = () => {
    switch (activeSection) {
      case 'system-overview':
        return (
          <div className="space-y-6 animate-fadeIn text-xs leading-relaxed font-sans">
            <div>
              <span className="text-[10px] text-amber-400 font-bold uppercase tracking-widest block font-mono">Immersive Hospitality Ecosystem</span>
              <h2 className="text-xl font-heading font-black text-white mt-1">1. ภาพรวมระบบ (System Overview)</h2>
              <p className="text-slate-400 mt-1">
                FINE Model 3D AR+AI Platform เป็นนวัตกรรมสถาปัตยกรรมจำลองสถานการณ์การเรียนรู้เชิงลึก (Immersive Simulation System)
                ที่สร้างขึ้นมาเพื่อยกระดับทักษะภาษาอังกฤษและการปฏิบัติตามมาตรฐานงานบริการในร้านอาหารและโรงแรม (Smart Hospitality Suite)
                ระบบบูรณาการร่วมกันระหว่าง **เทคโนโลยีความจริงเสริม (Augmented Reality - AR)**, **โมเดลปัญญาประดิษฐ์ประเมินเสียงสด (Gemini Multimodal Live API)**,
                และ **สภาพแวดล้อม 3 มิติเชิงโต้ตอบ (Interactive 3D Workspace)**
              </p>
            </div>

            <div className="bg-[#151D2F]/60 border border-white/5 p-4 rounded-2xl space-y-3">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5 border-b border-white/5 pb-2">
                <BookOpen className="w-4 h-4 text-amber-400" /> กรอบแนวคิดจำลองการสอน F-I-N-E Model 3D
              </h3>
              <ul className="space-y-2.5 text-slate-300">
                <li className="flex gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center font-bold text-[10px] shrink-0">F</span>
                  <div>
                    <strong className="text-white font-semibold block">Familiarize (สร้างความคุ้นเคย):</strong>
                    นักเรียนเรียนรู้คำศัพท์สำนวน อุปกรณ์ เมนูอาหาร และบริบทงานบริการ และใช้ AI Scan วิเคราะห์วัตถุจริงเพื่อเรียนรู้ข้อมูลวิชาชีพ คำศัพท์และบริบทงานบริการ ทำความเข้าใจด้านภาพ 3 มิติ ผ่านสื่อ AR เชื่อมโยงความรู้เดิมกับเนื้อหาใหม่
                  </div>
                </li>
                <li className="flex gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center font-bold text-[10px] shrink-0">I</span>
                  <div>
                    <strong className="text-white font-semibold block">Interact (การมีปฏิสัมพันธ์):</strong>
                    นักเรียนฝึกสนทนาและโต้ตอบภาษาอังกฤษ จาก AI Support และเปลี่ยนความคิดเห็นและข้อเสนอแนะ
                  </div>
                </li>
                <li className="flex gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center font-bold text-[10px] shrink-0">N</span>
                  <div>
                    <strong className="text-white font-semibold block">Navigate Service Situations(การฝึกปฏิบัติในสถานการณ์การบริการ):</strong>
                    นักเรียนฝึกใช้ภาษาอังกฤษในการปฏิบัติงานบริการอาหารและเครื่องดื่ม แก้ไขปัญหาเฉพาะหน้าในสถานการณ์การบริการ ฝึกผ่าน Simulation ที่สมจริงและหลากหลาย
                  </div>
                </li>
                <li className="flex gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center font-bold text-[10px] shrink-0">E</span>
                  <div>
                    <strong className="text-white font-semibold block">Exhibit Professional Performance (การแสดงสมรรถนะวิชาชีพ):</strong>
                    แสดงสมรรถนะผ่านการปฏิบัติในสถานการณ์จริง ประเมินตามสภาพจริงด้วยเกณฑ์มาตรฐานวิชาชีพ รับข้อเสนอแนะเพื่อพัฒนาสมรรถนะอย่างต่อเนื่อง
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-[#151D2F]/60 border border-white/5 p-4 rounded-2xl space-y-2">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5 font-heading">
                🎯 เป้าหมายสมรรถนะ KSA-C (Professional Rubrics)
              </h3>
              <p className="text-slate-400 text-[11px]">
                การจัดสเกลคะแนนบนแพลตฟอร์มจะยึดหลักเกณฑ์ความเชี่ยวชาญวิชาชีพสากล 4 มิติ ซึ่งระบบเก็บคะแนนจะส่งรายงานผลการประเมินแยกตามมิติต่อไปนี้ไปยังพอร์ทัลจัดการของครูและพอร์ตโฟลิโอผู้เรียนโดยตรง:
              </p>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div className="bg-slate-950/40 p-2.5 rounded-xl border border-white/5">
                  <strong className="text-cyan-400 block mb-0.5">Knowledge (ความรู้เชิงหลักการ)</strong>
                  สะท้อนผ่านคะแนนการทบทวนไวยากรณ์ คำศัพท์อุปกรณ์ และการทำควิซภาษาอังกฤษในโมดูล
                </div>
                <div className="bg-slate-950/40 p-2.5 rounded-xl border border-white/5">
                  <strong className="text-amber-400 block mb-0.5">Skills (ทักษะความคล่องแคล่ว)</strong>
                  สะท้อนผ่านระดับคะแนนความถูกต้องของคำพูด สำเนียงความคล่อง (Fluency) ที่ได้รับคำแนะนำย้อนกลับจาก AI
                </div>
                <div className="bg-slate-950/40 p-2.5 rounded-xl border border-white/5">
                  <strong className="text-emerald-400 block mb-0.5">Abilities (ความสามารถด้านการแก้ไขปัญหา)</strong>
                  สะท้อนผ่านผลคะแนนความพึงพอใจการเลือกทางเลือกรับมือลูกค้าในด่านจำลองร้านอาหาร 3D
                </div>
                <div className="bg-slate-950/40 p-2.5 rounded-xl border border-white/5">
                  <strong className="text-rose-400 block mb-0.5">Commitment (ทัศนคติวิชาชีพ)</strong>
                  วัดจากประวัติการเข้าเรียน เวลาฝึกฝนที่ใช้ อัตราความมุ่งมั่นทบทวนซ้ำ และสถิติการส่งงานของนักเรียน
                </div>
              </div>
            </div>
          </div>
        )

      case 'simulation-accounts':
        return (
          <div className="space-y-6 animate-fadeIn text-xs leading-relaxed font-sans">
            <div>
              <span className="text-[10px] text-amber-400 font-bold uppercase tracking-widest block font-mono">Authorization & Security</span>
              <h2 className="text-xl font-heading font-black text-white mt-1">2. บัญชีเข้าใช้งานระบบ (Simulation Credentials)</h2>
              <p className="text-slate-400 mt-1">
                เพื่ออํานวยความสะดวกในการประเมินและทบทวนระบบจำลอง แพลตฟอร์มกำหนดระบบเข้าสู่ระบบแบบสวมบทบาทเสมือนจริง
                โดยใช้อีเมลที่มีการจัดสรรสิทธิ์เฉพาะบทบาทไว้ในฐานข้อมูล โดยมีรายละเอียดบัญชีเข้าใช้งานดังตารางด้านล่างนี้
              </p>
            </div>

            <div className="bg-[#151D2F]/40 border border-white/5 p-5 rounded-3xl backdrop-blur-md">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5 mb-3 font-mono">
                <Key className="w-4 h-4 text-amber-400" /> ข้อมูลบัญชีจำลอง (Simulation User Database)
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-[10px] border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 text-slate-500 font-bold">
                      <th className="py-2 pr-4">บทบาทการเข้าใช้</th>
                      <th className="py-2 pr-4">อีเมลล็อกอิน</th>
                      <th className="py-2 pr-4">รหัสผ่าน</th>
                      <th className="py-2">พาธจำลองในการทดสอบ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-slate-300 font-mono">
                    {credentials.map((cred, idx) => (
                      <tr key={idx} className="hover:bg-white/5">
                        <td className="py-3 pr-4 font-sans font-bold text-white flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> {cred.role}
                        </td>
                        <td className="py-3 pr-4 text-cyan-400 font-semibold">{cred.email}</td>
                        <td className="py-3 pr-4 text-slate-400">{cred.password}</td>
                        <td className="py-3 text-slate-400 font-sans leading-snug">{cred.desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-2xl text-amber-300 space-y-2">
              <div className="flex items-center gap-1.5 font-bold">
                <Info className="w-4 h-4 text-amber-400 shrink-0" />
                <span>คำแนะนำเพิ่มเติมสำหรับการล็อกอินในการทดสอบ (Developer Note)</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                เนื่องจากรหัสผ่านในระบบถูกออกแบบให้เป็นลักษณะ **Simulated Login** (ความปลอดภัยระดับ Sandbox) ท่านสามารถพิมพ์รหัสผ่านใดๆ ก็ได้ เช่น <code className="bg-black/40 px-1 py-0.5 rounded font-mono font-bold text-white">123456</code> หรือ <code className="bg-black/40 px-1 py-0.5 rounded font-mono font-bold text-white">password</code> ลงในช่องป้อนข้อมูลเพื่อข้ามการดึงฐานข้อมูลรหัสผ่านจริง และระบบจะนำท่านเข้าสู่สิทธิ์ตำแหน่งของอีเมลนั้นทันที
              </p>
            </div>
          </div>
        )

      case 'student-login':
        return (
          <div className="space-y-6 animate-fadeIn text-xs leading-relaxed font-sans">
            <div>
              <span className="text-[10px] text-amber-400 font-bold uppercase tracking-widest block font-mono">Student Access Flow</span>
              <h2 className="text-xl font-heading font-black text-white mt-1">3. การเข้าใช้งานพอร์ทัลนักเรียน (Student Portal)</h2>
              <p className="text-slate-400 mt-1">
                พอร์ทัลของนักเรียนได้รับการออกแบบให้เป็นหน้าจอจำลองแบบ **Mobile-First App** เพื่อความคล่องตัวในการเรียนรู้และสแกนกล้องเสมือนจริง
                โดยมีขั้นตอนการเข้าใช้หน้าจออย่างละเอียดดังนี้
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-[#151D2F]/60 border border-white/5 p-4 rounded-2xl space-y-2">
                <span className="text-[9px] uppercase tracking-wider bg-amber-500/10 text-amber-400 font-bold border border-amber-500/20 px-2 py-0.5 rounded-full font-mono">ขั้นตอนที่ 1</span>
                <h3 className="text-xs font-bold text-white mt-1">เข้าสู่หน้าหลักพอร์ทัลความปลอดภัย</h3>
                <p className="text-slate-400 text-[11px]">
                  ที่พอร์ทัลหน้าแรกของระบบ ให้คลิกเลือกปุ่มสีเหลืองทองด้านล่างสุดของส่วน **"Student App"** (หรือพิมพ์ที่พาธต่อท้ายลิงก์หลักด้วย <code className="bg-black/40 px-1 py-0.5 rounded text-white font-mono">/student</code>)
                </p>
              </div>

              <div className="bg-[#151D2F]/60 border border-white/5 p-4 rounded-2xl space-y-2">
                <span className="text-[9px] uppercase tracking-wider bg-amber-500/10 text-amber-400 font-bold border border-amber-500/20 px-2 py-0.5 rounded-full font-mono">ขั้นตอนที่ 2</span>
                <h3 className="text-xs font-bold text-white mt-1">กรอกข้อมูลบัญชีเพื่อสวมบทบาท</h3>
                <p className="text-slate-400 text-[11px]">
                  กรอกอีเมลนักเรียนทดสอบ: <code className="bg-black/40 px-1 py-0.5 rounded font-mono text-cyan-400 font-semibold">student.siriwan@fine-model.com</code> และกรอกรหัสผ่านใดๆ จากนั้นคลิกปุ่มสีน้ำเงิน **"Sign In"** เพื่ออนุญาตเข้าถึง
                </p>
              </div>

              <div className="bg-[#151D2F]/60 border border-white/5 p-4 rounded-2xl space-y-2">
                <span className="text-[9px] uppercase tracking-wider bg-amber-500/10 text-amber-400 font-bold border border-amber-500/20 px-2 py-0.5 rounded-full font-mono">ขั้นตอนที่ 3</span>
                <h3 className="text-xs font-bold text-white mt-1">เรียนรู้หน้าโฮมและสเตตัสการเรียนรู้</h3>
                <p className="text-slate-400 text-[11px]">
                  เมื่อเข้ามาสำเร็จจะพบสเตตัสพอร์ตความก้าวหน้า เช่น คะแนนรวมเฉลี่ยสะสม, เลเวลการพูดคุยภาษาอังกฤษ, แอนิเมชันเกจแสดงผลการทำเควส และแถบแท็บด้านล่าง 4 แท็บที่ตรงกับหลักสูตร F, I, N และ E สำหรับกดสลับฟังก์ชันเพื่อเรียนรู้
                </p>
              </div>
            </div>
          </div>
        )

      case 'student-familiarize':
        return (
          <div className="space-y-6 animate-fadeIn text-xs leading-relaxed font-sans">
            <div>
              <span className="text-[10px] text-amber-400 font-bold uppercase tracking-widest block font-mono">Familiarize Phase Details</span>
              <h2 className="text-xl font-heading font-black text-white mt-1">4. F - Familiarize (โฮโลแกรม 3D & AI Camera Scanner)</h2>
              <p className="text-slate-400 mt-1">
                โมดูลสร้างความคุ้นเคย แบ่งวิธีการเรียนรู้ออกเป็น 2 โหมดการสแกนดังนี้:
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-[#151D2F]/60 border border-white/5 p-4 rounded-2xl space-y-3">
                <h3 className="text-xs font-bold text-white flex items-center gap-1">
                  <Layers className="w-4 h-4 text-amber-400" /> 1. ระบบสแกนด้วย QR Code (QR Scanner)
                </h3>
                <p className="text-slate-400 text-[11px]">
                  สแกนคิวอาร์โค้ดของอุปกรณ์ที่กำหนดโดยครูผู้สอน เพื่อเรียนรู้ตามแผนการจัดจานและงานบริการของแต่ละสัปดาห์
                </p>
                <div className="bg-slate-950/50 p-3 rounded-xl border border-white/5 text-[11px] space-y-2 text-slate-300">
                  <p><strong>วิธีการใช้งาน:</strong></p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>กดปุ่ม **"สแกน QR Code อุปกรณ์"** และเปิดกล้องระบบของเบราว์เซอร์</li>
                    <li>ส่องกล้องไปที่ QR Code บนการ์ดอุปกรณ์ที่ครูแจกหรือแสดงขึ้นบอร์ด</li>
                    <li>เมื่อพบอุปกรณ์ ระบบจะแสดงผลจำลองโมเดล 3D แบบโต้ตอบทันที</li>
                    <li>หมุนอุปกรณ์ได้ 360 องศา ดูคำแปล ฟังเสียงอ่าน ทำแบบทดสอบศัพท์ และฝึกพูดประโยคบริการ</li>
                  </ul>
                </div>
              </div>

              <div className="bg-[#151D2F]/60 border border-white/5 p-4 rounded-2xl space-y-3">
                <h3 className="text-xs font-bold text-white flex items-center gap-1">
                  <Camera className="w-4 h-4 text-cyan-400" /> 2. ระบบสแกนวิเคราะห์ด้วย AI (AI Scanner)
                </h3>
                <p className="text-slate-400 text-[11px]">
                  สแกนถ่ายรูปวัตถุจริงใดๆ รอบตัว เพื่อให้ปัญญาประดิษฐ์ทำหน้าที่วิเคราะห์ศัพท์ คำแปล และสร้างโมเดลจำลอง 3D ทันที
                </p>
                <div className="bg-slate-950/50 p-3 rounded-xl border border-white/5 text-[11px] space-y-2 text-slate-300">
                  <p><strong>วิธีการใช้งาน:</strong></p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>กดปุ่ม **"สแกนวิเคราะห์ด้วย AI"** และอนุญาตสิทธิ์เข้าถึงกล้อง</li>
                    <li>จัดวางตำแหน่งวัตถุ (เช่น ถ้วย แก้วน้ำ ช้อนส้อม) ให้อยู่กลางกรอบสแกน</li>
                    <li>กดปุ่ม **"📸 ถ่ายภาพวิเคราะห์ด้วย AI"** เพื่อส่งรูปให้ Gemini API ประมวลผล</li>
                    <li>ระบบจะส่งภาพ Base64 ไปยัง Gemini 2.5 Flash เพื่อแยกแยะ สร้างชื่อศัพท์ภาษาอังกฤษ คำแปลไทย นิยามการบริการ ประโยคสนทนาตัวอย่าง พร้อมสร้างรูปทรงโมเดล 3D และแบบทดสอบแบบไดนามิกขึ้นในหน้านั้นทันที</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-[#151D2F]/30 border border-white/5 p-4 rounded-2xl space-y-2 text-[11px]">
              <h4 className="text-white font-bold uppercase tracking-wider flex items-center gap-1">
                <Terminal className="w-3.5 h-3.5 text-amber-400" /> ข้อมูลการจัดเก็บข้อมูลหลังบ้าน (Technical Note)
              </h4>
              <p className="text-slate-400">
                รายการโมเดล 3D ที่ถูกเพิ่มหรือสร้างขึ้นผ่าน QR และ AI จะได้รับการอัปเดตและจำลองขึ้นในรูปแบบ Component 3D Dynamic
                โดยโมเดลจากฝั่งครูที่พร้อมสแกนจะดึงข้อมูลผ่าน Client Local Storage ภายใต้ชื่อคีย์ <code className="bg-black/40 px-1 py-0.5 rounded text-cyan-400 font-mono font-bold">fineverse_ar_items</code>
              </p>
            </div>
          </div>
        )

      case 'student-interact':
        return (
          <div className="space-y-6 animate-fadeIn text-xs leading-relaxed font-sans">
            <div>
              <span className="text-[10px] text-amber-400 font-bold uppercase tracking-widest block font-mono">Interact Phase Details</span>
              <h2 className="text-xl font-heading font-black text-white mt-1">5. I - Interact (การฝึกออกเสียง & Gemini Live Voice Coach)</h2>
              <p className="text-slate-400 mt-1">
                โมดูลสําคัญในการพัฒนาทักษะภาษาอังกฤษเพื่อการสื่อสารระดับวิชาชีพโรงแรม (Speaking Competency Builder)
                แบ่งโครงสร้างการฝึกฝนออกเป็นสองระดับตามความซับซ้อนของการใช้สื่อ:
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-[#151D2F]/60 border border-white/5 p-4 rounded-2xl space-y-2.5">
                <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Mic className="w-4 h-4 text-amber-400" /> 1. การฝึกออกเสียงตามประโยคแบบแผน (Script Guided Speaking)
                </h3>
                <p className="text-slate-400 text-[11px]">
                  เน้นฝึกสำเนียงจากสคริปต์มาตรฐานที่ใช้บ่อยในงานบริการอาหาร
                </p>
                <div className="bg-slate-950/50 p-3 rounded-xl border border-white/5 text-[11px] space-y-2 text-slate-300">
                  <p><strong>ขั้นตอนปฏิบัติ:</strong></p>
                  <ol className="list-decimal pl-4 space-y-1">
                    <li>เลือกสคริปต์ประโยคบริการที่ต้องการฝึกในแถบเมนู (เช่น Greeting, Menu Recommendation)</li>
                    <li>กดปุ่ม **"🔊 ฟังเสียงตัวอย่าง"** ระบบจะจำลองเสียงสังเคราะห์สำเนียงเจ้าของภาษา (Speech Synthesis)</li>
                    <li>กดปุ่มไมโครโฟนสีฟ้า **"🎙️ กดเพื่อพูดและบันทึกเสียง"** เริ่มพูดประโยคนั้นด้วยสำเนียงตนเอง</li>
                    <li>ระบบจะประเมินคะแนนความคล่องแคล่วและความถี่ของคลื่นเสียง และส่งกลับคะแนนเป็นระดับดาวและเกณฑ์คะแนนทักษะ</li>
                  </ol>
                </div>
              </div>

              <div className="bg-[#151D2F]/60 border border-white/5 p-4 rounded-2xl space-y-2.5">
                <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Cpu className="w-4 h-4 text-cyan-400" /> 2. การสนทนาสดไร้สคริปต์ด้วย Gemini Live Voice Coach (ขั้นสูง)
                </h3>
                <p className="text-slate-400 text-[11px]">
                  เป็นการเชื่อมโยง WebSocket แบบสองทางกับโมเดลปัญญาประดิษฐ์เพื่อจำลองการคุยเสียงสดกับอาจารย์ผู้ตรวจภาษาอังกฤษ
                </p>
                <div className="bg-slate-950/50 p-3 rounded-xl border border-white/5 text-[11px] space-y-2 text-slate-300">
                  <p><strong>ขั้นตอนการต่อเข้าระบบ Live:</strong></p>
                  <ol className="list-decimal pl-4 space-y-1">
                    <li>กดปุ่ม **"🔌 เชื่อมต่ออาจารย์จำลอง Live API"** เพื่อเปิดการเชื่อมต่อ WebSocket</li>
                    <li>สังเกตไฟสัญญาณเชื่อมต่อสีเขียว **"⚡ Connected to Live API"** และเครื่องมือวิเคราะห์คลื่นเสียง (Waveform)</li>
                    <li>นักเรียนสามารถพูดอะไรก็ได้ลงในไมโครโฟนของเครื่อง เช่น ทักทาย AI หรือตอบโต้คำถามนำ</li>
                    <li>ระบบจะถอดเสียง AI และแปลงเป็นข้อความสนทนาสด ๆ ปรากฏบนหน้าจอ **"Live Transcript Box"** พร้อมอ่านประโยคภาษาอังกฤษโต้กลับมาด้วยเสียงสด</li>
                    <li>สามารถกดปุ่มสลับกล้องหน้าเพื่อให้ AI ช่วยวิเคราะห์สีหน้าและการส่งมอบบริการทางกายภาพได้</li>
                  </ol>
                </div>
              </div>
            </div>

            <div className="bg-cyan-950/15 border border-cyan-500/20 p-4 rounded-2xl text-[11px] text-cyan-400 space-y-1">
              <strong className="text-white block font-heading font-black">⚙️ ข้อมูลการสตรีมมิ่งเสียงทางเทคนิค (Audio Stream Config)</strong>
              <p className="text-slate-400 leading-normal">
                การเชื่อมต่อสตรีมมิ่งเสียงกับระบบ Gemini Live API ของแพลตฟอร์มใช้มาตรฐานเสียง:
                ฟอร์แมตข้อมูลดิบ <code className="bg-black/40 px-1 py-0.5 rounded text-white font-mono text-[10px]">pyaudio.paInt16</code>,
                ช่องเสียง <code className="bg-black/40 px-1 py-0.5 rounded text-white font-mono text-[10px]">1 Channel (Mono)</code>,
                อัตราสุ่มส่งเข้าประเมิน <code className="bg-black/40 px-1 py-0.5 rounded text-white font-mono text-[10px]">16000Hz</code>,
                อัตราการสุ่มคืนเสียงสปีคเกอร์ <code className="bg-black/40 px-1 py-0.5 rounded text-white font-mono text-[10px]">24000Hz</code>
                และทำงานสตรีมผ่านเครือข่าย WebSockets ขนาดชุดละ <code className="bg-black/40 px-1 py-0.5 rounded text-white font-mono text-[10px]">1024 chunks</code> เพื่อการสื่อสารแบบ Real-time Latency ต่ำ
              </p>
            </div>
          </div>
        )

      case 'student-navigate':
        return (
          <div className="space-y-6 animate-fadeIn text-xs leading-relaxed font-sans">
            <div>
              <span className="text-[10px] text-amber-400 font-bold uppercase tracking-widest block font-mono">Navigate Phase Details</span>
              <h2 className="text-xl font-heading font-black text-white mt-1">6. N - Navigate (ด่านสวมบทบาทแก้ปัญหา 3D)</h2>
              <p className="text-slate-400 mt-1">
                การนำทักษะด้านความรู้คำศัพท์ (F) และการพูดโต้ตอบ (I) มาทดสอบในสถานการณ์จำลองการทำงานจริงในร้านอาหารหรูจำลอง 3 มิติ
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-[#151D2F]/60 border border-white/5 p-4 rounded-2xl space-y-2">
                <h3 className="text-xs font-bold text-white">1. สภาพแวดล้อมร้านอาหาร 3 มิติ (Three.js Sceneries)</h3>
                <p className="text-slate-400 text-[11px]">
                  ระบบจะประมวลผลฉากจำลอง 3 มิติแบบโต้ตอบด้วย Three.js โดยแบ่งออกเป็น 2 ฉากสถานการณ์หลัก:
                </p>
                <ul className="list-disc pl-5 text-slate-300 text-[11px] space-y-1">
                  <li><strong>ฉาก Reception Room (โถงรับลูกค้า):</strong> สำหรับด่านประเมินความสามารถในการทักทาย การจองโต๊ะ และการบริการลูกค้าเมื่อเดินเข้ามาในสถานที่</li>
                  <li><strong>ฉาก Dining Room (โถงอาหารหลัก):</strong> สำหรับด่านประเมินการบริการรับออเดอร์ แนะนำไวน์ การจัดเสิร์ฟอุปกรณ์ และการแก้ปัญหาเมื่อลูกค้าบ่นตำหนิ</li>
                </ul>
              </div>

              <div className="bg-[#151D2F]/60 border border-white/5 p-4 rounded-2xl space-y-2">
                <h3 className="text-xs font-bold text-white">2. ระบบวิเคราะห์ตัดสินใจ (Decision Point System)</h3>
                <p className="text-slate-400 text-[11px]">
                  เมื่อมีเควสคำสั่งการจากระบบปรากฏขึ้น นักเรียนต้องวิเคราะห์เหตุการณ์และเลือกตอบทางเลือกที่เหมาะสมภายในเวลาที่กำหนด
                </p>
                <div className="bg-slate-950/50 p-3 rounded-xl border border-white/5 text-[11px] text-slate-300 space-y-1">
                  <p><strong>ตัวอย่างเหตุการณ์และเกณฑ์ประเมิน:</strong></p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li><em>โจทย์:</em> ลูกค้าบ่นว่าอาหารช้าและอารมณ์เสีย</li>
                    <li><em>ตัวเลือก A:</em> ขออภัยอย่างสุภาพแจ้งว่าจะรีบตรวจสอบกับห้องเครื่องทันที (ความพึงพอใจ: สูงสุด)</li>
                    <li><em>ตัวเลือก B:</em> แจ้งว่าเนื่องจากวันนี้คนเยอะต้องรอตามคิว (ความพึงพอใจ: ต่ำลง)</li>
                    <li><em>ตัวเลือก C:</em> เดินเลี่ยงไปบริการโต๊ะอื่นก่อน (ความพึงพอใจ: วิกฤต)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )

      case 'student-exhibit':
        return (
          <div className="space-y-6 animate-fadeIn text-xs leading-relaxed font-sans">
            <div>
              <span className="text-[10px] text-amber-400 font-bold uppercase tracking-widest block font-mono">Exhibit Phase Details</span>
              <h2 className="text-xl font-heading font-black text-white mt-1">7. E - Exhibit (เกณฑ์ Rubrics & แฟ้มสะสมผลงาน)</h2>
              <p className="text-slate-400 mt-1">
                ขั้นตอนปลายทางเพื่อการวัดผลและนำเสนอระดับสมรรถนะของนักเรียนที่ผ่านการฝึกฝนระบบบริการเรียบร้อยแล้ว
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-[#151D2F]/60 border border-white/5 p-4 rounded-2xl space-y-2.5">
                <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-400" /> 1. แบบประเมินสมรรถนะตามรูบริก (Rubrics Assessment)
                </h3>
                <p className="text-slate-400 text-[11px]">
                  เมื่อทำด่านทดสอบรับออเดอร์ปลายทาง ระบบจะแปลงคำถอดเสียงวิเคราะห์การพูดไปเปรียบเทียบกับคำสั่งรูบริก 3 ระดับของอาจารย์:
                </p>
                <div className="grid grid-cols-3 gap-2 text-[10px] text-slate-300 mt-1">
                  <div className="bg-slate-950/40 p-2 rounded-lg border border-emerald-500/20">
                    <strong className="text-emerald-400 block mb-0.5">3 คะแนน (Expert)</strong>
                    ออกเสียงชัดเจน น้ำเสียงสุภาพ บริการลูกค้าได้ตามมาตรฐานระดับสูง
                  </div>
                  <div className="bg-slate-950/40 p-2 rounded-lg border border-cyan-500/20">
                    <strong className="text-cyan-400 block mb-0.5">2 คะแนน (Satisfactory)</strong>
                    มีติดขัดบ้างเล็กน้อย ไวยากรณ์สื่อสารได้เข้าใจ แก้ไขปัญหาพื้นฐานได้
                  </div>
                  <div className="bg-slate-950/40 p-2 rounded-lg border border-rose-500/20">
                    <strong className="text-rose-400 block mb-0.5">1 คะแนน (Improvement)</strong>
                    ออกเสียงผิดพลาดจนเข้าใจผิด บริการตกหล่นระดับมาตรฐาน
                  </div>
                </div>
              </div>

              <div className="bg-[#151D2F]/60 border border-white/5 p-4 rounded-2xl space-y-2.5">
                <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-amber-400" /> 2. พอร์ตโฟลิโอและใบประกาศนียบัตร (Portfolio & Cert)
                </h3>
                <p className="text-slate-400 text-[11px]">
                  หน้าสะสมผลงานสรุปข้อมูลการเรียนทั้งหมดที่บันทึกของนักเรียนสิริวัลย์ เจริญดี
                </p>
                <div className="bg-slate-950/50 p-3 rounded-xl border border-white/5 text-[11px] text-slate-300 space-y-1">
                  <p><strong>การออกใบรับรองความสามารถ (Certificate):</strong></p>
                  <p>
                    เมื่อคะแนนเฉลี่ยรวมทุกสมรรถนะ KSA-C ผ่านเกณฑ์ **ร้อยละ 80** และผ่านเควสจำลองการตัดสินใจครบถ้วน
                    ปุ่มดาวน์โหลดประกาศนียบัตรวิชาชีพด้านการโรงแรมในระบบจะเปิดขึ้นโดยอัตโนมัติ
                    ช่วยให้นักเรียนดาวน์โหลดไฟล์รับรองดิจิทัลไปใช้ประกอบการทำงานได้
                  </p>
                </div>
              </div>
            </div>
          </div>
        )

      case 'teacher-lesson':
        return (
          <div className="space-y-6 animate-fadeIn text-xs leading-relaxed font-sans">
            <div>
              <span className="text-[10px] text-amber-400 font-bold uppercase tracking-widest block font-mono">Teacher Curriculum Management</span>
              <h2 className="text-xl font-heading font-black text-white mt-1">8. Lesson Plan Builder (จัดการแผนการเรียนการสอนสัปดาห์ CRUD)</h2>
              <p className="text-slate-400 mt-1">
                แดชบอร์ดสําคัญสําหรับครูพิมพ์ใจในการบริหารการเรียนการสอนรายสัปดาห์ (สัปดาห์ที่ 1 - 18)
                ช่วยให้สามารถปรับหลักสูตร F-I-N-E ได้อย่างยืดหยุ่นและบันทึกคงอยู่ถาวร
              </p>
            </div>

            <div className="bg-[#151D2F]/60 border border-white/5 p-4 rounded-2xl space-y-3">
              <h3 className="text-xs font-bold text-white border-b border-white/5 pb-2">
                ⚙️ ระบบคำสั่งงาน CRUD (Create, Read, Update, Delete) เชิงลึก
              </h3>
              <p className="text-slate-400 text-[11px]">
                การทำงานจัดการหลักสูตรเชื่อมตรงกับหน่วยเก็บข้อมูลถาวร LocalStorage คีย์ <code className="bg-black/40 px-1 py-0.5 rounded text-cyan-400 font-mono font-bold">fineverse_lesson_plans</code> โดยมีเครื่องมือช่วยสอนทำงานดังนี้:
              </p>
              <div className="space-y-2 text-[11px]">
                <div className="bg-slate-950/50 p-2.5 rounded-xl border border-white/5">
                  <strong className="text-white block font-semibold">1. แถบเลือกสัปดาห์ (Read):</strong>
                  ครูกดเลือกแถบปุ่มสัปดาห์ 1 - 18 ด้านบน หน้าจอจะโหลดหัวข้อบทเรียน วัตถุประสงค์การเรียนรู้ และรายละเอียดแผนของสัปดาห์นั้นขึ้นมาแสดงในตัวแก้ไขทันที
                </div>
                <div className="bg-slate-950/50 p-2.5 rounded-xl border border-white/5">
                  <strong className="text-white block font-semibold">2. การอัปเดตและบันทึกข้อมูล (Update):</strong>
                  ครูสามารถเขียนแก้ไขหัวข้อ หรือเพิ่มข้อตกลงบทเรียนย่อยลงใน Text Input และเมื่อกดปุ่มสีเขียว **"💾 บันทึกแผนการสอนปัจจุบัน"** ข้อมูลจะถูกเข้ารหัสเซฟลงฐานข้อมูล Local คีย์จัดเก็บทันที
                </div>
                <div className="bg-slate-950/50 p-2.5 rounded-xl border border-white/5">
                  <strong className="text-white block font-semibold">3. การสร้างแผนเรียนรู้ใหม่ (+ สร้างแผนใหม่) (Create):</strong>
                  เมื่อต้องการเพิ่มสัปดาห์การเรียนเพิ่มเติม ครูกดปุ่มนี้เพื่อเพิ่ม Object แผนตัวใหม่ในรายการสัปดาห์ถัดไป ทำการกรอกข้อมูลแล้วเซฟลงในระบบ
                </div>
                <div className="bg-slate-950/50 p-2.5 rounded-xl border border-white/5">
                  <strong className="text-white block font-semibold">4. การลบแผนการสอน (Delete):</strong>
                  กดปุ่มสีแดง **"ลบแผนนี้"** เพื่อดึงสคริปต์กรองลบ Object แผนสัปดาห์นั้นออกจากอาเรย์ ล้างวิชาเรียนที่ไม่ต้องการได้ทันที
                </div>
                <div className="bg-slate-950/50 p-2.5 rounded-xl border border-white/5">
                  <strong className="text-amber-400 block font-semibold">5. คืนค่าแผนการสอนมาตรฐาน (Reset to Defaults):</strong>
                  ปุ่มสำหรับการกู้คืนข้อมูลแผนการสอนเริ่มต้นระดับสากล 4 สัปดาห์แรก (F-I-N-E Model 3D) กรณีที่ครูผู้สอนลบหรือทำการเปลี่ยนทดสอบหลักสูตรแล้วต้องการกู้ข้อมูลด่วน
                </div>
              </div>
            </div>
          </div>
        )

      case 'teacher-scenario':
        return (
          <div className="space-y-6 animate-fadeIn text-xs leading-relaxed font-sans">
            <div>
              <span className="text-[10px] text-amber-400 font-bold uppercase tracking-widest block font-mono">AI Conversational Control</span>
              <h2 className="text-xl font-heading font-black text-white mt-1">9. AI Scenario Builder (ตัวสร้างโจทย์และคำสั่งบทเรียน AI)</h2>
              <p className="text-slate-400 mt-1">
                ช่วยให้ครูผู้สอนปรับทัศนคติ พฤติกรรม และขอบเขตการพูดคุยของ AI Coach (อาจารย์ผู้สอนจำลอง)
                เพื่อกำหนดโจทย์สนทนาที่เหมาะสมในระดับทักษะต่าง ๆ ของนักเรียน
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-[#151D2F]/60 border border-white/5 p-4 rounded-2xl space-y-2">
                <h3 className="text-xs font-bold text-white">1. ชุด Prompt Preset ยอดนิยม (System Preset Modes)</h3>
                <p className="text-slate-400 text-[11px]">
                  ครูสามารถกดโหลด Prompt โครงสร้างมาตรฐานแบบสำเร็จรูปเพื่อสวมทับค่าประเมินผลได้ 3 หมวดหมู่หลัก:
                </p>
                <ul className="list-disc pl-5 text-slate-300 text-[11px] space-y-1.5">
                  <li><strong>Restaurant Greeting (ต้อนรับลูกค้า):</strong> สวมบทบาทเป็นลูกค้าที่ต้องการจองโต๊ะสำหรับ 2 ท่านเพื่อดินเนอร์ฉลองวันเกิด</li>
                  <li><strong>Taking Food Order (รับออเดอร์อาหาร):</strong> สวมบทบาทเป็นลูกค้าที่ทานมังสวิรัติ (Vegetarian) และต้องการคำแนะนำซุปและสลัด</li>
                  <li><strong>Dealing with Complaint (แก้ไขคำตำหนิ):</strong> สวมบทบาทเป็นลูกค้าที่ไม่พอใจอย่างมากเนื่องจากในซุปมีเส้นผมปะปนอยู่</li>
                </ul>
              </div>

              <div className="bg-[#151D2F]/60 border border-white/5 p-4 rounded-2xl space-y-2">
                <h3 className="text-xs font-bold text-white">2. การเขียน System Instructions & Ice Breaking</h3>
                <p className="text-slate-400 text-[11px]">
                  ครูสามารถปรับแต่งลักษณะข้อความผ่าน Text Area:
                </p>
                <ul className="list-disc pl-5 text-slate-300 text-[11px] space-y-1">
                  <li><strong>System Instructions:</strong> กำหนดบทบาทพฤติกรรม AI เช่น *"You are a demanding VIP customer. Speak English fluently, be slightly impatient, and evaluate if the student apologizes properly..."*</li>
                  <li><strong>Ice-Breaking Question:</strong> คำถามนำเพื่อทักทายขึ้นก่อนเมื่อเริ่มการแชท เช่น *"Good evening, I have a reservation under the name John. Is my table ready?"*</li>
                </ul>
              </div>
            </div>
          </div>
        )

      case 'teacher-analytics':
        return (
          <div className="space-y-6 animate-fadeIn text-xs leading-relaxed font-sans">
            <div>
              <span className="text-[10px] text-amber-400 font-bold uppercase tracking-widest block font-mono">Class Learning Analytics</span>
              <h2 className="text-xl font-heading font-black text-white mt-1">10. Class Analytics (วิเคราะห์ผลทักษะรายห้องเรียน)</h2>
              <p className="text-slate-400 mt-1">
                โมดูลการประมวลสถิติผลสัมฤทธิ์ทางการเรียนรวมของห้องเรียนวิชาบริการโรงแรม
                ช่วยให้ครูติดตามพัฒนาการรายบุคคลและภาพรวมชั้นเรียนได้อย่างใกล้ชิด
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-[#151D2F]/60 border border-white/5 p-4 rounded-2xl space-y-3">
                <h3 className="text-xs font-bold text-white flex items-center gap-1">
                  <Activity className="w-4 h-4 text-cyan-400" /> แดชบอร์ดสรุปทักษะ KSA-C รวม
                </h3>
                <p className="text-slate-400 text-[11px]">
                  แสดงผลเปอร์เซ็นต์อัตราการสอบผ่านเฉลี่ยในรูปแผนภูมิแท่งความก้าวหน้า
                  สะท้อนข้อมูลค่าเกณฑ์เฉลี่ยผลลัพธ์ของนักเรียนในชั้นเรียนทุกคน
                </p>
                <div className="bg-slate-950/50 p-3 rounded-xl border border-white/5 text-[11px] space-y-1 text-slate-300 font-mono">
                  <p className="text-white font-sans"><strong>สถิติสมรรถนะเฉลี่ย:</strong></p>
                  <div>- Knowledge: 88% (ความจำคำศัพท์ดีมาก)</div>
                  <div>- Skills: 72% (ทักษะออกเสียงอยู่ในระดับปานกลาง)</div>
                  <div>- Abilities: 75% (ความแม่นยำทางเลือกการเสิร์ฟ)</div>
                  <div>- Commitment: 90% (ชั่วโมงสะสมการทบทวนควิซสูง)</div>
                </div>
              </div>

              <div className="bg-[#151D2F]/60 border border-white/5 p-4 rounded-2xl space-y-3">
                <h3 className="text-xs font-bold text-white flex items-center gap-1">
                  <Users className="w-4 h-4 text-amber-400" /> รายงานรายบุคคลนักเรียน
                </h3>
                <p className="text-slate-400 text-[11px]">
                  ตารางรายงานข้อมูลพฤติกรรมการส่งสอบ ระดับการพูด และเกณฑ์คะแนนสะสมรายบุคคล
                </p>
                <div className="bg-slate-950/50 p-3 rounded-xl border border-white/5 text-[11px] text-slate-300 space-y-1.5">
                  <div className="flex justify-between border-b border-white/5 pb-1">
                    <span>สิริวัลย์ เจริญดี</span>
                    <span className="text-emerald-400 font-mono">Avg: 85% / Level: Advanced</span>
                  </div>
                  <p className="text-[10px] text-slate-400">
                    มีผลสัมฤทธิ์ผ่านเกณฑ์ระดับประเมินความสามารถ สามารถออกเอกสารรับรองทักษะ (Certificate) ส่งออกเป็นไฟล์ PDF ประวัติสะสมผลงานได้แล้ว
                  </p>
                </div>
              </div>
            </div>
          </div>
        )

      case 'teacher-assessment':
        return (
          <div className="space-y-6 animate-fadeIn text-xs leading-relaxed font-sans">
            <div>
              <span className="text-[10px] text-amber-400 font-bold uppercase tracking-widest block font-mono">Assessment Configuration</span>
              <h2 className="text-xl font-heading font-black text-white mt-1">11. Assessment Builder (เครื่องมือกำหนดเกณฑ์รูบริกและข้อสอบควิซ)</h2>
              <p className="text-slate-400 mt-1">
                แผงออกแบบแบบทดสอบให้ครูพิมพ์ใจสามารถกำหนดตัวเลือกข้อสอบ ความลึก และการตัดสินประเมินผลคะแนนผู้เรียนได้อย่างแม่นยำ
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-[#151D2F]/60 border border-white/5 p-4 rounded-2xl space-y-2.5">
                <h3 className="text-xs font-bold text-white">1. ตัวประเมินความถี่คำศัพท์และเกณฑ์ควิซ (Vocabulary Quiz Builder)</h3>
                <p className="text-slate-400 text-[11px]">
                  ออกแบบข้อทดสอบศัพท์เมื่อนักเรียนดูโมเดล 3D เสร็จสิ้น:
                </p>
                <ul className="list-disc pl-5 text-slate-300 text-[11px] space-y-1">
                  <li>ครูพิมพ์หัวข้อคำถาม (Question) เช่น *"Which glass is used for champagne service?"*</li>
                  <li>ระบุตัวเลือกคำตอบที่ถูกต้อง (Correct Option) เช่น *"Champagne Flute"*</li>
                  <li>ระบุคำตอบที่เป็นตัวเลือกหลอก (Incorrect Options) เช่น *"Water Goblet"*, *"Red Wine Glass"*</li>
                  <li>เมื่อครูบันทึก ควิซจะไปสตรีมอยู่ในหน้าโมเดล 3D โฮโลแกรมของนักเรียนโดยตรง</li>
                </ul>
              </div>

              <div className="bg-[#151D2F]/60 border border-white/5 p-4 rounded-2xl space-y-2.5">
                <h3 className="text-xs font-bold text-white">2. การจัดโครงสร้างรูบริกส์ประเมินสมรรถนะ</h3>
                <p className="text-slate-400 text-[11px]">
                  ครูระบุขีดจำกัดคะแนนรวม และการปรับสเกลเกณฑ์ตัดสินให้ผ่าน (เช่น 80% หรือ 24 คะแนนขึ้นไป)
                  เพื่อนำไปใช้คำนวณสิทธิ์เปิดทำงานของปุ่มดาวน์โหลดใบประกาศของนักเรียนฝั่ง Exhibit
                </p>
              </div>
            </div>
          </div>
        )

      case 'teacher-ar-manager':
        return (
          <div className="space-y-6 animate-fadeIn text-xs leading-relaxed font-sans">
            <div>
              <span className="text-[10px] text-amber-400 font-bold uppercase tracking-widest block font-mono">AR holograms design console</span>
              <h2 className="text-xl font-heading font-black text-white mt-1">12. AR & 3D Items Manager (คลังและแผงออกแบบโฮโลแกรมครู)</h2>
              <p className="text-slate-400 mt-1">
                ฟีเจอร์สำคัญสำหรับครูผู้สอนเพื่อใช้สร้าง ปรับแต่งรูปทรง และสตรีมโมเดล 3D ชิ้นใหม่ไปให้นักเรียนสแกนเรียนรู้แบบเรียลไทม์
                ช่วยให้หลักสูตรมีความทันสมัยอยู่เสมอ
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-[#151D2F]/60 border border-white/5 p-4 rounded-2xl space-y-3">
                <h3 className="text-xs font-bold text-white">📐 ขั้นตอนการสร้างโมเดล 3D แบบจำลองเสมือนจริง (Procedural Shape Creator)</h3>
                <p className="text-slate-400 text-[11px]">
                  ครูสามารถปรับแต่งค่ารูปทรงโมเดลที่ต้องการสร้างได้ 3 ทรงหลัก โดยการกรอกข้อมูลและใช้ Canvas ด้านขวาตรวจสอบรูปทรง:
                </p>
                <div className="grid grid-cols-3 gap-2 text-[10px] text-slate-300">
                  <div className="bg-slate-950/40 p-2.5 rounded-lg border border-white/5">
                    <strong className="text-cyan-400 block mb-0.5">1. ทรงเหลี่ยม (Box)</strong>
                    ระบุความกว้าง ความสูง และความลึก เหมาะกับการจำลอง ถาด บริการ สมุดเมนูอาหาร หรือโต๊ะวางของ
                  </div>
                  <div className="bg-slate-950/40 p-2.5 rounded-lg border border-white/5">
                    <strong className="text-amber-400 block mb-0.5">2. ทรงกระบอก (Cylinder)</strong>
                    ระบุรัศมีด้านบน ด้านล่าง และความสูง เหมาะกับการจำลอง แก้วทรงกระบอก แก้วไวน์ และขวดเครื่องดื่ม
                  </div>
                  <div className="bg-slate-950/40 p-2.5 rounded-lg border border-white/5">
                    <strong className="text-emerald-400 block mb-0.5">3. ทรงกลม (Sphere)</strong>
                    ระบุรัศมีและความกว้างทรง เหมาะกับการสร้างแบบจำลองลูกมะนาว ถ้วยไอศกรีม หรือผลไม้ประดับโต๊ะ
                  </div>
                </div>
              </div>

              <div className="bg-[#151D2F]/60 border border-white/5 p-4 rounded-2xl space-y-2">
                <h3 className="text-xs font-bold text-white">🎨 การกำหนดสีและรายละเอียดคำศัพท์ (Styling & Definitions)</h3>
                <p className="text-slate-400 text-[11px]">
                  ครูทำการระบุโค้ดสี HEX (เช่น <code className="text-amber-400">#d4af37</code> หรือป้อนค่าสีที่เลือก) เพื่อปรับสีของโมเดล Three.js
                  และป้อนชื่ออังกฤษ, คำอ่านสัทอักษร, นิยามไทย, วิธีใช้ และคำถามคำศัพท์
                  เมื่อครูกดปุ่ม **"➕ บันทึกอุปกรณ์ลงคลัง 3D"** รายการอุปกรณ์ชิ้นใหม่จะถูกบรรจุลงในรายการ LocalStorage และนักเรียนสามารถเข้ามาศึกษาหมุนเล่นและทำควิซได้ทันที
                </p>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-2xl text-amber-300">
                <div className="flex items-center gap-1.5 font-bold mb-1">
                  <Terminal className="w-4 h-4 text-amber-400" />
                  <span>ฟังก์ชันจัดเตรียมความสะดวกรวดเร็ว (Sample Items Seeding)</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  ครูสามารถคลิกปุ่มสีน้ำเงิน **"⚡ โหลดตัวอย่างโมเดลเริ่มต้น"** เพื่อป้อนข้อมูลอุปกรณ์ตัวอย่าง 2 รายการเข้าสู่ระบบแบบเร่งด่วน ได้แก่ **Espresso Cup (แก้วช็อตกาแฟสไตล์อิตาลี)** และ **Cocktail Shaker (กระบอกผสมเครื่องดื่มสแตนเลส)** เพื่อทดสอบการสตรีมและประเมินควิซได้ทันทีโดยไม่ต้องป้อนข้อมูลเองทั้งหมด
                </p>
              </div>
            </div>
          </div>
        )

      case 'admin-flow':
        return (
          <div className="space-y-6 animate-fadeIn text-xs leading-relaxed font-sans">
            <div>
              <span className="text-[10px] text-amber-400 font-bold uppercase tracking-widest block font-mono">System Flowchart & Technical Pipelines</span>
              <h2 className="text-xl font-heading font-black text-white mt-1">13. แผนภาพแสดงการไหลเวียนข้อมูล (System Flowchart)</h2>
              <p className="text-slate-400 mt-1">
                ผังโครงสร้างการแลกเปลี่ยนข้อมูลระหว่างแอปพลิเคชันฝั่งผู้ใช้งาน (Frontend)
                กับระบบบริการหลังบ้าน (REST API Backend) และตารางข้อมูล MySQL
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-white/5 space-y-4">
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="font-bold text-white text-[11px]">ผังการแลกเปลี่ยนระดับสถาปัตยกรรม (Architectural Pipelines)</span>
                <span className="text-[9px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded-full font-mono">WebSocket Supported</span>
              </div>

              <div className="space-y-3 font-mono text-[10px]">
                <div className="flex items-center justify-between bg-slate-900 border border-white/5 p-2 rounded-xl">
                  <span className="text-amber-400 font-bold">1. Frontend Layer (Next.js React)</span>
                  <ArrowRightLeft className="w-3.5 h-3.5 text-slate-500 mx-2" />
                  <span className="text-slate-300">Student, Teacher & Admin Portals (Local State Caching)</span>
                </div>

                <div className="flex items-center justify-between bg-slate-900 border border-white/5 p-2 rounded-xl">
                  <span className="text-cyan-400 font-bold">2. Connection Protocol</span>
                  <ArrowRightLeft className="w-3.5 h-3.5 text-slate-500 mx-2" />
                  <span className="text-slate-300">REST API Queries & WebSocket Audio Streaming (16kHz / 1024 chunks)</span>
                </div>

                <div className="flex items-center justify-between bg-slate-900 border border-white/5 p-2 rounded-xl">
                  <span className="text-indigo-400 font-bold">3. Backend Layer (Laravel & AI)</span>
                  <ArrowRightLeft className="w-3.5 h-3.5 text-slate-500 mx-2" />
                  <span className="text-slate-300">REST API Services, Gemini Multimodal Live, ORM Controllers</span>
                </div>

                <div className="flex items-center justify-between bg-slate-900 border border-white/5 p-2 rounded-xl">
                  <span className="text-emerald-400 font-bold">4. Database Storage (MySQL)</span>
                  <ArrowRightLeft className="w-3.5 h-3.5 text-slate-500 mx-2" />
                  <span className="text-slate-300">ตารางความสัมพันธ์หลัก tb_users, tb_lessons, tb_attempts, tb_ar_objects</span>
                </div>
              </div>
            </div>

            <div className="bg-[#151D2F]/60 border border-white/5 p-4 rounded-2xl text-[11px] space-y-2">
              <strong className="text-white block font-heading">💡 ระบบสำรองเก็บข้อมูล (State Caching System)</strong>
              <p className="text-slate-400 leading-normal">
                เพื่อให้แอปพลิเคชันทำงานได้แบบ Offline-First และประหยัดทราฟฟิกหลังบ้านสำหรับการตรวจสอบ
                ข้อมูลแผนการเรียนสอน คลังโมเดล 3D และประวัติคะแนนของนักเรียน
                จะถูกจัดเก็บบันทึกสำรองผ่าน Client Caching (LocalStorage) ควบคู่กับฐานข้อมูลระบบหลัก
                โดยสามารถกู้คืนหรือรีเซ็ตข้อมูลผ่านคอนโซลครูหรือแอดมินได้ตลอดเวลา
              </p>
            </div>
          </div>
        )

      case 'admin-access':
        return (
          <div className="space-y-6 animate-fadeIn text-xs leading-relaxed font-sans">
            <div>
              <span className="text-[10px] text-amber-400 font-bold uppercase tracking-widest block font-mono">Access Rights Configuration</span>
              <h2 className="text-xl font-heading font-black text-white mt-1">14. ระบบจัดการบทบาทและสิทธิ์ผู้ใช้งาน (Role & Access Control)</h2>
              <p className="text-slate-400 mt-1">
                ความปลอดภัยและการสับเปลี่ยนสิทธิ์การเข้าถึงฟีเจอร์ต่างๆ ของระบบจำลองความพึงพอใจการเรียนรู้
                แอดมินควบคุมการเข้าใช้แยกส่วนผ่านแผง Operator Control Panel
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-[#151D2F]/60 border border-white/5 p-4 rounded-2xl space-y-2">
                <h3 className="text-xs font-bold text-white">1. สมาชิกผู้ดูแลและครูผู้สอนในระบบปัจจุบัน</h3>
                <p className="text-slate-400 text-[11px]">
                  รายชื่อเจ้าหน้าที่ที่ลงทะเบียนสิทธิ์แอดมินและครูผู้ดูแลวิชาเรียน:
                </p>
                <ul className="list-disc pl-5 text-slate-300 text-[11px] space-y-1">
                  <li><strong>สุทธิพจน์ ดีเลิศ (ADMIN):</strong> อีเมลเข้าใช้งาน `admin@fine-model.com` (สิทธิ์ Operator สูงสุด)</li>
                  <li><strong>ครูพิมพ์ใจ แสนดี (TEACHER):</strong> อีเมลเข้าใช้งาน `pimjai@fine-model.com` (สิทธิ์จัดโครงสร้างแผนการสอนและคลัง 3D)</li>
                  <li><strong>สิริวัลย์ เจริญดี (STUDENT):</strong> อีเมลเข้าใช้งาน `student.siriwan@fine-model.com` (สิทธิ์ผู้เรียนสแกนและโต้ตอบเสียงสด)</li>
                </ul>
              </div>

              <div className="bg-[#151D2F]/60 border border-white/5 p-4 rounded-2xl space-y-2">
                <h3 className="text-xs font-bold text-white">2. ตารางสวิทช์เปิด-ปิดความสามารถระบบ (Feature Permissions Toggles)</h3>
                <p className="text-slate-400 text-[11px]">
                  แอดมินสามารถเปิดหรือปิดสิทธิ์ฟังก์ชันใช้งานผ่านแผงควบคุมหลัก เพื่อปรับความปลอดภัยของระบบ:
                </p>
                <div className="bg-slate-950/50 p-3 rounded-xl border border-white/5 text-[11px] text-slate-300 space-y-1">
                  <div className="flex justify-between">
                    <strong>สิทธิ์ฝั่งผู้เรียน (Student App Toggles):</strong>
                    <span className="text-emerald-400">Enabled (เปิดใช้งาน)</span>
                  </div>
                  <p className="text-[10px] text-slate-400 mb-2">อนุญาตให้เข้าเรียนรายสัปดาห์, ใช้กล้อง AR 3D Scanner, และเชื่อม Live API คลื่นเสียง</p>

                  <div className="flex justify-between border-t border-white/5 pt-2">
                    <strong>สิทธิ์ฝั่งครู (Teacher App Toggles):</strong>
                    <span className="text-emerald-400">Enabled (เปิดใช้งาน)</span>
                  </div>
                  <p className="text-[10px] text-slate-400 mb-2">อนุญาตให้ออกแบบบทเรียนสัปดาห์ CRUD, กำหนดเกณฑ์รูบริก และจัดการคลังโมเดล 3D</p>

                  <div className="flex justify-between border-t border-white/5 pt-2">
                    <strong>ระบบจัดการความปลอดภัยหลังบ้าน (Admin System Backup):</strong>
                    <span className="text-rose-400">Admin Only (แอดมินเท่านั้น)</span>
                  </div>
                  <p className="text-[10px] text-slate-400">สิทธิ์ในการตรวจสอบความปลอดภัย Log การต่อ WebSocket และการจัดการ Schema ฐานข้อมูล</p>
                </div>
              </div>
            </div>
          </div>
        )

      case 'admin-schema':
        return (
          <div className="space-y-6 animate-fadeIn text-xs leading-relaxed font-sans">
            <div>
              <span className="text-[10px] text-amber-400 font-bold uppercase tracking-widest block font-mono">Relational DB schemas</span>
              <h2 className="text-xl font-heading font-black text-white mt-1">15. แผงโครงสร้างตารางหลักฐานข้อมูล (Database Schema)</h2>
              <p className="text-slate-400 mt-1">
                คลิกเลือกตารางฐานข้อมูลหลักด้านล่างนี้เพื่ออ่านนิยามคอลัมน์ (Column), ประเภทข้อมูล (Data Type) และจุดเชื่อมต่อความสัมพันธ์ (Foreign Key) ของ MySQL DB:
              </p>
            </div>

            {/* Interactive Table Picker */}
            <div className="flex flex-wrap gap-1 bg-slate-950/60 p-1.5 rounded-xl border border-white/5">
              {Object.keys(dbTables).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveDbTable(key)}
                  className={`px-2.5 py-1.5 text-[9px] font-bold rounded-lg transition-all ${activeDbTable === key
                    ? 'bg-amber-500 text-slate-950 font-extrabold shadow-md'
                    : 'text-slate-400 hover:text-white'
                    }`}
                >
                  tb_{key}
                </button>
              ))}
            </div>

            {/* Active Table Details Display */}
            <div className="bg-[#151D2F]/60 border border-white/5 p-4 rounded-xl">
              <div className="flex items-center gap-1.5 mb-2 border-b border-white/5 pb-2">
                <Database className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-mono font-bold text-white">Table: tb_{dbTables[activeDbTable].name}</span>
                <span className="text-[10px] text-slate-400 font-sans ml-auto">({dbTables[activeDbTable].desc})</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-[9px] leading-relaxed">
                  <thead>
                    <tr className="text-slate-500 border-b border-white/5">
                      <th className="py-2">Column (คอลัมน์)</th>
                      <th className="py-2">DataType</th>
                      <th className="py-2">Description (คำอธิบายคอลัมน์)</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-300 divide-y divide-white/5 text-[9px]">
                    {dbTables[activeDbTable].columns.map((c, idx) => (
                      <tr key={idx} className="hover:bg-white/5">
                        <td className="py-2 font-bold text-cyan-400 flex items-center gap-1">
                          {c.type.includes('PK') || c.type.includes('FK') ? (
                            <Key className="w-2.5 h-2.5 text-amber-500 shrink-0" />
                          ) : (
                            <div className="w-2.5 h-2.5 shrink-0" />
                          )}
                          {c.name}
                        </td>
                        <td className="py-2 text-amber-400 font-semibold">{c.type}</td>
                        <td className="py-2 text-slate-400 font-sans">{c.desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )

      case 'tech-stack':
        return (
          <div className="space-y-6 animate-fadeIn text-xs leading-relaxed font-sans">
            <div>
              <span className="text-[10px] text-amber-400 font-bold uppercase tracking-widest block font-mono">Integrated Tech Stack & API specs</span>
              <h2 className="text-xl font-heading font-black text-white mt-1">16. ชุดเทคโนโลยีพัฒนาและคลังไลบรารี (Technology Stack)</h2>
              <p className="text-slate-400 mt-1">
                การพัฒนาแพลตฟอร์มจำลองเสมือนจริงสำหรับงานบริการโรงแรม บูรณาการชุดคำสั่งและเทคโนโลยีหลักดังนี้:
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-[#151D2F]/60 border border-white/5 p-4 rounded-2xl space-y-2">
                <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Terminal className="w-4 h-4 text-amber-400" /> 1. เครื่องมือพัฒนาระดับฟรอนต์เอนด์ (Frontend Client Layer)
                </h3>
                <ul className="list-disc pl-5 text-slate-300 text-[11px] space-y-1">
                  <li><strong>Next.js 15+ & React 19:</strong> ใช้สำหรับการทำ Routing เส้นทางโครงสร้างหน้าพอร์ทัล และจัดการ React Hooks</li>
                  <li><strong>Tailwind CSS & Vanilla CSS:</strong> ใช้สำหรับประกอบแผงจัดเรียงสไตล์กระจก Glassmorphism และธีมมืดนีออนทอง</li>
                  <li><strong>Three.js & React Three Fiber (R3F):</strong> ใช้ประกอบฉากสร้างและเรนเดอร์โมเดล 3D แบบเรียลไทม์ฝั่งผู้เรียนและผู้สอน</li>
                  <li><strong>Lucide Icons:</strong> ใช้สร้างไอคอนแทนความหมายของฟังก์ชันบริการ</li>
                </ul>
              </div>

              <div className="bg-[#151D2F]/60 border border-white/5 p-4 rounded-2xl space-y-2">
                <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Server className="w-4 h-4 text-cyan-400" /> 2. เครื่องมือพัฒนาระดับหลังบ้านและฐานข้อมูล (Backend REST APIs)
                </h3>
                <ul className="list-disc pl-5 text-slate-300 text-[11px] space-y-1">
                  <li><strong>Laravel 11 & PHP 8.3:</strong> โครงสร้างหลักในการประมวล REST APIs สถิติผู้ใช้งาน และการส่งข้อมูล Rubrics</li>
                  <li><strong>MySQL 8.0:</strong> ฐานข้อมูลจัดเก็บรายชื่อสมาชิก ตารางหลักสูตรวิชาชีพ และบันทึกคะแนนสมรรถนะสะสม</li>
                  <li><strong>Client Caching (LocalStorage):</strong> ใช้สำหรับเก็บข้อมูลออฟไลน์แผนการสอนวิชา และคลังโมเดล 3D เพื่อความรวดเร็ว</li>
                </ul>
              </div>

              <div className="bg-[#151D2F]/60 border border-white/5 p-4 rounded-2xl space-y-2">
                <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Cpu className="w-4 h-4 text-emerald-400" /> 3. ระบบปัญญาประดิษฐ์บูรณาการ (AI APIs Specifications)
                </h3>
                <ul className="list-disc pl-5 text-slate-300 text-[11px] space-y-1">
                  <li><strong>Google Gemini Live Client API (Live Coach):</strong> ใช้ระบบเสียงและวิดีโอแบบสดสองทางบนสัญญาสตรีมไมค์ Mono 16kHz ผ่าน WebSocket</li>
                  <li><strong>Gemini Vision API (AI Scanner):</strong> วิเคราะห์เฟรมภาพถ่ายและจับวัตถุเพื่อสร้างคำแปลไทย-อังกฤษอัตโนมัติ</li>
                </ul>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 flex flex-col justify-between font-sans relative overflow-hidden select-none antialiased">
      {/* Background glowing effects */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none animate-pulse-slow" />

      {/* Header */}
      <header className="glass-panel border-b border-white/5 py-4 px-6 relative z-20 backdrop-blur-md bg-[#050811]/80">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-[10px] text-slate-400 hover:text-white flex items-center gap-1 bg-white/5 border border-white/5 px-3 py-1.5 rounded-full transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> กลับหน้าหลักพอร์ทัล
            </Link>
            <div className="h-4 w-px bg-white/10" />
            <img src="/logo.png" alt="FINE-MODEL Logo" className="w-6 h-6 object-contain rounded-md shadow bg-slate-950/20" />
            <span className="font-heading text-sm font-black tracking-wider text-white">FINE-MODEL DOCS</span>
          </div>
          <span className="text-[9px] uppercase bg-amber-500/10 text-amber-400 font-bold border border-amber-500/20 px-2.5 py-0.5 rounded-full tracking-widest">
            User Guide v1.2
          </span>
        </div>
      </header>

      {/* Main Layout wrapper */}
      <div className="flex-grow flex flex-col md:flex-row max-w-7xl mx-auto w-full px-6 py-8 gap-6 relative z-10 items-stretch">

        {/* Left Sidebar Menu */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="bg-[#151D2F]/40 border border-white/5 p-4 rounded-3xl backdrop-blur-md sticky top-24 space-y-5">
            <div className="flex items-center gap-2 px-1 pb-2 border-b border-white/5">
              <BookOpen className="w-5 h-5 text-amber-400" />
              <h3 className="font-heading font-black text-xs text-white uppercase tracking-wider">สารบัญคู่มือ</h3>
            </div>

            <nav className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
              {groups.map((group, groupIdx) => (
                <div key={groupIdx} className="space-y-1">
                  <span className="text-[8px] uppercase font-black text-slate-500 tracking-wider block px-2.5">
                    {group.title}
                  </span>
                  <div className="space-y-0.5">
                    {group.items.map((item) => {
                      const IconComponent = item.icon
                      const isActive = activeSection === item.id
                      return (
                        <button
                          key={item.id}
                          onClick={() => setActiveSection(item.id)}
                          className={`w-full text-left px-2.5 py-1.5 rounded-xl text-[10px] transition-all flex items-center gap-2 border ${isActive
                            ? 'bg-amber-500/10 text-amber-400 border-amber-500/20 font-bold'
                            : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border-transparent'
                            }`}
                        >
                          <IconComponent className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">{item.label}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}
            </nav>
          </div>
        </aside>

        {/* Right Content Panel */}
        <main className="flex-grow bg-[#151D2F]/20 border border-white/5 p-6 md:p-8 rounded-3xl backdrop-blur-md min-h-[500px]">
          {renderContent()}
        </main>

      </div>

      {/* Footer */}
      <footer className="glass-panel border-t border-white/5 py-4 text-center text-[10px] text-slate-500 relative z-20 bg-[#050811]/90">
        <p>&copy; 2026 FINE Model 3D AR+AI Hospitality Learning Platform. All rights reserved.</p>
      </footer>
    </div>
  )
}
