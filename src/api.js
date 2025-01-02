import axios from "axios";


export const baseUrl = 'https://assignerbackend-production.up.railway.app/'

// export const url = "https://assignerbackend-production.up.railway.app/api";
export const url = "http://localhost:3000/api";


export const getAuthInfo = ()=> {
  try{
    if(JSON.parse( localStorage.getItem('auth_info'))!=null){
      return JSON.parse(localStorage.getItem('auth_info'))
    }else{
      return false
    }
  }catch{
    return false
  }
}


export const fetchData = async (endpoint, params = {}) => {
  try {
    const authInfo = getAuthInfo();
    if (!authInfo || !authInfo.token) {
      throw new Error("Authentication token is missing");
    }

    const config = {
      headers: {
        "Authorization": `${authInfo.token}`,
      },
      params, // Pass query parameters here
    };

    const response = await axios.get(url + endpoint, config);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return null;
  }
};




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
