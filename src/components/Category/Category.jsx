import React, { Fragment, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'


import axios from 'axios'
import '../Category/Category.css'
import Sidebar from '../Sidebar/Sidebar'
import Header from '../Header/Header'
import BreadCrumb from "../../UI/BreadCrumb"


const Category = () => {
    const access = localStorage.getItem("lemlemaccess");
    const refresh = localStorage.getItem("lemlemrefresh");

    const [modal, setModal] = useState(false)
    const [toggle, setToggle] = useState(true);
    const [categoryId, setCategoryId] = useState();
    const [catName, setCatName] = useState();
    const [newCatName, setNewCatName] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        if (!access && access == null) {
            navigate("/login")
        }
    }, [access]);

    const [category, setCategory] = useState([])

    const fetchApi = () => {
        return fetch("https://lit-lowlands-45367.herokuapp.com/admin/shoes/categories", {
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
            setCategory(data.data);
            // setIsLoading(false)
        });
    }, []);

    const deleteCategory = async e => {

        const id = e;
        console.log(id)

        try {
            const response = await axios.delete(`https://lit-lowlands-45367.herokuapp.com/admin/shoes/category/${id}`, {
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
                setCategory(data.data);
                // console.log(data)
            });

        } catch (e) {
            console.log(e)
            alert("Something went wrong")
        }

    }
    const handleChange = (e) => {
        const value = e.target.value;
        setNewCatName(value);
        console.log(newCatName)
      };
    const addCategory = async e => {
        e.preventDefault();
        try {
            const response = await axios
                .post('https://lit-lowlands-45367.herokuapp.com/admin/shoes/category', {
                    categoryName: newCatName,
                }, {
                    headers: {
                        "Content-Type": "application/json",
                        'danilov-access': "Bearer " + access,
                        'danilov-refresh': "Bearer " + refresh,
                    }
                });
            alert("Successfully Added")
            setModal(false)

            fetchApi().then((data) => {
                setCategory(data.data);

            });

        } catch (e) {
            alert("Something went wrong")
        }
    }

    console.log(category)


    // const myChangeHandler = (e, i) => {
    //     setCatName(e.categoryName);
    //     setCategoryId(e._id)
    //     if (i.target.className === 'fas fa-check categoryDelete') {
    //         i.target.parentNode.children[1].readOnly = true
    //         i.target.parentNode.children[1].className = 'notAllowed'
    //         i.target.className = 'fas fa-edit categoryDelete'

    //         setToggle(true)
    //         try {
    //             axios.patch(`https://api.leylajabbarli.com/api/admin/category/update`, {
    //                 categoryName: catName,
    //                 id: categoryId
    //             }, {
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                     'danilov-access': "Bearer " + access,
    //                     'danilov-refresh': "Bearer " + refresh,
    //                 }
    //             });
    //             alert("Successfully Edited")
    
    //             fetchApi().then((data) => {
    //                 setData(data.result);
    //             });
    
    //         } catch (e) {
    //             alert("Something went wrong")
    //         }
    //     } else {
    //         i.target.parentNode.children[1].readOnly = false
    //         i.target.parentNode.children[1].className = 'pointer'
    //         i.target.className = 'fas fa-check categoryDelete'
    //     }
    // }

    return (
        <Fragment>
            <Sidebar />
            <Header />
            <BreadCrumb pageName={"Category"} />

       
            {modal
                ?
                <div className='categoryModal'>
                    <div className="modal-close-btn" onClick={() => {
                        setModal(false)
                    }}>X</div>
                    <form>
                        <label>
                            New Category Name <br />
                            <input onChange={handleChange} type="text" />
                        </label>

                        <div className='category-add modal-add-btn'>
                            <button onClick={(e) => addCategory(e)}>ADD</button>
                        </div>
                    </form>
                </div>
                :
                <div className="category">
                    <div className="category-container">
                        <form>
                            {category && category.map((e) => {
                            {console.log(category)}

                                return (
                                    <Fragment>
                                        <label>
                                            Category Name <br />
                                            <input className={toggle ? "notAllowed" : 'pointer'} onChange={(e) => setCatName(e.target.value.toUpperCase())} type="text" readOnly={toggle} defaultValue={e.categoryName} />
                                            {/* <i onClick={(i) => myChangeHandler(e, i)} id={e.categoryName} class="fas fa-edit categoryDelete"></i> */}

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
        </Fragment>
    )
}

export default Category