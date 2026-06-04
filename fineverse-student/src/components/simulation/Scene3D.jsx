// src/components/simulation/Scene3D.jsx
import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Html } from '@react-three/drei'
import * as THREE from 'three'

/* ── Shared primitives ── */
function Box({ position, size, color, ...rest }) {
  return (
    <mesh position={position} {...rest}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

function Cylinder({ position, args, color, rotation }) {
  return (
    <mesh position={position} rotation={rotation}>
      <cylinderGeometry args={args} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

/* ── Floating hotspot ── */
function Hotspot({ position, label, active, onClick }) {
  const ref = useRef()
  useFrame(({ clock }) => {
    if (ref.current) ref.current.position.y = position[1] + Math.sin(clock.elapsedTime * 2) * 0.05
  })
  return (
    <group ref={ref} position={position} onClick={onClick}>
      <mesh>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color={active ? '#1D9E75' : '#378ADD'} emissive={active ? '#0F6E56' : '#185FA5'} emissiveIntensity={0.4} />
      </mesh>
      <Html center distanceFactor={6} style={{ pointerEvents: 'none' }}>
        <div style={{
          background: 'rgba(255,255,255,0.92)', padding: '3px 8px', borderRadius: 6,
          fontSize: 11, fontWeight: 500, color: '#1A1A18', whiteSpace: 'nowrap',
          border: '1px solid rgba(0,0,0,0.1)', fontFamily: 'IBM Plex Sans, sans-serif'
        }}>
          {label}
        </div>
      </Html>
    </group>
  )
}

/* ── Restaurant scene ── */
function RestaurantScene({ onHotspot }) {
  const floorColor = '#D4C5A9'
  const wallColor  = '#E8DDD0'
  const tableColor = '#8B6914'
  const chairColor = '#5C4A2A'

  // Table + 4 chairs helper
  function Table({ pos }) {
    return (
      <group position={pos}>
        <Box position={[0, 0.4, 0]} size={[0.8, 0.05, 0.8]} color={tableColor} />
        <Cylinder position={[0, 0.2, 0]} args={[0.04, 0.04, 0.4, 8]} color={chairColor} />
        {[[-0.5, 0], [0.5, 0], [0, -0.5], [0, 0.5]].map(([x, z], i) => (
          <group key={i} position={[x, 0, z]}>
            <Box position={[0, 0.25, 0]} size={[0.35, 0.04, 0.35]} color={chairColor} />
            <Cylinder position={[0, 0.12, 0]} args={[0.02, 0.02, 0.25, 6]} color={chairColor} />
          </group>
        ))}
      </group>
    )
  }

  return (
    <group>
      {/* Floor */}
      <Box position={[0, -0.01, 0]} size={[8, 0.02, 8]} color={floorColor} />
      {/* Walls */}
      <Box position={[0, 1.5, -4]} size={[8, 3, 0.1]} color={wallColor} />
      <Box position={[-4, 1.5, 0]} size={[0.1, 3, 8]} color={wallColor} />
      <Box position={[4, 1.5, 0]}  size={[0.1, 3, 8]} color={wallColor} />
      {/* Tables */}
      <Table pos={[-1.5, 0, -1]} />
      <Table pos={[1.5,  0, -1]} />
      <Table pos={[0,    0,  1.5]} />
      {/* Service counter */}
      <Box position={[0, 0.45, -3.4]} size={[3, 0.9, 0.4]} color="#6B5A3A" />
      <Box position={[0, 0.92, -3.4]} size={[3.1, 0.04, 0.5]} color="#8B7355" />
      {/* Coffee machine */}
      <Box position={[0.8, 1.0, -3.5]} size={[0.3, 0.3, 0.25]} color="#333" />
      <Box position={[0.8, 0.88, -3.5]} size={[0.35, 0.06, 0.3]} color="#555" />
      {/* Window */}
      <Box position={[-3.9, 1.5, -1]} size={[0.05, 1.2, 1.4]} color="#AECFE8" />
      {/* Ambient light + point light */}
      <ambientLight intensity={0.6} />
      <pointLight position={[0, 3, 0]} intensity={1.2} color="#FFF8F0" />
      <pointLight position={[-2, 2.5, -2]} intensity={0.6} color="#FFE4C4" />
      {/* Hotspot */}
      <Hotspot position={[-1.5, 0.9, -1]} label="Table 3 — Guest" active onClick={onHotspot} />
    </group>
  )
}

/* ── VIP Lounge scene ── */
function VIPScene({ onHotspot }) {
  return (
    <group>
      {/* Floor — dark marble */}
      <Box position={[0, -0.01, 0]} size={[8, 0.02, 8]} color="#2A2A2A" />
      {/* Walls */}
      <Box position={[0, 1.5, -4]} size={[8, 3, 0.1]} color="#1A1A1A" />
      <Box position={[-4, 1.5, 0]} size={[0.1, 3, 8]} color="#222" />
      <Box position={[4, 1.5, 0]}  size={[0.1, 3, 8]} color="#222" />
      {/* Lounge chairs */}
      {[[-2, 0, 0], [2, 0, 0]].map(([x, y, z], i) => (
        <group key={i} position={[x, y, z]}>
          <Box position={[0, 0.3, 0]} size={[0.9, 0.15, 0.8]} color="#8B7355" />
          <Box position={[0, 0.55, -0.35]} size={[0.9, 0.5, 0.1]} color="#7A6245" />
          {[-0.4, 0.4].map((ax, j) => (
            <Box key={j} position={[ax, 0.45, 0]} size={[0.1, 0.3, 0.8]} color="#7A6245" />
          ))}
        </group>
      ))}
      {/* Coffee table */}
      <Box position={[0, 0.25, 0]} size={[0.8, 0.05, 0.5]} color="#5C4A2A" />
      <Cylinder position={[0, 0.12, 0]} args={[0.05, 0.05, 0.25, 8]} color="#3A2A18" />
      {/* Piano */}
      <Box position={[3.2, 0.5, -2.5]} size={[1.2, 1.0, 0.6]} color="#111" />
      <Box position={[3.2, 1.01, -2.5]} size={[1.22, 0.02, 0.62]} color="#222" />
      {/* Piano keys */}
      <Box position={[3.2, 1.03, -2.2]} size={[1.0, 0.02, 0.1]} color="#F5F5F0" />
      {/* Chandelier */}
      <Cylinder position={[0, 2.8, 0]} args={[0.05, 0.05, 0.4, 8]} color="#B8960C" />
      <Cylinder position={[0, 2.5, 0]} args={[0.6, 0.5, 0.2, 16]} color="#D4AF37" />
      {/* Reception desk */}
      <Box position={[0, 0.5, -3.5]} size={[2, 1.0, 0.5]} color="#1A0A00" />
      <Box position={[0, 1.01, -3.5]} size={[2.1, 0.02, 0.6]} color="#3A2A18" />
      {/* Lights */}
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 2.5, 0]} intensity={1.5} color="#FFD700" />
      <pointLight position={[0, 2, -3]} intensity={0.8} color="#FFF0CC" />
      <pointLight position={[-3, 2, 2]} intensity={0.5} color="#FFE4B5" />
      {/* Hotspot */}
      <Hotspot position={[0, 1.1, -3.5]} label="Reception — VIP Check-in" active onClick={onHotspot} />
    </group>
  )
}

/* ── Main exported component ── */
export default function Scene3D({ sceneId, scenes = [], onHotspotClick }) {
  const scene = scenes.find(s => s.id === sceneId)

  if (sceneId === 'restaurant') {
    return (
      <div style={{ width: '100%', height: '100%', background: '#1A1A18' }}>
        <Canvas
          camera={{ position: [0, 2.5, 5], fov: 55 }}
          gl={{ antialias: true }}
          aria-label="Restaurant 3D scene"
        >
          <RestaurantScene onHotspot={onHotspotClick} />
          <OrbitControls
            enablePan={false}
            maxPolarAngle={Math.PI / 2}
            minDistance={3}
            maxDistance={9}
            target={[0, 0.5, 0]}
          />
        </Canvas>
      </div>
    )
  }

  if (sceneId === 'vip') {
    return (
      <div style={{ width: '100%', height: '100%', background: '#1A1A18' }}>
        <Canvas
          camera={{ position: [0, 2.5, 5], fov: 55 }}
          gl={{ antialias: true }}
          aria-label="VIP lounge 3D scene"
        >
          <VIPScene onHotspot={onHotspotClick} />
          <OrbitControls
            enablePan={false}
            maxPolarAngle={Math.PI / 2}
            minDistance={3}
            maxDistance={9}
            target={[0, 0.5, 0]}
          />
        </Canvas>
      </div>
    )
  }

  // Fallback / Dynamic custom scenes
  if (!scene) {
    return (
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#1A1A18', color: '#fff' }}>
        <span>3D Scene not found</span>
      </div>
    )
  }

  return (
    <div style={{ width: '100%', height: '100%', background: '#1A1A18' }}>
      <Canvas
        camera={{ position: [0, 2.5, 5], fov: 55 }}
        gl={{ antialias: true }}
        aria-label={`${scene.name} 3D scene`}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[0, 3, 0]} intensity={1.2} color="#FFF8F0" />
        <pointLight position={[-2, 2.5, -2]} intensity={0.6} color="#FFE4C4" />

        {scene.objects?.map((obj) => {
          const key = obj.id || `${obj.type}_${Math.random()}`
          if (obj.type === 'box') {
            return <Box key={key} position={obj.position} size={obj.size} color={obj.color} />
          }
          if (obj.type === 'cylinder') {
            return <Cylinder key={key} position={obj.position} args={obj.size} color={obj.color} />
          }
          if (obj.type === 'sphere') {
            return (
              <mesh key={key} position={obj.position}>
                <sphereGeometry args={obj.size || [0.5, 16, 16]} />
                <meshStandardMaterial color={obj.color} />
              </mesh>
            )
          }
          return null
        })}

        {scene.hotspots?.map((hs) => (
          <Hotspot
            key={hs.id}
            position={hs.position}
            label={hs.label}
            active={hs.active !== false}
            onClick={onHotspotClick}
          />
        ))}

        <OrbitControls
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minDistance={3}
          maxDistance={9}
          target={[0, 0.5, 0]}
        />
      </Canvas>
    </div>
  )
}
