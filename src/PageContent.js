
import { Html, PresentationControls, Scroll, ScrollControls, useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useState } from 'react';

import Homepage from './pages/Homepage/Homepage';
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
import AboutMe from './pages/AboutMe/AboutMe';

export default function PageContent() {
  const { currentPage } = usePage();

  const [offset, setOffset] = useState(0)
  useEffect(() => {
    console.log(`Page changed to: ${currentPage}`);
    setOffset(0)
  }, [currentPage]);

  return <> 

    { currentPage == 'projects' && 
    <>
      {/* <Metaballs/> */}
      <ScrollControls infinite horizontal pages={ 28 } damping={0} >
            <Content />
      </ScrollControls>
    </>
    }

    { currentPage == 'skills' && 
    <ScrollControls infinite horizontal pages={ 18 } damping={0} >
          <Content />
    </ScrollControls>}

    {currentPage == 'home' &&
    <>
      <Metaballs/>
      <ScrollControls  pages={ 1 } damping={0} >
        <Scroll html>
          <Homepage/>
        </Scroll> 
      </ScrollControls>
    </>}
    
    {currentPage == 'aboutMe' &&
    <>
        <Metaballs/>
        <ScrollControls  pages={ 3.5 } damping={0} >
          <Scroll html>
            <AboutMe/>
          </Scroll> 
        </ScrollControls>
    </>}
  </>
}


function Content() {
  const { currentPage } = usePage();

  const scroll = useScroll()
  const [pageNum, setPageNum] = useState(0);
  const [lastPageNum, setLastPageNum] = useState(0);
  const [scrolling, setScrolling] = useState(false);

  const handleArrowClick = (direction) => {
    console.log('arrow clicked:', direction)
    let newPage = direction == 'left' ?  Math.round(pageNum)-1 : Math.round(pageNum)+1;
    newPage = newPage < 0 ?  newPage + scroll.pages :  newPage = newPage > scroll.pages -1 ? direction == 'left' ? newPage - scroll.pages : newPage: newPage
    handleReposition(newPage)
  };

  const handleReposition = (i) => {
    if(pageNum < 1 && i >= scroll.pages-1){
      console.log('r if ', scroll.pages, pageNum, i, scroll.el.scrollWidth, (i/(scroll.pages+1))*scroll.el.scrollWidth)
      scroll.el.scrollLeft =    ((scroll.pages-0.05)/(scroll.pages+1))*scroll.el.scrollWidth
    }
    else if(i < 1 && pageNum >= scroll.pages-1){
      i = i + scroll.pages
    }
    scroll.el.scrollTo({ left: (i/(scroll.pages+1))*scroll.el.scrollWidth, behavior: 'smooth' });
  };

  useFrame((state, delta) => {
    setLastPageNum(pageNum);
    setPageNum(scroll.offset * scroll.pages);
    if(pageNum == lastPageNum){
      if(scrolling){
        setScrolling(false);
        handleReposition(Math.round(pageNum))
      }
    }
    else{
      if(!scrolling){
        setScrolling(true)
      }
    }
  })
  return <>
    <PresentationControls snap global zoom={1} rotation={[0, 0, 0]} polar={[0, 0]} azimuth={[0, 0]}>
        { currentPage == 'projects' && <Projects scrollOffset={scroll.offset} pageNum={Math.round(pageNum)} pageNumFlt={pageNum} numOfPages={28} updateScroll={handleReposition} arrowClicked={handleArrowClick}/>}
        { currentPage == 'skills'  &&  <Skills pageNum={Math.round(pageNum)} pageNumFlt={pageNum} numOfPages={18} updateScroll={handleReposition} arrowClicked={handleArrowClick}/> } 
    </PresentationControls>
  </>
} 