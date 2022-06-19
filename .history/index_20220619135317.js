export default class SpeechToText {
  constructor(onFinah, onEnd, onAnythingSaid, language = "en-US") {
    if (!("webkitSpeechRecognition" in window)) {
      throw new Error(
        "This browser doesn't support speech recognition. Try Google Chrome."
      );
    }
  }
}
