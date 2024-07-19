export const getToken = () =>{
  const data = localStorage.getItem('token');
  const token = JSON.parse(data);
  if(token){
    return token;
  } else{
    return null ;
  }
}