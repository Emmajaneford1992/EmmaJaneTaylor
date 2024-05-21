import * as THREE from 'three'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MarchingCubes, MarchingCube, MeshTransmissionMaterial, Environment, Bounds, Text, Float } from '@react-three/drei'
import { Physics, RigidBody, BallCollider } from '@react-three/rapier'


function MetaBall({ color, vec = new THREE.Vector3(), ...props }) {

  const api = useRef()
  useFrame((state, delta) => {
    delta = Math.min(delta, 0.1)
    api.current.applyImpulse(
      vec
        .copy(api.current.translation())
        .normalize()
        .multiplyScalar(delta * -0.05),
    )
  })
  
  return (
    <group scale={0.5} position={[0, 0.65, -1]} rotation={[0, 0.6, 0]}>
      <Float>

        <RigidBody ref={api} colliders={false} linearDamping={4} angularDamping={0.95} {...props}>
          <MarchingCube strength={0.35} subtract={6} color={color} />
          <mesh>

            <sphereGeometry args={[0.04]}/>    
            <meshBasicMaterial color={color} toneMapped={false} />
          </mesh>
          <BallCollider args={[0.1]} type="dynamic" />
        </RigidBody>
      </Float>
    </group>
  )
}

function Pointer({ vec = new THREE.Vector3() }) {
  const ref = useRef()
  useFrame(({ pointer, viewport }) => {
    const { width, height } = viewport.getCurrentViewport()
    vec.set(pointer.x * (width / 2), pointer.y * (height / 2), 0)
    ref.current.setNextKinematicTranslation(vec)
  })
  return (
    <RigidBody type="kinematicPosition" colliders={false} ref={ref}>
      <MarchingCube strength={0.5} subtract={10} color="white" />
      <mesh>
        <sphereGeometry args={[0.04]} />
        <meshBasicMaterial color="pink" toneMapped={false} />
      </mesh>
      <BallCollider args={[0.1]} type="dynamic" />
    </RigidBody>
  )
}

export default function App() {

  return (

    
    <>
      <Physics gravity={[0, 2, 0]}>
        <MarchingCubes resolution={80} maxPolyCount={20000} enableUvs={false} enableColors>
        <MeshTransmissionMaterial 

meshPhysicalMaterial= {false}
transmissionSampler= {false}
backside= {true}
backsideThickness= {2}
samples= {10}
resolution= {2048}
backsideResolution= {1024}
transmission= {0.7}
roughness= {0.1 }
ior= {1.5}
thickness= {0.25 }
chromaticAberration= {0.4 }
anisotropy= {0.3 }
distortion= {0.0 }
distortionScale= {0.3 }
temporalDistortion= {0.65 }
attenuationDistance= {0.5 }
clearcoat= {0}
attenuationColor= {'#ffffff'}
color= {'white'}/>
{/* transmissionSampler= {true}/> */}
    
     
          <Float floatIntensity={5} rotationIntensity={2} speed={2}>
           <MetaBall color="indianred" position={[1, 1, -0.5]} />
           </Float>
           <Float floatIntensity={5} rotationIntensity={2} speed={2}>
          <MetaBall color="skyblue" position={[-1, -1, -0.5]} />
          </Float>
          <Float floatIntensity={5} rotationIntensity={2} speed={2}>
          <MetaBall color="teal" position={[2, 2, -0.5]} />
          </Float>
          <Float floatIntensity={5} rotationIntensity={2} speed={2}>
          <MetaBall color="orange" position={[-2, -2, -0.5]} />
          </Float>
          <Float floatIntensity={5} rotationIntensity={2} speed={2}>
          <MetaBall color="hotpink" position={[3, 3, -0.5]} />
          </Float>
          <Float floatIntensity={5} rotationIntensity={2} speed={2}>
          <MetaBall color="aquamarine" position={[-3, -3, -0.5]} /> 
          </Float>
          <Float floatIntensity={5} rotationIntensity={2} speed={2}>
            <Pointer />
          </Float>
        </MarchingCubes>
      </Physics>
      <Environment  files="the_sky_is_on_fire_2k.hdr" />
      {/* <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/industrial_workshop_foundry_1k.hdr" /> */}
      {/* Zoom to fit a 1/1/1 box to match the marching cubes */}
      <Bounds fit clip observe margin={1}>
        <mesh visible={false}>
          <boxGeometry />
        </mesh>
      </Bounds>
      
    </>
  )
}
