import React,{useEffect, useState,Fragment} from 'react'
import axios from 'axios';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import BreadCrumb from '../../UI/BreadCrumb';

function Discount() {
    const access = localStorage.getItem("lemlemaccess");
    const refresh = localStorage.getItem("lemlemrefresh");

    const [discount,setDiscount]=useState([])
    const [modal,setModal]=useState(false)
    const [toggle, setToggle] = useState(true);
    const [newDiscount,setNewDiscount]=useState({
        discountName:"",
        discount:"",
        startDate:"",
        endDate:""
    })



    const handleChange = (e) => {
        const value = e.target.value;
        console.log(value);
    
        setNewDiscount({
          ...newDiscount,
          [e.target.name]: value,
        });
        console.log(newDiscount);
      };
    


    const fetchApi = () => {
        return fetch("https://lit-lowlands-45367.herokuapp.com/shoes/discounts", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                'danilov-access': "Bearer " + access,
                'danilov-refresh': "Bearer " + refresh,
            },
        }, { withCredentials: true })
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
            setDiscount(data.data);
            console.log(data)
         
        });
    }, []);

    const addDiscount = async e => {
        e.preventDefault();
        try {
            const response = await axios
                .post('https://lit-lowlands-45367.herokuapp.com/admin/shoes/discount', 
                     newDiscount,
 {
                    headers: {
                        "Content-Type": "application/json",
                        'danilov-access': "Bearer " + access,
                        'danilov-refresh': "Bearer " + refresh,
                    }
                });
            alert("Successfully Added")
            setModal(false)
            {console.log(newDiscount)}


            fetchApi().then((data) => {
                setDiscount(data.data);
                // console.log(data)
            });

        } catch (e) {
            console.log(e)
            alert("Something went wrong")
        }
    }

    const myChangeHandler=()=>{

    }

     const deleteCategory = async e => {

        const id = e;
        console.log(id)

        try {
            const response = await axios.delete(`https://lit-lowlands-45367.herokuapp.com/admin/shoes/discounts/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    'danilov-access': "Bearer " + access,
                    'danilov-refresh': "Bearer " + refresh,
                },
                
            }, {data: {
                id:id
            }},{ withCredentials: true });
            
            {console.log(id)}
            alert("Successfully Removed")

            fetchApi().then((data) => {
                setDiscount(data.data);
                // console.log(data)
            });

        } catch (e) {
            console.log(e)
            alert("Something went wrong")
        }

    }

    
  return (
    <div>
         <Header/>
            <Sidebar/>
            <BreadCrumb pageName={"collection"} />

          {modal
                ?
                <div className='categoryModal'>
                    <div className="modal-close-btn" onClick={() => {
                        setModal(false)
                    }}>X</div>
                    <form>
                        <label>
                            Discount Name <br />
                            <input onChange={handleChange} name="discountName" type="text"  />
                        </label>
                        
                        <label>
                            New Category Value<br />
                            <input onChange={handleChange} type="text" name="discount" />
                        </label>

                        <label>
                            Start Date <br />
                            <input onChange={handleChange} type="date" name="startDate" />
                        </label>

                        <label>
                            New Category Name <br />
                            <input onChange={handleChange} type="date"  name="endDate"/>
                        </label>

                        <div className='category-add modal-add-btn'>
                            <button onClick={(e) => addDiscount(e)}>ADD</button>
                        </div>
                    </form>
                </div>
                :
                <div className="category">
                    <div className="category-container">
                        <form>
                            {discount && discount.map((e) => {
                            {console.log(discount)}
                            {console.log(e._id)}


                                return (
                                  
                                    <Fragment>
                                         
                                        <label>
                                            Discount Name <br />
                                            <input  className={toggle ? "notAllowed" : 'pointer'} onChange={(e) => setNewDiscount(e.target.value.toUpperCase())}  type="text"  defaultValue={e.discountName}/>
                                            <i onClick={(i) => myChangeHandler(e, i)} id={e.roleName} class="fas fa-edit categoryDelete"></i>

                                            <i onClick={() => deleteCategory(e._id)} class="fas fa-trash categoryDelete"></i>
                                        </label> <br />
                                    </Fragment>
                                )
                            })}

                            <div className='category-add'>
                                <button onClick={() => {
                                    if (modal) {
                                        setModal(false)
                                    } else {
                                        setModal(true)
                                    }
                                }}>ADD</button>
                            </div>
                        </form>
                    </div>
                </div>}
       
    </div>
  )
}

export default Discount