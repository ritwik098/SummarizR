// Imports the Google Cloud client library
const speech = require('@google-cloud/speech');
const fs = require('fs');
const config = require('../config/config');
var path = require('path');


function speechToText(filePath) {
  // Creates a client
  const client = new speech.SpeechClient();

  // The name of the audio file to transcribe
  const fileName = 'one';

  // Reads a local audio file and converts it to base64
  const file = fs.createReadStream(path.join(__dirname, './resources', 'test_video.mp4'));
  const audioBytes = file.toString('base64');

  // The audio file's encoding, sample rate in hertz, and BCP-47 language code
  const audio = {
    content: audioBytes,
  };
  const config = {
    encoding: 'LINEAR16',
    sampleRateHertz: 16000,
    languageCode: 'en-US',
  };
  const request = {
    audio: audio,
    config: config,
  };

  // Detects speech in the audio file
  client
    .recognize(request)
    .then(data => {
      console.log(data);
      const response = data[0];
      const transcription = response.results
        .map(result => result.alternatives[0].transcript)
        .join('\n');
      console.log(transcription);
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
}

module.exports = {
  speechToText : speechToText
};