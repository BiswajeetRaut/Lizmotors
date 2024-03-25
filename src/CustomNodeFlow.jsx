// import React, { useState, useEffect, useCallback } from "react";
// import { Audio } from "react-loader-spinner";
// import ReactFlow, {
//   isEdge,
//   removeElements,
//   addEdge,
//   MiniMap,
//   Controls,
// } from "react-flow-renderer";
// import db from "./firebase";
// import DataLoad from "./DataLoad";
// import Loader from "./Loader";
// const onNodeDragStop = (event, node) => console.log("drag stop", node);

// const initBgColor = "#b1b0bf";

// const connectionLineStyle = { stroke: "#fff" };
// const snapGrid = [20, 20];

// const CustomNodeFlow = () => {
//   const [reactflowInstance, setReactflowInstance] = useState(null);
//   const [elements, setElements] = useState([]);
//   const [bgColor, setBgColor] = useState(initBgColor);
//   const [data, setData] = useState(null);
//   const [modal, setModal] = useState(false);
//   const [loader,setloader] = useState(true);
//   const onElementClick = (event, element) => {
//     const node = elements.find((n) => n.id == element.id);
//     console.log(node);
//     setData(node);
//     console.log("click", element);
//     setModal(true);
//   };
//   var x = 0;
//   var y = 0;
//   async function getAllNodesData(
//     collectionPath,
//     result = [],
//     position = { x: 0, y: 50 },
//   ) {
//     const querySnapshot = await db.collection(collectionPath).get();

//     for (const doc of querySnapshot.docs) {
//       position.y += 250; // Increment y for siblings
//       const { label } = doc.data();
//       const nodeId = doc.id;
//       const nodePosition = { ...position }; // Copy position object
//       const node = result.find((n) => n.id === nodeId); // Check if node already exists

//       if (!node) {
//         result.push({
//           id: nodeId,
//           data: { label: label },
//           position: nodePosition,
//           sourcePosition: "right",
//           targetPosition: "left",
//           style: { border: "1px solid #777", padding: 10 },
//           nodeData: doc.data(),
//           collectionPath: `${collectionPath}/${doc.id}`,
//         }); // Add node if not already in result
//       } else {
//         node.data.label = label;
//         node.nodeData = doc.data();
//       }

//       const childrenQuerySnapshot = await db
//         .collection(`${collectionPath}/${doc.id}/children`)
//         .get();

//       if (!childrenQuerySnapshot.empty) {
//         let childX = position.x + 300; // Initialize x for children
//         let childY = position.y; // Reset y for children

//         for (const childDoc of childrenQuerySnapshot.docs) {
//           const childNodeId = childDoc.id;
//           const existingChildNode = result.find((n) => n.id === childNodeId); // Check if child node already exists

//           if (!existingChildNode) {
//             const childPosition = { x: childX, y: childY };
//             result.push({
//               id: childNodeId,
//               data: { label: childNodeId },
//               position: childPosition,
//               sourcePosition: "right",
//               targetPosition: "left",
//               nodeData: doc.data(),
//               collectionPath: `${collectionPath}/${doc.id}`,
//             }); // Add child node
//           }

//           result.push({
//             id: `${nodeId}-${childNodeId}`,
//             source: nodeId,
//             target: childNodeId,
//             animated: true,
//             style: { stroke: "#fff" },
//           }); // Add edge

//           childY += 150; // Increment y for siblings
//         }
//       }

//       await getAllNodesData(`${collectionPath}/${doc.id}/children`, result, {
//         x: position.x,
//         y: position.y,
//       }); // Recursive call for children
//     }

//     return result;
//   }
//   useEffect(() => {
//     // setloader(true);
//     getAllNodesData("Nodes")
//       .then((nodes) => {
//         console.log("nodes", nodes);
//         setElements(nodes);
//         setloader(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching nodes:", error);
//       });
//     const onChange = (event) => {
//       setElements((els) =>
//         els.map((e) => {
//           if (isEdge(e) || e.id !== "2") {
//             return e;
//           }

//           const color = event.target.value;

//           setBgColor(color);

//           return {
//             ...e,
//             data: {
//               ...e.data,
//               color,
//             },
//           };
//         }),
//       );
//     };
//   }, []);

//   useEffect(() => {
//     if (reactflowInstance && elements.length > 0) {
//       reactflowInstance.fitView();
//     }
//   }, [reactflowInstance, elements.length]);

//   const onElementsRemove = useCallback(
//     (elementsToRemove) =>
//       setElements((els) => removeElements(elementsToRemove, els)),
//     [],
//   );
//   const onConnect = useCallback(
//     (params) =>
//       setElements((els) =>
//         addEdge({ ...params, animated: true, style: { stroke: "#fff" } }, els),
//       ),
//     [],
//   );

//   const onLoad = useCallback(
//     (rfi) => {
//       if (!reactflowInstance) {
//         setReactflowInstance(rfi);
//         console.log("flow loaded:", rfi);
//       }
//     },
//     [reactflowInstance],
//   );

//   return (
//     <div style={{position:`absolute`,top:0, right:0,left:0,bottom:0}}>
//       {modal && <DataLoad setModal={setModal} setData data={data}/>}
//       {loader && <Loader/>}
//       <ReactFlow
//         elements={elements}
//         onElementClick={onElementClick}
//         onElementsRemove={onElementsRemove}
//         onConnect={onConnect}
//         onNodeDragStop={onNodeDragStop}
//         style={{ background: bgColor }}
//         onLoad={onLoad}
//         connectionLineStyle={connectionLineStyle}
//         snapToGrid={true}
//         snapGrid={snapGrid}
//         defaultZoom={1.5}
//       >
//         <MiniMap
//           nodeStrokeColor={(n) => {
//             if (n.type === "input") return "#0041d0";
//             if (n.type === "selectorNode") return bgColor;
//             if (n.type === "output") return "#ff0072";
//           }}
//           nodeColor={(n) => {
//             if (n.type === "selectorNode") return bgColor;
//             return "#fff";
//           }}
//         />
//         <Controls />
//       </ReactFlow>
//     </div>
//   );
// };

// export default CustomNodeFlow;
