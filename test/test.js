const assert = require('assert');
const { expect } = require('chai');

fs = require('fs');

imagine = ['c', 'cmaj7', 'f', 'am', 'dm', 'g', 'e7'];
somewhere_over_the_rainbow = ['c', 'em', 'f', 'g', 'am'];
tooManyCooks = ['c', 'g', 'f'];
iWillFollowYouIntoTheDark = ['f', 'dm', 'bb', 'c', 'a', 'bbm'];
babyOneMoreTime = ['cm', 'g', 'bb', 'eb', 'fm', 'ab'];
creep = ['g', 'gsus4', 'b', 'bsus4', 'c', 'cmsus4', 'cm6'];
army = ['ab', 'ebm7', 'dbadd9', 'fm7', 'bbm', 'abmaj7', 'ebm']; //無使用
paperBag = ['bm7', 'e', 'c', 'g', 'b7', 'f', 'em', 'a', 'cmaj7','em7', 'a7', 'f7', 'b'];
toxic = ['cm', 'eb', 'g', 'cdim', 'eb7', 'd7', 'db7', 'ab', 'gmaj7','g7'];
bulletproof = ['d#m', 'g#', 'b', 'f#', 'g#m', 'c#'];
song_11 = [];

var songs = [];
var labels = [];
var allChords = [];
var labelCounts = [];
var labelProbabilities = [];
var chordCountsInLabels = {};
var probabilityOfChordsInLabels = {};

function train(chords, label) {
    songs.push([label, chords]);
    labels.push(label);
    for (var i = 0; i < chords.length; i++) {
        if (!allChords.includes(chords[i])) {
            allChords.push(chords[i]);
        }
    }
    if (!!(Object.keys(labelCounts).includes(label))) {
        // console.log(labelCounts);
        labelCounts[label] = labelCounts[label] + 1;
    } else {
        labelCounts[label] = 1;
    }
};

function getNumberOfSongs() {
    return songs.length;
};

function setLabelProbabilities() {
    var numberOfSongs = getNumberOfSongs();
    // Object.keys(labelCounts).forEach(function(label) {
    //     labelProbabilities[label] = labelCounts[label] / numberOfSongs;
    // });
    for (const [label, quantity] of Object.entries(labelCounts)) {
        labelProbabilities[label] = quantity / numberOfSongs;
    }
};

function setChordCountsInLabels() {
    // songs.forEach(function(i) {
    //     if (chordCountsInLabels[i[0]] === undefined) {
    //         chordCountsInLabels[i[0]] = {};
    //     }
    //     i[1].forEach(function(j) {
    //         if (chordCountsInLabels[i[0]][j] > 0) {
    //             chordCountsInLabels[i[0]][j] =
    //                 chordCountsInLabels[i[0]][j] + 1;
    //         } else {
    //             chordCountsInLabels[i[0]][j] = 1;
    //         }
    //     });
    // });
    for (const labelList of songs) {
        if (chordCountsInLabels[labelList[0]] === undefined) {
            chordCountsInLabels[labelList[0]] = {};
        }
        for (const single of labelList[1]) {
            if (chordCountsInLabels[labelList[0]][single] > 0) {
                chordCountsInLabels[labelList[0]][single] = chordCountsInLabels[labelList[0]][single] + 1;
            } else {
                chordCountsInLabels[labelList[0]][single] = 1;
            }
        }
    }
}

function setProbabilityOfChordsInLabels() {
    var numberOfSongs = getNumberOfSongs();
    probabilityOfChordsInLabels = chordCountsInLabels;
    Object.keys(probabilityOfChordsInLabels).forEach(function(i) {
        Object.keys(probabilityOfChordsInLabels[i]).forEach(function(j) {
            probabilityOfChordsInLabels[i][j] = probabilityOfChordsInLabels[i][j] * 1.0 / numberOfSongs; 
        });
    });
}


