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
        }
      }
    };
  }
}
