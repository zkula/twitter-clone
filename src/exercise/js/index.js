const URL = "http://localhost:3000/tweets";

/**
 * Retrive Twitter Data from API
 */
export const getTwitterData = async (q = "coding") => {
  const query = q;
  if (!query) {
    console.log("no query found");
    return;
  }
  const encodedQuery = encodeURIComponent(query);
  const url = `http://localhost:3000/tweets?q=${encodedQuery}&count=10`;
  console.log(url);
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
