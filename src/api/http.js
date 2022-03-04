import axios from 'axios';
var url = 'http://localhost:3001';
export  const api={
    searchUrl(params){
       return axios.post(url+'/puppeteer', params,{
        responseType: 'arraybuffer',
        headers: {
          'Accept': 'application/pdf'
        }
      });
    }
}