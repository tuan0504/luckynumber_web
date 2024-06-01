var selectedNumbers = [];
var clickEvents = [];
var dialog;

var MIN = 6;
var MAX = 9;
var suggestResults = [];
var maxSuggest = 5;

const config655 = {};

function fetchRemoteConfigs655() {
    if(isFetchRemoteConfig655(config655)) {
        displayProcessing(true);

        var fetchURl = "https://2wqgbuiqxca7rdig3xgo4juw2a0qdobs.lambda-url.ap-southeast-1.on.aws"
        fetch(fetchURl)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if(data.session != undefined && data.session.length > 0)
                    config655.session = data.session;
                if(data.jackpot != undefined && data.jackpot.length > 0)
                    config655.jackpot = data.jackpot;
                if(data.prize1 != undefined && data.prize1.length > 0)
                    config655.prize1 = data.prize1;
                if(data.randomsize != undefined && data.randomsize.length > 0)
                    config655.randomsize = data.randomsize;
                
                processConfigs655(config655)
                setCookie("remoteConfig655", JSON.stringify(config655));
            })
            .catch(error => { console.log(error) })
            .finally(displayProcessing(false))
    } else {
        processConfigs655(config655);
    }
}

function isFetchRemoteConfig655(config655) {
    resetConfigs655(config655);
    var cookieConfig655 = getCookie("remoteConfig655");
    try {
        if(cookieConfig655 != undefined) {
            var localConfig = JSON.parse(cookieConfig655);
            if(localConfig.length > 3 && localConfig.jackpot.length > 10 
                && localConfig.prize1 > 10 && localConfig.session > 0) {
                config655.session = localConfig.session;
                config655.jackpot = localConfig.jackpot;
                config655.prize1 = localConfig.prize1;
                config655.randomsize = localConfig.randomsize;
                return false
            }
        }
    } catch (error) {
        console.log(error);
    }
    return true;
}
function resetConfigs655(config655) {
    config655.session = "kế tiếp";
    config655.jackpot = "1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55";
    config655.prize1 = "1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55";
    config655.randomsize = 7;
}


function processConfigs655(config655) {
    var txtSession = document.getElementById("vietlot_655_suggest_title");
    txtSession.innerHTML = `Gợi ý số dễ trúng ở kỳ quay <b>${config655.session}</b>.`;

    var txtJackpot = document.getElementById("vietlot_655_suggest_jackpot");
    var txtJack0 = document.getElementById("vietlot_655_suggest_jackpot_0");
    var txtJack1 = document.getElementById("vietlot_655_suggest_jackpot_1");
    var txtJack2 = document.getElementById("vietlot_655_suggest_jackpot_2");
    var txtJack3 = document.getElementById("vietlot_655_suggest_jackpot_3");
    var txtJack4 = document.getElementById("vietlot_655_suggest_jackpot_4");
    var txtJack5 = document.getElementById("vietlot_655_suggest_jackpot_5");

    
    var numbersJ = getNumbers(config655.jackpot);
    var countJ = numbersJ.length;
    txtJackpot.innerHTML = `Bộ số Jackpot 2 có <b>${countJ}</b> số :`;

    txtJack0.innerHTML = `${filterMinMax(numbersJ,1,9)}`;
    txtJack1.innerHTML = `${filterMinMax(numbersJ,10,19)}`;
    txtJack2.innerHTML = `${filterMinMax(numbersJ,20,29)}`;
    txtJack3.innerHTML = `${filterMinMax(numbersJ,30,39)}`;
    txtJack4.innerHTML = `${filterMinMax(numbersJ,40,49)}`;
    txtJack5.innerHTML = `${filterMinMax(numbersJ,50,55)}`;


    var txtprize1 = document.getElementById("vietlot_655_suggest_prize1");
    var txtprize10 = document.getElementById("vietlot_655_suggest_prize1_0");
    var txtprize11 = document.getElementById("vietlot_655_suggest_prize1_1");
    var txtprize12 = document.getElementById("vietlot_655_suggest_prize1_2");
    var txtprize13 = document.getElementById("vietlot_655_suggest_prize1_3");
    var txtprize14 = document.getElementById("vietlot_655_suggest_prize1_4");
    var txtprize15 = document.getElementById("vietlot_655_suggest_prize1_5");

    var numbersP1 = getNumbers(config655.prize1);
    var countP1 = numbersP1.length;
    txtprize1.innerHTML = `Bộ số Giải nhất có <b>${countP1}</b> số :`;

    txtprize10.innerHTML = `${filterMinMax(numbersP1,1,9)}`;
    txtprize11.innerHTML = `${filterMinMax(numbersP1,10,19)}`;
    txtprize12.innerHTML = `${filterMinMax(numbersP1,20,29)}`;
    txtprize13.innerHTML = `${filterMinMax(numbersP1,30,39)}`;
    txtprize14.innerHTML = `${filterMinMax(numbersP1,40,49)}`;
    txtprize15.innerHTML = `${filterMinMax(numbersP1,50,55)}`;
}

