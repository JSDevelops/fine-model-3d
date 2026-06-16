"use client";

import React, { useState } from 'react'
import { Shield, Users, Check, AlertCircle, ToggleLeft, ToggleRight } from 'lucide-react'

export default function UserAccess() {
  const [users, setUsers] = useState([
    { name: "สุทธิพจน์ ดีเลิศ", role: "ADMIN", email: "admin@fine-model.com", status: "Active" },
    { name: "ครูพิมพ์ใจ แสนดี", role: "TEACHER", email: "pimjai@fine-model.com", status: "Active" },
    { name: "สิริวัลย์ เจริญดี", role: "STUDENT", email: "student.siriwan@fine-model.com", status: "Active" }
  ])

  const [permissions, setPermissions] = useState({
    student: [
      { name: "เรียนรู้เนื้อหารายสัปดาห์", enabled: true },
      { name: "เข้าใช้งานกล้องสแกน AR 3D", enabled: true },
      { name: "ฝึกพูดและส่งประเมินเสียงสนทนากับ AI", enabled: true },
      { name: "ดูรายงานพอร์ตโฟลิโอตนเอง", enabled: true },
      { name: "แก้ไขหรือสร้างแผนการสอน", enabled: false }
    ],
    teacher: [
      { name: "สร้างและจัดโครงสร้างรายวิชา", enabled: true },
      { name: "กำหนดแผนและเนื้อหา F-I-N-E", enabled: true },
      { name: "ตรวจสอบประวัติ/สถิติการเรียนห้องเรียน", enabled: true },
      { name: "ปรับปรุงและบันทึกเกณฑ์รูบริกประเมินผล", enabled: true },
      { name: "เข้าถึงระบบหลังบ้านทั้งหมด", enabled: false }
    ],
    admin: [
      { name: "จัดการสิทธิ์และความปลอดภัยผู้ใช้งาน", enabled: true },
      { name: "ตรวจสอบ Log และระบบสำรองฐานข้อมูล", enabled: true },
      { name: "จัดการ API Service และ Cloud Storage", enabled: true }
    ]
  })

  const handleToggle = (role, idx) => {
    const updatedRolePerms = [...permissions[role]]
    updatedRolePerms[idx].enabled = !updatedRolePerms[idx].enabled
    setPermissions(prev => ({
      ...prev,
      [role]: updatedRolePerms
    }))
  }

  return (
    <div className="flex flex-col h-full justify-between">
      <div className="space-y-4">
        {/* Header */}
        <div>
          <span className="text-[10px] text-amber-400 font-bold uppercase tracking-widest block font-sans">Role & Access Control</span>
          <h2 className="text-lg font-heading font-black text-white">2. ระบบจัดการบทบาทและสิทธิ์ผู้ใช้งาน (Role & Access Control)</h2>
          <p className="text-slate-400 text-xs mt-0.5 font-sans">ตรวจสอบและกำหนดสิทธิ์ผู้เรียน ผู้จัดการวิชา และผู้ดูแลระบบ</p>
        </div>

        {/* User list table */}
        <div className="bg-slate-950/60 border border-white/5 p-3 rounded-xl max-h-[110px] overflow-y-auto pr-1">
          <table className="w-full text-left font-sans text-[9px] leading-relaxed">
            <thead>
              <tr className="text-slate-500 border-b border-white/5">
                <th className="py-1">ชื่อผู้ใช้งาน</th>
                <th className="py-1">บทบาท</th>
                <th className="py-1">อีเมล</th>
                <th className="py-1 text-right">สถานะ</th>
              </tr>
            </thead>
            <tbody className="text-slate-300 divide-y divide-white/5 font-mono">
              {users.map((u, idx) => (
                <tr key={idx} className="hover:bg-white/5">
                  <td className="py-1.5 font-sans font-bold text-white">{u.name}</td>
                  <td className="py-1.5">
                    <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold ${
                      u.role === 'ADMIN' ? 'bg-rose-500/10 text-rose-400' : u.role === 'TEACHER' ? 'bg-cyan-500/10 text-cyan-400' : 'bg-emerald-500/10 text-emerald-400'
                    }`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="py-1.5 text-slate-400">{u.email}</td>
                  <td className="py-1.5 text-right font-sans text-emerald-400 font-semibold">{u.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Permissions Grid */}
        <div className="grid grid-cols-3 gap-2">
          {Object.keys(permissions).map((role) => (
            <div key={role} className="bg-[#151D2F]/60 border border-white/5 p-3 rounded-xl flex flex-col justify-between max-h-[140px] overflow-y-auto">
              <div>
                <span className="text-[9px] font-black uppercase text-amber-400 block border-b border-white/5 pb-1 mb-2">
                  🛡️ {role === 'student' ? 'Student สิทธิ์' : role === 'teacher' ? 'Teacher สิทธิ์' : 'Admin สิทธิ์'}
                </span>
                <div className="space-y-1.5">
                  {permissions[role].map((p, idx) => (
                    <div key={idx} className="flex items-start justify-between gap-1 text-[8px] font-sans">
                      <span className="text-slate-300 leading-snug">{p.name}</span>
                      <button onClick={() => handleToggle(role, idx)} className="shrink-0 text-slate-500 hover:text-white">
                        {p.enabled ? (
                          <ToggleRight className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <ToggleLeft className="w-4 h-4 text-slate-600" />
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
