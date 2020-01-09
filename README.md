# Organograms

This app presents a [gallery of organograms](https://app.peterrcook.com/ukgov-organograms). Click an organogram to explore it. Pan and zoom using usual mouse or touch gestures.

<img src="https://app.peterrcook.com/ukgov-organograms/img/bis.jpg" />

## Architecture

This repo's directory structure is:

```
app/
image-generation/
wrangling/
```

`app` contains the front-end app which is built using JavaScript. Libraries include D3 (mainly for generating the tree structure). The tree is drawn on a canvas element. Currently no build tools are used. The `.js` files are just loaded one by one...

The entry point is `app/js/app.js`. State is handled by `app/js/state.js`. It uses a flux style pattern (e.g. similar to redux) but without using any additional libraries.

`image-generation` is where the static gallery images are created.

`wrangling` is where the [data](https://www.instituteforgovernment.org.uk/sites/default/files/Departmental_organograms_gov.uk_data.gov_.uk_4_7_2017.xlsx) (from [here](https://www.instituteforgovernment.org.uk/blog/hacking-organograms-unlocking-government-data)) is cleaned and filtered. I've tried to keep this to a minimum but have had to make a few assumptions.