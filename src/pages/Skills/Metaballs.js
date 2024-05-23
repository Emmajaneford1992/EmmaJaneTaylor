
import * as THREE from 'three'
import { useRef } from 'react'
import {  useFrame } from '@react-three/fiber'
import { MarchingCubes, MarchingCube, Environment, Bounds, Text, Float } from '@react-three/drei'
import { Physics, RigidBody, BallCollider } from '@react-three/rapier'

function MetaBall({ color, vec = new THREE.Vector3(), ...props }) {
  const api = useRef()
  useFrame((state, delta) => {
    delta = Math.min(delta, 0.1)
    if (api.current && api.current.applyImpulse) {
      api.current.applyImpulse(
        vec
          .copy(api.current.translation())
          .normalize()
          .multiplyScalar(delta * -0.01),
      )
    }
  })
  return (
    <group scale={1}>
      <RigidBody ref={api} colliders={false} linearDamping={4} angularDamping={0.95} {...props}>
        <MarchingCube strength={0.35} subtract={6} color={color} />
        <BallCollider args={[0.1]} type="dynamic" />
      </RigidBody>
    </group>
  )
}



export default function Metaballs() {
  const metaBallColors = ["indianred", "skyblue", "teal", "orange", "hotpink", "aquamarine"]
  return (
    <>
      <color attach="background" args={['#f0f0f0']} />
      <ambientLight intensity={1} />
      <Physics gravity={[0, 2, 0]}>
        <MarchingCubes resolution={80} maxPolyCount={20000} enableUvs={false} enableColors>
          <meshStandardMaterial vertexColors thickness={0.15} roughness={0} />
              {metaBallColors.map((color, index) => (
                <Float key={color} floatIntensity={5} rotationIntensity={2} speed={2}>
                  <MetaBall color={color} position={[(Math.random()-0.5)*10, Math.random()-0.5, 0]} />
                </Float>
              ))}


        </MarchingCubes>
      </Physics>
      <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/industrial_workshop_foundry_1k.hdr" />
      {/* Zoom to fit a 1/1/1 box to match the marching cubes */}
      {/* <Bounds fit clip observe margin={1}>
        <mesh visible={false}>
          <boxGeometry />
        </mesh>
      </Bounds> */}


  </>
  )
}