// Function to toggle number selection
function toggleNumber(cell) {
    var number = parseInt(cell.textContent);
    var index = selectedNumbers.indexOf(number);

    if (index === -1) {
        if (selectedNumbers.length >= MAX) {
            alert(`Bạn chỉ có thể chọn tối đa ${MAX} số.`);
            return;
        }
        selectedNumbers.push(number);
        cell.classList.add("selected");
    } else {
        selectedNumbers.splice(index, 1);
        cell.classList.remove("selected");
    }
}

// Function to submit selected numbers
function submitNumbers(txtInput) {
    if (selectedNumbers.length < MIN || selectedNumbers.length > MAX) {
        alert(`Hãy chọn tối thiểu ${MIN} số và tối đa ${MAX} số.`);
        return;
    }

    var txtInput = document.getElementById("numbers_vietlot655");
    var selected = selectedNumbers.map(Number);
    txtInput.value = selected.sort(function(a,b) { return a - b;}).join(" ");
    closeDialog();
}

// Function to open the dialog
function openDialog() {
    dialog = document.getElementById("picknumber");
    dialog.style.display = "block";
    selectedNumbers.length = 0;

    var tds = document.querySelectorAll('#pick655 td');
    tds.forEach(function(td, index) {
        if(clickEvents[index] == undefined) {
            clickEvents[index] = function() { toggleNumber(td) } 
            td.addEventListener('click', clickEvents[index]);
        }
    });
}

// Function to close the dialog
function closeDialog() {
    var tds = document.querySelectorAll('#pick655 td');
    tds.forEach(function(td) {
        td.classList.remove("selected");
    });
    dialog.style.display = "none";
}

// Function to submit number to Server
function submitNumber() {
    var txtInput = document.getElementById("numbers_vietlot655");
    var result = document.getElementById("vietlot_655_result");
    
    // Check if the checkbox is checked
    if (validateNumbers()) {
        //reset
        result.style.display = "none";
        displayProcessing(true);

        var fetchURl = "https://2wqgbuiqxca7rdig3xgo4juw2a0qdobs.lambda-url.ap-southeast-1.on.aws/?token=" + txtInput.value
        console.log(fetchURl)
        fetch(fetchURl)
            .then(response => response.json())
            .then(data => {
                displayResultCheck655(data);
            })
            .catch(error => {
                alert(error)
            })
            .finally(
                displayProcessing(false)
            )
    }
}

// Function to validate submit numbers
function validateNumbers() {
    var checkbox = document.getElementById("cb_policy_655");
    var txtInput = document.getElementById("numbers_vietlot655");
    var button = document.getElementById("vietlot655_picknumber");

    const count = countwords(txtInput.value);
    
    if(!checkbox.checked) {
       alert("Bạn vẫn chưa đồng ý điều khoản sử dụng");
       checkbox.focus();
       return false; 
    } else if (count < MIN || count > MAX) {
        alert(`Bộ số không khớp với yêu cầu của hệ thống. Vui lòng sử dụng chức năng "Chọn bộ số" để đảm bảo chính xác.`);
        button.focus();
        return false;
    }

    return true;
}

