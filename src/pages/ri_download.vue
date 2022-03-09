<template>
  <div class="container shadow-2 bg-white" style="color: #757575">
    <ri-header></ri-header>
    download page (wait draft version from UN)
    <my-footer></my-footer>
  </div>
</template>

<script>
import riHeader from "../components/ri/main/ri_header";
import myFooter from "../components/footer";
export default {
  components: {
    riHeader,
    myFooter,
  },
  data() {
    return {
      score: [67, 89, 90, 78, 87, 75, 89, 90],
      student: [
        { id: 1, name: "Art", score: 56 },
        { id: 2, name: "Kae", score: 87 },
        { id: 3, name: "Mooyor", socre: 67 },
      ],
    };
  },
  methods: {
    doubleScore() {
      let doubleScore = [];
      for (let i = 0; i < this.score.length; i++) {
        doubleScore.push(this.score[i] * 2);
      }

      //***********Map */
      //Modify value in array
      if (this.score != null) {
        doubleScore = this.score.map((x) => (x / 150) * 100);
        console.log(doubleScore);
      }

      // //get value from object
      console.log(this.student.map((x) => x.name));

      // //***Sort */
      this.score.sort();
      console.log(this.score);
      // this.student.sort((a, b) => b.score - a.score);
      this.student.sort((a, b) => (a.name > b.name ? 1 : -1));
      console.log(this.student);

      //filter
      console.log(this.student.filter((x) => x.score > 80));

      console.log(this.score);
      let score2 = [...this.score];
      console.log(score2);
    },
  },
  mounted() {
    this.doubleScore();
  },
};
</script>

<style lang="scss" scoped></style>
