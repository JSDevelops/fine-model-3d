"use client";

import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, ContactShadows, Float } from '@react-three/drei'

// Dynamic Model Renderer using Three.js primitives configured by the teacher
function DynamicModel({ shape }) {
  if (!shape) return null
  const { type, color, size } = shape
  const meshColor = color || "#d4af37"
  
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

export default function ARScene({ selectedItem, customShape }) {
  return (
    <div className="w-full h-full relative">
      <Canvas
        shadows
        camera={{ position: [0, 1.2, 2.5], fov: 40 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.7} color="#ffffff" />
        
        {/* Studio lighting for premium gold/metallic reflections */}
        <directionalLight
          position={[5, 10, 3]}
          intensity={1.8}
          color="#fffbeb"
          castShadow
          shadow-mapSize={[512, 512]}
        />
        <directionalLight
          position={[-5, 5, -2]}
          intensity={0.6}
          color="#cbd5e1"
        />

        <Float speed={2.5} floatIntensity={0.2} rotationIntensity={0.2}>
          <group position={[0, 0, 0]}>
            {customShape ? (
              <DynamicModel shape={customShape} />
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
          minDistance={1.2}
          maxDistance={4.5}
        />
      </Canvas>
    </div>
  )
}

