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
        {
          id: 121,

          text: "C vitamini hangi meyvede bulunur?",
          choices: ["Elma", "Muz", "Üzüm", "Portakal"],
          correctAnswer: "D",
        },
        {
          id: 221,

          text: "Dünya üzerinde kaç tane kıta bulunmaktadır?",
          choices: ["3", "5", "7", "9"],
          correctAnswer: "C",
        },
        {
          id: 321,

          text: "İnsan vücudu kaç kemikten oluşur?",
          choices: ["150", "206", "300", "400"],
          correctAnswer: "B",
        },
        {
          id: 421,

          text: "Hangi gezegen Güneş Sistemi'ndeki en büyük gezegen'dir?",
          choices: ["Mars", "Jüpiter", "Satürn", "Venüs"],
          correctAnswer: "B",
        },

        {
          id: 1,
          text: "Hangi element periyodik tabloda 'Fe' sembolü ile gösterilir?",
          choices: ["Fosfor", "Demir", "Flor", "Fermiyum"],
          correctAnswer: "B",
        },
        {
          id: 2,
          text: "JavaScript'te bir değişkeni tanımlamak için hangi anahtar kelime kullanılır?",
          choices: ["let", "var", "const", "int"],
          correctAnswer: "A",
        },
        {
          id: 3,
          text: "Karekökü 25 olan sayı nedir?",
          choices: ["5", "10", "15", "20"],
          correctAnswer: "A",
        },
        {
          id: 4,
          text: "Hangi yıl Amerika'nın bağımsızlığını kazandığı yıl olarak bilinir?",
          choices: ["1776", "1789", "1804", "1856"],
          correctAnswer: "A",
        },
        {
          id: 5,
          text: "Dünyanın en yüksek zirvesi neresindedir?",
          choices: ["Everest Dağı", "K2", "Annapurna", "Kangchenjunga"],
          correctAnswer: "A",
        },
        {
          id: 6,
          text: "Beatles hangi ülkeden gelmektedir?",
          choices: ["İngiltere", "ABD", "Almanya", "Fransa"],
          correctAnswer: "A",
        },
        {
          id: 7,
          text: "Leonardo da Vinci'nin ünlü eseri hangisidir?",
          choices: ["Mona Lisa", "Starry Night", "Guernica", "The Persistence of Memory"],
          correctAnswer: "A",
        },
        {
          id: 8,
          text: "Işığın en yavaş hareket ettiği ortam hangisidir?",
          choices: ["Hava", "Su", "Vakum", "Cam"],
          correctAnswer: "C",
        },
        {
          id: 9,
          text: "William Shakespeare'in en ünlü oyunu hangisidir?",
          choices: ["Romeo ve Juliet", "Hamlet", "Othello", "Macbeth"],
          correctAnswer: "B",
        },
        {
          id: 10,
          text: "Futbolda bir takımda kaç oyuncu bulunur?",
          choices: ["9", "10", "11", "12"],
          correctAnswer: "C",
        },
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
      document.querySelector(".paginationjs-next.J-paginationjs-next").click();
      this.currentQuestion++;
    },
    prevQuestion() {
      document.querySelector(".paginationjs-prev.J-paginationjs-previous").click();
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
      // showPrevious: false,
      // showNext: false,
      callback: function (data, pagination) {
        vm.currentQuestion = pagination.pageNumber - 1;
      },
    };
    $(paginationElement).pagination(options);
  },
});

app.mount("#app");
