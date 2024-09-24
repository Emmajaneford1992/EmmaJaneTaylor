import { useFrame } from '@react-three/fiber';
import { useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

export function Arrows({...props}) {
  return Array.from({ length: 2 }, (_, i) => (
    // <>
      <Arrow
        key={i}
        direction = {i == 0 ? "left" : "right"}
        positionX = {props.positionX}
        positionY = {props.positionY}
        onClick={() => props.handleClick(i == 0 ? "left" : "right")}
      />
  ))
}

function Arrow({...props}) {
  const [url, setUrl] = useState('');
  const texture = useMemo(() => new THREE.TextureLoader().load(url), [url]);
  const planeRef = useRef();
  useFrame(() => {
    setUrl(`/projectImages/arrow.png`);
  });

  return (
    <mesh ref={planeRef}  position={[props.direction == "left" ? -props.positionX : props.positionX, props.positionY, 0]} rotation={[0,0,props.direction == "left" ? Math.PI: 0 ]} onClick={props.onClick}>
      <planeGeometry attach="geometry" args={[0.3,0.3]} />
      <meshStandardMaterial attach="material" map={texture} transparent={true} opacity={1} side={THREE.FrontSide} depthTest={false} depthWrite={true}/>
    </mesh>
)
}