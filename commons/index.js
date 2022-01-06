// export { canvas } from './env';
// export { faceDetectionNet, faceDetectionOptions } from './faceDetection';
// export { saveFile } from './saveFile';

const {canvas} = require("./env")
const {faceDetectionNet,faceDetectionOptions} = require("./faceDetection")
const {saveFile} = require("./saveFile")

module.exports = {
    canvas,faceDetectionOptions,faceDetectionNet,saveFile
}