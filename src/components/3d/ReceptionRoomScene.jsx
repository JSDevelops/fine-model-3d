"use client";

import React, { useState, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Html, ContactShadows, Float } from '@react-three/drei'

// A luxury gold Chandelier
function Chandelier({ position }) {
  return (
    <group position={position}>
      {/* Chain */}
      <mesh>
        <cylinderGeometry args={[0.015, 0.015, 1.2, 8]} />
        <meshStandardMaterial color="#b45309" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Central Ring */}
      <mesh position={[0, -0.6, 0]}>
        <torusGeometry args={[0.5, 0.04, 8, 32]} />
        <meshStandardMaterial color="#fbbf24" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Candle bulbs and mini spotlights */}
      {[-0.5, 0, 0.5].map((x, i) => 
        [-0.5, 0, 0.5].map((z, j) => {
          // Put lights along the ring
          if (x === 0 && z === 0) return null;
          const length = Math.sqrt(x*x + z*z);
          const nx = (x / length) * 0.5;
          const nz = (z / length) * 0.5;
          return (
            <group key={`${i}-${j}`} position={[nx, -0.55, nz]}>
              {/* Candlestick */}
              <mesh>
                <cylinderGeometry args={[0.03, 0.03, 0.15, 8]} />
                <meshStandardMaterial color="#fbbf24" metalness={0.9} roughness={0.1} />
              </mesh>
              {/* Flame bulb */}
              <mesh position={[0, 0.12, 0]}>
                <sphereGeometry args={[0.04, 8, 8]} scale={[1, 1.6, 1]} />
                <meshBasicMaterial color="#f59e0b" />
              </mesh>
            </group>
          )
        })
      )}
      {/* Main Warm Light Casting Down */}
      <pointLight position={[0, -0.8, 0]} intensity={2.5} distance={10} color="#f59e0b" castShadow />
    </group>
  )
}

// Grand Piano Component
function GrandPiano({ position, rotation }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Main Body */}
      <mesh position={[0, 0.7, 0]} castShadow>
        <boxGeometry args={[1.2, 0.4, 1.4]} />
        <meshStandardMaterial color="#020617" roughness={0.05} metalness={0.9} />
      </mesh>
      {/* Lid (open slightly) */}
      <mesh position={[0.2, 1.0, 0]} rotation={[0, 0, -0.25]} castShadow>
        <boxGeometry args={[1.2, 0.03, 1.4]} />
        <meshStandardMaterial color="#020617" roughness={0.05} metalness={0.9} />
      </mesh>
      {/* Keyboard */}
      <mesh position={[0, 0.65, 0.725]} castShadow>
        <boxGeometry args={[1.0, 0.1, 0.15]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.2} />
      </mesh>
      {/* Keyboard lid */}
      <mesh position={[0, 0.75, 0.675]} castShadow>
        <boxGeometry args={[1.05, 0.15, 0.05]} />
        <meshStandardMaterial color="#020617" roughness={0.05} />
      </mesh>
      {/* Music Stand */}
      <mesh position={[0, 0.95, 0.4]} rotation={[-0.4, 0, 0]} castShadow>
        <boxGeometry args={[0.6, 0.3, 0.02]} />
        <meshStandardMaterial color="#0f172a" roughness={0.2} />
      </mesh>
      {/* 3 Legs */}
      {[[-0.5, 0.35, -0.6], [0.5, 0.35, -0.6], [0, 0.35, 0.5]].map((pos, idx) => (
        <mesh key={idx} position={pos} castShadow>
          <cylinderGeometry args={[0.04, 0.02, 0.7, 8]} />
          <meshStandardMaterial color="#020617" roughness={0.1} metalness={0.9} />
        </mesh>
      ))}
      {/* Piano Bench */}
      <group position={[0, 0, 1.1]}>
        <mesh position={[0, 0.45, 0]} castShadow>
          <boxGeometry args={[0.7, 0.08, 0.3]} />
          <meshStandardMaterial color="#1e293b" roughness={0.9} />
        </mesh>
        {/* Bench Legs */}
        {[[-0.3, 0.22, -0.1], [0.3, 0.22, -0.1], [-0.3, 0.22, 0.1], [0.3, 0.22, 0.1]].map((p, idx) => (
          <mesh key={idx} position={p} castShadow>
            <cylinderGeometry args={[0.025, 0.02, 0.45, 8]} />
            <meshStandardMaterial color="#020617" roughness={0.1} />
          </mesh>
        ))}
      </group>
      {/* Floating tag */}
      <Html distanceFactor={7} position={[0, 1.2, 0]} center>
        <div className="bg-slate-900/80 border border-slate-700 text-slate-400 text-[10px] px-2 py-0.5 rounded-full pointer-events-none uppercase">
          Grand Piano
        </div>
      </Html>
    </group>
  )
}

