
import { Html, PresentationControls, Scroll, ScrollControls, useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useState } from 'react';

import Homepage from './pages/Homepage';
import Skills from './pages/Skills/Skills';
import Examples from './pages/Projects/Projects';

import './styles.css';
import Header from './Header';
import PageContext from './context/pageContext';
import { useContext } from 'react';
import usePage from './context/usePage';
import { useEffect } from 'react';
import Projects from './pages/Projects/Projects';
import projectList from './pages/Projects/projectList';
import { useRef } from 'react';
import Metaballs from './Metaballs';

export default function PageContent() {
  const { currentPage } = usePage();


  const [offset, setOffset] = useState(0)
  useEffect(() => {
    console.log(`Page changed to: ${currentPage}`);
    setOffset(0)


  }, [currentPage]);

  return <> 
  
    { currentPage == 'projects' && 
    <ScrollControls  horizontal pages={ 30 } damping={0} >
          <Content />
    </ScrollControls>}

    { currentPage == 'skills' && 
    <ScrollControls horizontal pages={ 18 } damping={0} >
          <Content />
    </ScrollControls>}

    {currentPage == 'home'  &&
      <>
        <Metaballs/>
        <ScrollControls>
          <Scroll html>
              <Homepage/>
          </Scroll> 
        </ScrollControls>
      </>}
        
    </>
}




function Content() {
  const { currentPage } = usePage();

  const scroll = useScroll()
  const [pageNum, setPageNum] = useState(0);

// console.log(`Page changed to: ${currentPage}`);
  useEffect(() => {
    
  }, [currentPage]);

  useFrame((state, delta) => {
    setPageNum((scroll.offset * scroll.pages)); 
  })
  return <>
    <PresentationControls snap global zoom={1} rotation={[0, 0, 0]} polar={[0, 0]} azimuth={[0, 0]}>
        { currentPage == 'projects' && <Projects scrollOffset={scroll.offset} pageNum={Math.round(pageNum)} pageNumFlt={pageNum} numOfPages={30}/> }
        { currentPage == 'skills'  &&  <Skills pageNum={Math.round(pageNum)} pageNumFlt={pageNum} numOfPages={18}/> } 
    </PresentationControls>
  
  </>
} 