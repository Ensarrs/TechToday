document.addEventListener("DOMContentLoaded", function() {
    const apiKey = 'pub_57408c7c7feea6f53fcbc1bdce374c8784dda';
    const url = `https://newsdata.io/api/1/news?apikey=${apiKey}&language=en&category=technology`;
    const newsContainer = document.getElementById("api-feed");

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const items = data.results;
            items.forEach(item => {
                const title = item.title;
                const description = item.description;
                const link = item.link;
                const pubDate = item.pubDate;
                const imageUrl = item.image_url;
                const date = new Date(pubDate).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });

                const articleCard = `
                    <div class="api-card p-4 rounded-lg shadow">
                        <div class="api-content">
                            <h3 class="api-h3 text-xl font-semibold mb-2">${title}</h3>
                            <p class="api-date text-gray-500">Released on: ${date}</p>
                            ${imageUrl ? `<img src="${imageUrl}" class="w-full mb-4 rounded" />` : ''}
                            <p class="text-gray-700">${description ? description.slice(0, 150) : ''}...</p>
                            <a href="${link}" class="text-blue-500 mt-4 block" target="_blank">Continue reading</a>
                        </div>
                    </div>
                `;
                newsContainer.innerHTML += articleCard;
            });
        })
        .catch(error => {
            console.error('Error fetching news:', error);
        });
});
