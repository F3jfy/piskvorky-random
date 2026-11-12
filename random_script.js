const MAP_SIZE = 256;
const mapCanvas = document.createElement("canvas");
mapCanvas.width = MAP_SIZE;
mapCanvas.height = MAP_SIZE;
const mapCtx = mapCanvas.getContext("2d");

let mapPixelData = null;
let seedX = 1337;
let seedY = 7331;

function initCanvasMap() {
    const imgData = mapCtx.createImageData(MAP_SIZE, MAP_SIZE);
    for (let y = 0; y < MAP_SIZE; y++) {
        for (let x = 0; x < MAP_SIZE; x++) {
            const index = (y * MAP_SIZE + x) * 4;
            const val = Math.floor(shaderHash(x, y) * 256);
            imgData.data[index] = val;
            imgData.data[index + 1] = val;
            imgData.data[index + 2] = val;
            imgData.data[index + 3] = 255;
        }
    }
    mapCtx.putImageData(imgData, 0, 0);
    mapPixelData = imgData.data;
}

const mapImage = new Image();
mapImage.onload = () => {
    try {
        mapCtx.drawImage(mapImage, 0, 0);
        mapPixelData = mapCtx.getImageData(0, 0, MAP_SIZE, MAP_SIZE).data;
    } catch (e) {}
};
mapImage.src = "map.png";

initCanvasMap();

function shaderHash(x, y) {
    const dotProduct = x * 12.9898 + y * 78.233;
    const sinValue = Math.sin(dotProduct) * 43758.5453123;
    return sinValue - Math.floor(sinValue);
}

function getRandomFromMap(min, max) {
    const hashValue = shaderHash(seedX, seedY);

    const sampleX = Math.floor(hashValue * MAP_SIZE);
    const sampleY = Math.floor(shaderHash(seedY, seedX) * MAP_SIZE);
    const pixelIndex = (sampleY * MAP_SIZE + sampleX) * 4;
    const mapValue = mapPixelData[pixelIndex] / 255;

    const combined = (hashValue + mapValue) % 1;

    seedX = (seedX + Math.floor(combined * 1000) + 1) % 100000;
    seedY = (seedY + Math.floor(mapValue * 1000) + 1) % 100000;

    return Math.floor(combined * (max - min + 1)) + min;
}

const getRandom = getRandomFromMap;
