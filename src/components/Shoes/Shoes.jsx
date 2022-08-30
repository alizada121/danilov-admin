import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Shoes/Shoes.css";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import BreadCrumb from "../../UI/BreadCrumb";
function Shoes() {
  const access = localStorage.getItem("lemlemaccess");
  const refresh = localStorage.getItem("lemlemrefresh");
  const [defaultData, setDefaultData] = useState();
  const [shoes, setShoes] = useState([]);
  const navigate = useNavigate();
  const [modal,setModal]=useState(false)

  const [newShoes,setNewShoes]=useState({
    newName:"",
    newColName:"",
    newDesc:"",
    newColor:"",
    newPrice:"",
    newStock:"",
    newImg:""

  })

  

  


  const fetchApi = () => {
    return fetch(
      "https://lit-lowlands-45367.herokuapp.com/shoes",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "danilov-access": "Bearer " + access,
          "danilov-refresh": "Bearer " + refresh,
        },
      },
      { withCredentials: true }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setShoes(data.data);
      })
      .catch((error) => {
        console.error(JSON.stringify(error));
      });
  };

  console.log(shoes);
  useEffect(() => {
    if (!access && access == null) {
      navigate("/login");
    }
  }, [access]);

  useEffect(() => {
    fetchApi();
  }, []);

  const setMod=()=>{
    setModal(true)
  }



  const handleChange = (e) => {
    const value = e.target.value;

    setNewShoes({
      ...newShoes,
      [e.target.name]: value,
    });
    // console.log(credentials);
  };

  console.log(newShoes)
  const [data, setData] = useState([])


  const addCategory=async e=>{
    e.preventDefault()
    try {
        const response = await axios
            .post('https://lit-lowlands-45367.herokuapp.com/admin/shoe', {
                newShoes
            }, {
                headers: {
                    "Content-Type": "application/json",
                    'danilov-access': "Bearer " + access,
                    'danilov-refresh': "Bearer " + refresh,
                }
            });
            console.log(` 'danilov-access': "Bearer " + ${access}`);
            console.log(` 'danilov-refresh': "Bearer " + ${refresh}`);
        alert("Successfully Added")
        setModal(false)
        fetchApi().then((data) => {
            setData(data.result);
            console.log(data.result);
        });

    } catch (e) {
      console.log(e)
        alert("Something went wrong")
    }
    

  }


  const deleteShoes = async e => {

    const id = e;

    try {
        const response = await axios.delete(`https://lit-lowlands-45367.herokuapp.com/admin/shoe/${id}`, {
            headers: {
                "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, DELETE",
                'danilov-access': "Bearer " + access,
                'danilov-refresh': "Bearer " + refresh,
            },
            data: {
                id: id
            }
        }, { withCredentials: true });
        if (response.status === 401) {
            localStorage.removeItem("lemlemaccess");
            localStorage.removeItem("lemlemrefresh");
            navigate("/login")
        }

        alert("Successfully Removed")

        fetchApi().then((data) => {
            setData(data);
        });

    } catch (e) {
        alert("Something went wrong")
    }

}


  

  return (
    <>
            <Header/>
            <Sidebar/>
            <BreadCrumb pageName={"Shoes"} />

    {!modal
    ?
    <div className="shoes-general">
      {shoes &&
        shoes.map((item) => (
          <div>
            <h5>Shoe Name</h5>
            <div className="shoe-cont" key="_id">
              <div className="shoes">{item.name}</div>
            
                {/* <i onClick={(i) => myChangeHandler(e, i)} id={e.categoryName} class="fas fa-edit categoryDelete"></i> */}

                <i onClick={() => deleteShoes(item._id)} class="fas fa-trash categoryDelete"></i>
              {/* <button onClick={() => deleteShoes(item._id)}>delete</button> */}

            </div>

            
          </div>
        ))}

    <button onClick={setMod}>ADD</button>
    </div>
        :
        <div className="shoes-add">
            <form >
                        <label>
                            New Name <br />
                            <input onChange={handleChange} type="text" name="newName" />
                        </label>

                        <label>
                            New Collection Name <br />
                            <input onChange={handleChange} type="text" name="newColName" />
                        </label>

                        <label>
                            New Shoe Description <br />
                            <input onChange={handleChange} type="text" name="newDesc" />

                        </label>

                        <label>
                            Shoe Colors <br />
                            <input onChange={handleChange} type="text" name="newColor" />

                        </label>

                        <label>
                            Price <br />
                            <input onChange={handleChange} type="number" name="newPrice" />

                        </label>

                        <label>
                            Quantity in Stock <br />
                            <input onChange={handleChange} type="number" name="newStock" />

                        </label>

                        {/* <label>
                            Image <br />
                            <input onChange={(e) => {
                                // setNewCatName(e.target.value.toUpperCase())
                            }} type="file" />
                        </label> */}

                        <div className='category-add modal-add-btn'>
                            <button  onClick={(e) => addCategory(e)}>ADD</button>
                        </div>

                    </form>

        </div>
    }
    </>
  );
}

export default Shoes;
