
import { Canvas, useFrame } from '@react-three/fiber'
import './styles.css'


import Metaballs from './Metaballs'

import PageContent from './PageContent'
import { Environment } from '@react-three/drei'


export default function App()
{
    return<>
        <Canvas>

            <PageContent/>
            <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/industrial_workshop_foundry_1k.hdr" />

        </Canvas>

    </>
}

