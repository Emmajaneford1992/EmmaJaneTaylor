import { Environment, Float, GradientTexture, MeshDistortMaterial, MeshPortalMaterial, MeshStandardMaterial, MeshBasicMaterial, PresentationControls} from '@react-three/drei';
import { extend, useFrame } from '@react-three/fiber';
import { geometry } from 'maath';
import { useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { projectList } from './projectList';

import { a } from '@react-spring/three'

import { suspend } from 'suspend-react';
import '../../util';


const bold = import('@pmndrs/assets/fonts/inter_bold.woff')
const medium = import('@pmndrs/assets/fonts/inter_medium.woff')

const colours = ['red',         'teal',         'orange',    'skyblue',       'skyblue',       
                'orange',       'skyblue',      'skyblue',   'midnightblue',  'skyblue', 
                'skyblue',      'midnightBlue', 'orange',    'skyblue',       'PaleTurquoise', 
                'skyblue',      'green',        'skyblue',   'red',           'purple', 
                'midnightblue', 'skyblue',      'red',       'purple',        'lightpink',
                'midnightblue', 'skyblue',      'pink',      'red',           'red', 
                'PaleTurquoise', 'orange',      'pink',      'red',           'indigo'];


extend(geometry)
const AnimatedMaterial = a(MeshDistortMaterial)



import DisplayPanel from './DisplayPanel';



export default function Projects({...props}) {
  return (
    <>
      <PresentationControls snap global zoom={0.8} rotation={[0, 0, 0]} polar={[0, Math.PI / 4]} azimuth={[-Math.PI / 10, Math.PI / 10]}>
        <group  position={[0,0,-5.5]}>
          <Float floatIntensity={3} rotationIntensity={0.5}>
            <DisplayPanel scale = {0.3} position={[0,1.8,0]} {...props}/> 
            <Dots {...props}/>
          </Float> 
          <Rig rotation={[0, 0, 0]} scale = {0.32} position={[0,-2.5,0]} {...props}>
              <Carousel {...props}/>
          </Rig>
        </group>
      </PresentationControls>       
    </>
  )
}

export function Dots({...props}) {
  return Array.from({ length: 28 }, (_, i) => (
    <Dot
      key={i}
      num = {i}
      pageNum = {props.pageNum}
    />
  ))
}

function Dot({...props}) {
  return (
    <mesh position={[(props.num - (28/2))/8 , 0, 0]} >
      <roundedPlaneGeometry attach="geometry" args={[0.05,0.05, 0.04]} />
      <meshBasicMaterial attach="material" color={props.pageNum == props.num ? "grey" : "lightgrey"}/>
    </mesh>
  )
}

export function Rig(props) {
  const ref = useRef()
  useFrame((state, delta) => {

    ref.current.rotation.y = -(props.pageNumFlt) * (Math.PI / 5) // Rotate contents
    
    state.events.update() // Raycasts every frame rather than on pointer-move
    state.camera.lookAt(0, 0, 0) // Look at center
  })

  return <group ref={ref} {...props} />
}

export function Carousel({...props}) {
  const radius = 8;
  const count = 10;
  return Array.from({ length: count }, (_, i) => (
    <Card
      key={i}
      num = {i}
      count = {count}
      radius = {radius}
      pos={[Math.sin((i / count) * Math.PI * 2) * radius, 5, Math.cos((i / count) * Math.PI * 2) * radius]}
      rot={[0,  0, 0]}
      pageNum = {props.pageNum}
      pageNumFlt = {props.pageNumFlt}
      numOfPages = {props.numOfPages}
    />
  ))
}

function Card({...props }){
  const groupRef = useRef();
  // const ref = useRef();

  const [cardNum, setCardNum] = useState(0);
  const [url, setUrl] = useState('');
  const [urlBg, setUrlBg] = useState('');
  const [opacity, setOpacity] = useState(0)
  const [title, setTitle] = useState('');
  const texture = useMemo(() => new THREE.TextureLoader().load(url), [url]);
  const textureBg = useMemo(() => new THREE.TextureLoader().load(urlBg), [urlBg]);


  useFrame((state, delta) => {
    //console.log('Card', props.pageNum, props.pageNumFlt)
    let cNum = (Math.floor(((props.pageNum+5) - props.num)/ props.count) * props.count) + props.num;
    groupRef.current.rotation.y = (props.pageNumFlt) * (Math.PI / 5);
    cNum = cNum > props.numOfPages ? cNum - props.numOfPages : cNum < 1 ?  cNum + props.numOfPages : cNum;
  
    let op = Math.abs(((((props.pageNumFlt) - props.num + props.count) % props.count) /props.count)-0.5)*3-0.5;
    setOpacity( op )
    setCardNum(cNum)
    setTitle(projectList[cNum].title.replaceAll('|','I'));   
    //setCardNum('opacity: '+opacity + '\n' + 'cardNum: ' + cardNum  + '\n' + 'props.num: ' + props.num)
    setUrl(`/projectImages/img${cardNum}.png`);
    setUrlBg(`/projectBackground/img${cardNum}.png`);
    // ref.current.distort = THREE.MathUtils.lerp(ref.current.distort, 0.4, 0.5)

  })


  return (
    <group ref ={groupRef} position={props.pos} rotation={props.rot} scale={2}>    
    <ambientLight intensity={0.8} />
      <mesh>
        <roundedPlaneGeometry args={[ 1.5, 2, 0.1]} />
          <MeshPortalMaterial >
          <ambientLight intensity={0.5} />
              <mesh scale={[1, 1, 0.5]}  position={[0,0,-0.2]}>
                <sphereGeometry args={[1.5, 32,  64]} thetaStart={0} thetaLength={0} />
                <meshStandardMaterial side={THREE.BackSide} transparent={true} opacity={opacity}>

                {/* <MeshDistortMaterial ref={ref} speed={6} side={THREE.BackSide} transparent={true} opacity={opacity}> */}
                  <GradientTexture stops={[0, 1]} colors={[ 'white', projectList[cardNum].backgroundColour]} size={100} />
                </meshStandardMaterial>
              </mesh>
         
              <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/industrial_workshop_foundry_1k.hdr" />
              <mesh position={[0,0,-0.2]} url={url} >
                  <planeGeometry args={[ 1.5, 1.5]} />
                  <meshStandardMaterial attach="material" map={texture} transparent={true} opacity={opacity} side={THREE.FrontSide}/>
              </mesh>
          </MeshPortalMaterial>
      </mesh>
      {/* <mesh position={[0, -0.75, 0.005]}>
        <roundedPlaneGeometry attach="geometry" args={[1.5,0.5, 0.1]} />
        <meshStandardMaterial attach="material" color={'white'} transparent={true} opacity={opacity}/>
      </mesh>
      <Text font={suspend(bold).default}  fontSize={0.07} anchorY="bottom" anchorX="centre" lineHeight={0.8} position={[-0.65, -0.6, 0.11]} color={'black'}  material-toneMapped={false}>
        {title}
        <meshBasicMaterial attach="material" color={'black'} emmisive={'black'} transparent={true} opacity={opacity}/>
      </Text>
       */}
 

    </group>

  )
}

