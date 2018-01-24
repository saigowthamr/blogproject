<template>

   <div class="signup">
       <h1> I am Login</h1>
       <label for="email" class="lab">Email</label>
        <label for="">{{error}}</label>
           <input type="email" v-model.trim="email" id="email" required class="inpt">
           <label for="pass" class="lab">Password</label>
           <input type="password" v-model.trim="password" id="pass" required class="inpt">
             <button class="btn" @keyup.enter="logIn" @click="logIn">Login</button>
       <router-link to="/signup">Not a account</router-link>
       
   </div>

</template>


<script>
import firebase from 'firebase';
export default {
  data(){
      return{
          email:'',
          password:'',
          error:''
      }
  },
  methods:{
      logIn(){
         
   firebase.auth().signInWithEmailAndPassword(this.email, this.password)
  .then(
              (resolve)=>{
                  console.log(resolve)
                  this.$router.push('/')
              }).

catch((error)=>{
    this.error = error.message;
console.log(error.message)

})
}



  }
}
</script>


<style scoped>

.signup{
    margin-top: 2rem ;
    padding: 2rem 4rem;
   
    display: flex;
    flex-direction: column;
    align-items: center;
     
}

.inpt{
   padding: 1rem 2rem;
    margin-bottom: 1rem;
    outline: none;
    border: 1px solid red;
   width: 50%;
   box-shadow: 0 1rem 3rem rgba(0,0,0,0.5);
}

.inpt:invalid{
    border: 1px solid rgb(228, 9, 9);
     
}
.inpt:valid{
    border: 1px solid rgb(4, 204, 104);
    
}

.lab{
    margin-top: 1rem;
    margin-bottom: 1rem;
   font-size: 1.5rem;
}

.btn{
    padding: 1rem 2rem;
    margin-bottom: 1rem;

}
.btn:hover{
    color: rgb(27, 27, 27);
    background-color: rgb(230, 230, 58);
}




</style>
