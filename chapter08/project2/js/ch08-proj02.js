const photos = JSON.parse(content);

for (let photo of photos) {
    outputCard(photo);
}

function outputCard(photo) {
    document.write(`<article>`);
    document.write(`<img src="../images/${photo.filename}" alt="${photo.title}">`);
    document.write(`<div class="caption">`);
    document.write(`<h2>${photo.title}</h2>`);
    document.write(`<p>${photo.location.city}, ${photo.location.country}</p>`);
    document.write(`<h3>Colors</h3>`);
    outputColors(photo.colors);
    document.write(`</div>`);
    document.write(`</article>`);
}

function outputColors(colors) {
    for (let color of colors) {
        document.write(constructColor(color));
    }
}

function constructColor(color) {
    return `<span ${constructStyle(color)}>${color.name}</span>`;
}

function constructStyle(color) {
    let text_color = "white";
    if (color.luminance > 70) {
        text_color = color.luminance;
    }
    return `style="background-color: ${color.hex}; color: ${text_color};"`;
}