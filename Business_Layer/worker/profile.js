const uniqid = require('uniqid');
const fs = require("fs")
const path = require("path");

const faceapi = require("face-api.js")

const modelPathRoot = "./weights";

const { canvas, faceDetectionNet, saveFile, faceDetectionOptions } = require("../../commons/index")

// const REFERENCE_IMAGE = './workerProfile/4riy3j3bktei2jko/1.png'
// const QUERY_IMAGE = './workerProfile/4riy3j3bktei2jko/2.png'

const { insertWorker,fetchWorker } = require("../../Repository/index")

const saveProfile = async (req, res) => {
    var image1 = req.body.file1.replace(/^data:image\/png;base64,/, "")
    var image2 = req.body.file2.replace(/^data:image\/png;base64,/, "")
    const id = uniqid()
    if (!fs.existsSync(`workerProfile/${id}`)) {
        fs.mkdirSync(`workerProfile/${id}`)
    }

    fs.writeFile(`workerProfile/${id}/1.png`, image1, 'base64', function (err) {
        if (err) {
            console.log(err);
        }
    });
    fs.writeFile(`workerProfile/${id}/2.png`, image2, 'base64', function (err) {
        if (err) {
            console.log(err);
        }
    });
    req.body.uuid = id;
    req.body.file1 = ""
    req.body.file2 = ""
    req.body.type = "Worker"
    
    try {
        const result = await insertWorker(req.body)
    } catch (error) {

    }
    res.status(200).send()

}
const verifyProfile = async (req, res) => {
    await faceapi.tf.setBackend("tensorflow");
    await faceapi.tf.enableProdMode();
    await faceapi.tf.ENV.set("DEBUG", false);
    await faceapi.tf.ready();
    // const modelPath = path.join(__dirname, modelPathRoot);

    await faceapi.nets.faceRecognitionNet.loadFromDisk(modelPathRoot)
    await faceapi.nets.faceLandmark68Net.loadFromDisk(modelPathRoot)
    await faceapi.nets.ssdMobilenetv1.loadFromDisk(modelPathRoot)
    const labeledFaceDescriptors = await loadLabeledImages()
    console.log(labeledFaceDescriptors)
    const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6)
    console.log("loaded")
    var buffer = req.body.file1.replace(/^data:image\/png;base64,/, "")
    const image = await faceapi.bufferToImage(buffer)
    const detections = await faceapi.detectAllFaces(image).withFaceLandmarks().withFaceDescriptors()
    const resizedDetections = faceapi.resizeResults(detections, displaySize)
    const results = resizedDetections.map(d => faceMatcher.findBestMatch(d.descriptor))
    console.log(results)
    res.status(200).send()
}



const loadLabeledImages = async () => {
    const labels = await fetchWorker()
    console.log(labels)
    return Promise.all(
        labels.map(async label => {
            const descriptions = []
            for (let i = 1; i <= 2; i++) {
                const img = await canvas.loadImage(`./workerProfile/${label.id}/${i}.png`)
                
                const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
                descriptions.push(detections.descriptor)
            }

            return new faceapi.LabeledFaceDescriptors(label.id, descriptions)
        })
    )
}

const check = async (req,res) => {
    var image1 = req.body.file1.replace(/^data:image\/png;base64,/, "")
    fs.writeFile(`workerProfile/query.png`, image1, 'base64', function (err) {
        if (err) {
            console.log(err);
        }
    });

    await faceDetectionNet.loadFromDisk(modelPathRoot)
    await faceapi.nets.faceLandmark68Net.loadFromDisk(modelPathRoot)
    await faceapi.nets.faceRecognitionNet.loadFromDisk(modelPathRoot)

    // const referenceImage = await canvas.loadImage(REFERENCE_IMAGE)
    const queryImage = await canvas.loadImage("./workerProfile/query.png")
    // const queryImage = await canvas.loadImage("./workerProfile/check.png")

    // const resultsRef = await faceapi.detectAllFaces(referenceImage, faceDetectionOptions)
    //     .withFaceLandmarks()
    //     .withFaceDescriptors()

    const resultsQuery = await faceapi.detectAllFaces(queryImage, faceDetectionOptions)
        .withFaceLandmarks()
        .withFaceDescriptors()

    const labeledFaceDescriptors = await loadLabeledImages()
    console.log(labeledFaceDescriptors)
    const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6)
    // const faceMatcher = new faceapi.FaceMatcher(resultsRef)

    const labels = faceMatcher.labeledDescriptors
        .map(ld => ld.label)
    // const refDrawBoxes = resultsRef
    //     .map(res => res.detection.box)
    //     .map((box, i) => new faceapi.draw.DrawBox(box, { label: labels[i] }))
    // const outRef = faceapi.createCanvasFromMedia(referenceImage)
    // refDrawBoxes.forEach(drawBox => drawBox.draw(outRef))

    // saveFile('referenceImage.png', (outRef).toBuffer('image/png'))
    var status;
    const queryDrawBoxes = resultsQuery.map(res => {
        const bestMatch = faceMatcher.findBestMatch(res.descriptor)
        status = bestMatch._label
        console.log(status)
        return new faceapi.draw.DrawBox(res.detection.box, { label: bestMatch.toString() })
    })
    const outQuery = faceapi.createCanvasFromMedia(queryImage)
    queryDrawBoxes.forEach(drawBox => drawBox.draw(outQuery))
    saveFile('queryImage.png', (outQuery).toBuffer('image/png'))
    console.log('done, saved results to out/queryImage.png')
    res.status(200).send({status})
}



module.exports = {
    saveProfile, verifyProfile,check
}