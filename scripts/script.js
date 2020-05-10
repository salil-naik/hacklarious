
const Scene = require('Scene');
const sceneRoot = Scene.root;

// Use export keyword to make a symbol available in scripting debug console
// export const Diagnostics = require('Diagnostics');

const Textures = require('Textures');
const NativeUI = require('NativeUI');
const Patches = require('Patches');
const Diagnostics = require('Diagnostics');
const Materials = require('Materials');
const Animation = require("Animation");

Promise.all([
    Textures.findFirst('icon-1'),
    Textures.findFirst('icon-4'),
    Textures.findFirst('icon-3'),
    // Textures.findFirst('icon-4'),
    sceneRoot.findFirst('nullObject0'),
    sceneRoot.findFirst('Cylinder'),
]).then(onReady);

function onReady(assets){
    const icon1 = assets[0];
    const icon2 = assets[1];
    const icon3 = assets[2];
    const placer = assets[3];
    const coinObject = assets[4];

    const placerTransform = placer.transform;

    placerTransform.scaleX = 0.15;
    placerTransform.scaleY = 0.15;
    placerTransform.scaleZ = 0.15;

    const picker = NativeUI.picker;

    const index = 0; 
    // const textureSelection = 0;

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

    // Locate the material and texture in the Assets
    const material1 = Materials.findFirst('coin_mat_1');
    const material2 = Materials.findFirst('coin_mat_2');
    const material3 = Materials.findFirst('coin_mat_3');

    // Diagnostics.log(material1);

    // Assign the texture to the material
    // material.diffuse = texture1;

    picker.selectedIndex.monitor().subscribe(function(index){
        Patches.inputs.setScalar('textureSelection', index.newValue);
    });

    const animationParameters = {
        durationMilliseconds: 3000,
        loopCount: Infinity, 
        mirror: false,
    }

    const animationDriver = Animation.timeDriver(animationParameters);
    animationDriver.start();
    const animationSampler = Animation.samplers.linear(0, 6.3);
    const animation = Animation.animate(animationDriver, animationSampler);

    placer.transform.rotationY = animation;

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