// VIP Sofa Lounge
function SofaLounge({ position, rotation, onSelect, hovered, setHovered }) {
  return (
    <group
      position={position}
      rotation={rotation}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true) }}
      onPointerOut={() => setHovered(false)}
      onClick={(e) => { e.stopPropagation(); onSelect && onSelect("VIP Sofa") }}
    >
      {/* Large sofa back */}
      <mesh position={[0, 0.55, -0.6]} castShadow>
        <boxGeometry args={[2.4, 0.7, 0.3]} />
        <meshStandardMaterial color={hovered ? "#d4af37" : "#1e1b4b"} roughness={0.9} />
      </mesh>
      {/* Sofa seat */}
      <mesh position={[0, 0.35, -0.15]} castShadow>
        <boxGeometry args={[2.4, 0.3, 0.7]} />
        <meshStandardMaterial color={hovered ? "#d4af37" : "#2e1065"} roughness={0.9} />
      </mesh>
      {/* Sofa Armrests */}
      {[[-1.25, 0.45, -0.15], [1.25, 0.45, -0.15]].map((pos, idx) => (
        <mesh key={idx} position={pos} castShadow>
          <boxGeometry args={[0.2, 0.5, 0.9]} />
          <meshStandardMaterial color="#1e1b4b" roughness={0.9} />
        </mesh>
      ))}

      {/* Marble Coffee Table */}
      <group position={[0, 0, 0.5]}>
        <mesh position={[0, 0.225, 0]} castShadow>
          <boxGeometry args={[1.4, 0.05, 0.6]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.1} metalness={0.2} />
        </mesh>
        {/* Table support legs */}
        {[[-0.6, 0.1, -0.22], [0.6, 0.1, -0.22], [-0.6, 0.1, 0.22], [0.6, 0.1, 0.22]].map((p, idx) => (
          <mesh key={idx} position={p} castShadow>
            <cylinderGeometry args={[0.02, 0.02, 0.2, 8]} />
            <meshStandardMaterial color="#fbbf24" metalness={0.9} roughness={0.1} />
          </mesh>
        ))}
        {/* Flower vase decoration */}
        <mesh position={[0, 0.35, 0]} castShadow>
          <cylinderGeometry args={[0.05, 0.05, 0.2, 12]} />
          <meshStandardMaterial color="#a5f3fc" transparent opacity={0.6} roughness={0.1} />
        </mesh>
        <mesh position={[0, 0.48, 0]} castShadow>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshStandardMaterial color="#fb7185" roughness={0.9} />
        </mesh>
      </group>

      {/* Armchair (Right Side) */}
      <group position={[1.8, 0, 0.2]} rotation={[0, -Math.PI / 3, 0]}>
        <mesh position={[0, 0.55, -0.3]} castShadow>
          <boxGeometry args={[0.8, 0.7, 0.25]} />
          <meshStandardMaterial color="#1e1b4b" roughness={0.9} />
        </mesh>
        <mesh position={[0, 0.35, 0.05]} castShadow>
          <boxGeometry args={[0.8, 0.3, 0.65]} />
          <meshStandardMaterial color="#2e1065" roughness={0.9} />
        </mesh>
      </group>
    </group>
  )
}

