
const Scene = require('Scene');
const sceneRoot = Scene.root;

// Use export keyword to make a symbol available in scripting debug console
// export const Diagnostics = require('Diagnostics');

const Textures = require('Textures');
const NativeUI = require('NativeUI');
const Patches = require('Patches');
const Diagnostics = require('Diagnostics');

Promise.all([
    Textures.findFirst('icon-1'),
    Textures.findFirst('icon-2'),
    Textures.findFirst('icon-3'),
    sceneRoot.find('placer'),
]).then(onReady);

function onReady(assets){
    const icon1 = assets[0];
    const icon2 = assets[1];
    const icon3 = assets[2];
    const placer = assets[3];

    const placerTransform = placer.transform;

    placerTransform.scaleX = 0.05;
    placerTransform.scaleY = 0.05;
    placerTransform.scaleZ = 0.05;

    const picker = NativeUI.picker;

    const index = 0; 
    const selection = 0;

    const configuration = {
        selectedIndex: index,
        items:[
            {image_texture: icon1},
            {image_texture: icon2},
            {image_texture: icon3}
        ]
    };

    picker.configure(configuration);
    picker.visible = true;

    picker.selectedIndex.monitor().subscribe(function(index){
        Patches.inputs.setScalar('selection', index.newValue);
    })
}

// To use variables and functions across files, use export/import keyword
// export const animationDuration = 10;

// Use import keyword to import a symbol from another file
// import { animationDuration } from './script.js'

// To access scene objects
// const directionalLight = Scene.root.find('directionalLight0');

// To access class properties
// const directionalLightIntensity = directionalLight.intensity;

// To log messages to the console
// Diagnostics.log('Console message logged from the script.');
