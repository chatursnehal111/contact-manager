import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ContactServices } from '../../Services/ContactServices'
import Spinner from '../../Spinner/Spinner'

const ViewContact = () => {
  let {contactId}=useParams()
  let[state,setState]=useState(
    {
      loading:false,
      contact:{},
      errorMessage:''

    }
  )

  useEffect(()=>{
    setState({...state,loading:true})
    let prom= new Promise((res1,rej1)=>{
     let response=ContactServices.getContact(contactId)
     res1(response)
    })
    prom.then((res1)=>{
      setState({...state,loading:false,contact:res1.data})
      console.log(res1.data)

    }).catch((error)=>{
      setState({...state,loading:false,errorMessage:error.message}) 
      alert("data is not found ! !")
    })
  },[contactId])
  let {loading,contact,errorMessage}=state
  return (
    <div>
      {/* <h1>{contactId}</h1> */}
      {/* <h1>View Page</h1> */}
      
      <section className="view-contact-intro p-3">
        <div className="container">
         <div className="row">
          <div className="col">
            <p className='h4 fw-bold text-warning'> View Contact</p>
            <p className="fst-italic">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Inventore minus labore soluta consequatur consectetur modi rem harum totam maxime? Quaerat quasi nesciunt eveniet quibusdam ipsum ex temporibus facilis! Nihil, sunt?</p>
    
          </div>
         </div>
        </div>
      </section>

      {/* Section-2 */}
      {
        loading?<Spinner/>:<React.Fragment>
          {
            Object.keys(contact).length>0 &&
            <section className="vew-contact-data">
        <div className="container">
          {/* ROW-1 */}
          <div className="row ">
          <div className="col-md-12 d-flex justify-content-center">
                     <img src={contact.photo} alt="img not found" className='contact-img' />
                </div>
            </div>
                {/* Row-2 */}
          <div className="row my-2 d-flex justify-content-center ">
            <div className="col-md-6">
            <ul className=' list-group'>
                          <li className='list-group-item list-group-item-action'>
                            Name : <span className='fw-bold'>{contact.name}</span>
                          </li>
                          <li className='list-group-item list-group-item-action'>
                            Contact : <span className='fw-bold'>{contact.contact}</span>
                          </li>
                          <li className='list-group-item list-group-item-action'>
                            Email : <span className='fw-bold'>{contact.email}</span>
                          </li>
                          <li className='list-group-item list-group-item-action'>
                            Title : <span className='fw-bold'>{contact.title}</span>
                          </li>
                          <li className='list-group-item list-group-item-action'>
                            Company : <span className='fw-bold'>{contact.company}</span>
                          </li>
                          <li className='list-group-item list-group-item-action'>
                            Group : <span className='fw-bold'>{contact.group}</span>
                          </li>
            </ul>
            </div>
          </div>
          {/* Row-3 */}
          <div className="row">
            <div className="col-md-12 d-flex justify-content-center">
              <Link className="btn btn-warning" to={'/'}>Back</Link>
            </div>
          </div>
        </div>
      </section> 

          }
        </React.Fragment>
      }
      
    </div>
  )
}

export default ViewContact
