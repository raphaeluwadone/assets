import LocalStorage from "./localStorage"

const addTokenInterceptor = (config) =>{
    const storage = new LocalStorage()
    const token = storage.getValue("token");
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
}

const rejectErrorInterceptor = error => Promise.reject(error);

export { addTokenInterceptor, rejectErrorInterceptor }

