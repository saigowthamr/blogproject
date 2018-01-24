 <template>
   
     <div >
   <nav class="navbar navbar-default">
    <div class="container-fluid">
    <div class="navbar-header">
      <a class="navbar-brand" href="#">Blog App</a>
    </div>
    <ul class="nav navbar-nav">
      <li><router-link to="/">Blog</router-link></li>
      <li><router-link to="/hello">Hello</router-link></li>
    </ul>
   
    <!-- <span class="text-center">{{user}}</span> -->
    <button class="btn btn-primary pull-right mlo" @click="signout" v-if="user">Logout</button>
    </div>
   </nav>
    
    <router-view></router-view>
   
  </div>
 </template>
 



 <script>
 import firebase from 'firebase';
 export default {
   data(){
     return{
          user:false,
      
     }
   },
   computed:
  {
    filteredCustomers:function()
    {
        var self=this;
        return this.customers.filter(function(cust){return cust.name.toLowerCase().indexOf(self.search.toLowerCase())>=0;});
    },
    
    
},
   methods:{
      signout(){
  firebase.auth().signOut().then(()=>{
      this.$router.push('/login')
  })
      },
 stateChanged(){
        firebase.auth().onAuthStateChanged(user=>{
          if(user){
             this.user=true
          }else{
            this.user=false
          }
        })
      }
      
   },
   created(){
     this.stateChanged()
   },
     beforeUpdate:function(){
     this.stateChanged()
    },

 }
 </script>
 
 
 <style scoped>
 
    .mlo{
      margin-top: 10px !important;
    }


 </style>
 