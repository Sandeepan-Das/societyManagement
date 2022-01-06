// import nodejs bindings to native tensorflow,
// not required, but will speed up things drastically (python required)

// const tf = require("@tensorflow/tfjs-node")
const faceapi = require("face-api.js")


// implements nodejs wrappers for HTMLCanvasElement, HTMLImageElement, ImageData
const canvas = require('canvas')

const { Canvas, Image, ImageData } = canvas
faceapi.env.monkeyPatch({ Canvas, Image, ImageData })

module.exports = {
    canvas
}