const MiniSearch = require('minisearch');
const data = require('./data.json');
const separator = () => console.log('------------------------------------------------------------\n');

//verify database
separator();
console.log("Database info:", data.length);
console.log("Data type:", typeof data,"\n");

//search keyword:
const stringSearch = 'salango';

//raw minisearch usage
const miniSearch = new MiniSearch({
  fields: ['description', 'detail','group','businessName'], // fields to index for full-text search
  storeFields: ['id','description', 'detail','businessName'] // fields to return with search results
});

miniSearch.addAll(data);
// Fuzzy search parameters:
const  resultsFuzzyAndPrefix = miniSearch.search(stringSearch,{ fuzzy: 0.3 },{prefix:true});
separator();
console.log("Total matches fuzzy 0.3 and prefix true: ",resultsFuzzyAndPrefix.length,"\nMatches:", resultsFuzzyAndPrefix);


// Boost priority search
const resultsPriority = miniSearch.search(stringSearch,{ boost: { 
  description: 4,
  detail: 3,
  group: 2,
  businessName: 1
}});
separator();
console.log("Total matches boost search description: ",resultsPriority.length,"\nMatches description:", resultsPriority);

//auto suggest (may could use fuzzy also)
const suggestions = miniSearch.autoSuggest(stringSearch,{ fuzzy: 0.2 })
separator();
console.log("suggestions:\n",suggestions);
