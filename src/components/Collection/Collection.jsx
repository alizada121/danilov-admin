import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import BreadCrumb from "../../UI/BreadCrumb";
import "../Collection/Collection.css"
function Collection() {
  const access = localStorage.getItem("lemlemaccess");
  const refresh = localStorage.getItem("lemlemrefresh");
  const [collection, setCollection] = useState([]);
  const [modal, setModal] = useState(false);
  const [newColName,setNewColName]=useState()
  const [colName,setColName]=useState()
  const [colID,setColID]=useState()
  const [toggle, setToggle] = useState(true);
  const navigate = useNavigate();
  console.log(newColName)
  console.log(access)
  useEffect(() => {
    if (!access || access == null) {
      navigate("/login");
    }
  }, [access]);


  const fetchApi = () => {
    return fetch("https://lit-lowlands-45367.herokuapp.com/shoes/collections", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response.json();
  })
  .then((responseJson) => {
      return responseJson;
  })
  .catch((error) => {
      console.error(JSON.stringify(error));
  });
  };

  useEffect(() => {
    fetchApi().then((data) => {
            setCollection(data.data);
            console.log(data)
         
        });
  }, []);

  const changeModal = () => {
    setModal(true);
  };

  const handleChange = (e) => {
    const value = e.target.value;

    setNewColName(
 value
    );
    // console.log(credentials);
  };
  const [data, setData] = useState()
 


  const addCollection =async e=>{
    e.preventDefault()

    console.log(newColName)

    try {
        const response = await axios
            .post('https://lit-lowlands-45367.herokuapp.com/admin/shoes/collection', {
                collection:newColName
            }, {
                headers: {
                    // "Content-Type": "application/json",
                    'danilov-access': "Bearer " + access,
                    'danilov-refresh': "Bearer " + refresh,
                }
            });
            console.log(` 'danilov-access': "Bearer " + ${access}`);
            console.log(` 'danilov-refresh': "Bearer " + ${refresh}`);
        alert("Successfully Added")
        setModal(false)
        console.log(collection);
        fetchApi().then((data) => {
            setCollection(data.data);
            // console.log(data+"salammmmm");
        });

    } catch (e) {
      console.log(e)
        alert("Something went wrong")
    }

  }


  const deleteCollection = async e => {

    const id = e;

    try {
        const response = await axios.delete(`https://lit-lowlands-45367.herokuapp.com/admin/shoes/collection/${id}`, {
            headers: {
                "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
                'danilov-access': "Bearer " + access,
                'danilov-refresh': "Bearer " + refresh,
            },
            data: {
                id
            }
        }, { withCredentials: true });
        console.log(response)
        if (response.status === 401) {
            localStorage.removeItem("lemlemaccess");
            localStorage.removeItem("lemlemrefresh");
            navigate("/login")
        }

        alert("Successfully Removed")

        fetchApi().then((data) => {
            setData(data); 
            // console.log(data + "salam")
        });

    } catch (e) {
        alert("Something went wrong")
    }

}

// const myChangeHandler = (item, i) => {
//   setColName(collection.name);
//   setColID(collection._id)
//   console.log(collection)
//   // setColID(item._id)
//   if (i.target.className === 'fas fa-check categoryDelete') {
//       i.target.parentNode.children[1].readOnly = true
//       i.target.parentNode.children[1].className = 'notAllowed'
//       i.target.className = 'fas fa-edit categoryDelete'

//       setToggle(true)
//       try {
//           axios.patch(`https://lit-lowlands-45367.herokuapp.com/admin/shoes/collection/${id}`, {
//               collection: colName,
//               id: colID
//           }, {
//               headers: {
//                   "Content-Type": "application/json",
//                   'danilov-access': "Bearer " + access,
//                   'danilov-refresh': "Bearer " + refresh,
//               }
//           });
//           alert("Successfully Edited")

//           fetchApi().then((data) => {
//               setData(data);
//           });

//       } catch (item) {
//           alert("Something went wrong")
//       }
//   } else {
//       i.target.parentNode.children[1].readOnly = false
//       i.target.parentNode.children[1].className = 'pointer'
//       i.target.className = 'fas fa-check categoryDelete'
//   }
// }

  return (
    <>
            <Header/>
            <Sidebar/>
            <BreadCrumb pageName={"collection"} />

      {!modal ? (
        <div className="collection-general">
          <div className="collection-div">
            {collection &&
              collection.map((item) => (
                <div>
               
                <input className={toggle ? "notAllowed" : 'pointer'} onChange={(item) => setColName(item.target.value.toUpperCase())} type="text" readOnly={toggle} defaultValue={item.name} />
                  {/* <p>{item._id}</p> */}
                  {/* <i onClick={(i) => myChangeHandler(item, i)} id={item.colName} class="fas fa-edit categoryDelete"></i> */}

                <i onClick={() => deleteCollection(item._id)} class="fas fa-trash categoryDelete"></i>
                 
                </div>
              ))}
          </div>

          <button onClick={changeModal}>Add</button>
        </div>
      ) : (
        <div>
          <label>
            New Collection Name
            <input
              type="text"
              name="collection"
              onChange={handleChange} 
            ></input>
          </label>
          <button onClick={(e) => addCollection(e)}>add</button>
        </div>
      )}
    </>
  );
}

export default Collection;
