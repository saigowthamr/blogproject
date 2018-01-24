<template>
  <div class='blog container'>
    <h2>{{title}}</h2> 
 <input type="text" v-model="search"  class="pull-right search" placeholder="Search title.."/>
       

    <!-- Trigger the modal add post with a button -->
    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#addNewPost">New Post</button>
    <!-- Add Post -->
    <div id="addNewPost" class="modal fade" role="dialog">
      <div class="modal-dialog">
        <!-- Add Post Content-->
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Add New Post</h4>
          </div>
          <div class="modal-body">
              <div class="form-group">
                <label for="title">Title:</label>
                <input type="title" class="form-control" id="title" v-model="newPost.title">
              </div>
              <div class="form-group">
                <label for="body">Content:</label>
                <textarea class="form-control" rows="5" id="body" v-model="newPost.body"></textarea>
              </div>
              <div class="form-group">
                <label for="upload">Upload Image</label>
              <input @change="uploadImage" type="file" name="cimage" accept="image/*">
              </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal" 
            :disabled="newPost.body <=0 && newPost.title <=0"
            @click="AddPost()">Add</button>
          </div>
        </div>

      </div>
    </div>


    <hr>
    <div class="row" >
    <div class="col-sm-6 col-md-4" v-for="post in filteredList" style="height: 400px;">
      <div class="thumbnail">
        <img :src="getimage(post.cimage)" class="imgs">
        <div class="caption">
          <h3>{{post.title | uppercase}}</h3>
          <p>{{truncate(post.content,150)}}</p>
          <p>
           
           <router-link :to="{name: 'Display', params: { id: post._id }}" class="btn btn-primary">Raad More</router-link>
          <a href="#" class="btn btn-danger " role="button" v-on:click="deletePost(post._id)">Delete</a></p>
        </div>
      </div>
    </div>
   
  </div>
  </div>
</template>

<script>
export default {
  name: 'Myblogproject',
  data () {
    return {
      title: 'Blog Project',
      newPost: {},
      search:'',
      posts: [],
      imageData:'',
     
    }
  },
  computed:{
     filteredList() {
      return this.posts.filter(post => {
        return post.title.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },
  methods: {
    deletePost: function (post) {
      console.log(post)

      if(confirm('Are you sure')){
       this.$http.delete('https://murmuring-sands-13877.herokuapp.com/delete/'+post).then((data)=>{
        this.findPosts()
       
      }).catch(err=>{
        
      })
      }
        
      
    },
   uploadImage: function(e) {
      var files = e.target.files;
      if(!files[0]) {
        return;
      }else{
           this.imageData=files[0]
      }
   },
    AddPost: function () {
         

       var data = new FormData()
       
     data.append('title',this.newPost.title);
     data.append('content',this.newPost.body)
     data.append('cimage',this.imageData)
    

       this.$http.post('https://murmuring-sands-13877.herokuapp.com/s',data).then((res)=>{
         //console.log(res)
         this.findPosts()
       }).catch(err=>{

         console.log(err)
       })
      this.newPost = {}
    },
    getimage (con) {
    var s = con.slice(7)
    return "https://murmuring-sands-13877.herokuapp.com"+s
    },
      truncate:function(str,len){
          if(str.length > len  && str.length>0){
              var new_str =str+"";
              new_str=str.substr(0,len);
              new_str=str.substr(0,new_str.lastIndexOf(""));
              new_str=(new_str.length>0)?new_str:str.substr(0,len);
              return new_str+"...";
          }
            return str;
      },

    findPosts:function () {
    this.$http.get('https://murmuring-sands-13877.herokuapp.com').then(function (response) {
    
      this.posts = response.data
    })
  },
  
  },
  created(){
      this.findPosts()
  }
}
</script>


<style scoped>
.imgs{
  width:350px !important;
  height: 200px !important;
}
  
.search{
  outline-color: aquamarine;
  padding: .4rem;


}
</style>
