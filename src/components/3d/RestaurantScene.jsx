"use client";

import React, { useState, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Html, ContactShadows, Float } from '@react-three/drei'

// A glowing light fixture suspended from the ceiling
function PendantLight({ position }) {
  return (
    <group position={position}>
      {/* Wire */}
      <mesh>
        <cylinderGeometry args={[0.01, 0.01, 1.5, 8]} />
        <meshStandardMaterial color="#334155" roughness={0.5} />
      </mesh>
      {/* Shade */}
      <mesh position={[0, -0.75, 0]}>
        <coneGeometry args={[0.2, 0.2, 16, 1, true]} />
        <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.2} side={2} />
      </mesh>
      {/* Bulb/Glow */}
      <mesh position={[0, -0.82, 0]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshBasicMaterial color="#d4af37" />
      </mesh>
      {/* Local Spotlight casting downward */}
      <spotLight
        position={[0, -0.85, 0]}
        angle={Math.PI / 4}
        penumbra={0.5}
        intensity={2}
        color="#d4af37"
        castShadow
      />
    </group>
  )
}

// Interactive Table component
function DiningTable({ position, tableNo, activeMission, onSelect, hoveredTable, setHoveredTable }) {
  const isHovered = hoveredTable === tableNo
  const groupRef = useRef()

  // Make the active table float slightly for gameplay feedback
  useFrame((state) => {
    if (activeMission && groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * 2.5) * 0.04
    }
  })

  return (
    <group
      ref={groupRef}
      position={position}
      onPointerOver={(e) => { e.stopPropagation(); setHoveredTable(tableNo) }}
      onPointerOut={() => setHoveredTable(null)}
      onClick={(e) => { e.stopPropagation(); onSelect && onSelect(tableNo) }}
    >
      {/* Table Top */}
      <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.7, 0.7, 0.05, 32]} />
        <meshStandardMaterial 
          color={isHovered ? "#d4af37" : activeMission ? "#10b981" : "#1e293b"} 
          roughness={0.1}
          metalness={0.7}
        />
      </mesh>
      {/* Table Leg */}
      <mesh position={[0, 0.3, 0]} castShadow>
        <cylinderGeometry args={[0.06, 0.06, 0.6, 16]} />
        <meshStandardMaterial color="#475569" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Table Base */}
      <mesh position={[0, 0.025, 0]} receiveShadow>
        <cylinderGeometry args={[0.3, 0.3, 0.05, 24]} />
        <meshStandardMaterial color="#334155" metalness={0.8} />
      </mesh>

      {/* Plates/Glasses decoration */}
      <mesh position={[0.2, 0.64, 0.1]} castShadow>
        <cylinderGeometry args={[0.12, 0.12, 0.01, 16]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.3} />
      </mesh>
      <mesh position={[-0.2, 0.64, -0.2]} castShadow>
        <cylinderGeometry args={[0.04, 0.04, 0.08, 12]} />
        <meshStandardMaterial color="#67e8f9" opacity={0.6} transparent roughness={0.1} />
      </mesh>

      {/* Chairs around table */}
      {[-0.8, 0.8].map((offset, i) => (
        <group key={i} position={[offset, 0, 0]} rotation={[0, offset > 0 ? -Math.PI / 2 : Math.PI / 2, 0]}>
          {/* Seat */}
          <mesh position={[0, 0.35, 0]} castShadow>
            <boxGeometry args={[0.4, 0.04, 0.4]} />
            <meshStandardMaterial color="#0f172a" roughness={0.8} />
          </mesh>
          {/* Backrest */}
          <mesh position={[0.18, 0.6, 0]} castShadow>
            <boxGeometry args={[0.04, 0.5, 0.4]} />
            <meshStandardMaterial color="#1e293b" roughness={0.7} />
          </mesh>
          {/* Legs */}
          {[-0.17, 0.17].map((lz, idx1) => 
            [-0.17, 0.17].map((lx, idx2) => (
              <mesh key={`${idx1}-${idx2}`} position={[lx, 0.175, lz]} castShadow>
                <cylinderGeometry args={[0.02, 0.02, 0.35, 8]} />
                <meshStandardMaterial color="#475569" metalness={0.8} />
              </mesh>
            ))
          )}
        </group>
      ))}

      {/* Floating UI labels */}
      {isHovered && (
        <Html distanceFactor={5} position={[0, 1.2, 0]} center>
          <div className="bg-slate-950/95 border border-[#d4af37]/60 text-white text-xs px-3 py-1.5 rounded-xl shadow-2xl backdrop-blur-md pointer-events-none whitespace-nowrap">
            <span className="font-bold text-[#d4af37]">Table {tableNo}</span>
            {activeMission ? <p className="text-[10px] text-emerald-400 mt-0.5">{activeMission}</p> : <p className="text-[10px] text-slate-400 mt-0.5">Ready for orders</p>}
          </div>
        </Html>
      )}
    </group>
  )
}

