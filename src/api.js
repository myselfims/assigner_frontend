import axios from "axios";


export const baseUrl = 'https://assignerbackend-production.up.railway.app/'

export const url = "https://assignerbackend-production.up.railway.app/api";


export const getAuthInfo = ()=> {
  try{
    if(JSON.parse( localStorage.getItem('auth_info'))!=null){
      return JSON.parse( localStorage.getItem('auth_info'))
    }else{
      return false
    }
  }catch{
    return false
  }
}



export const fetchData = async (endpoint) => {
  let config = { headers: {"Authorization" : getAuthInfo().token} }
  let request = await axios.get(url + endpoint, config);
  return request
};

let data = {
  name : 'imran'
}

const submit = async (endpoint,data)=>{
  let res = await axios.post(endpoint,data)
  console.log(res)
}

export const postData = async (endpoint, data) => {

    let request = await axios.post(url + endpoint, data,{
      headers: {
        "Authorization": getAuthInfo().token,
      },
    });
    return request;

};

export const updateData = async (endpoint, data) => {

    let request = await axios.patch(url + endpoint, data,{
      headers: {
        "Authorization": getAuthInfo().token,
      },
    });
    console.log('updating..')
    return request;

};

export const deleteData = async (endpoint) => {

    let request = await axios.delete(url + endpoint,{
      headers: {
        "Authorization": getAuthInfo().token,
      },
    });
    return request;

};
