import React ,{useEffect,useState, Fragment}from 'react'
import axios from 'axios';


function Role() {
    const [role,setRole]=useState([])
    const [roleId,setRoleId]=useState()
    const [modal, setModal] = useState(false)
    const [toggle, setToggle] = useState(true);
    const[newRole,setNewRole]=useState()

    const access = localStorage.getItem("lemlemaccess");
    const refresh = localStorage.getItem("lemlemrefresh");
    const fetchApi = () => {
        return fetch("https://lit-lowlands-45367.herokuapp.com/admin/roles", {
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
            setRole(data.data);
            // console.log(data)
            // setIsLoading(false)
        });
    }, []);

    const handleChange = (e) => {
        const value = e.target.value;
        setNewRole(value);
        console.log(newRole)
      };

    const addRole = async e => {
        e.preventDefault();
        try {
            const response = await axios
                .post('https://lit-lowlands-45367.herokuapp.com/admin/roles/createRole', {
                    roleName: newRole,
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
                setRole(data.role);
                // console.log(data)

            });

        } catch (e) {
            alert("Something went wrong")
        }
    }

    const myChangeHandler = (e, i) => {
        // setNewRole(e.newRole);
        // setRoleId(e._id)
        // // setCategoryId(e._id)
        // if (i.target.className === 'fas fa-check categoryDelete') {
        //     i.target.parentNode.children[1].readOnly = true
        //     i.target.parentNode.children[1].className = 'notAllowed'
        //     i.target.className = 'fas fa-edit categoryDelete'

        //     // setToggle(true)
        //     try {
        //         axios.patch(`hhttps://lit-lowlands-45367.herokuapp.com/admin/role/${id}`, {
        //             roleName: newRole,
        //             id: roleId
        //         },  {
        //             headers: {
        //                 "Content-Type": "application/json",
        //                 'danilov-access': "Bearer " + access,
        //                 'danilov-refresh': "Bearer " + refresh,
        //             }
        //         });
        //         alert("Successfully Edited")
    
        //         fetchApi().then((data) => {
        //             // setData(data);
        //             console.log(data)
        //         });
    
        //     } catch (e) {
        //         alert("Something went wrong")
        //     }
        // } else {
        //     i.target.parentNode.children[1].readOnly = false
        //     i.target.parentNode.children[1].className = 'pointer'
        //     i.target.className = 'fas fa-check categoryDelete'
        // }
    }

  return (
    <div>
          {modal
                ?
                <div className='categoryModal'>
                    <div className="modal-close-btn" onClick={() => {
                        setModal(false)
                    }}>X</div>
                    <form>
                        <label>
                            New Category Name <br />
                            <input onChange={(e) => {
                                setNewRole(e.target.value.toUpperCase())
                            }} type="text" />
                        </label>

                        <div className='category-add modal-add-btn'>
                            <button onClick={(e) => addRole(e)}>ADD</button>
                        </div>
                    </form>
                </div>
                :
                <div className="category">
                    <div className="category-container">
                        <form>
                            {role && role.map((e) => {
                            {console.log(role)}

                                return (
                                    <Fragment>
                                        <label>
                                            Role Name <br />
                                            <input  className={toggle ? "notAllowed" : 'pointer'} onChange={(e) => setNewRole(e.target.value.toUpperCase())}  type="text"  defaultValue={e.role} />
                                            <i onClick={(i) => myChangeHandler(e, i)} id={e.roleName} class="fas fa-edit categoryDelete"></i>

                                            {/* <i onClick={() => deleteCategory(e._id)} class="fas fa-trash categoryDelete"></i> */}
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

export default Role