// VIP Banquet Table Set
function VIPBanquetTable({ position, onSelect, hovered, setHovered, activeMission }) {
  const groupRef = useRef()

  // Animate floating if active
  useFrame((state) => {
    if (activeMission && groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * 2) * 0.05
    }
  })

  return (
    <group
      ref={groupRef}
      position={position}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true) }}
      onPointerOut={() => setHovered(false)}
      onClick={(e) => { e.stopPropagation(); onSelect && onSelect("VIP Banquet") }}
    >
      {/* Table tablecloth */}
      <mesh position={[0, 0.65, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.1, 1.15, 0.05, 32]} />
        <meshStandardMaterial color={hovered ? "#34d399" : "#cbd5e1"} roughness={0.4} />
      </mesh>
      {/* Velvet drape skirt */}
      <mesh position={[0, 0.325, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.08, 1.12, 0.6, 32, 1, true]} />
        <meshStandardMaterial color="#881337" roughness={0.85} side={2} />
      </mesh>
      {/* Base leg inside */}
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.6, 12]} />
        <meshStandardMaterial color="#475569" />
      </mesh>

      {/* Flower center arrangement */}
      <group position={[0, 0.675, 0]}>
        {/* Luxury Gold Bowl */}
        <mesh castShadow>
          <cylinderGeometry args={[0.18, 0.12, 0.08, 16]} />
          <meshStandardMaterial color="#fbbf24" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Floating colorful roses */}
        <Float speed={3} rotationIntensity={0.2} floatIntensity={0.2}>
          <mesh position={[0, 0.15, 0]} castShadow>
            <sphereGeometry args={[0.15, 8, 8]} scale={[1, 0.8, 1]} />
            <meshStandardMaterial color="#f43f5e" roughness={0.8} />
          </mesh>
          <mesh position={[-0.08, 0.1, 0.08]} castShadow>
            <sphereGeometry args={[0.1, 8, 8]} />
            <meshStandardMaterial color="#fda4af" roughness={0.8} />
          </mesh>
          <mesh position={[0.08, 0.1, -0.08]} castShadow>
            <sphereGeometry args={[0.1, 8, 8]} />
            <meshStandardMaterial color="#fb7185" roughness={0.8} />
          </mesh>
        </Float>
      </group>

      {/* Wine buckets / Glasses */}
      {[-0.6, 0.6].map((x, i) => 
        [-0.6, 0.6].map((z, j) => (
          <group key={`${i}-${j}`} position={[x, 0.675, z]}>
            {/* Fine China Plates */}
            <mesh castShadow>
              <cylinderGeometry args={[0.15, 0.15, 0.015, 16]} />
              <meshStandardMaterial color="#f8fafc" roughness={0.2} metalness={0.1} />
            </mesh>
            {/* Gold trim */}
            <mesh position={[0, 0.005, 0]}>
              <torusGeometry args={[0.11, 0.005, 8, 24]} />
              <meshBasicMaterial color="#fbbf24" />
            </mesh>
            {/* Wine Glass */}
            <mesh position={[0.1, 0.06, -0.1]} castShadow>
              <cylinderGeometry args={[0.02, 0.02, 0.12, 8]} />
              <meshStandardMaterial color="#cbd5e1" opacity={0.5} transparent roughness={0.1} />
            </mesh>
          </group>
        ))
      )}

      {/* 4 Premium Banquet Chairs */}
      {[[0, -1.3, 0], [0, 1.3, Math.PI], [-1.3, 0, -Math.PI/2], [1.3, 0, Math.PI/2]].map(([cx, cz, rot], idx) => (
        <group key={idx} position={[cx, 0, cz]} rotation={[0, rot, 0]}>
          {/* Seat Cushion */}
          <mesh position={[0, 0.42, 0]} castShadow>
            <boxGeometry args={[0.42, 0.08, 0.42]} />
            <meshStandardMaterial color="#881337" roughness={0.8} />
          </mesh>
          {/* Gold Chair Trim back */}
          <mesh position={[0, 0.75, -0.18]} castShadow>
            <boxGeometry args={[0.38, 0.6, 0.04]} />
            <meshStandardMaterial color="#fbbf24" metalness={0.9} roughness={0.1} />
          </mesh>
          {/* Velvet Back cushion */}
          <mesh position={[0, 0.75, -0.15]} castShadow>
            <boxGeometry args={[0.32, 0.5, 0.03]} />
            <meshStandardMaterial color="#881337" roughness={0.8} />
          </mesh>
          {/* Legs */}
          {[-0.17, 0.17].map((lz, idx1) => 
            [-0.17, 0.17].map((lx, idx2) => (
              <mesh key={`${idx1}-${idx2}`} position={[lx, 0.21, lz]} castShadow>
                <cylinderGeometry args={[0.02, 0.015, 0.42, 8]} />
                <meshStandardMaterial color="#fbbf24" metalness={0.9} roughness={0.1} />
              </mesh>
            ))
          )}
        </group>
      ))}
    </group>
  )
}

