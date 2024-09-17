
import '../../styles.css'
// import {useFrame} from '@react-three/fiber';
import {useState} from 'react';
import modalImage from '../../assets/images/profileImage.png'
import Header from '../../Header';

export default function Homepage()
{

    // const [styles, setStyles] = useState(null);
    // useFrame((state, delta) => {

    //     setStyles({flexDirection: innerHeight > innerWidth ? 'column-reverse' : 'row'})
    // })

  
    return <>
         
        <div className='modal'> 
            <div className='homepage' >
                <div className='homepage-text'>
                    <div className='name'>Emma Taylor</div>
                    <div className='job'>AR Web Developer</div>
                    <div className='description'>Creative Front-end Web Developer with experience making Augmented Reality experiences, & 8 Years+ coding experience</div>
                </div>
                <div className="homepage-image">
                    <div></div>
                    <img src={modalImage} ></img>
                </div>
            </div>
        </div>
      
    </>

}