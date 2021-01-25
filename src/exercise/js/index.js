const URL = "http://localhost:3000/tweets";

/**
 * Retrive Twitter Data from API
 */
export const getTwitterData = async (q = "coding", next = null) => {
  const query = q;
  if (!query) {
    console.log("no query found");
    return;
  }
  const encodedQuery = encodeURIComponent(query);
  let url = "";
  //`http://localhost:3000/tweets?q=${encodedQuery}&count=10`;

  //If pointer to next group of tweets is passed in, add it to the url params
  if (!next) {
    url = `http://localhost:3000/tweets?q=${encodedQuery}&count=10`;
  } else if (next) {
    url = `http://localhost:3000/tweets` + next;
  }
  console.log("URL: ", url, ", Next: ", next);
  let tweetData = await fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log("data from getTwitterData: ", data);
      return data;
    });
  return tweetData;
};

/**
 * Save the next page data
 */
const saveNextPage = (metadata) => {};

/**
 * Handle when a user clicks on a trend
 */
const selectTrend = (e) => {};

/**
 * Set the visibility of next page based on if there is data on next page
 */
const nextPageButtonVisibility = (metadata) => {};

/**
 * Build Tweets HTML based on Data from API
 */
const buildTweets = (tweets, nextPage) => {};

/**
 * Build HTML for Tweets Images
 */
const buildImages = (mediaList) => {};

/**
 * Build HTML for Tweets Video
 */
const buildVideo = (mediaList) => {};
