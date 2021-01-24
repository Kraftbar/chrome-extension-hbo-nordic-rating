// TODO:\
//  -Finne en måte den bare triggerer på nye elementer



// -------------------------------------------------
// --------- listen to changes in document-------------
// -------------------------------------------------
function initMutation(){
  console.log('mutation init');
  const observer = new MutationObserver(mutation => {
    console.log('DOM mutation detected');
    // will loop, since triggering DOM mutation event  
    myTimeout(insertRatings);
  });
  observer.observe(document.body, {
    childList: true,
    attributes: true,
//    subtree: true,
    characterData: true
  });
}


// -------------------------------------------------
// --------- own timer, avoid too many updates ---------
// -------------------------------------------------
var timeoutHandle ;
function myTimeout(functionToTimeout) {
  clearTimeout(timeoutHandle );
  timeoutHandle  = setTimeout(function(){ functionToTimeout(); }, 3000);
}
// consider reacting to changes in DOM instead 
myTimeout(insertRatings)

// -------------------------------------------------
// --------- do the business ---------
// -------------------------------------------------
function insertRatings() {
  var matches = document.getElementsByClassName("preview _1v20p"); // or:
  console.log('insertRatings ran');
  for (var i=0; i<matches.length; i++) {
    mydiv = document.createElement('div');
    var noderow = matches[i].appendChild(mydiv);                 
    noderow.className = "rating-row"

    mydiv = document.createElement('div');
    var node = noderow.appendChild(mydiv);                 
    node.className = "row-filler"

    mydiv = document.createElement('div');
    var node = noderow.appendChild(mydiv);                 
    node.className = "rating-score imdb-score"

    myspan = document.createElement('span');
    var node = node.appendChild(myspan);       
    matched=matches[i].parentElement       
    matched=matched.getAttribute("data-analytics-shelf-title"); //debug
    let requestURL ="https://www.omdbapi.com/?t=" + matched + "&apikey=a15d9392"

    var xhr = new XMLHttpRequest();
    xhr.open( "GET",requestURL, true );
    xhr.extraInfo = node;

    xhr.onload = function( e,node  ) {
        console.log( ': step 3');
        responsejson=this.responseText;
        var obj = JSON.parse(responsejson, function (key, value) {
          return value;
        });
        // to keep context 
        this.extraInfo.innerHTML=obj.imdbRating    
    };

    xhr.send();
  }
}



