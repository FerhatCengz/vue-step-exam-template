const app = Vue.createApp({
  data() {
    return {
      currentQuestion: 0,
      userAnswers: [],
      questions: [
        {
          id: 12,
          text: "C vitamini hangi <b>meyvede </b> bulunur?",
          choices: [`<p>This is a default toolbar demo of Rich text editor.</p> <p><img src="https://richtexteditor.com/images/editor-image.png" /></p>`, "Elma", "Muz", "Üzüm"],
          correctAnswer: "A",
        },
        {
          id: 22,
          text: "Dünya üzerinde kaç tane kıta bulunmaktadır?",
          choices: ["<p class='text-danger'>3</p>", "5", "7", "9"],
          correctAnswer: "C",
        },
        {
          id: 32,
          text: "İnsan vücudu kaç kemikten oluşur?",
          choices: ["150", "206", "300", "400"],
          correctAnswer: "B",
        },
        {
          id: 42,
          text: "Hangi gezegen Güneş Sistemi'ndeki <i>en büyük gezegen</i>'dir?",
          choices: ["Mars", "Jüpiter", "Satürn", "Venüs"],
          correctAnswer: "B",
        },
        // Diğer soruları ekleyebilirsiniz.
      ],
    };
  },
  methods: {
    finshExam() {
      let vm = this;
      let html = "";
      vm.userAnswers.map((e, index) => {
        html += `${index + 1} . ${e.answer} seçtiniz <br/>`;
      });
      console.log(html);
      Swal.fire({
        title: "Sınavınız Bitmiştir.",
        html: html,
      });
    },
    cleanText(htmlString) {
      return htmlString.replace(/<\/?[^>]+(>|$)/g, "").trim();
    },
    nextQuestion() {
      document.querySelectorAll("li[data-num]")[this.currentQuestion].classList.remove("active");
      document.querySelectorAll("li[data-num]")[this.currentQuestion + 1].classList.add("active");
      this.currentQuestion++;
    },
    prevQuestion() {
      document.querySelectorAll("li[data-num]")[this.currentQuestion].classList.remove("active");
      document.querySelectorAll("li[data-num]")[this.currentQuestion - 1].classList.add("active");
      this.currentQuestion--;
    },
  },

  computed: {
    //!Geri buttonu ne zaman aktif olacak (eğer ki soru 0 ' dan büyük olursa ve işlevde olan soru eğer ki tüm soruların uzunluğundan küçükse)
    prevButtonRules() {
      return this.currentQuestion > 0 && this.currentQuestion < this.questions.length;
    },

    //!İleri buttonu eğer ki güncel soru tüm soruların uzunluğundan küçük ise
    nextButtonRules() {
      return this.currentQuestion < this.questions.length - 1;
    },

    //!Dipnot : bunların dışında v-else kısmında ki `<button class="btn btn-dark" v-else @click="nextQuestion">Sınavı Bitir</button>` gözükecektir.

    //*Buttonlar için belirtlien classlar

    //? aktif sorunun pagetion için de "active" classını kullanmamız gerekecek.
    activePagetion() {
      return this.currentQuestion + 1 == this.pageCount ? "active" : "";
    },
  },

  // Pagetion.js freamworkünü kullandım. amacım responsive bir "pagetion" işlemi yapmaktı bunu ise bunun ile sağladım.
  mounted() {
    let vm = this;
    const paginationElement = document.getElementById("pagination-container");
    const options = {
      dataSource: this.questions,
      pageSize: 1,
      pageNumber: 1,
      showPrevious: false,
      showNext: false,
      callback: function (data, pagination) {
        vm.currentQuestion = pagination.pageNumber - 1;
      },
    };
    $(paginationElement).pagination(options);
  },
});

app.mount("#app");
