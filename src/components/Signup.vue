<template>

   <div class="signup">
        
       <h1> I am Signup</h1>
       <label for="email" class="lab">Email</label>
           <input type="email" v-model="email" id="email" required class="inpt">
           <label for="pass" class="lab">Password</label>
           <input type="password" v-model="password" id="pass" required class="inpt">
           <button @click="signUp" class="btn">Signup</button>
       <router-link to="/login">Already have an account</router-link>
        
   </div>
  
</template>


<script>
import firebase from 'firebase';
export default {
  data(){
      return{
          email:'',
          password:''
      }
  },
  methods:{
      signUp(){
         
       firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        .then(resolve=>{
              console.log(resolve)
               alert('youre signup in')
          }).catch(error=>{
              console.log(error.message)
          })
          this.$router.push('/login')
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
    border: 1px solid rgb(7, 3, 3);
   width: 50%;
   box-shadow: 0 1rem 3rem rgba(0,0,0,0.5);
}
.inpt:invalid{
    border: 1px solid rgb(236, 7, 7);
     
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
  .slide-enter{
      opacity: 0;
  }
  .slide-enter-active{
     animation: slide-in 1s ease-out forwards;
    transition: opacity .5s ;
     
  }
  .slide-leave{

  }
  .slide-leave-active{
  animation: slide-out 1s ease-out forwards;
  transition: opacity  1s;
  opacity: 0;
  position: absolute;
  }
  .slide-move{
    transition: transform 1s;
  }
 @keyframes slide-in{
    from{
      transform: translateY(20px);
    }
    to{
      transform: translateY(0);
    }
  }

  @keyframes slide-out{
   
    from{
      transform: translateY(0);
    }
  to{
      transform: translateY(20px);
    }

  }

  .btn:hover{
    color: rgb(19, 2, 2);
    background-color: rgb(58, 230, 95);
}
.slide-fade-enter-active {
  transition: all .3s ease-in;
}
.slide-fade-leave-active {
  transition: all .8s  ease-in-out;
}
.slide-fade-enter, .slide-fade-leave-to
 {
  transform: translateX(10px);
  opacity: 0;
}
</style>
