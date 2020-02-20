function firstWords(string, n) {
	var sentence = string.split(" ").slice(0, n).join(" ");

	return sentence;
}


// Update news article section
let url = 'http://newsapi.org/v2/everything?' +
	'q=cars&' +
	'sortBy=relevancy&' +
	'apiKey=2f469746a26644c6a21fb42c936e63f2';

let req = new Request(url);

fetch(req)
	.then(function(response) {
		return response.json();
	}).then(function(json) {
		console.log(json);

		let jsonListIdx = 0

		// json.list.length
		let latestArticle = null;
		let article = null;
		let trendingArticle = null;


		for (let i = 0; i < 4; i++) {
			let latestStoryIdx = i + 1;
			let latestStoryId = "latestStory" + latestStoryIdx;

			latestArticle = json.articles[jsonListIdx]

			// Update latest story title
			let latestStory = document.getElementById(latestStoryId);
			let articleTitle = latestArticle.title;
			latestStory.innerHTML = articleTitle;

			// Update latest story link
			let latestStoryLinkId = latestStoryId + "Link";
			let latestStoryLink = document.getElementById(latestStoryLinkId);
			let articleLink = latestArticle.url
			latestStoryLink.href = articleLink;

			jsonListIdx += 1;
		}

		for (let i = 0; i < 4; i++) {
			let articleIdx = i + 1;
			let articleId = "article" + articleIdx;

			article = json.articles[jsonListIdx]

			// Update article image
			let articleImgId = articleId + "Img";
			let articleImg = document.getElementById(articleImgId);
			let imgLink = article.urlToImage;
			articleImg.src = imgLink;

			// Update article title
			let articleTitleId = articleId + "Title";
			let articleTitle = document.getElementById(articleTitleId);
			articleTitle.innerHTML = article.title;

			// Update article content
			let articleContentId = articleId + "Content";
			let articleContent = document.getElementById(articleContentId);
			articleContent.innerHTML = firstWords(article.content, 20) + '...';

			// Update article link
			let articleLinkId = articleId + "Link";
			let articleLink = document.getElementById(articleLinkId);
			articleLink.href = article.url;

			jsonListIdx += 1;
		}

		for (let i = 0; i < 4; i++) {
			let trendingStoryIdx = i + 1;
			let trendingStoryId = "trendingStory" + trendingStoryIdx;

			trendingArticle = json.articles[jsonListIdx]

			// Update trending story title
			let trendingStory = document.getElementById(trendingStoryId);
			let trendingTitle = trendingArticle.title;
			trendingStory.innerHTML = trendingTitle;

			// Update trending story link
			let trendingStoryLinkId = trendingStoryId + "Link";
			let trendingStoryLink = document.getElementById(trendingStoryLinkId);
			trendingStoryLink.href = trendingArticle.url;

			jsonListIdx += 1;
		}
	})
	.catch(function(reason) {
		alert(reason);
	})

// Fetch Car Review Information
let urlReview = 'http://newsapi.org/v2/everything?' +
	'q="' + encodeURI("new car reviews") + '"&' +
	'qInTitle=' + encodeURI("Review OR First Drive") + '&' +
	'sortBy=relevancy&' +
	'apiKey=2f469746a26644c6a21fb42c936e63f2';

let reqReview = new Request(urlReview);

fetch(reqReview)
	.then(function(response) {
		return response.json();
	}).then(function(json) {
		console.log(json);

		jsonListIdx = 0

		let reviewArticle = null;

		for (let i = 0; i < 4; i++) {
			let reviewIdx = i + 1;
			let reviewId = "review" + reviewIdx;

			reviewArticle = json.articles[jsonListIdx]

			// Update review title
			let reviewTitleId = reviewId + "Title";
			let reviewTitle = document.getElementById(reviewTitleId);
			let articleTitle = reviewArticle.title;
			reviewTitle.innerHTML = articleTitle;

			// Update review image
			let reviewImgId = reviewId + "Img";
			let reviewImg = document.getElementById(reviewImgId);
			let articleImgLink = reviewArticle.urlToImage;
			reviewImg.src = articleImgLink;

			// Update review link
			let reviewLinkId = reviewId + "Link";
			let reviewLink = document.getElementById(reviewLinkId);
			let articleLink = reviewArticle.url;

			// URL link is formatted improperly for AutoBlog
			if (reviewArticle.source.name === "Autoblog.comhttps") {
				articleLink = articleLink.slice(24);
			}

			reviewLink.href = articleLink;

			jsonListIdx += 1;
		}
	})
	.catch(function(reason) {
		alert(reason);
	});