function displayResultCheck655(data) {
    var result = document.getElementById("vietlot_655_result");
    var txtInput = document.getElementById("numbers_vietlot655");
    result.style.display = "flex";

    console.log(data);

    const length = countwords(txtInput.value);
    const totalProbability = 28989675;

    var first = data.prize1;
    var second = data.prize2;
    var third = data.prize3;
    var jack2 = data.jack2;
    var jack1 = data.jack1;
    var level = data.levelresult;

    if (level == undefined) {
        level = 1;
    }
    if(first == undefined) {
        first = (combinations(length, 5)*combinations(55-length, 1))/totalProbability;
    } 
    if(second == undefined) {
        second = (combinations(length, 4)*combinations(55-length, 2))/totalProbability;
    } 
    if(third == undefined) {
        third = (combinations(length, 3)*combinations(55-length, 3))/totalProbability;
    } 
    if(jack2 == undefined) {
        jack2 = combinations(length, 5)/totalProbability;
    } 
    if(jack1 == undefined) {
        jack1 = combinations(length, 6)/totalProbability;        
    }

    var session = data.session;
    
    var per1 = first*100;
    var per2 = second*100;
    var per3 = third*100;
    var j2 = jack2*100;
    var j1 = jack1*100;
    var total = per1 + per2 + per3 + j2 + j1

    var txtSession = document.getElementById("vietlot_655_sesion");
    var txt1st = document.getElementById("vietlot_655_1st");
    var txt2nd = document.getElementById("vietlot_655_2nd");
    var txt3rd = document.getElementById("vietlot_655_3rd");
    var txtjack2 = document.getElementById("vietlot_655_jack2");
    var txtjack1 = document.getElementById("vietlot_655_jack1");

    txtSession.innerHTML = `Ở kỳ quay: <b>${session}</b> khả năng trúng giải của bạn là : <b>${total.toFixed(5)}</b>%.`;
    txt3rd.innerHTML = `Khả năng trúng giải ba là ~ <b>${per3.toFixed(5)}%</b>`;
    txt2nd.innerHTML = `Khả năng trúng giải nhì là ~ <b>${per2.toFixed(5)}%</b>`;
    txt1st.innerHTML = `Khả năng trúng giải nhất là ~ <b>${per1.toFixed(5)}%</b>`;
    txtjack2.innerHTML = `Khả năng trúng jackpot2 là ~ <b>${j2.toFixed(7)}%</b>`;
    txtjack1.innerHTML = `Khả năng trúng jackpot1 là ~ <b>${j1.toFixed(7)}%</b>`;

    getSuggest655(level, length);
}

function getSuggest655(level, length) {
    var suggest = document.getElementById("vietlot_655_suggest");

    if (level == 3) {
        suggest.innerHTML = `Khả năng trúng của bộ số này là <b>Cao</b>, nên cân nhắc.`
    } else if (level == 2) {
        suggest.innerHTML = `Khả năng trúng của bộ số này là <b>Trung Bình</b>, có thể cân nhắc.`
    } else {
        suggest.innerHTML = `Khả năng trúng của bộ số này là <b>Thấp</b>, kiến nghị không dùng.`
    }
}

function suggestJackpot655() {
    var txtInput = document.getElementById("numbers_vietlot655");
    var randomNumbers = "";
    if(countwords(config655.jackpot) < 40) {
        randomNumbers = pickRandom(config655.jackpot, config655.randomsize)
    } else {
        randomNumbers = pickRandom(config655.prize1, 7)
    }
    txtInput.value = randomNumbers;
    txtInput.focus();        
}

function displayProcessing(isDisplay) {
    var processing_655 = document.getElementById("processing_655");
    if(isDisplay) {
        processing_655.style.display = "block"
    } else {
        processing_655.style.display = "none"
    }
}