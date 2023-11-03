// https://api.unsplash.com/photos/?client_id=YOUR_ACCESS_KEY


const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')
let ready = false;
let imageLoader = 0;
let totalImages = 0;
let photoarray = [];
const count = 30;
const apikey = 'cQpSgB5iezDO5QlKX4sCnEVa2mbZAnC0z9eRPYqtIpI';
const apiurl = `https://api.unsplash.com/photos/random/?client_id=${apikey}&count=${count}`;

// check all image is loaded 
function imageLoaded() {
    console.log('image loaded')
    imageLoaded++;
    console.log(imageLoaded)
    if (imageLoaded === totalImages) {
        ready = true;
        console.log('ready =' , ready);
    }
}


// create helper function to set attributes on dom element  so that we dont need to write setattribute again n again
function setAttribute(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// create element for links and photos,add to dom
function displayPhoto() {
    totalImages =photoarray.length;
    console.log('total Images',totalImages);
    
    // run function for each object in photosarray
    photoarray.forEach((photo) => {
        // creating <a> to link to unsplash 
        const item = document.createElement('a');
        // item.setAttribute('href', photo.links.html);
        setAttribute(item, {
            href: photo.links.html,
            target: '_blank',
        });

        // create <image> for photo
        const img = document.createElement('img')
        // img.setAttribute('src', photo.urls.regular);
        setAttribute(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        // Event Listener Check when each is fininsh loading
        img.addEventListener('load', imageLoaded)

        // put <img> inside <a> then put both inside imagecontainer element
        item.appendChild(img);
        imageContainer.appendChild(item);
    })
}

async function getPhoto() {
    try {
        const response = await fetch(apiurl);
        photoarray = await response.json();
        console.log(photoarray);
        displayPhoto();
    } catch (error) {
        console.log(error);
    }
}

getPhoto();