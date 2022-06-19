export default class SpeechToText {
  constructor(onFinah, onEnd, onAnythingSaid, language = "en-US") {
    if (!("webkitSpeechRecognition" in window)) {
      throw new Error(
        "This browser doesn't support speech recognition. Try Google Chrome."
      );
    }

    const SpeechRecognition = window.webkitSpeechRecognition;

    this.recognition = new SpeechRecognition();

    this.recognition.interimResults = !!onAnythingSaid;

    this.recognition.lang = language;

    let finalTranscript = "";

    this.recognition.onresult = (e) => {
      let interimTranscript = "";
      console.log(e);

      for (let i = e.resultIndex; i < e.results.length; i++) {
        const transcriptionPiece = e.results[i][0].transcript;

        if (e.results[i].isFinal) {
          finalTranscript += transcriptionPiece;
          onFinah(finalTranscript);

          finalTranscript = "";
        } else if (this.recognition.interimResults) {
          interimTranscript += transcriptionPiece;

          onAnythingSaid(interimTranscript);
        }
      }
    };

    this.recognition.onEnd = () => {
      onEnd();
    };
  }

  startListening() {
    this.recognition.start();
  }

  stopListening() {
    this.recognition.stop();
  }
}

const onAnythingSaid = (text) => {
  console.log(text);
};

const onEndEvent = () => {
  //   if (this.state.listening) {
  //     this.startListening();
  //   }
};

const onFinalised = (text) => {
  console.log(text);
};

const speech = new SpeechToText(onFinalised, onEndEvent, onAnythingSaid);

console.log(speech);
