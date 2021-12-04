// Collaborative reccomandation of services


// most used services in each category 
var allData = [
    {
        category: 'abc1',
        title : 'HDFC'
    },
    {
        category: 'abc1',
        title : 'SBI'
    },
    {
        category: 'abc1',
        title : 'HDFC'
    },
    {
        category: 'abc1',
        title : 'BOB'
    },
    {
        category: 'xyz1',
        title : 'Muthut'
    },
    {
        category: 'xyz1',
        title : 'Muthut'
    },
    {
        category: 'xyz1',
        title : 'ICICI'
    }
];

var allCategories = ['abc1', 'xyz1'];
var userData = [{
        category: 'abc1',
        title: "BOB"
    },
    {
        category: 'xyz1',
        title: 'Muthut'
    }
];

/**
    code to get most used services in each category.
*/

var mostUsedServicesInCategory = [];


for (let i = 0; i < allCategories.length; i++) {

    var visited = [];
    var tempServices = [];

    for (let j = 0; j < allData.length; j++) {
        if (allData[j].category == allCategories[i]) {

            if (visited.includes(allData[j].title)) {
                
                for (let k = 0; k < tempServices.length; k++) {
                    if (tempServices[k][1] == allData[j].title) {
                        tempServices[k][0]++;
                    }
                }

            }
            else {
                tempServices.push([1, allData[j].title]);
                visited.push(allData[j].title);
            }
        }
    }

    tempServices.sort();
    tempServices.reverse();
    let reccomandForThisCategory = [];

    for (let l = 0; l < tempServices.length; l++) {
        reccomandForThisCategory.push(tempServices[l][1]);
    }

    let res = [];
    res.push(allCategories[i]);
    res.push(reccomandForThisCategory);
    mostUsedServicesInCategory.push(res);

}


for (let i = 0; i < mostUsedServicesInCategory.length; i++){
    console.log(mostUsedServicesInCategory[i]);
}




var visitedCategory = [];
var visitedServices = [];

for (let i = 0; i < userData.length; i++){
    visitedCategory.push(userData[i].category);
    visitedServices.push(userData[i].title);
}

let finalReccomendServices = [];
for (let i = 0; i < mostUsedServicesInCategory.length; i++){

    if (visitedCategory.includes(mostUsedServicesInCategory[i][0])) {
        for (let j = 0; j < mostUsedServicesInCategory[i][1].length; j++){
            if ( !visitedServices.includes(mostUsedServicesInCategory[i][1][j])) {
                finalReccomendServices.push(mostUsedServicesInCategory[i][1][j]);
            }
        }
    }
}

console.log("-------------");
for (let i = 0; i < finalReccomendServices.length; i++) {
    console.log(finalReccomendServices[i]);
}