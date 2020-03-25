var app = new Vue({
  el: '#app',
  data: {
    numJokes:0,
    message: "",
    jokeList:[],
  },
  methods:{
    updatePage(){
      //console.log(this.numJokes);
      if(this.numJokes < 1 || this.numJokes > 10){
          this.message = "Please enter a number between 1 and 10";
      }
      else{
        this.message ="";
        this.getJokes();
      }
    },
    async getJokes() {
      if(this.numJokes >= 1 && this.numJokes <= 10){
        try {
          const response = await axios.get("https://icanhazdadjoke.com/search?page=" + this.getRandomPage() + "&limit=" + this.numJokes,{ 'headers': { 'Accept': "application/json" } });
          this.jokeList.length = 0;
          for(var i=0; i< response.data.results.length; i++){
            this.jokeList.push(response.data.results[i]);
          }
        } catch (error) {
          console.log(error);
        }
      }
    },
    getRandomPage(max) {
      return Math.floor(Math.random() * Math.floor(626/this.numJokes));//api joke count
    },
    async newJoke(joke){
      var id = this.jokeList.indexOf(joke);
      console.log(id);
      try {
        const response = await axios.get("https://icanhazdadjoke.com/",{ 'headers': { 'Accept': "application/json" } });
          this.jokeList.splice(id,1,response.data);
      } catch (error) {
        console.log(error);
      }
  },
 }
});