// A Bar / Counter component with Espresso Machine
function BarCounter({ position }) {
  return (
    <group position={position}>
      {/* Main Counter Base */}
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.2, 1, 0.8]} />
        <meshStandardMaterial color="#0f172a" roughness={0.6} metalness={0.3} />
      </mesh>
      {/* Luxury Marble Countertop */}
      <mesh position={[0, 1.025, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.3, 0.05, 0.9]} />
        <meshStandardMaterial color="#334155" roughness={0.2} metalness={0.7} />
      </mesh>

      {/* Espresso Machine */}
      <group position={[-0.8, 1.05, 0]} rotation={[0, Math.PI, 0]}>
        {/* Machine Body */}
        <mesh castShadow>
          <boxGeometry args={[0.5, 0.4, 0.4]} />
          <meshStandardMaterial color="#0284c7" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Metal Trim */}
        <mesh position={[0, -0.15, 0.05]} castShadow>
          <boxGeometry args={[0.45, 0.1, 0.35]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Cups on top */}
        <mesh position={[-0.1, 0.22, 0.05]} castShadow>
          <cylinderGeometry args={[0.04, 0.03, 0.06, 8]} />
          <meshStandardMaterial color="#f43f5e" roughness={0.3} />
        </mesh>
        <mesh position={[0.1, 0.22, -0.05]} castShadow>
          <cylinderGeometry args={[0.04, 0.03, 0.06, 8]} />
          <meshStandardMaterial color="#f43f5e" roughness={0.3} />
        </mesh>
        {/* Holographic label */}
        <Html distanceFactor={6} position={[0, 0.5, 0]} center>
          <div className="bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 text-[9px] tracking-wider px-2 py-0.5 rounded-full backdrop-blur-md uppercase font-bold">
            Espresso Station
          </div>
        </Html>
      </group>

      {/* Glass Partition / Pastry case */}
      <group position={[0.6, 1.2, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.8, 0.3, 0.3]} />
          <meshStandardMaterial color="#06b6d4" opacity={0.3} transparent roughness={0.1} />
        </mesh>
        {/* Little pastry placeholders */}
        <mesh position={[-0.2, -0.1, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 0.02, 12]} />
          <meshStandardMaterial color="#b45309" roughness={0.9} />
        </mesh>
        <mesh position={[0.2, -0.1, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 0.02, 12]} />
          <meshStandardMaterial color="#ea580c" roughness={0.9} />
        </mesh>
      </group>

      {/* Bar Stools */}
      {[-1.0, 0, 1.0].map((xOffset, idx) => (
        <group key={idx} position={[xOffset, 0, 0.9]}>
          {/* Stool Support */}
          <mesh position={[0, 0.325, 0]} castShadow>
            <cylinderGeometry args={[0.02, 0.02, 0.65, 8]} />
            <meshStandardMaterial color="#64748b" metalness={0.9} roughness={0.1} />
          </mesh>
          {/* Seat */}
          <mesh position={[0, 0.65, 0]} castShadow>
            <cylinderGeometry args={[0.2, 0.2, 0.05, 24]} />
            <meshStandardMaterial color="#0284c7" metalness={0.4} roughness={0.5} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

function RestaurantScene({ onTableSelect, selectedTable, activeMissionName }) {
  const [hoveredTable, setHoveredTable] = useState(null)

  return (
    <div className="w-full h-full bg-[#050811] relative">
      <Canvas
        shadows
        camera={{ position: [0, 5, 8], fof: 45 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.65} color="#f8fafc" />
        
        {/* Main direction sunlight/moonlight */}
        <directionalLight
          position={[8, 12, 5]}
          intensity={1.5}
          color="#cbd5e1"
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-bias={-0.0001}
        />

        {/* Floor with rich glossy material */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
          <planeGeometry args={[12, 12]} />
          <meshStandardMaterial color="#111827" roughness={0.4} metalness={0.6} />
        </mesh>

        {/* Back Wall */}
        <mesh position={[0, 2, -6]} receiveShadow>
          <boxGeometry args={[12, 4, 0.2]} />
          <meshStandardMaterial color="#0b101e" roughness={0.7} />
        </mesh>
        
        {/* Decorative wall stripes/lights */}
        {[-4.5, -1.5, 1.5, 4.5].map((x, idx) => (
          <mesh key={idx} position={[x, 2, -5.85]}>
            <boxGeometry args={[0.1, 3.5, 0.05]} />
            <meshStandardMaterial color="#d4af37" emissive="#d4af37" emissiveIntensity={0.3} />
          </mesh>
        ))}

        {/* Furniture Arrangement */}
        {/* Table Sets */}
        <DiningTable
          position={[-2.2, 0, -1.5]}
          tableNo={1}
          activeMission={activeMissionName === "Greeting Customer" ? activeMissionName : null}
          onSelect={onTableSelect}
          hoveredTable={hoveredTable}
          setHoveredTable={setHoveredTable}
        />
        <DiningTable
          position={[2.2, 0, -1.5]}
          tableNo={2}
          activeMission={activeMissionName === "Complaint Handling" ? activeMissionName : null}
          onSelect={onTableSelect}
          hoveredTable={hoveredTable}
          setHoveredTable={setHoveredTable}
        />
        <DiningTable
          position={[-2.2, 0, 2.0]}
          tableNo={3}
          activeMission={activeMissionName === "Billing & Payment" ? activeMissionName : null}
          onSelect={onTableSelect}
          hoveredTable={hoveredTable}
          setHoveredTable={setHoveredTable}
        />
        <DiningTable
          position={[2.2, 0, 2.0]}
          tableNo={4}
          activeMission={null}
          onSelect={onTableSelect}
          hoveredTable={hoveredTable}
          setHoveredTable={setHoveredTable}
        />

        {/* Bar Counter Area */}
        <BarCounter position={[0, 0, -4.5]} />

        {/* Overhanging Pendant Lights */}
        <PendantLight position={[-2.2, 3.5, -1.5]} />
        <PendantLight position={[2.2, 3.5, -1.5]} />
        <PendantLight position={[0, 3.5, -4.5]} />

        {/* Room Decor: A simple luxury plant/pot */}
        <group position={[-5, 0, -5]}>
          <mesh position={[0, 0.3, 0]} castShadow>
            <cylinderGeometry args={[0.25, 0.18, 0.6, 16]} />
            <meshStandardMaterial color="#1e293b" metalness={0.6} />
          </mesh>
          <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh position={[0, 0.8, 0]} castShadow>
              <sphereGeometry args={[0.3, 8, 8]} scale={[1, 1.8, 1]} />
              <meshStandardMaterial color="#10b981" roughness={0.9} />
            </mesh>
          </Float>
        </group>

        {/* Interactive Selected Marker */}
        {selectedTable && (
          <group position={selectedTable === 1 ? [-2.2, 0, -1.5] : selectedTable === 2 ? [2.2, 0, -1.5] : selectedTable === 3 ? [-2.2, 0, 2.0] : [2.2, 0, 2.0]}>
            <Float speed={5} floatIntensity={1.5} rotationIntensity={0}>
              <mesh position={[0, 1.8, 0]} rotation={[Math.PI, 0, 0]}>
                <coneGeometry args={[0.12, 0.25, 4]} />
                <meshBasicMaterial color="#d4af37" />
              </mesh>
            </Float>
          </group>
        )}

        {/* Shadow adjustments and controls */}
        <ContactShadows position={[0, 0.01, 0]} opacity={0.6} scale={12} blur={1} far={10} />
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          minDistance={3}
          maxDistance={12}
          maxPolarAngle={Math.PI / 2 - 0.05} // Prevent camera from going under floor
        />
      </Canvas>
    </div>
  )
}

export default RestaurantScene