var classified = {};
function classify(chords) {
    var addNumValue = 1.01;
    var ttal = labelProbabilities;
    if (JSON.stringify(classified) === '{}') {
        classified = {};
    }
    Object.keys(ttal).forEach(function(obj) {
        var first = labelProbabilities[obj] + addNumValue;
        chords.forEach(function(chord) {
            var probabilityOfChordInLabel = probabilityOfChordsInLabels[obj][chord];
            if (probabilityOfChordInLabel === undefined) {
                first + addNumValue;
            } else {
                first = first * (probabilityOfChordInLabel + addNumValue);
            }
        });
        classified[obj] = first;
    });
};





// -------------------------------------------------------------------------- //
// ----------------------------- train()單元測試 ----------------------------- //
// -------------------------------------------------------------------------- //

// train(imagine, 'easy');
describe('method # train # train( ["c", "cmaj7", "f", "am", "dm", "g", "e7"] , "easy" )', function() {
    subclassTagArr = imagine;
    labelName = 'easy';
    train(subclassTagArr, labelName);
    it('labelName是否為字串', function() { 
        expect(labelName).to.be.a('string');
    });
    it('subclassTagArr是否為數組', function() { 
        expect(subclassTagArr).to.be.an('array');
    });
    it('labels 數組是否有labelName', function() { 
        expect(labels).to.include('easy');
    });
    it('allChords 數組是否有 subclassTagArr所有的值', function() { 
        ['c', 'cmaj7', 'f', 'am', 'dm', 'g', 'e7'].forEach(function(i) {
            expect(allChords).to.include(i);
        });
    });
    it('labelCounts 是否有 labelName', function() { 
        expect(labelCounts).to.include.keys(labelName);
    });
});

// train(somewhere_over_the_rainbow, 'easy');
describe('method # train # train( ["c", "em", "f", "g", "am"] , "easy" )', function() {
    subclassTagArr = somewhere_over_the_rainbow;
    labelName = 'easy';
    train(subclassTagArr, labelName);
    it('labelName是否為字串', function() { 
        expect(labelName).to.be.a('string');
    });
    it('subclassTagArr是否為數組', function() { 
        expect(subclassTagArr).to.be.an('array');
    });

    it('labels 數組是否有labelName', function() { 
        expect(labels).to.include('easy');
    });
    it('allChords 數組是否有 subclassTagArr所有的值', function() { 
        ['c', 'cmaj7', 'f', 'am', 'dm', 'g', 'e7'].forEach(function(i) {
            expect(allChords).to.include(i);
        });
    });
    it('labelCounts 是否有 labelName', function() { 
        expect(labelCounts).to.include.keys(labelName);
    });
});

// train(tooManyCooks, 'easy');
describe('method # train # train( ["c", "g", "f"] , "easy" )', function() {
    subclassTagArr = tooManyCooks;
    labelName = 'easy';
    train(subclassTagArr, labelName);
    it('labelName是否為字串', function() { 
        expect(labelName).to.be.a('string');
    });
    it('subclassTagArr是否為數組', function() { 
        expect(subclassTagArr).to.be.an('array');
    });
    it('labels 數組是否有labelName', function() { 
        expect(labels).to.include('easy');
    });
    it('allChords 數組是否有 subclassTagArr所有的值', function() { 
        ['c', 'cmaj7', 'f', 'am', 'dm', 'g', 'e7'].forEach(function(i) {
            expect(allChords).to.include(i);
        });
    });
    it('labelCounts 是否有 labelName', function() { 
        expect(labelCounts).to.include.keys(labelName);
    });
});

// train(iWillFollowYouIntoTheDark, 'medium');
describe('method # train # train(  ["f", "dm", "bb", "c", "a", "bbm"] , "medium" )', function() {
    subclassTagArr = iWillFollowYouIntoTheDark;
    labelName = 'medium';
    train(subclassTagArr, labelName);
    it('labelName是否為字串', function() { 
        expect(labelName).to.be.a('string');
    });
    it('subclassTagArr是否為數組', function() { 
        expect(subclassTagArr).to.be.an('array');
    });
    it('labels 數組是否有labelName', function() { 
        expect(labels).to.include('easy');
    });
    it('allChords 數組是否有 subclassTagArr所有的值', function() { 
        ['c', 'cmaj7', 'f', 'am', 'dm', 'g', 'e7'].forEach(function(i) {
            expect(allChords).to.include(i);
        });
    });
    it('labelCounts 是否有 labelName', function() { 
        expect(labelCounts).to.include.keys(labelName);
    });
});

