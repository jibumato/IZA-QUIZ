const tracks = {
  daily: {
    label: "今日の3問",
    questions: [
      {
        category: "地震",
        question: "大きな揺れを感じた直後、まず取る行動として最も適切なのは？",
        answers: ["火元を確認する", "低い姿勢で頭を守る", "玄関へ走る"],
        correct: 1,
        note: "強い揺れの最中は移動でけがをしやすくなります。まず身を低くして頭を守ります。"
      },
      {
        category: "避難生活",
        question: "家族4人で3日分を備える場合、飲料水の目安はどれくらい？",
        answers: ["12リットル", "24リットル", "36リットル"],
        correct: 2,
        note: "飲料水は1人1日3リットルが目安。4人なら3日で36リットルです。"
      },
      {
        category: "防災グッズ",
        question: "断水時に不足しやすく、優先して備えたいものは？",
        answers: ["携帯トイレ", "紙皿だけ", "大きな時計"],
        correct: 0,
        note: "断水時はトイレ問題がすぐ起きます。家族人数と日数に合わせた備えが大切です。"
      }
    ]
  },
  earthquake: {
    label: "地震編",
    questions: [
      {
        category: "地震",
        question: "家具の転倒対策で、最初に確認したい場所は？",
        answers: ["寝る場所の周辺", "収納の奥", "ベランダの床"],
        correct: 0,
        note: "睡眠中は避ける判断が遅れます。寝室や子ども部屋から優先します。"
      },
      {
        category: "地震",
        question: "エレベーター内で揺れを感じた時の基本行動は？",
        answers: ["全階のボタンを押す", "非常口をこじ開ける", "その場でジャンプする"],
        correct: 0,
        note: "近い階で停止できる可能性があります。停止後は係員の案内に従います。"
      },
      {
        category: "地震",
        question: "避難前に余裕がある時、確認したいものは？",
        answers: ["ブレーカーとガス", "テレビの音量", "冷蔵庫の整理"],
        correct: 0,
        note: "通電火災やガス漏れを防ぐため、可能な範囲で確認します。"
      }
    ]
  },
  rain: {
    label: "台風・大雨編",
    questions: [
      {
        category: "大雨",
        question: "避難情報で高齢者等避難が出た時、対象者はどうする？",
        answers: ["避難を始める", "必ず家で待つ", "川の様子を見に行く"],
        correct: 0,
        note: "移動に時間がかかる人は早めの避難が基本です。危険な場所の確認には行きません。"
      },
      {
        category: "台風",
        question: "台風接近前にベランダで行う備えは？",
        answers: ["物干し竿や鉢を室内へ", "窓を少し開ける", "排水口をふさぐ"],
        correct: 0,
        note: "飛ばされる物を減らすことで、自宅と周囲の被害を抑えられます。"
      },
      {
        category: "大雨",
        question: "冠水した道路を歩く時に最も危険なのは？",
        answers: ["足元の穴や側溝が見えない", "靴が濡れる", "服が汚れる"],
        correct: 0,
        note: "水の下の段差や側溝は見えません。無理に移動しない判断も大切です。"
      }
    ]
  },
  goods: {
    label: "防災グッズ編",
    questions: [
      {
        category: "備蓄",
        question: "非常食を続けやすく備える考え方は？",
        answers: ["普段食べるものを回しながら備える", "10年分を一度に買う", "賞味期限は見ない"],
        correct: 0,
        note: "ローリングストックなら、無理なく消費と補充を続けられます。"
      },
      {
        category: "停電",
        question: "停電時の照明で、ろうそくより優先したいものは？",
        answers: ["LEDランタン", "紙のうちわ", "香水"],
        correct: 0,
        note: "火を使わない照明は余震や小さな子どもがいる家庭でも扱いやすい備えです。"
      },
      {
        category: "連絡",
        question: "家族で事前に決めておきたい連絡方法は？",
        answers: ["集合場所と災害用伝言サービス", "毎回その場で相談", "電話だけ"],
        correct: 0,
        note: "通信が混み合う時に備え、集合場所と複数の連絡手段を決めておくと安心です。"
      }
    ]
  }
};

