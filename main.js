const component = {
  data(){
    return{
      //query : null
    }
  },

  methods:{
    async getGithub(){
      var queryString = fetch("https://api.github.com/search/users?q="+encodeURIComponent(this.query)+"+in:name+in:email&per_page=20")
      .then((result) => result.json())
      .then((data) => {
        const z = document.createElement('p');
        document.write(`
          <link rel="stylesheet" type="text/css" href="styles.css" media="all" />
          <h1> Github Search </h1>
          <form @submit.prevent="getGithub">
              <input type="submit"class="button"value="refresh"/>
              </form>
            </div>`)
        if(data.items.length == 0){
              document.write("<div id = badOutput> no results found </div>");
        }
        else{
          for (var i = 0; i < data.items.length; i++) {
            const searchResult =  data.items[i].url;
            var userInfo = fetch(searchResult)
            .then((result) => result.json())
            .then((data) => {
            document.write(`<div id = container> <div id = searchOutputImg>` +
              `<a href="https://www.github.com/${cleanPrivate(data.login)}"><img src="${cleanPrivate(data.avatar_url)}"/> <br> </div>` +
              `<div id = searchOutput>`+
              `email: ${cleanPrivate(data.email)} <br>` +
              `Location: ${cleanPrivate(data.location)} <br>` +
              `Name: ${cleanPrivate(data.name)} <br>` +
              `Username: ${cleanPrivate(data.login)} <br>` +
              `number of public reops: ${cleanPrivate(data.public_repos)} <br>` +
              `created: ${processDate(cleanPrivate(data.created_at))} <br>` +
              `Updated: ${processDate(cleanPrivate(data.updated_at))} <br>` +
               `</div> </div>`
            )

            })
        }
      }
      })
    }
    }
}

function returnUser(username,avatar_url,location,email,fullname,public_repos,created_at,updated_at) {
  this.username = username;
  this.avatar_url = avatar_url;
  this.location = location;
  this.email = email;
  this.fullname = fullname;
  this.public_repos = public_repos;
  this.created_at = created_at;
  this.updated_at = updated_at;
}

function processDate(date){
  return  + date.substr(5,2) + "-" + date.substr(8,2) + "-" + date.substr(0,4);

}

function cleanPrivate(input){
  if(!input){
    return "Private"
  }
  else{
    return input;
  }
}
const app = Vue.createApp(component).mount('#vue-app')