// Champagne Service Trolley / Bar Station
function ChampagneStation({ position, onSelect, hovered, setHovered }) {
  return (
    <group
      position={position}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true) }}
      onPointerOut={() => setHovered(false)}
      onClick={(e) => { e.stopPropagation(); onSelect && onSelect("VIP Champagne") }}
    >
      {/* Trolley Shelves */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <boxGeometry args={[1.0, 0.8, 0.5]} />
        <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.4} />
      </mesh>
      {/* Gold Trim frame */}
      <mesh position={[0, 0.9, 0]} castShadow>
        <boxGeometry args={[1.05, 0.04, 0.55]} />
        <meshStandardMaterial color="#fbbf24" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Legs/Wheels */}
      {[[-0.45, 0.05, -0.2], [0.45, 0.05, -0.2], [-0.45, 0.05, 0.2], [0.45, 0.05, 0.2]].map((pos, idx) => (
        <group key={idx} position={pos}>
          <mesh castShadow>
            <cylinderGeometry args={[0.02, 0.02, 0.1, 8]} />
            <meshStandardMaterial color="#fbbf24" metalness={0.9} />
          </mesh>
          <mesh position={[0, -0.05, 0]} rotation={[0, 0, Math.PI/2]} castShadow>
            <cylinderGeometry args={[0.04, 0.04, 0.02, 12]} />
            <meshStandardMaterial color="#334155" roughness={0.5} />
          </mesh>
        </group>
      ))}

      {/* Champagne Bucket */}
      <group position={[0, 0.98, 0]}>
        {/* Bucket */}
        <mesh castShadow>
          <cylinderGeometry args={[0.16, 0.12, 0.22, 16]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Champagne Bottle */}
        <mesh position={[0.03, 0.15, -0.03]} rotation={[0.2, 0, -0.25]} castShadow>
          <cylinderGeometry args={[0.04, 0.04, 0.22, 12]} />
          <meshStandardMaterial color="#065f46" metalness={0.7} roughness={0.1} />
        </mesh>
        <mesh position={[0.07, 0.28, -0.07]} rotation={[0.2, 0, -0.25]} castShadow>
          <cylinderGeometry args={[0.015, 0.015, 0.12, 12]} />
          <meshStandardMaterial color="#065f46" metalness={0.7} roughness={0.1} />
        </mesh>
        {/* Gold foil top */}
        <mesh position={[0.09, 0.35, -0.09]} rotation={[0.2, 0, -0.25]}>
          <cylinderGeometry args={[0.016, 0.016, 0.03, 8]} />
          <meshStandardMaterial color="#fbbf24" />
        </mesh>
      </group>
      
      {/* Wine Flutes */}
      {[[-0.3, 0.98, -0.15], [-0.3, 0.98, 0.15], [0.3, 0.98, -0.15], [0.3, 0.98, 0.15]].map((pos, idx) => (
        <mesh key={idx} position={pos} castShadow>
          <cylinderGeometry args={[0.015, 0.015, 0.14, 8]} />
          <meshStandardMaterial color="#e2e8f0" opacity={0.6} transparent roughness={0.1} />
        </mesh>
      ))}

      {/* Floating tag */}
      <Html distanceFactor={6} position={[0, 1.3, 0]} center>
        <div className="bg-slate-900/90 border border-emerald-500/40 text-white text-[10px] px-2.5 py-1 rounded-xl shadow-xl backdrop-blur-md pointer-events-none uppercase whitespace-nowrap">
          <span className="font-bold text-amber-400 font-sans">Wine Station</span>
        </div>
      </Html>
    </group>
  )
}

