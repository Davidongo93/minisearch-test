const MiniSearch = require('minisearch')
const data = require('./data.json')

//console.log(data, typeof data);


const miniSearch = new MiniSearch({
    fields: ['description', 'detail','group','category'], // fields to index for full-text search
    storeFields: ['description', 'detail', 'group', 'category'] // fields to return with search results
  });
  
  miniSearch.addAll(data);

  const stringSearch = 'cerveza';
  const  resultsPlain = miniSearch.search(stringSearch);

  console.log(resultsPlain);

  resultsPlain.forEach(result => {
    const matchArray = result.match[stringSearch];
    console.log(matchArray);
  });

  