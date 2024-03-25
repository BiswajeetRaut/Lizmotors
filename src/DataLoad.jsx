import { Bar } from "react-chartjs-2";
import "./DataLoad.css"
import { useEffect, useState } from "react";
import db from "./firebase";
export default function DataLoad(props) {
  console.log(props);
  const {setModal, setData, data} = props;
  console.log(setModal)
  // setModal(false);
  const [upadte, setupadte] = useState(false);
  const [bar, setbar] = useState(0);
  const [label, setLabel] = useState(data.nodeData.label);
  const [datahead, setDatahead] = useState(data.nodeData?.data?.datahead);
  const [detail, setDetail] = useState(data.nodeData?.data?.detail);
  const [maxValue, setMaxValue] = useState(data.nodeData?.data?.maxValue);
  const [value, setValue] = useState(data.nodeData?.data?.value);
  useEffect(() => {
    var barwidth = Math.floor((data.nodeData?.data?.value/data.nodeData?.data?.maxValue) * 100);
    setbar(barwidth);
  }, [props]);
  const handleSave = () => {
    console.log('Label:', label);
    console.log('Datahead:', datahead);
    console.log('Detail:', detail);
    console.log('Max Value:', maxValue);
    console.log('Value:', value);

    var path = data.collectionPath.split('/');
    var cPath = '';
    if(data.id == path[path.length-1])
    {
      var newData ={datahead,detail,maxValue,value};
      path.pop();
      cPath = path.join('/');
      db.collection(cPath).doc(data.id).update({
        label: label,
        data: newData,
      }).then((res)=>{alert('Saved Succesfully');
      data.nodeData.data = newData;
      data.nodeData.label = label;
      setupadte(false);
      setModal(false);
    }
      ).catch((err)=>{console.log(err);});
    }
    else{
      var newData ={datahead,detail,maxValue,value};
      cPath = path.join('/') + '/children';
      db.collection(cPath).doc(data.id).update({
        label: label,
        data: newData,
      }).then((res)=>{alert('Saved Succesfully');
      data.nodeData.data = newData;
      data.nodeData.label = label;
      setupadte(false);
      setModal(false);
    }
      ).catch((err)=>{console.log(err);});
    }
    setLabel('');
    setDatahead('');
    setDetail('');
    setMaxValue(0);
    setValue(0);
    
  };
  return (
    <div className="dataload">
      {/* {upadte && <UpdateData setupdate={setupadte}/>} */}
      <div className="data">
        <div className="cross" onClick={()=>{setModal(false)}}>X</div>
        {data.nodeData.data==undefined?<>No Data available</>:
        (<div className="datadiv"><div className="datahead">{data.nodeData.data.datahead}</div><div className="bar"><div className="b" style={{width:`${bar}%`}}></div></div>
        <div className="detail">{data.nodeData.data?.value}/{data.nodeData?.data?.maxValue}, {data.nodeData.data.detail}</div></div>)
        }
      <div className="options">
        <button onClick={()=>{setupadte(true)}}>Update Data</button>
        <button onClick={()=>{
          var response = prompt('Give the child name');
          if(response == null)
          {
            return;
          }
    var path = data.collectionPath.split('/');
    var cPath = '';
    if(data.id == path[path.length-1])
    {
      cPath = path.join('/')+'/children';
      db.collection(cPath).add({label:response}).then((res)=>{alert('added new child successfully')}).catch((err)=>{console.log(err)});
      window.location.reload();
    }
    else{
      cPath = data.collectionPath + '/children/' + data.id +'/children';
      db.collection(cPath).add({label:response}).then((res)=>{alert('added new child successfully')}).catch((err)=>{console.log(err)});
      window.location.reload();
    }
        }}>Add Child</button>
      </div>
      {upadte &&
        <div className="update">
      <div className="modal">
      <div>
        <label>Label:</label>
        <input type="text" value={label} onChange={(e) => setLabel(e.target.value)} />
      </div>
      <div>
        <label>Datahead:</label>
        <input type="text" value={datahead} onChange={(e) => setDatahead(e.target.value)} />
      </div>
      <div>
        <label>Detail:</label>
        <input type="text" value={detail} onChange={(e) => setDetail(e.target.value)} />
      </div>
      <div>
        <label>Max Value:</label>
        <input type="number" value={maxValue} onChange={(e) => setMaxValue(parseInt(e.target.value))} />
      </div>
      <div>
        <label>Value:</label>
        <input type="number" value={value} onChange={(e) => setValue(parseInt(e.target.value))} />
      </div>
      <div className="updatebtn">
        <button onClick={handleSave}>Save</button>
        <button onClick={()=>{setupadte(false)}}>Close</button>
      </div>
    </div>
      </div>
    }
      </div>
    </div>
  );
}
