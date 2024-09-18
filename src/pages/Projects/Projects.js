import { Environment, Float, GradientTexture, MeshDistortMaterial, MeshPortalMaterial, MeshStandardMaterial, MeshBasicMaterial, PresentationControls, Text} from '@react-three/drei';
import { extend, useFrame } from '@react-three/fiber';
import { geometry } from 'maath';
import { useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { a } from '@react-spring/three'
import '../../util';


import { projectList } from './projectList';
import DisplayPanel from './DisplayPanel';
import WobblyBlob from '../../components/WobblyBlob';
import { HandPrompt } from '../../components/HandPrompt';
import { Dots } from '../../components/Dots';


const bold = import('@pmndrs/assets/fonts/inter_bold.woff')
const medium = import('@pmndrs/assets/fonts/inter_medium.woff')

extend(geometry)
const AnimatedMaterial = a(MeshDistortMaterial)


export default function Projects({...props}) {
  return (
    <>
      <PresentationControls snap global zoom={0.8} rotation={[0, 0, 0]} polar={[0, Math.PI / 4]} azimuth={[-Math.PI / 7, Math.PI / 7]}>
        <group  position={[0,0,-5.5]}>
          <Float floatIntensity={3} rotationIntensity={0.5}>
            <DisplayPanel scale = {0.45} position={[0,1.6,0]} {...props}/> 
            <Dots   {...props} numOfPages={props.numOfPages} positionY={-1}/>
          </Float> 
          <Rig rotation={[0, 0, 0]} scale = {0.35} position={[0,-3,0]} {...props}>
              <Carousel {...props}/>
          </Rig>
          <HandPrompt {...props} position={[0,-1.5,3.5]}/>
        </group>
      </PresentationControls>       
    </>
  )
}



export function Rig(props) {
  const ref = useRef()
  useFrame((state, delta) => {
    ref.current.rotation.y = -(props.pageNumFlt) * (Math.PI / 3.5) // Rotate contents
    state.events.update() // Raycasts every frame rather than on pointer-move
    state.camera.lookAt(0, 0, 0) // Look at center
  })
  return <group ref={ref} {...props} />
}


export function Carousel({...props}) {
  const radius = 8;
  const count = 7;
  return Array.from({ length: count }, (_, i) => (
    <Card
      key={i}
      num = {i}
      count = {count}
      radius = {radius}
      pos={[Math.sin((i / count) * Math.PI * 2) * radius, 4, Math.cos((i / count) * Math.PI * 2) * radius]}
      rot={[0, 0, 0]}
      pageNum = {props.pageNum}
      pageNumFlt = {props.pageNumFlt}
      numOfPages = {props.numOfPages}
    />
  ))
}


function Card({...props }){
  const groupRef = useRef();
  // const ref = useRef();
  const light = useRef()
  const [cardNum, setCardNum] = useState(0);
  // const [bubbleNum, setBubbleNum] = useState(0);

  const [url, setUrl] = useState('');
  const [urlBg, setUrlBg] = useState('');
  const [opacity, setOpacity] = useState(0)
  const [title, setTitle] = useState('');
  const texture = useMemo(() => new THREE.TextureLoader().load(url), [url]);
  const textureBg = useMemo(() => new THREE.TextureLoader().load(urlBg), [urlBg]);


  useFrame((state, delta) => {
    let cNum = (Math.floor(((props.pageNum+3.5) - props.num)/ props.count) * props.count) + props.num;
    cNum = cNum < 0 ?  cNum + props.numOfPages :  cNum = cNum > props.numOfPages -1 ? cNum - props.numOfPages : cNum
    groupRef.current.rotation.y = (props.pageNumFlt) * (Math.PI / 3.5);
    let op = Math.abs(((((props.pageNumFlt) - props.num + props.count) % props.count) /props.count)-0.5)*3-0.5;
  
    setOpacity( op )
    setCardNum(cNum)
    // setBubbleNum(props.num)
    setTitle(projectList[cNum].title.replaceAll('|','I'));   
    setUrl(`/projectImages/img${cardNum}.png`);

    light.current.position.x = state.mouse.x * 20
    light.current.position.y = state.mouse.y * 20
   
  })


  return (
    <group ref ={groupRef} position={props.pos} rotation={props.rot} scale={2}>    
    <a.ambientLight intensity={0.5} />
      <a.pointLight ref={light} position-z={-15} intensity={0.5} color="#F8C069" />
      <WobblyBlob {...props}  opacity={opacity} colour={0xffffff} scale={1} scaleHover={1}/>
      <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/industrial_workshop_foundry_1k.hdr" />
      <mesh position={[0,0,0]} url={url}  renderOrder={2}>
          <planeGeometry args={[1.5, 1.5]} />
          <meshStandardMaterial attach="material" map={texture} transparent={true} opacity={opacity} side={THREE.FrontSide} depthTest={true} depthWrite={true}/>
      </mesh>
      {/* <Text font={suspend(bold).default}  fontSize={0.2} anchorY="bottom" anchorX="centre" lineHeight={0.8} position={[0, -1.3, 0]} color={'black'}  material-toneMapped={false}>
        {cardNum}
        <meshBasicMaterial attach="material" color={'black'} emmisive={'black'} />
      </Text>
      <Text font={suspend(bold).default}  fontSize={0.2} anchorY="bottom" anchorX="centre" lineHeight={0.8} position={[0, -1.5, 0]} color={'black'}  material-toneMapped={false}>
        {bubbleNum }
        <meshBasicMaterial attach="material" color={'black'} emmisive={'black'} />
      </Text> */}
    </group>
  )
}

