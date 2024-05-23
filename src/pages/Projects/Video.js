
import { Html, useScroll } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useRef, useState } from 'react';
import '../../styles.css';
import { projectList } from './projectList';

export default function Video({...props}){
    const [title, setTitle] = useState('')
    useFrame((state, delta) => {    
        setTitle(projectList[props.pageNum].title);
    })
    const { gl } = useThree();
    return<>       
       <group {...props}>
            <Html style={{ userSelect: 'none' }} castShadow receiveShadow occlude="blending" transform portal={{ current: gl.domElement.parentNode }}>
                <div className='video'>
                        <h1>{title}</h1>
                    {projectList[props.pageNum].videoType == "iFrame" && <iframe  src={projectList[props.pageNum].url} width="640" height="360" frameBorder={0} allow="autoplay; picture-in-picture" allowFullScreen ></iframe>}
                    {projectList[props.pageNum].videoType == "video" && <video width="640" height="360" controls autoplay="true"><source  src={projectList[props.pageNum].url} type="video/mp4"></source></video>}    
                </div>
            </Html>
        </group>
  </>
}
