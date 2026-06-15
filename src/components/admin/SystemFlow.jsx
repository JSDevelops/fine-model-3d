"use client";

import React from 'react'
import { Server, Database, Smartphone, ShieldCheck, ArrowRightLeft, Cpu } from 'lucide-react'

export default function SystemFlow() {
  const apis = [
    "Authentication Service",
    "Learning Management Service",
    "AR Content Service",
    "AI Conversation Service",
    "Simulation Engine",
    "Assessment Engine",
    "Portfolio Service",
    "Analytics Service"
  ]

  const dbs = [
    "users", "courses", "lessons", "ar_objects",
    "simulations", "assessments", "portfolios", "learning_analytics"
  ]

  return (
    <div className="flex flex-col h-full justify-between">
      <div className="space-y-4">
        {/* Header */}
        <div>
          <span className="text-[10px] text-amber-400 font-bold uppercase tracking-widest block font-sans">System Architecture</span>
          <h2 className="text-lg font-heading font-black text-white">1. โครงสร้างสถาปัตยกรรมระบบ (System Architecture)</h2>
          <p className="text-slate-400 text-xs mt-0.5 font-sans">แผนภาพการเชื่อมต่อฝั่งฟรอนต์เอนด์ หลังบ้าน และฐานข้อมูล</p>
        </div>

        {/* Dynamic Architectural Grid */}
        <div className="grid grid-cols-5 gap-2 items-stretch py-2 text-center text-[9px] font-sans">
          
          {/* Column 1: Frontend Clients */}
          <div className="col-span-1 flex flex-col justify-between bg-slate-950/80 border border-white/5 p-3 rounded-2xl">
            <span className="text-slate-500 font-bold uppercase tracking-wider block mb-2">Frontend Layer</span>
            <div className="space-y-2 flex-1 flex flex-col justify-center">
              <div className="bg-[#151D2F] border border-white/5 p-2 rounded-xl flex items-center justify-center gap-1 text-slate-300">
                <Smartphone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="truncate">Student App</span>
              </div>
              <div className="bg-[#151D2F] border border-white/5 p-2 rounded-xl flex items-center justify-center gap-1 text-slate-300">
                <Server className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span className="truncate">Teacher App</span>
              </div>
              <div className="bg-[#151D2F] border border-white/5 p-2 rounded-xl flex items-center justify-center gap-1 text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="truncate">Admin Panel</span>
              </div>
              <div className="bg-[#151D2F] border border-white/5 p-2 rounded-xl flex items-center justify-center gap-1 text-slate-300">
                <Smartphone className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span className="truncate">Mobile PWA</span>
              </div>
            </div>
          </div>

          {/* Column 2: REST Connection Indicator */}
          <div className="col-span-1 flex flex-col justify-center items-center">
            <ArrowRightLeft className="w-6 h-6 text-amber-500 animate-pulse-slow" />
            <span className="text-slate-500 font-bold uppercase text-[8px] mt-1.5 tracking-widest">REST API</span>
          </div>

          {/* Column 3: Backend REST Services */}
          <div className="col-span-1 flex flex-col justify-between bg-slate-950/80 border border-white/5 p-3 rounded-2xl">
            <span className="text-slate-500 font-bold uppercase tracking-wider block mb-2">Backend REST API</span>
            <div className="space-y-1.5 flex-1 flex flex-col justify-center overflow-y-auto max-h-[160px] pr-0.5">
              {apis.map((api, idx) => (
                <div key={idx} className="bg-slate-900 border border-white/5 p-1 rounded-lg text-slate-300 flex items-center justify-start gap-1 font-mono text-[8px]">
                  <Cpu className="w-2.5 h-2.5 text-cyan-400 shrink-0" />
                  <span className="truncate">{api}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Column 4: Connection Indicator */}
          <div className="col-span-1 flex flex-col justify-center items-center">
            <ArrowRightLeft className="w-6 h-6 text-cyan-400 animate-pulse-slow" />
            <span className="text-slate-500 font-bold uppercase text-[8px] mt-1.5 tracking-widest">ORM Model</span>
          </div>

          {/* Column 5: Database Schema */}
          <div className="col-span-1 flex flex-col justify-between bg-slate-950/80 border border-white/5 p-3 rounded-2xl">
            <span className="text-slate-500 font-bold uppercase tracking-wider block mb-2">MySQL Database</span>
            <div className="space-y-1.5 flex-1 flex flex-col justify-center overflow-y-auto max-h-[160px] pr-0.5">
              {dbs.map((db, idx) => (
                <div key={idx} className="bg-slate-900 border border-white/5 p-1 rounded-lg text-slate-300 flex items-center justify-start gap-1 font-mono text-[8px]">
                  <Database className="w-2.5 h-2.5 text-amber-500 shrink-0" />
                  <span className="truncate">tb_{db}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
