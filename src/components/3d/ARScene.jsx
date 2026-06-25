"use client";

import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, ContactShadows, Float } from '@react-three/drei'

// Dynamic Model Renderer using Three.js primitives configured by the teacher
// 1. Wine Glass Model
function WineGlassModel({ color }) {
  const meshColor = color || "#ffffff"
  return (
    <group position={[0, -0.1, 0]}>
      {/* Bowl */}
      <mesh position={[0, 0.3, 0]} castShadow>
        <cylinderGeometry args={[0.22, 0.1, 0.35, 16, 1, true]} />
        <meshStandardMaterial color={meshColor} roughness={0.1} metalness={0.9} transparent opacity={0.5} side={2} />
      </mesh>
      {/* Bowl bottom */}
      <mesh position={[0, 0.125, 0]} castShadow>
        <sphereGeometry args={[0.1, 16, 16, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2]} />
        <meshStandardMaterial color={meshColor} roughness={0.1} metalness={0.9} transparent opacity={0.5} />
      </mesh>
      {/* Stem */}
      <mesh position={[0, -0.1, 0]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.45, 8]} />
        <meshStandardMaterial color={meshColor} roughness={0.1} metalness={0.9} transparent opacity={0.5} />
      </mesh>
      {/* Base */}
      <mesh position={[0, -0.32, 0]} castShadow>
        <cylinderGeometry args={[0.16, 0.16, 0.02, 16]} />
        <meshStandardMaterial color={meshColor} roughness={0.1} metalness={0.9} transparent opacity={0.5} />
      </mesh>
    </group>
  )
}

