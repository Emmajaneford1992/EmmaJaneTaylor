import * as THREE from 'three'
import React, { Suspense, useEffect, useState, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { PerspectiveCamera, Environment, MeshDistortMaterial, ContactShadows } from '@react-three/drei'
import { useSpring } from '@react-spring/core'
import { a } from '@react-spring/three'
// import { skillsList } from './skillsList'


// React-spring animates native elements, in this case <mesh/> etc,
// but it can also handle 3rd–party objs, just wrap them in "a".
const AnimatedMaterial = a(MeshDistortMaterial)

export default function WobblyBlob({ ...props }) {
  const sphere = useRef()
  // const light = useRef()
  const [mode, setMode] = useState(false)
  const [down, setDown] = useState(false)
  const [hovered, setHovered] = useState(false)

  // Change cursor on hovered state
  useEffect(() => {
    document.body.style.cursor = hovered
      ? 'none'
      : `url('data:image/svg+xml;base64,${btoa(
          '<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="10" fill="#E8B059"/></svg>'
        )}'), auto`

  }, [hovered])



  // Make the bubble float and follow the mouse
  // This is frame-based animation, useFrame subscribes the component to the render-loop
  useFrame((state) => {
    // light.current.position.x = state.mouse.x * 20
    // light.current.position.y = state.mouse.y * 20
    if (sphere.current) {
      sphere.current.position.x = THREE.MathUtils.lerp(sphere.current.position.x, hovered ? state.mouse.x / 2 : 0, 0.2)
      sphere.current.position.y = THREE.MathUtils.lerp(
        sphere.current.position.y,
        Math.sin(state.clock.elapsedTime / 1.5) / 6 + (hovered ? state.mouse.y / 2 : 0),
        0.2
      )
    }
  })

  // Springs for color and overall looks, this is state-driven animation
  // React-spring is physics based and turns static props into animated values
  const [{ wobble, coat, colour, ambient, env, opacity }] = useSpring(
    {
      wobble: down ? props.scaleHover : hovered ? props.scaleHover : props.scale,
      coat: mode && !hovered ? 0.04 : 1,
      ambient: mode && !hovered ? 2 : 1,
      env: mode && !hovered ? 0.4 : 1,
      colour: props.colour,
      opacity: props.opacity,
      config: (n) => n === 'wobble' && hovered && { mass: 2, tension: 1000, friction: 10 }
    },
    [mode, hovered, down, props.colour, props.opacity, props.scaleHover, props.scale]
  )

  return (
    <>
   
      {/* <a.ambientLight intensity={0} />
      <a.pointLight ref={light} position-z={-15} intensity={0} color="#F8C069" /> */}

      <Suspense >
        <a.mesh
          ref={sphere}
          scale={wobble}
          //position={[0,0,-1]}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          renderOrder={0}>
     
          <sphereGeometry args={[1, 64, 64]} />
          <AnimatedMaterial color={colour} envMapIntensity={env} clearcoat={coat} clearcoatRoughness={0.1} metalness={0.1} opacity={opacity}  transparent={true} depthWrite={false} depthTest={false} />
        </a.mesh>
      <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/industrial_workshop_foundry_1k.hdr" />
        <ContactShadows
          rotation={[Math.PI / 2, 0, 0]}
          position={[0, 0, 0]}
          opacity={mode ? 0.8 : 0.4}
          width={15}
          height={15}
          blur={2.5}
          far={1.6}
        />
      </Suspense>
    </>
  )
}

