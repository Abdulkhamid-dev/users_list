import React, { useState, useEffect } from 'react';

const Userlist = () => {
const [items, setItems] = useState([])
const [isLoaded, setIsLoaded] = useState(true)
const [error, setError] = useState(null)
const [eachItem, setEachItem] = useState([])

useEffect(() => {
    getData(1)
    setIsLoaded(false)
}, [])

const getData = async (num) => {
    const url = await fetch(`https://reqres.in/api/users?page=${num}`)
    const res = await url.json()
    setItems(res.data)
    console.log(res.data);
}
const getEachData = async (num) => {
    const url = await fetch(`https://reqres.in/api/users/${num}`)
    const res = await url.json()
    const item = res.data
    setEachItem(item)
    console.log(item);
    console.log(eachItem);

}

const itemJsx = (
  <form >
  <div className="mb-3">
    <label htmlFor="first_name" className="form-label">First Name</label>
    <input type="email" className="form-control" id="first_name" aria-describedby="emailHelp" value={eachItem.first_name}/>
  </div>
  <div className="mb-3">
    <label htmlFor="last_name" className="form-label">Last Name</label>
    <input type="email" className="form-control" id="last_name" aria-describedby="emailHelp" value={eachItem.last_name}/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={eachItem.email}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="avatar" className="form-label">Image Link</label>
    <input type="email" className="form-control" id="avatar" aria-describedby="emailHelp" value={eachItem.avatar}/>
  </div>
</form>
)

const btnJsx = (
  <button type="button" className="btn btn-primary" onClick={() => deletEach(eachItem.id)}  data-bs-dismiss="modal">Delete</button>
)

const deletEach = (id) => {
  if (window.confirm('Are you sure')) {
     const updateState = items.filter(item => item.id !== id)
     setItems(updateState)
  } else {
    console.log('err');
  }
}


if (isLoaded) <div><h1>Loading...</h1></div>
return (
  <div>
      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">Modal title</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
          {itemJsx}
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          {btnJsx}
        </div>
      </div>
    </div>
  </div>
       <div className='row row-cols-2 row-cols-lg-5 g-2 g-lg-3'>
{
    items.map(item => (
        <div className="card col" key={item.id} style={{width: "18rem"}}>
  <img src={item.avatar} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{item.first_name}</h5>
    <p className="card-text">{item.last_name} {item.email}</p>
    <a href="#!"type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => getEachData(item.id)}>Go somewhere</a>
  </div>
</div>
    ))
}
</div>
<nav aria-label="..." className='d-flex align-items-center justify-content-center'>
<ul className="pagination pagination-lg">
  <li className="page-item " aria-current="page">
    <span className="page-link" onClick={() => getData(1)}>Previous</span>
  </li>
  <li className="page-item"><a className="page-link" onClick={() => getData(2)}>Next</a></li>
</ul>
</nav>
  </div>
)

}

export default Userlist;