// train(babyOneMoreTime, 'medium');
describe('method # train # train( ["cm", "g", "bb", "eb", "fm", "ab"] , "medium" )', function() {
    subclassTagArr = babyOneMoreTime;
    labelName = 'medium';
    train(subclassTagArr, labelName);
    it('labelName是否為字串', function() { 
        expect(labelName).to.be.a('string');
    });
    it('subclassTagArr是否為數組', function() { 
        expect(subclassTagArr).to.be.an('array');
    });
    it('labels 數組是否有labelName', function() { 
        expect(labels).to.include('easy');
    });
    it('allChords 數組是否有 subclassTagArr所有的值', function() { 
        ['c', 'cmaj7', 'f', 'am', 'dm', 'g', 'e7'].forEach(function(i) {
            expect(allChords).to.include(i);
        });
    });
    it('labelCounts 是否有 labelName', function() { 
        expect(labelCounts).to.include.keys(labelName);
    });
});


// train(creep, 'medium');
describe('method # train # train( ["g", "gsus4", "b", "bsus4", "c", "cmsus4", "cm6"] , "medium" )', function() {
    subclassTagArr = creep;
    labelName = 'medium';
    train(subclassTagArr, labelName);
    it('labelName是否為字串', function() { 
        expect(labelName).to.be.a('string');
    });
    it('subclassTagArr是否為數組', function() { 
        expect(subclassTagArr).to.be.an('array');
    });
    it('labels 數組是否有labelName', function() { 
        expect(labels).to.include('easy');
    });
    it('allChords 數組是否有 subclassTagArr所有的值', function() { 
        ['c', 'cmaj7', 'f', 'am', 'dm', 'g', 'e7'].forEach(function(i) {
            expect(allChords).to.include(i);
        });
    });
    it('labelCounts 是否有 labelName', function() { 
        expect(labelCounts).to.include.keys(labelName);
    });
});

// train(paperBag, 'hard');
describe('method # train # train( ["bm7", "e", "c", "g", "b7", "f", "em", "a", "cmaj7","em7", "a7", "f7", "b"] , "hard" )', function() {
    subclassTagArr = paperBag;
    labelName = 'hard';
    train(subclassTagArr, labelName);
    it('labelName是否為字串', function() { 
        expect(labelName).to.be.a('string');
    });
    it('subclassTagArr是否為數組', function() { 
        expect(subclassTagArr).to.be.an('array');
    });
    it('labels 數組是否有labelName', function() { 
        expect(labels).to.include('easy');
    });
    it('allChords 數組是否有 subclassTagArr所有的值', function() { 
        ['c', 'cmaj7', 'f', 'am', 'dm', 'g', 'e7'].forEach(function(i) {
            expect(allChords).to.include(i);
        });
    });
    it('labelCounts 是否有 labelName', function() { 
        expect(labelCounts).to.include.keys(labelName);
    });
});

// train(toxic, 'hard');
describe('method # train # train( ["cm", "eb", "g", "cdim", "eb7", "d7", "db7", "ab", "gmaj7","g7"] , "hard" )', function() {
    subclassTagArr = toxic;
    labelName = 'hard';
    train(subclassTagArr, labelName);
    it('labelName是否為字串', function() { 
        expect(labelName).to.be.a('string');
    });
    it('subclassTagArr是否為數組', function() { 
        expect(subclassTagArr).to.be.an('array');
    });
    it('labels 數組是否有labelName', function() { 
        expect(labels).to.include('easy');
    });
    it('allChords 數組是否有 subclassTagArr所有的值', function() { 
        ['c', 'cmaj7', 'f', 'am', 'dm', 'g', 'e7'].forEach(function(i) {
            expect(allChords).to.include(i);
        });
    });
    it('labelCounts 是否有 labelName', function() { 
        expect(labelCounts).to.include.keys(labelName);
    });
});

