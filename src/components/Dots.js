export function Dots({...props}) {
  return Array.from({ length: props.numOfPages }, (_, i) => (
    <Dot
      key={i}
      num = {i}
      pageNum = {props.pageNum >= props.numOfPages ? 0 : props.pageNum} 
      numOfPages = {props.numOfPages}
      positionY = {props.positionY}
      onClick={() => props.handleClick(i)}
    />
  ))
}

function Dot({...props}) {
  return (
    <mesh position={[((props.num+0.5) - (props.numOfPages/2))/6 , props.positionY, 0]} onClick={props.onClick}>
      <roundedPlaneGeometry attach="geometry" args={[0.09,0.09, 0.04]} />
      <meshBasicMaterial attach="material" color={props.pageNum == props.num ? "grey" : "lightgrey"}/>
    </mesh>
)
}

