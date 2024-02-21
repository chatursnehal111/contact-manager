import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ContactServices } from '../../Services/ContactServices'
import Spinner from '../../Spinner/Spinner'
import { click } from '@testing-library/user-event/dist/click'

const ContactList = () => {

  let[query,setQuery] = useState({
    text:'',
  })

  // let [contactId]=useParams()
  let [state,setState]=useState({
    loading:false,
    contacts:[],
    filteredContacts:[],
    errorMessage:''

  })

  useEffect(()=>{
    let prom1 = new Promise((res1,rej1)=>{
      setState({...state,loading:true,contacts:[]})
      let response=ContactServices.getAllContacts()
      res1(response)
      // rej1()
    })
    prom1.then((resp1)=>{
      setState({...state,loading:false,contacts:resp1.data,filteredContacts:resp1.data})
      console.log(resp1)

    }).catch((error)=>{
      setState({...state,loading:false,errorMessage:error.message})
      alert("data is not found !") 
    })
    
  },[])

  let clickDelete=(contactId)=>{
     let promise1=new Promise((res1,rej)=>{
      let deleteContact=ContactServices.deleteContact(contactId)
      res1(deleteContact)
     })
     promise1.then((resp1)=>{
      if (resp1) {
        let prom1= new Promise((res1, rej1) => {
          setState({...state,loading:true,contacts:[]})

          let response=ContactServices.getAllContacts();
          res1(response)
          // rej1("error")
        })
        prom1.then((resp1)=>{
          setState({...state,loading:false,contacts:resp1.data,filteredContacts:resp1.data})
          console.log(resp1)
    
        }).catch((error)=>{
          setState({...state,loading:false,errorMessage:error.message})
          alert("data is not found !") 
        })   
      }
     })
  }

  //  search contacts
  let searchContacts=(event)=>{
   setQuery({...query,text:event.target.value});
   let theContacts = state.contacts.filter(contact =>{
    return contact.name.toLowerCase().includes(event.target.value.toLowerCase())
   });
  //  console.log(theContacts)
   setState({...state,filteredContacts:theContacts})
  };

   let {loading,contacts,filteredContacts,errorMessage}=state

  return (
    <div>
      {/* <pre>{query.text}</pre> */}
      {/* <pre>{JSON.stringify(contacts)}</pre>  */}
      {/* <h1>ContactList (Home Page)</h1> */}
      <section className='contact-search p-3'>
        <div className="container">
          <div className="grid">
            <div className="row">
              <div className="col">
                 <p className='h3'>Contact Manager <Link className='btn btn-primary ms-2' to={'/contacts/add'}> <i className='fa fa-plus-circle me-2'></i>Add</Link></p>
                 <p className='fst-italic'> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo, et. Quisquam placeat voluptas dolorum obcaecati ipsum natus autem ea nam. Mollitia enim voluptatem saepe molestiae minus possimus, repellat voluptatum eum!
                 </p>
              </div>
            </div>
          
        {/* row2 */}
        <div className="row">
          <div className="col-md-6">
            <form action="" className='row'>
              <div className="col-md-8">
                <div className="mb-2">
                  <input name='text' value={query.text} type="text" className='form-control'  onChange={searchContacts} placeholder='Search Name' />
                </div>
              </div>
              <div className="col">
                <div className="mb-2">
                  <input type="submit" className='btn btn-outline-dark' value={"Search"} />
                </div>
              </div>
            </form>
          </div>

          </div>
        </div>
        </div>
      </section>
          {/* Section-2 */}
          {
            loading ? <Spinner/>:
            <React.Fragment>
              <section className='contact-list'>
              <div className="container">
              <div className="row">
            {
              filteredContacts.length>0 &&
              filteredContacts.map((contact)=>{
                return(
                  <React.Fragment>
              <div className="col-md-6 my-3">
              <div className="card">
                <div className="card-body">
                  <div className="row align-items-center">
                    <div className="col-md-4">
                     <img src={contact.photo} alt="" className='contact-img' />
                    </div>
                    <div className="col-md-7">
                        <ul className=' list-group'>
                          <li className='list-group-item list-group-item-action'>
                            Name : <span className='fw-bold'>{contact.name}</span>
                          </li>
                          <li className='list-group-item list-group-item-action'>
                            Contact : <span className='fw-bold'>{contact.contact}</span>
                          </li>
                          <li className='list-group-item list-group-item-action'>
                            Email : <span className='fw-bold'> {contact.email}</span>
                          </li>
                        </ul>
                    </div>
                    <div className="col-md-1 d-flex flex-column align-items-center">
                          <Link to={`/contacts/view/${contact.id}`} className='btn btn-warning my-1'> <i className='fa fa-eye'/></Link> 
                          <Link to={`/contacts/edit/:contactID`} className='btn btn-primary my-1'><i className='fa fa-pen'/></Link>
                          <button className='btn btn-danger' onClick={()=>{clickDelete(contact.id)}}> <i className='fa fa-trash my-1'/> </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

             </React.Fragment>
                )
              })
            }
          
          </div>
          </div>
      </section>
      </React.Fragment>
          }
          
    </div>
  )
}

export default ContactList