// train(bulletproof, 'hard');
describe('method # train # train( ["d#m", "g#", "b", "f#", "g#m", "c#"] , "hard" )', function() {
    subclassTagArr = bulletproof;
    labelName = 'hard';
    train(subclassTagArr, labelName);
    it('labelName是否為字串', function() { 
        expect(labelName).to.be.a('string');
    });
    it('subclassTagArr是否為數組', function() { 
        expect(subclassTagArr).to.be.an('array');
    });
    it('labels 數組是否有labelName', function() { 
        expect(labels).to.include('easy');
    });
    it('allChords 數組是否有 subclassTagArr所有的值', function() { 
        ['c', 'cmaj7', 'f', 'am', 'dm', 'g', 'e7'].forEach(function(i) {
            expect(allChords).to.include(i);
        });
    });
    it('labelCounts 是否有 labelName', function() { 
        expect(labelCounts).to.include.keys(labelName);
    });
});

//songs & labels & allChords & labelCounts
songsResult = [["easy",["c","cmaj7","f","am","dm","g","e7"]],["easy",["c","em","f","g","am"]],["easy",["c","g","f"]],["medium",["f","dm","bb","c","a","bbm"]],["medium",["cm","g","bb","eb","fm","ab"]],["medium",["g","gsus4","b","bsus4","c","cmsus4","cm6"]],["hard",["bm7","e","c","g","b7","f","em","a","cmaj7","em7","a7","f7","b"]],["hard",["cm","eb","g","cdim","eb7","d7","db7","ab","gmaj7","g7"]],["hard",["d#m","g#","b","f#","g#m","c#"]]];
labelsResult = ["easy","easy","easy","medium","medium","medium","hard","hard","hard"];
allChordsResult =["c","cmaj7","f","am","dm","g","e7","em","bb","a","bbm","cm","eb","fm","ab","gsus4","b","bsus4","cmsus4","cm6","bm7","e","b7","em7","a7","f7","cdim","eb7","d7","db7","gmaj7","g7","d#m","g#","f#","g#m","c#"];

describe('train()總計', function() {
    it('songs[]是否正確', function() { 
        expect(songs).to.be.deep.equal(songsResult);
    });    
    it('labels[]是否正確', function() { 
        expect(labels).to.be.deep.equal(labelsResult);
    });
    it('allChords[]是否正確', function() { 
        expect(allChords).to.be.deep.equal(allChordsResult);
    });
    it('labelCounts[easy]數量是否正確', function() { 
        if(labelCounts['easy'] != 3){
            throw new Error("easy數量錯誤");
        }
    });
    it('labelCounts[medium]數量是否正確', function() { 
        if(labelCounts['medium'] != 3){
            throw new Error("medium數量錯誤");
        }
    });
    it('labelCounts[hard]數量是否正確', function() { 
        if(labelCounts['hard'] != 3){
            throw new Error("hard數量錯誤");
        }
    });
});



// -------------------------------------------------------------------------- //
// --------------------- setLabelProbabilities()單元測試 --------------------- //
// -------------------------------------------------------------------------- //
// setLabelProbabilities();
describe('method # setLabelProbabilities()', function() {
    setLabelProbabilities();
    it('labelCounts值有誤', function() { 
        for (const [key, value] of Object.entries(labelCounts)) {
            if(key == 'easy'){
                if(value != 3){
                    throw new Error("labelCounts['easy']數量錯誤");
                }
            }else if(key == 'medium'){
                if(value != 3){
                    throw new Error("labelCounts['medium']數量錯誤");
                }
            }else if(key == 'hard'){
                if(value != 3){
                    throw new Error("labelCounts['hard']數量錯誤");
                }
            }
        }
    });
    it('呼叫train()的次有誤', function() { 
        expect(songs.length ).to.be.deep.equal(9);
    });
    it('labelProbabilities計算有誤', function() { 
        for (const [key, value] of Object.entries(labelProbabilities)) {
            if(key == 'easy'){
                if(value != 0.3333333333333333){
                    throw new Error("labelCounts['easy']數量計算有錯誤");
                }
            }else if(key == 'medium'){
                if(value != 0.3333333333333333){
                    throw new Error("labelCounts['medium']數量計算有錯誤");
                }
            }else if(key == 'hard'){
                if(value != 0.3333333333333333){
                    throw new Error("labelCounts['hard']數量計算有錯誤");
                }
            }
        }
    });
});


