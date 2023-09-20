# TensorFlow.js Sandbox

This is repo for practicing ML with tensorflow.js

This minimal example loads tfjs from a CDN, builds and trains a minimal model,
and uses it to predict. Edit `index.js` and load `index.html` in your
browser to test small snippets.

## Run the demo

1. Install the required dependencies:

```sh
yarn install
```

2. Start the server using the following yarn command:

```
yarn watch
```

3. The console logs include the address of the server: http://127.0.0.1:1234

Follow the address to load the model and make a prediction.
The predicted result will display on the page.

## Run the topic by overriding `index.html` and `index.js`

1. You shall copy `index.html` and `index.js` from each directory which you
   wanted to test to the root folder `/`

2. Then you could run

```
yarn watch
```

to see the effect.
