document.addEventListener("DOMContentLoaded", function() {
    const apiKey = "42a9adf9158606528c1321c72cf91c17";
    const url = `https://gnews.io/api/v4/top-headlines?token=${apiKey}&lang=en&topic=technology`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            const feedContainer = document.getElementById("news-feed");
            if (!feedContainer) {
                throw new Error("Element with id 'news-feed' not found.");
            }

            if (!data.articles || !Array.isArray(data.articles)) {
                throw new Error("No articles data found or data.articles is not an array.");
            }

            data.articles.forEach(article => {
                const title = article.title || "No title available";
                const description = article.description || "No description available";
                const link = article.url || "#";
                const publishedAt = new Date(article.publishedAt).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
                const imageUrl = article.image || "";

                const articleCard = `
                    <div class="news-card">
                        <div class="news-content">
                            <h3>${title}</h3>
                            <p class="news-date">Published on: ${publishedAt}</p>
                            ${imageUrl ? `<img src="${imageUrl}" alt="${title}" class="news-image" />` : ""}
                            <p>${description.slice(0, 150)}...</p>
                            <a href="${link}" target="_blank">Read more</a>
                        </div>
                    </div>
                `;

                feedContainer.innerHTML += articleCard;
            });
        })
        .catch(error => {
            console.error('Error fetching news data:', error);
        });
});