function ReceptionRoomScene({ onTableSelect, selectedTable, activeMissionName }) {
  const [sofaHovered, setSofaHovered] = useState(false)
  const [banquetHovered, setBanquetHovered] = useState(false)
  const [champagneHovered, setChampagneHovered] = useState(false)

  // Map selected string names to positions for placing the pointer
  const getMarkerPosition = () => {
    if (selectedTable === "VIP Sofa") return [2.2, 0, 1.5];
    if (selectedTable === "VIP Banquet") return [-1.8, 0, -1.0];
    if (selectedTable === "VIP Champagne") return [-2.5, 0, 2.5];
    return null;
  }

  const markerPos = getMarkerPosition();

  return (
    <div className="w-full h-full bg-[#050811] relative">
      <Canvas
        shadows
        camera={{ position: [0, 6, 9], fov: 45 }}
        style={{ background: 'transparent' }}
      >
        {/* Elegant warm golden ambient light */}
        <ambientLight intensity={0.55} color="#fef3c7" />

        {/* Spotlights and directional lights */}
        <directionalLight
          position={[6, 12, 4]}
          intensity={1.4}
          color="#fff"
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-bias={-0.0001}
        />

        {/* Luxury Wood Floor */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
          <planeGeometry args={[14, 12]} />
          <meshStandardMaterial color="#1b120f" roughness={0.35} metalness={0.6} />
        </mesh>

        {/* Wall back panel (luxurious wood/paint paneling) */}
        <mesh position={[0, 2.5, -6]} receiveShadow>
          <boxGeometry args={[14, 5, 0.2]} />
          <meshStandardMaterial color="#0b0f19" roughness={0.8} />
        </mesh>
        
        {/* Golden metallic stripes on the wall */}
        {[-5.5, -3.5, -1.5, 1.5, 3.5, 5.5].map((x, idx) => (
          <mesh key={idx} position={[x, 2.5, -5.85]}>
            <boxGeometry args={[0.08, 4.8, 0.05]} />
            <meshStandardMaterial color="#fbbf24" metalness={0.9} roughness={0.1} />
          </mesh>
        ))}

        {/* Grand Chandeliers */}
        <Chandelier position={[-2.2, 4.2, -1.0]} />
        <Chandelier position={[2.2, 4.2, 1.5]} />

        {/* Furniture Layout */}
        {/* Sofa lounge area */}
        <SofaLounge
          position={[2.2, 0, 1.5]}
          rotation={[0, -Math.PI / 4, 0]}
          onSelect={onTableSelect}
          hovered={sofaHovered}
          setHovered={setSofaHovered}
        />

        {/* Banquet table area */}
        <VIPBanquetTable
          position={[-1.8, 0, -1.0]}
          onSelect={onTableSelect}
          hovered={banquetHovered}
          setHovered={setBanquetHovered}
          activeMission={activeMissionName === "VIP Banquet Setup" || activeMissionName === "VIP Guest Service"}
        />

        {/* Grand Piano station */}
        <GrandPiano
          position={[2.5, 0, -3.5]}
          rotation={[0, Math.PI / 3, 0]}
        />

        {/* Champagne trolley station */}
        <ChampagneStation
          position={[-2.5, 0, 2.5]}
          onSelect={onTableSelect}
          hovered={champagneHovered}
          setHovered={setChampagneHovered}
        />

        {/* Interactive floating indicator tags */}
        {sofaHovered && (
          <Html distanceFactor={6} position={[2.2, 1.2, 1.5]} center>
            <div className="bg-slate-900/90 border border-[#d4af37]/40 text-white text-xs px-3 py-1.5 rounded-xl shadow-xl backdrop-blur-md pointer-events-none whitespace-nowrap">
              <span className="font-bold text-[#d4af37] font-sans">VIP Lounge Area</span>
              <p className="text-[10px] text-slate-300 mt-0.5 font-sans">Velvet sofa seating</p>
            </div>
          </Html>
        )}

        {banquetHovered && (
          <Html distanceFactor={6} position={[-1.8, 1.5, -1.0]} center>
            <div className="bg-slate-900/90 border border-[#d4af37]/40 text-white text-xs px-3 py-1.5 rounded-xl shadow-xl backdrop-blur-md pointer-events-none whitespace-nowrap">
              <span className="font-bold text-[#d4af37] font-sans">VIP Banquet Table</span>
              {activeMissionName ? (
                <p className="text-[10px] text-emerald-400 mt-0.5 font-sans">{activeMissionName}</p>
              ) : (
                <p className="text-[10px] text-slate-300 mt-0.5 font-sans">Formal setting practice</p>
              )}
            </div>
          </Html>
        )}

        {champagneHovered && (
          <Html distanceFactor={6} position={[-2.5, 1.3, 2.5]} center>
            <div className="bg-slate-900/90 border border-[#d4af37]/40 text-white text-xs px-3 py-1.5 rounded-xl shadow-xl backdrop-blur-md pointer-events-none whitespace-nowrap">
              <span className="font-bold text-[#d4af37] font-sans">Wine Station</span>
              <p className="text-[10px] text-slate-300 mt-0.5 font-sans">Champagne trolley</p>
            </div>
          </Html>
        )}

        {/* Selected marker above active area */}
        {markerPos && (
          <group position={markerPos}>
            <Float speed={5} floatIntensity={1.5} rotationIntensity={0}>
              <mesh position={[0, 2.0, 0]} rotation={[Math.PI, 0, 0]}>
                <coneGeometry args={[0.12, 0.25, 4]} />
                <meshBasicMaterial color="#d4af37" />
              </mesh>
            </Float>
          </group>
        )}

        {/* Floor Shadows */}
        <ContactShadows position={[0, 0.01, 0]} opacity={0.7} scale={15} blur={1.2} far={10} />

        {/* User Orbit Controls */}
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          minDistance={3}
          maxDistance={12}
          maxPolarAngle={Math.PI / 2 - 0.05}
        />
      </Canvas>
    </div>
  )
}

export default ReceptionRoomScene
