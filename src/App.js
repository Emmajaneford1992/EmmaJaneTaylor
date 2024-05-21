
import { Canvas, useFrame } from '@react-three/fiber'
import './styles.css'


import Metaballs from './Metaballs'

import PageContent from './PageContent'
import Header from './Header'


export default function App()
{
    return<>
        <Canvas>
            {/* <Metaballs/> */}
            <PageContent/>
        </Canvas>
        {/* <Header /> */}
    </>
}

