let button = document.querySelector(".load")

const $imageRadio = document.getElementById('image');
const $videoRadio = document.getElementById('video');
const $imgSelect = document.querySelector(".img-select");
const $videoSelect = document.querySelector(".video-select");

let content_reload = document.querySelector(".content");

$imageRadio.addEventListener('change', function () {
    if (this.checked) {
        $imgSelect.classList.remove("hidden");
        $videoSelect.classList.add("hidden");
    }
    content_reload.innerHTML = ''
});

$videoRadio.addEventListener('change', function () {
    if (this.checked) {
        $videoSelect.classList.remove("hidden");
        $imgSelect.classList.add("hidden");
    }
    content_reload.innerHTML = ''
});

button.addEventListener('click', () => {
    let $image_type = document.getElementById("image_type").value;
    let $img_category = document.getElementById("img_category").value;
    let $colors = document.getElementById("colors").value;
    let $img_per_page = document.getElementById("img_per_page").value;

    let $video_type = document.getElementById("video_type").value;
    let $video_category = document.getElementById("video_category").value;
    let $video_per_page = document.getElementById("video_per_page").value;

    if ($imageRadio.checked) {
        let orientation = "horizontal"
        let url_img = `https://pixabay.com/api/?key=38895244-b2e76ffbc38a869353a5a0d0c&image_type=${$image_type}&category=${$img_category}&colors=${$colors}&per_page=${$img_per_page}&orientation=${orientation}`;
        fetch(url_img)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                showImg(data.hits)
            });
    }
    if ($videoRadio.checked) {
        let url_video = `https://pixabay.com/api/videos/?key=38895244-b2e76ffbc38a869353a5a0d0c&video_type=${$video_type}&category=${$video_category}&per_page=${$video_per_page}`;
        fetch(url_video)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                showVideo(data.hits)
            });
    }
});


function showImg(data) {
    let list = '<ul>';
    list += data.map(img => {
        return `<li><img src="${img.largeImageURL}" alt="${img.tags}"/></li>`;
    }).join('');
    list += '</ul>';
    content_reload.innerHTML = list;
}

function showVideo(data) {
    let list = '<ul>';
    list += data.map(video => {
        const videoSource = video.videos && video.videos.medium ? video.videos.medium.url : '';
        return `<li><video controls><source src="${videoSource}"></video></li>`;
    }).join('');
    list += '</ul>';
    content_reload.innerHTML = list;
}


