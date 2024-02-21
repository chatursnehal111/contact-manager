import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ContactServices } from '../../Services/ContactServices'

const AddContact = () => {
  let navigate=useNavigate()

  let [state,setState]=useState({
    loading:false,
    contact:{
      name:"",
      photo:"",
      contact:'',
      email:"",
      title:"",
      company:'',
      groupId:''

    },
    groups:[],
    errorMessage:''
  })

  useEffect(()=>{
    let prom=new Promise((res,rej)=>{
      setState({...state,loading:true})
      let groupResponse=ContactServices.getGroups()
      res(groupResponse)
    })
    prom.then((resp1)=>{
      setState({...state,loading:false,groups:resp1.data})
      console.log(resp1.data)
    }).catch((error)=>{
      setState({...state,loading:false,errorMessage:error})
      alert("data is not found !")
    })

  },[])

  let updateInput=(event)=>{
    setState({
      ...state,contact:{
        ...state.contact,
        [event.target.name]:event.target.value 
      }
    })

  }
  let submitForm=(event)=>{
    event.preventDefault();
    let prom=new Promise((res, rej) => {
      let postContact = ContactServices.createContact(state.contact)
      res(postContact)
    })
    prom.then((resp1)=>{
        if (resp1) {
          setState({...state,contact:resp1.data})
          navigate('/contacts/list',{replace:true})
        }
        else{
           navigate('/contacts/add',{replace:false})
        }

    })
    
  }
  let{loading,contact,groups,errorMessage}=state
  return (
    <div>
      <pre>{JSON.stringify(contact)}</pre>
      {/* <h1>Add Page</h1> */}
      <section className='create-contact p-3'>
        <div className="container">
          <div className="row">
            <div className="col">
              <p className='h4 text-success fw-bold'>Create Contact </p>
              <p className="fst-italic">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla inventore fugiat nihil esse adipisci laudantium, eaque provident autem quam odit dicta, expedita dolore voluptatum mollitia dolor consequuntur similique dolorem nobis?</p>
            </div>
          </div>

          {/* Row-2 */}
          <div className="row">
            <div className="col-md-4">
              <form action="" onSubmit={submitForm}>
                <div className="mb-2">
                  <input type="text" className='form-control' name='name' value={contact.name} onChange={updateInput} required={true} placeholder='Name' />
                </div>
                <div className="mb-2">
                  <input type="text" className='form-control' name='photo' value={contact.photo} onChange={updateInput}  placeholder='Photo Url' />
                </div>
                <div className="mb-2">
                  <input type="number" className='form-control' name='contact' value={contact.contact} onChange={updateInput} required={true} placeholder='Mobile Number' />
                </div>
                <div className="mb-2">
                  <input type="email" className='form-control' name='email' value={contact.email} onChange={updateInput} required={true}  placeholder='Email' />
                </div>
                <div className="mb-2">
                  <input type="text" className='form-control' name='title' value={contact.title} onChange={updateInput} required={true} placeholder='Title' />
                </div>
                <div className="mb-2">
                  <input type="text" className='form-control' name='company' value={contact.company} onChange={updateInput} required={true} placeholder='Company' />
                </div>
                <div className="mb-2">
                  <select name="" id="" className='form-control'>
                    <option value="">Select A Group </option>
                    {
                      groups.length>0 && 
                      groups.map((group)=>{
                         return(
                          <option key={group.id} value={group.name}>{group.name}</option>
                         )
                      })
                    }
                  </select>
                </div>
                <div className="mb-2">
                  <input type="submit" className='btn btn-success' value={"Create"} />
                  <Link to={'/'} className='btn btn-dark ms-2'>Cancel</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AddContact
