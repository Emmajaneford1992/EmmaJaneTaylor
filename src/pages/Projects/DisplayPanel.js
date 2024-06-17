
import { Html, useScroll, Text } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { act, useEffect, useRef, useState } from 'react';
import '../../styles.css';
import { projectList } from './projectList';
import gsap from 'gsap';

import { suspend } from 'suspend-react';

const bold = import('@pmndrs/assets/fonts/inter_bold.woff')
const medium = import('@pmndrs/assets/fonts/inter_medium.woff')

import '../../util';
import { skillsList } from '../Skills/skillsList';

export default function DisplayPanel({...props}){

    const [title, setTitle] = useState('')
    const [description1, description2, setDescription1] = useState('')

    const buttonRef = useRef();
    const [active, setActive] = useState(false);
    const [moreInfoVisible, setMoreInfoVisible] = useState(false);
    const groupRef = useRef();

    useEffect(() => {
      setActive(false);

    }, [props.pageNum])


 
    useEffect(() => {
       if(groupRef.current){
        if(active){
          setMoreInfoVisible(false)
          groupRef.current.rotation.y = 0;
            let ctx = gsap.context(() => {
              gsap.to(groupRef.current.rotation, { y: Math.PI,  ease: 'none', duration: 1,
                onUpdate: () => { 
                  if(groupRef.current && groupRef.current.rotation.y > Math.PI/2 ){
                    setMoreInfoVisible(true)
                  }
                },
            }) }, groupRef); // <- scopes all selector text inside the context to this component (optional, default is document)
        }else{
          setMoreInfoVisible(true)
          groupRef.current.rotation.y = Math.PI;
            let ctx = gsap.context(() => {
              gsap.to(groupRef.current.rotation, { y: Math.PI*2,  ease: 'none', duration: 1,
                onUpdate: () => { 
                  if(groupRef.current && groupRef.current.rotation.y > Math.PI*1.5){
                    setMoreInfoVisible(false)
                  }
                },
            }) }, groupRef); // <- scopes all selector text inside the context to this component (optional, default is document)
           
         

        }
          // () => ctx.revert(); // cleanup! 
      }
    }, [active]);


    const { gl } = useThree();
    return<>   
       <group ref={groupRef} {...props}>
          {/* {!moreInfoVisible && */}
            <Html style={{ userSelect: 'none',  display: moreInfoVisible  ? 'none' : 'block' }} castShadow receiveShadow transform portal={{ current: gl.domElement.parentNode }}>
             {/* occlude="blending" */}
              <div className='video'>
                    <h1>{title}</h1>
                  {projectList[props.pageNum].videoType == "iFrame" && <iframe  src={projectList[props.pageNum].url} width="640" height="360" frameBorder={0} allow="autoplay; picture-in-picture" allowFullScreen ></iframe>}
                  {projectList[props.pageNum].videoType == "video" && <video width="640" height="360" controls autoplay="true"><source  src={projectList[props.pageNum].url} type="video/mp4"></source></video>}    
              </div>
            </Html>
          {/* } */}
          {moreInfoVisible &&
                <group rotation={[0,Math.PI,0]}>
                  <Html style={{ userSelect: 'none',}} castShadow receiveShadow  transform portal={{ current: gl.domElement.parentNode }}>  
                  {/* occlude="blending" */}
                    <div className='moreInfo' > 
    
                        <h1>{title}</h1>
                        <div>
                          {projectList[props.pageNum].description1}<br/><br/>
                          {projectList[props.pageNum].description2}<br/><br/>
                          {projectList[props.pageNum].description3}<br/><br/>
                          {projectList[props.pageNum].description4}<br/><br/>
                          {projectList[props.pageNum].description5}<br/><br/>
                          {projectList[props.pageNum].description6}
                        </div>
                
                    </div>
                  </Html>
                </group> }
        </group>
        <mesh ref={buttonRef}  position={[0, 0.2, 0]} onClick={(event) => setActive(!active)}>
        <roundedPlaneGeometry  attach="geometry" args={[0.7, 0.3, 0.05]}  /> 
       
          <meshStandardMaterial attach="material"  color={"grey"} />
        </mesh>
        <Text font={suspend(bold).default}  fontSize={0.1} anchorY="bottom" anchorX="centre" lineHeight={0.8} position={[active ? -0.15 : -0.28, 0.15, 0.11]} color={'black'}  material-toneMapped={false}>
          {active ?'Video' :'Learn More'  }
          <meshStandardMaterial attach="material" color={'white'} emmisive={'white'} />
        </Text>
  </>
}