// 2. Coffee Cup / Mug Model
function CoffeeCupModel({ color }) {
  const meshColor = color || "#fafafa"
  return (
    <group position={[0, -0.05, 0]}>
      {/* Saucer */}
      <mesh position={[0, -0.22, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.35, 0.3, 0.02, 24]} />
        <meshStandardMaterial color={meshColor} roughness={0.2} metalness={0.1} />
      </mesh>
      {/* Cup Body */}
      <mesh position={[0, -0.02, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.22, 0.18, 0.36, 24]} />
        <meshStandardMaterial color={meshColor} roughness={0.2} metalness={0.1} />
      </mesh>
      {/* Cup Handle */}
      <mesh position={[0.18, -0.02, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <torusGeometry args={[0.09, 0.025, 8, 24]} />
        <meshStandardMaterial color={meshColor} roughness={0.2} metalness={0.1} />
      </mesh>
    </group>
  )
}

// 3. Cocktail Shaker Model
function CocktailShakerModel({ color }) {
  const meshColor = color || "#94a3b8"
  return (
    <group position={[0, -0.1, 0]}>
      {/* Main Tumbler */}
      <mesh position={[0, -0.1, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.2, 0.15, 0.5, 24]} />
        <meshStandardMaterial color={meshColor} roughness={0.1} metalness={0.95} />
      </mesh>
      {/* Mid Cap Dome */}
      <mesh position={[0, 0.22, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.2, 0.15, 24]} />
        <meshStandardMaterial color={meshColor} roughness={0.1} metalness={0.95} />
      </mesh>
      {/* Top Cap */}
      <mesh position={[0, 0.35, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 0.1, 16]} />
        <meshStandardMaterial color={meshColor} roughness={0.1} metalness={0.95} />
      </mesh>
    </group>
  )
}

// 4. Spoon Model
function SpoonModel({ color }) {
  const meshColor = color || "#cbd5e1"
  return (
    <group position={[0, 0, 0]} rotation={[0, 0, -Math.PI / 6]}>
      {/* Handle */}
      <mesh position={[0, -0.25, 0]} castShadow>
        <boxGeometry args={[0.03, 0.5, 0.015]} />
        <meshStandardMaterial color={meshColor} roughness={0.15} metalness={0.9} />
      </mesh>
      {/* Bowl */}
      <mesh position={[0, 0.08, 0]} rotation={[Math.PI / 10, 0, 0]} castShadow>
        <sphereGeometry args={[0.08, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color={meshColor} roughness={0.15} metalness={0.9} />
      </mesh>
    </group>
  )
}

// 5. Knife Model
function KnifeModel({ color }) {
  const meshColor = color || "#cbd5e1"
  return (
    <group position={[0, 0, 0]} rotation={[0, 0, -Math.PI / 6]}>
      {/* Handle */}
      <mesh position={[0, -0.25, 0]} castShadow>
        <boxGeometry args={[0.035, 0.35, 0.025]} />
        <meshStandardMaterial color="#2d3748" roughness={0.7} metalness={0.1} />
      </mesh>
      {/* Blade */}
      <mesh position={[0, 0.1, 0]} castShadow>
        <boxGeometry args={[0.025, 0.45, 0.005]} />
        <meshStandardMaterial color={meshColor} roughness={0.1} metalness={0.95} />
      </mesh>
    </group>
  )
}

// 6. Plate Model
function PlateModel({ color }) {
  const meshColor = color || "#ffffff"
  return (
    <group position={[0, -0.15, 0]}>
      {/* Plate Base */}
      <mesh position={[0, 0.01, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.42, 0.42, 0.02, 32]} />
        <meshStandardMaterial color={meshColor} roughness={0.2} metalness={0.05} />
      </mesh>
      {/* Outer lip */}
      <mesh position={[0, 0.03, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.5, 0.45, 0.04, 32]} />
        <meshStandardMaterial color={meshColor} roughness={0.2} metalness={0.05} />
      </mesh>
    </group>
  )
}

// Dynamic Model Renderer using Three.js primitives configured by the teacher
function DynamicModel({ shape, selectedId, itemTitle }) {
  if (!shape) return null
  const { type, color, size } = shape
  const meshColor = color || "#d4af37"
  // Combine ID and title for broader keyword matching
  const idStr = (String(selectedId || '') + ' ' + String(itemTitle || '')).toLowerCase()
  
  // Resolve recognizable 3D models based on keywords in ID or Title
  if (idStr.includes('cup') || idStr.includes('mug') || idStr.includes('coffee') || idStr.includes('กาแฟ') || idStr.includes('ถ้วย')) {
    return <CoffeeCupModel color={meshColor} />
  }
  if (idStr.includes('glass') || idStr.includes('wine') || idStr.includes('flute') || idStr.includes('goblet') || idStr.includes('ไวน์') || idStr.includes('แก้ว')) {
    return <WineGlassModel color={meshColor} />
  }
  if (idStr.includes('shaker') || idStr.includes('cocktail') || idStr.includes('ค็อกเทล')) {
    return <CocktailShakerModel color={meshColor} />
  }
  if (idStr.includes('spoon') || idStr.includes('fork') || idStr.includes('ช้อน') || idStr.includes('ส้อม')) {
    return <SpoonModel color={meshColor} />
  }
  if (idStr.includes('knife') || idStr.includes('มีด')) {
    return <KnifeModel color={meshColor} />
  }
  if (idStr.includes('plate') || idStr.includes('dish') || idStr.includes('จาน')) {
    return <PlateModel color={meshColor} />
  }

  // Fallback to basic primitive shapes
  if (type === 'box') {
    return (
      <mesh castShadow receiveShadow>
        <boxGeometry args={size || [0.6, 0.6, 0.6]} />
        <meshStandardMaterial color={meshColor} roughness={0.2} metalness={0.3} />
      </mesh>
    )
  }
  
  if (type === 'cylinder') {
    return (
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={size || [0.3, 0.3, 0.7, 32]} />
        <meshStandardMaterial color={meshColor} roughness={0.2} metalness={0.3} />
      </mesh>
    )
  }
  
  if (type === 'sphere') {
    return (
      <mesh castShadow receiveShadow>
        <sphereGeometry args={size || [0.4, 32, 32]} />
        <meshStandardMaterial color={meshColor} roughness={0.2} metalness={0.3} />
      </mesh>
    )
  }
  
  return null
}

export default function ARScene({ selectedItem, itemTitle, customShape }) {
  return (
    <div className="w-full h-full relative">
      <Canvas
        shadows
        camera={{ position: [0, 1.0, 2.2], fov: 40 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.8} color="#ffffff" />
        
        {/* Studio lighting for premium gold/metallic reflections */}
        <directionalLight
          position={[5, 10, 3]}
          intensity={2.0}
          color="#fffbeb"
          castShadow
          shadow-mapSize={[512, 512]}
        />
        <directionalLight
          position={[-5, 5, -2]}
          intensity={0.8}
          color="#cbd5e1"
        />

        <Float speed={2.5} floatIntensity={0.25} rotationIntensity={0.2}>
          <group position={[0, 0, 0]}>
            {customShape ? (
              <DynamicModel shape={customShape} selectedId={selectedItem} itemTitle={itemTitle} />
            ) : (
              <mesh castShadow>
                <sphereGeometry args={[0.3, 16, 16]} />
                <meshStandardMaterial color="#475569" roughness={0.8} />
              </mesh>
            )}
          </group>
        </Float>

        {/* Subtle floor contact shadow */}
        <ContactShadows position={[0, -0.42, 0]} opacity={0.5} scale={3} blur={1.5} far={2} />
        
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          minDistance={1.0}
          maxDistance={4.0}
        />
      </Canvas>
    </div>
  )
}


