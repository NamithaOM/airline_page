import React, { useState } from "react"; 
function AddPassenger(){
const[passName,setPassName]= useState('')
const[adhaar,setAdhaar]=useState('')
const[passport,setPassport]=useState('')
const[gender,setGender]=useState('')
const[age,setAge]=useState('')

const passengerData=(e)=>{
    e.preventDefault()
}

    return(
        <>
        <div>
            <h3>passenger Details</h3>
        <form onSubmit={passengerData} method="post">
                    Name of passenger <input type="text" name="passName" className="form-control" onChange={(e) => setPassName(e.target.value)}></input>
                    Aadhar No < input type="text" name="aadhar" className="form-control" onChange={(e) => setAdhaar(e.target.value)} />
                    Passport <input type="text" name="passport" className="form-control" onChange={(e) => setPassport(e.target.value)} />
                    Gender:
                    <label>
                        Male
                        <input type="radio" name="gender" value="male" checked={gender === 'male'} onChange={(e) => setGender(e.target.value)} />
                    </label>
                    <label>
                        Female
                        <input type="radio" name="gender" value="female" checked={gender === 'female'} onChange={(e) => setGender(e.target.value)} />
                    </label> <br></br>           
                      Section <input type="" name="age" className="form-control" onChange={(e) => setAge(e.target.value)} />

                    <button>Submit</button>

                </form>
            
            </div></>
    )

}
export default AddPassenger