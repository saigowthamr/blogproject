<template>
   
<div class="container">

      <div class="row">

        <!-- Post Content Column -->
        <div class="col-lg-8 col-md-6 col-md-4 col-sm-4">

          <!-- Title -->
          <h1 class="mt-4">{{posts.title}}</h1>
          <hr>
          <!-- Date/Time -->
          <p>Posted on {{formatDate(posts.data ,"MMM Do YYYY")}}</p>
          <hr>
          <!-- Preview Image -->
          <img class="img-fluid rounded imgsingle3" :src="getimage(posts.cimage)" alt="image">
          <hr>
          <!-- Post Content -->
          <p class="lead">{{posts.content}}</p>
          <hr>
        </div>
      </div>
      
<div class="container">
	<div class="row">
		<h3>Post A comment</h3>
	</div>
    
    <div class="row">
    
        <div class="col-md-6">
                                <div class="widget-area no-padding blank">
            <div class="status-upload">
            <form>
        <textarea placeholder="How Would you Like?"  v-model="addComment"></textarea>
                                            
            <button type="submit" class="btn btn-success green"
            @click.prevent="postComment"
            ><i class="fa fa-share"></i> Share</button>
             </form>
            </div>
            </div>
        </div>
        
    </div>
</div>
         
     
      <div class="container mar3">

<div class="row">
<div class="col-sm-5" v-for="comment in comments" :key="comment._id">
<div class="panel panel-default">
<div class="panel-heading">
<strong>myusername</strong> <span class="text-muted">{{formatDate(comment.date ,"MMM Do YY")}}</span>
</div>
<div class="panel-body">
{{comment.comment}}
</div>
</div>
</div>
</div>


</div>



</div>
</template>


<script>
import moment from "moment";
export default {
  data() {
    return {
      posts: {},
      comments: [],
      addComment: ""
    };
  },
  methods: {
    findPost: function() {
      let url = "https://shrouded-bayou-36071.herokuapp.com/post/" + this.$route.params.id;
      this.$http.get(url).then(response => {
        //console.log(response.data)
        this.posts = response.data;
      });
    },
    getimage: con => {
      var s = con.slice(7);
      return "https://shrouded-bayou-36071.herokuapp.com/" + s;
    },

    formatDate: function(date, format) {
      return moment(date).format(format);
    },
    getComments() {
      this.$http
        .get("https://shrouded-bayou-36071.herokuapp.com/comments")
        .then(res => {
          this.comments = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    postComment() {
      var comments = {
        comment: this.addComment
      };
      this.$http
        .post("https://shrouded-bayou-36071.herokuapp.com/comments", comments)
        .then(res => {
          this.addComment = "";
          this.getComments();
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.findPost();
    this.getComments();
  }
};
</script>

<style scoped>
.imgsingle3 {
  width: 900px;
  height: 300px;
}
.mar3 {
  margin-top: 2rem;
}

widget-area {
  background-color: #fff;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  -ms-border-radius: 4px;
  -o-border-radius: 4px;
  border-radius: 4px;
  -webkit-box-shadow: 0 0 16px rgba(0, 0, 0, 0.05);
  -moz-box-shadow: 0 0 16px rgba(0, 0, 0, 0.05);
  -ms-box-shadow: 0 0 16px rgba(0, 0, 0, 0.05);
  -o-box-shadow: 0 0 16px rgba(0, 0, 0, 0.05);
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.05);
  float: left;
  margin-top: 30px;
  padding: 25px 30px;
  position: relative;
  width: 100%;
}
.status-upload {
  background: none repeat scroll 0 0 #f5f5f5;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  -ms-border-radius: 4px;
  -o-border-radius: 4px;
  border-radius: 4px;
  float: left;
  width: 100%;
}
.status-upload form {
  float: left;
  width: 100%;
}
.status-upload form textarea {
  background: none repeat scroll 0 0 #fff;
  border: medium none;
  -webkit-border-radius: 4px 4px 0 0;
  -moz-border-radius: 4px 4px 0 0;
  -ms-border-radius: 4px 4px 0 0;
  -o-border-radius: 4px 4px 0 0;
  border-radius: 4px 4px 0 0;
  color: #777777;
  float: left;
  font-family: Lato;
  font-size: 14px;
  height: 142px;
  letter-spacing: 0.3px;
  padding: 20px;
  width: 100%;
  resize: vertical;
  outline: none;
  border: 1px solid #f2f2f2;
}

.status-upload ul {
  float: left;
  list-style: none outside none;
  margin: 0;
  padding: 0 0 0 15px;
  width: auto;
}
.status-upload ul > li {
  float: left;
}
.status-upload ul > li > a {
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  -ms-border-radius: 4px;
  -o-border-radius: 4px;
  border-radius: 4px;
  color: #777777;
  float: left;
  font-size: 14px;
  height: 30px;
  line-height: 30px;
  margin: 10px 0 10px 10px;
  text-align: center;
  -webkit-transition: all 0.4s ease 0s;
  -moz-transition: all 0.4s ease 0s;
  -ms-transition: all 0.4s ease 0s;
  -o-transition: all 0.4s ease 0s;
  transition: all 0.4s ease 0s;
  width: 30px;
  cursor: pointer;
}
.status-upload ul > li > a:hover {
  background: none repeat scroll 0 0 #606060;
  color: #fff;
}
.status-upload form button {
  border: medium none;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  -ms-border-radius: 4px;
  -o-border-radius: 4px;
  border-radius: 4px;
  color: #fff;
  float: right;
  font-family: Lato;
  font-size: 14px;
  letter-spacing: 0.3px;
  margin-right: 9px;
  margin-top: 9px;
  padding: 6px 15px;
}
.dropdown > a > span.green:before {
  border-left-color: #2dcb73;
}
.status-upload form button > i {
  margin-right: 7px;
}
</style>



