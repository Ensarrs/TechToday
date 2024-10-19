document.addEventListener("DOMContentLoaded", function() {
    const rssUrl = "https://rss.app/feeds/mHaZ96J71LxixiNy.xml";
    
    fetch(rssUrl)
        .then(response => response.text())
        .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
        .then(data => {
            const items = data.querySelectorAll("item");
            const feedContainer = document.getElementById("rss-feed");

            items.forEach(item => {
                const title = item.querySelector("title").textContent;
                const description = item.querySelector("description").textContent;
                const link = item.querySelector("link").textContent;
                const pubDate = item.querySelector("pubDate").textContent;

                // Convert pubDate to a more readable format
                const date = new Date(pubDate).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });

                const articleCard = `
                    <div class="rss-card">
                        <div class="rss-content">
                            <h3 class="rss-h3">${title}</h3>
                            <p class="rss-date">Released on: ${date}</p>
                            <p>${description.slice(0, 150)}...</p>
                            <a href="${link}" target="_blank">Continue reading</a>
                        </div>
                    </div>
                `;

                feedContainer.innerHTML += articleCard;
            });
        })
        .catch(error => {
            console.error('Error fetching the RSS feed:', error);
        });
});