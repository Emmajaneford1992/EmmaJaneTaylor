export function Dots({...props}) {
    return Array.from({ length: props.numOfPages }, (_, i) => (
      <Dot
        key={i}
        num = {i}
        pageNum = {props.pageNum}
        numOfPages = {props.numOfPages}
        positionY = {props.positionY}
      />
    ))
  }
  
function Dot({...props}) {
return (
    <mesh position={[(props.num - (props.numOfPages/2))/8, props.positionY, 0]} >
    <roundedPlaneGeometry attach="geometry" args={[0.05,0.05, 0.04]} />
    <meshBasicMaterial attach="material" color={props.pageNum == props.num ? "grey" : "lightgrey"}/>
    </mesh>
)
}

  