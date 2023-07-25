import { useNavigate } from "react-router-dom";
import React, {useState} from 'react';


function FirstPage(){

    const navigate = useNavigate();

    const [formdata, setFormdata] = useState({
        name: '',
        phoneNumber : '',
        email : '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormdata({...formdata, [e.target.name] : e.target.value});
    };

    const handleSubmit = () => {
        if(isDataValid()){
            localStorage.setItem('userDetails', JSON.stringify(formdata));
            navigate('/second-page');
        }
        else{
            alert('Please, Enter your details to proceed!!');
        }   
    }

    const isDataValid = () => {
        return formdata.name.trim() !== '' && formdata.phoneNumber.trim() !== '' && formdata.email.trim() !== '';
    }

    return(
        <>
            <form>
                <div>
                    <label>Name : </label>
                    <input type="text" name="name" value={formdata.name} onChange={handleChange}/>
                </div>

                <div>
                    <label>Phone Number : </label>
                    <input type="number" name="phoneNumber" value={formdata.phoneNumber} onChange={handleChange}/>
                </div>

                <div>
                    <label>Email : </label>
                    <input type="email" name="email" value={formdata.email} onChange={handleChange}/>
                </div>

                <button type="button" onClick={handleSubmit}>Submit</button>
            </form>
        </>
    );
}


export default FirstPage;