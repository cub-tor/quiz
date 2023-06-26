<script>
import axios from 'axios';

export default {
  data() {
    return {
      respuestas: []
    };
  },
  mounted() {
    axios.get('http://localhost:3000/respuestas')
      .then(response => {
        this.respuestas = response.data;
        console.log(this.respuestas);
      })
      .catch(error => {
        console.error(error);
      });
  }
};
</script>