const elements = {
  label: document.querySelector("#quiz-label"),
  count: document.querySelector("#quiz-count"),
  progress: document.querySelector("#progress-bar"),
  category: document.querySelector("#quiz-category"),
  question: document.querySelector("#question-text"),
  answers: document.querySelector("#answer-list"),
  feedback: document.querySelector("#feedback"),
  next: document.querySelector("#next-button"),
  score: document.querySelector("#readiness-score"),
  topicButtons: document.querySelectorAll(".topic-card")
};

let currentTrack = "daily";
let currentIndex = 0;
let score = 0;
let answered = false;

function renderQuestion() {
  const track = tracks[currentTrack];
  const item = track.questions[currentIndex];

  answered = false;
  elements.label.textContent = track.label;
  elements.count.textContent = `${currentIndex + 1} / ${track.questions.length}`;
  elements.progress.style.width = `${(currentIndex / track.questions.length) * 100}%`;
  elements.category.textContent = item.category;
  elements.question.textContent = item.question;
  elements.feedback.textContent = "";
  elements.next.textContent = currentIndex === track.questions.length - 1 ? "結果を見る" : "次の問題へ";
  elements.next.disabled = true;
  elements.answers.innerHTML = "";

  item.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.className = "answer-button";
    button.type = "button";
    button.textContent = answer;
    button.addEventListener("click", () => selectAnswer(index));
    elements.answers.appendChild(button);
  });
}

function selectAnswer(index) {
  if (answered) return;

  const track = tracks[currentTrack];
  const item = track.questions[currentIndex];
  const buttons = elements.answers.querySelectorAll("button");
  answered = true;

  buttons.forEach((button, buttonIndex) => {
    button.disabled = true;
    if (buttonIndex === item.correct) button.classList.add("correct");
    if (buttonIndex === index && index !== item.correct) button.classList.add("wrong");
  });

  if (index === item.correct) {
    score += 1;
    elements.feedback.textContent = `正解です。${item.note}`;
  } else {
    elements.feedback.textContent = `ここは確認ポイントです。${item.note}`;
  }

  elements.progress.style.width = `${((currentIndex + 1) / track.questions.length) * 100}%`;
  elements.next.disabled = false;
}

function renderResult() {
  const track = tracks[currentTrack];
  const percent = Math.round((score / track.questions.length) * 100);
  elements.category.textContent = "結果";
  elements.count.textContent = `${score} / ${track.questions.length}`;
  elements.progress.style.width = "100%";
  elements.question.textContent =
    percent >= 80
      ? "かなり良い装備です。置き場所と使い方を家族で確認しましょう。"
      : percent >= 50
        ? "基本はつかめています。弱点テーマのギアをひとつ足しましょう。"
        : "今日の気づきは大きいです。水・トイレ・灯りの装備から整えましょう。";
  elements.answers.innerHTML = "";
  elements.feedback.textContent = "結果に合わせて、下の装備マップと選び方記事の導線が変わる想定です。";
  elements.next.textContent = "もう一度解く";
  elements.next.disabled = false;
  elements.score.textContent = `${percent}%`;
}

elements.next.addEventListener("click", () => {
  const track = tracks[currentTrack];
  if (currentIndex < track.questions.length - 1) {
    currentIndex += 1;
    renderQuestion();
    return;
  }

  if (answered) {
    renderResult();
    answered = false;
    currentIndex = track.questions.length - 1;
    return;
  }

  currentIndex = 0;
  score = 0;
  renderQuestion();
});

elements.topicButtons.forEach((button) => {
  button.addEventListener("click", () => {
    elements.topicButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    currentTrack = button.dataset.track;
    currentIndex = 0;
    score = 0;
    elements.score.textContent = "--%";
    renderQuestion();
    document.querySelector("#quiz").scrollIntoView({ behavior: "smooth", block: "center" });
  });
});

renderQuestion();
