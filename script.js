function buildDynamicRegionsDropDown(){
    //sample JSON data
    regions = '[{ "name": "region1" },{ "name": "region2" },{ "name": "region3" }]';
    var regionsData = JSON.parse(regions);

    //Console the parsed JSON data
    console.log(regionsData)

    //Build a dynamic drop-down for the JSON data

    for (let i = 0; i< regionsData.length; i++){   
        var dropDownItem = document.createElement('option');
        var node = document.createTextNode(regionsData[i].name);
        dropDownItem.appendChild(node)
        document.getElementById('regions-dropdown').appendChild(dropDownItem)
    }
}
function saveDetails(event){
    event.preventDefault()
    
    typesSelected = []
    types = document.getElementsByName('type')
    for (var i = 0; i< types.length; i++)
    {
        if (types[i].checked == true)
        {
            typesSelected.push(types[i].value)
        }
    }

    var details = {
        'caseName': document.getElementById('name').value,
        'region': document.getElementById('regions-dropdown').value,
        'status': document.getElementById('status').checked ? 'Active' : 'Inactive',
        'type': typesSelected
    };

// Put the JSON object into local storage
localStorage.setItem(details['caseName'], JSON.stringify(details));
}

// Retrieve from local storage
function retrieveDetails(){
    var retrievedObject = []
    Object.keys(localStorage).forEach(function(key){
        retrievedObject.push(JSON.parse(localStorage.getItem(key)));
     });
    //console.log('retrievedObject: ', JSON.parse(retrievedObject));
    return retrievedObject
}

//Post the retrieve JSON data to the UI
function postSavedDetails(){
    var retrievedObject = retrieveDetails()
    document.getElementById("summary").innerHTML = JSON.stringify(retrievedObject);
}
