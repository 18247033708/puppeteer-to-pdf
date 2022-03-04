<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div class="df">
        <input type="text" v-model="html_http" class="input" placeholder="请输入要转成pdf的网址">
        <button  class="btn" @click="btnClick">生成pdf</button>
    </div>
  
  </div>
</template>

<script>
// import axios from 'axios'
import {api} from "../api/http";
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
        html_http:'https://www.mklab.cn/todo#/all'
    }
  },
  mounted() {
    
  },
  methods: {
    btnClick() {
      if(this.html_http=='')return false;
      var params ={
        url:this.html_http
      }
       api.searchUrl(params).then(res=>{
            console.log('res',res)
             const blob = new Blob([res.data], { type: 'application/pdf'})
            const link = document.createElement('a')
            link.href = window.URL.createObjectURL(blob)
            link.download = 'test.pdf'
            link.click()
        }).catch(err=>{
            console.log('err',err)

        })
        
    },

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.df{
  display: flex;
  justify-content: center;
}
.input{
      width: 70%;
    height: 50px;
    border-radius: 50px;
    border: 1px solid #999;
        padding: 5px 30px;
    font-size: 18px;
}

.btn{
      position: relative;
    display: inline-block;
    box-sizing: border-box;
    color: #fff;
    background: #1989fa;
    border: #1989fa;
    width: 100px;
    height: 60px;
    border-radius: 50px;
    margin-left: 10px;
    font-size: 16px;
}
</style>
