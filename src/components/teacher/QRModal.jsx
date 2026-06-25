"use client";

import React, { useRef } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { X, Download, Copy, CheckCircle, ExternalLink } from 'lucide-react'

export default function QRModal({ item, onClose }) {
  const svgRef = useRef(null)
  const [copied, setCopied] = React.useState(false)

  const BASE_URL = 'https://krupim-finemodel3d-ar.com'
  
  // If it's a custom item, encode all details into the QR code URL so it can be loaded on any device
  let itemUrl = `${BASE_URL}/item/${item.id}`
  if (!item.id.startsWith('sample_')) {
    try {
      const compact = {
        id: item.id,
        title: item.title,
        thai: item.thai,
        pronunciation: item.pronunciation,
        description: item.description,
        how_to_use: item.how_to_use,
        sentence: item.sentence,
        shape: item.shape,
        quiz: item.quiz
      }
      const jsonStr = JSON.stringify(compact)
      const b64 = btoa(encodeURIComponent(jsonStr).replace(/%([0-9A-F]{2})/g, (match, p1) => {
        return String.fromCharCode(parseInt(p1, 16))
      }))
      itemUrl = `${BASE_URL}/item/custom?d=${b64}`
    } catch (e) {
      console.error("Error encoding custom item URL:", e)
    }
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(itemUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (e) {}
  }

  const handleDownload = () => {
    const svgEl = svgRef.current?.querySelector('svg')
    if (!svgEl) return
    const svgData = new XMLSerializer().serializeToString(svgEl)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()
    canvas.width = 400
    canvas.height = 400
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(svgBlob)
    img.onload = () => {
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, 400, 400)
      ctx.drawImage(img, 0, 0, 400, 400)
      URL.revokeObjectURL(url)
      const link = document.createElement('a')
      link.download = `qr-${item.title.replace(/\s+/g, '-').toLowerCase()}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    }
    img.src = url
  }

  return (
    <div
      className="fixed inset-0 z-[999] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 font-sans"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-[#0b101e] border border-white/10 rounded-3xl w-full max-w-xs shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-white/5">
          <div>
            <p className="text-[9px] text-amber-400 uppercase font-bold tracking-widest">QR Code</p>
            <h3 className="text-sm font-heading font-black text-white mt-0.5">{item.title}</h3>
            <p className="text-[10px] text-slate-400">{item.thai}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-white/5 rounded-xl flex items-center justify-center hover:bg-white/10 transition"
          >
            <X className="w-4 h-4 text-slate-400" />
          </button>
        </div>

        {/* QR Code */}
        <div className="flex flex-col items-center px-5 py-6 gap-4">
          <div
            ref={svgRef}
            className="bg-white rounded-2xl p-4 shadow-lg shadow-black/30"
          >
            <QRCodeSVG
              value={itemUrl}
              size={200}
              bgColor="#ffffff"
              fgColor="#050811"
              level="H"
              includeMargin={false}
              imageSettings={{
                src: '/icon.png',
                x: undefined,
                y: undefined,
                height: 36,
                width: 36,
                excavate: true,
              }}
            />
          </div>

          <div className="text-center">
            <p className="text-[10px] text-slate-400 leading-relaxed">
              นักเรียนสแกน QR Code นี้ด้วยกล้องมือถือ<br/>
              เพื่อดูโมเดล 3D และเรียนรู้คำศัพท์
            </p>
          </div>

          {/* URL Preview */}
          <div className="w-full bg-slate-950/80 border border-white/5 rounded-xl px-3 py-2 flex items-center gap-2">
            <span className="text-[9px] text-slate-400 flex-1 truncate font-mono">{itemUrl}</span>
            <button
              onClick={handleCopy}
              className="shrink-0 flex items-center gap-1 text-[9px] text-amber-400 hover:text-amber-300 transition"
            >
              {copied ? <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'คัดลอกแล้ว!' : 'คัดลอก'}
            </button>
          </div>

          {/* Action Buttons */}
          <div className="w-full grid grid-cols-2 gap-2">
            <button
              onClick={handleDownload}
              className="flex items-center justify-center gap-1.5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-[10px] font-black rounded-xl transition shadow-lg shadow-amber-500/20"
            >
              <Download className="w-3.5 h-3.5" /> ดาวน์โหลด
            </button>
            <a
              href={itemUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 text-[10px] font-bold rounded-xl transition"
            >
              <ExternalLink className="w-3.5 h-3.5" /> เปิดลิงก์
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
