import { OrbitControls, useScroll } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { MathUtils } from "three";
import { skillsList } from '../skillsList'

import vertexShader from './vertexShader';
import fragmentShader from './fragmentShader';

export const Blob = ({...props}) => {
  // This reference will give us direct access to the mesh
  const mesh = useRef();
  const hover = useRef(false);
  const scroll = useScroll()

  
  

  const uniforms = useMemo(
    () => ({
      u_intensity: {
        value: 0.3,
      },
      u_time: {
        value: 0.0,
      },
      u_r: {
        value: 1.000,
      },
      u_g: {
        value: 0.500,
      },
      u_b: {
        value: 0.000,
      }
    }),
    []
  );

  let pageNum = 0;
  let lastNum = 0;

  useFrame((state) => {
    const { clock } = state;
    if (mesh.current) {
      mesh.current.material.uniforms.u_time.value =
        0.4 * clock.getElapsedTime();

      mesh.current.material.uniforms.u_intensity.value = MathUtils.lerp(
        mesh.current.material.uniforms.u_intensity.value,
       0.15,
        0.02
      );
    }
  });

  useFrame((state, delta) => {

    //lastNum = pageNum != lastNum ? pageNum : lastNum;
    pageNum = props.pageNum; 
    lastNum = pageNum - 1;
    lastNum = lastNum >  18 ? 18 : lastNum < 0 ? 0 : lastNum;
    let diff = (props.pageNumFlt)  % 1;
    //log(lastNum , pageNum, skillsList[lastNum].rgb, skillsList[pageNum].rgb, diff)

   //const { clock } = state;
    //mesh.current.material.uniforms.u_time.value = 0.4 * clock.getElapsedTime();
    

    const { clock } = state;
    if (mesh.current) {
      mesh.current.material.uniforms.u_time.value =0.6 * clock.getElapsedTime();

      mesh.current.material.uniforms.u_intensity.value = MathUtils.lerp(
        mesh.current.material.uniforms.u_intensity.value,
       0.2,
        0.2
      );
    }

    // mesh.current.material.uniforms.u_intensity.value = MathUtils.lerp(
    //   mesh.current.material.uniforms.u_intensity.value,
    //   hover.current ? 0.85 : 0.15,
    //   0.02
    // );


    mesh.current.material.uniforms.u_time.value = scroll.offset ; 
    mesh.current.material.uniforms.u_r.value = (skillsList[pageNum].rgb[0]* diff) + (skillsList[lastNum].rgb[0] * (1-diff));
    mesh.current.material.uniforms.u_g.value = (skillsList[pageNum].rgb[1]* diff) + (skillsList[lastNum].rgb[1] * (1-diff)); 
    mesh.current.material.uniforms.u_b.value = (skillsList[pageNum].rgb[2]* diff) + (skillsList[lastNum].rgb[2] * (1-diff)); 



  });

  return (
    <mesh
      ref={mesh}
      position={[0, 0, 0]}
      scale={2}
      onPointerOver={() => (hover.current = true)}
      onPointerOut={() => (hover.current = false)}
    >
      <icosahedronGeometry args={[2, 20]} />
      <shaderMaterial
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
        wireframe={false}
      />
    </mesh>
  );
};