// -------------------------------------------------------------------------- //
// -------------------- setChordCountsInLabels() 單元測試 -------------------- //
// -------------------------------------------------------------------------- //
// setChordCountsInLabels();
chordCountsInLabelsResult = {"easy":{"c":3,"cmaj7":1,"f":3,"am":2,"dm":1,"g":3,"e7":1,"em":1},"medium":{"f":1,"dm":1,"bb":2,"c":2,"a":1,"bbm":1,"cm":1,"g":2,"eb":1,"fm":1,"ab":1,"gsus4":1,"b":1,"bsus4":1,"cmsus4":1,"cm6":1},"hard":{"bm7":1,"e":1,"c":1,"g":2,"b7":1,"f":1,"em":1,"a":1,"cmaj7":1,"em7":1,"a7":1,"f7":1,"b":2,"cm":1,"eb":1,"cdim":1,"eb7":1,"d7":1,"db7":1,"ab":1,"gmaj7":1,"g7":1,"d#m":1,"g#":1,"f#":1,"g#m":1,"c#":1}};
describe('method # setChordCountsInLabels()', function() {
    setChordCountsInLabels();
    // console.log(chordCountsInLabels)

    it('songs[]是否正確', function() { 
        expect(songs).to.be.deep.equal(songsResult);
    });
    it('chordCountsInLabels是否為{}', function() { 
        expect(chordCountsInLabels).to.be.an('object');
    });
    let chordCountsInLabelsNewPos = JSON.parse(JSON.stringify(chordCountsInLabels));
    it('chordCountsInLabels計算錯誤', function() { 
        expect(chordCountsInLabelsNewPos).to.be.deep.equal(chordCountsInLabelsResult);
    });
});
// -------------------------------------------------------------------------- //
// ----------------- setProbabilityOfChordsInLabels()單元測試 ----------------- //
// -------------------------------------------------------------------------- //
// setProbabilityOfChordsInLabels();
runSetProOfChordsInLabelsRes = {"easy":{"c":0.3333333333333333,"cmaj7":0.1111111111111111,"f":0.3333333333333333,"am":0.2222222222222222,"dm":0.1111111111111111,"g":0.3333333333333333,"e7":0.1111111111111111,"em":0.1111111111111111},"medium":{"f":0.1111111111111111,"dm":0.1111111111111111,"bb":0.2222222222222222,"c":0.2222222222222222,"a":0.1111111111111111,"bbm":0.1111111111111111,"cm":0.1111111111111111,"g":0.2222222222222222,"eb":0.1111111111111111,"fm":0.1111111111111111,"ab":0.1111111111111111,"gsus4":0.1111111111111111,"b":0.1111111111111111,"bsus4":0.1111111111111111,"cmsus4":0.1111111111111111,"cm6":0.1111111111111111},"hard":{"bm7":0.1111111111111111,"e":0.1111111111111111,"c":0.1111111111111111,"g":0.2222222222222222,"b7":0.1111111111111111,"f":0.1111111111111111,"em":0.1111111111111111,"a":0.1111111111111111,"cmaj7":0.1111111111111111,"em7":0.1111111111111111,"a7":0.1111111111111111,"f7":0.1111111111111111,"b":0.2222222222222222,"cm":0.1111111111111111,"eb":0.1111111111111111,"cdim":0.1111111111111111,"eb7":0.1111111111111111,"d7":0.1111111111111111,"db7":0.1111111111111111,"ab":0.1111111111111111,"gmaj7":0.1111111111111111,"g7":0.1111111111111111,"d#m":0.1111111111111111,"g#":0.1111111111111111,"f#":0.1111111111111111,"g#m":0.1111111111111111,"c#":0.1111111111111111}};
describe('method # setProbabilityOfChordsInLabels()', function() {
    setProbabilityOfChordsInLabels();
    it('呼叫train()的次有誤', function() { 
        expect(songs.length ).to.be.deep.equal(9);
    });
    it('chordCountsInLabels結果是否正確', function() { 
        expect(chordCountsInLabels).to.be.deep.equal(runSetProOfChordsInLabelsRes);
    });
});
// -------------------------------------------------------------------------- //
// ---------------------------- classify()單元測試 ---------------------------- //
// -------------------------------------------------------------------------- //
// labelProbabilitiesResult



