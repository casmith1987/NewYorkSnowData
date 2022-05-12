import axios from 'axios';

//Class structure to allow for multiple api interaction methods if desired.
//Also, cache allows api cache to be contained within and not in global scope.
class InteractWithApi {
  constructor() {
    //Cache prevents repeat api calls for same information if function used
    //elsewhere after initial call.
    //Only to be used when information isn't changing constantly and repeat
    //calls are unnecessary.
    this.apiCache = new Map();
  }

  async fetchAndPrintSnowData() {
    const apiCache = this.apiCache;
    const endPoint =
      'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/New%20York/2021-01-01/2022-03-20?unitGroup=us&include=days&key=JUX7ZDU9EGESLYPH3XAQLR6MT&contentType=json';

    if (!apiCache.has(endPoint)) {
      try {
        //Data is retrieved from api and stored in apiCache.
        const { data } = await axios.get(endPoint);
        apiCache.set(endPoint, data);
      } catch (err) {
        console.log('\nWhoops!  An error occured.  See Below for details.');
        console.log('\n', err.message);

        //Uncomment code below this line for additional error logging information.
        // if (err.response) {
        //   console.log(err.response.data);
        //   console.log(err.response.status);
        //   console.log(err.response.headers);
        // } else if (err.request) {
        //   console.log(err.request);
        // } else {
        //   console.log('Error', error.message);
        // }
      }
    }

    if (!apiCache.has(endPoint))
      return console.log('\nSorry!  We are working to fix this issue asap.');

    const daysSnowed = apiCache
      .get(endPoint)
      .days.filter((day) => day.snow > 0);

    let maxSnow = 0;
    let totalSnow = 0;

    //Iterate through all days snowed.  Track max value seen, total and log
    //information for the day.
    for (const day of daysSnowed) {
      const [date, snowedToday] = [day.datetime, day.snow];
      maxSnow = Math.max(maxSnow, snowedToday);
      totalSnow += snowedToday;
      console.log(`Snowed ${snowedToday.toFixed(1)} On ${date}`);
    }

    //Log final results.
    console.log(`\nTotal Days Surveyed: ${apiCache.get(endPoint).days.length}`);

    console.log(`\nDAYS SNOWED: ${daysSnowed.length}`);

    console.log(
      `Average Snowfall on Snow Days: ${(totalSnow / daysSnowed.length).toFixed(
        2
      )}`
    );

    console.log(`Max Snowed: ${maxSnow}`);
  }
}

export default InteractWithApi;
