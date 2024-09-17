import { useFrame } from '@react-three/fiber';
import { useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

export function HandPrompt({...props }){
    const [url, setUrl] = useState('');
    const texture = useMemo(() => new THREE.TextureLoader().load(url), [url]);
    const planeRef = useRef();
    const materialRef = useRef();
    
    useFrame(({ clock }) => {
      setUrl(`/projectImages/handCursor.png`);
      let count = -(((clock.getElapsedTime()/2)%1)-0.5)
      planeRef.current.position.x = count
      planeRef.current.rotation.z = -count/2
      let op = count > 0 ? (1-count)*2  : (1+count)*2;
      materialRef.current.opacity = props.pageNum > 1 ? props.pageNum > (props.numOfPages-1) ? op * (props.pageNumFlt%1): 0  : op*(1 - props.pageNumFlt); 
    });
  
    return (
      <group  position={[1,-3.5,3]}>
        <mesh ref={planeRef} position={[0,0,0]} rotation={[0,0,0.5]} url={url}  renderOrder={4}>
              <planeGeometry args={[0.4,0.4]} />
              <meshStandardMaterial ref={materialRef} attach="material" map={texture} transparent={true} opacity={1} side={THREE.FrontSide} depthTest={false} depthWrite={true}/>
        </mesh>
      </group>
    )
  }