classifyA = {"easy":2.023094827160494,"medium":1.855758613168724,"hard":1.855758613168724};
describe('method # classify( ["d", "g", "e", "dm"] )', function() {
    classify(['d', 'g', 'e', 'dm']);
    it('labelProbabilities計算有誤', function() { 
        for (const [key, value] of Object.entries(labelProbabilities)) {
            if(key == 'easy'){
                if(value != 0.3333333333333333){
                    throw new Error("labelCounts['easy']數量計算有錯誤");
                }
            }else if(key == 'medium'){
                if(value != 0.3333333333333333){
                    throw new Error("labelCounts['medium']數量計算有錯誤");
                }
            }else if(key == 'hard'){
                if(value != 0.3333333333333333){
                    throw new Error("labelCounts['hard']數量計算有錯誤");
                }
            }
        }
    });

    let newClassifiedByA = JSON.parse(JSON.stringify(classified));
    it('classified是否計算錯誤', function() { 
        expect(newClassifiedByA).to.be.deep.equal(classifyA);
    });
});

classifyB = {"easy":1.3433333333333333,"medium":1.5060259259259259,"hard":1.6884223991769547};
describe('method # classify( ["f#m7", "a", "dadd9", "dmaj7", "bm", "bm7", "d", "f#m"] )', function() {
    classify(['f#m7', 'a', 'dadd9', 'dmaj7', 'bm', 'bm7', 'd', 'f#m']);
    it('labelProbabilities計算有誤', function() { 
        for (const [key, value] of Object.entries(labelProbabilities)) {
            if(key == 'easy'){
                if(value != 0.3333333333333333){
                    throw new Error("labelCounts['easy']數量計算有錯誤");
                }
            }else if(key == 'medium'){
                if(value != 0.3333333333333333){
                    throw new Error("labelCounts['medium']數量計算有錯誤");
                }
            }else if(key == 'hard'){
                if(value != 0.3333333333333333){
                    throw new Error("labelCounts['hard']數量計算有錯誤");
                }
            }
        }
    });
    let newClassifiedByB = JSON.parse(JSON.stringify(classified));
    it('classified是否計算錯誤', function() { 
        expect(newClassifiedByB).to.be.deep.equal(classifyB);
    });

});

// -------------------------------------------------------------------------- //
// -------------------------------------------------------------------------- //
// -------------------------------------------------------------------------- //
// 程式優化修改部分
// 1. setLabelProbabilities()裡的 var numberOfSongs = getNumberOfSongs(); 提到 forEach 外面
// 2. setProbabilityOfChordsInLabels()裡的 songs.length 呼叫 getNumberOfSongs() 
// 3. classify() 裡的 var classified{} 拉到全域變數定義 在外面呼叫 classify() 方便我做單元測試結果比對
// 4. classify() 1.01 拉出來建立 addNumValue 變數
// 5. setLabelProbabilities() 改變使用 Object.entries()
// 6. setChordCountsInLabels() 改變使用 for of 處理 並重新命名

// -------------------------------------------------------------------------- //
// -------------------------------------------------------------------------- //
// -------------------------------------------------------------------------- //

//cd test-box 
//npm test








