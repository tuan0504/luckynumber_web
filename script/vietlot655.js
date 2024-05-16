var selectedNumbers = [];
var clickEvents = [];
var dialog;
var submitButton;

var MIN = 6;
var MAX = 9;

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
    submitButton = document.getElementById("submit655");
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
    var processing_655 = document.getElementById("processing_655");
    var txtInput = document.getElementById("numbers_vietlot655");
    var result = document.getElementById("vietlot_655_result");
    
    // Check if the checkbox is checked
    if (validateNumbers()) {
        //reset
        result.style.visibility = "hidden";
        processing_655.style.display = "block"

        var fetchURl = "https://2wqgbuiqxca7rdig3xgo4juw2a0qdobs.lambda-url.ap-southeast-1.on.aws/?token=" + txtInput.value
        console.log(fetchURl)
        fetch(fetchURl)
            .then(response => response.json())
            .then(data => {
                displayResult(data);
            })
            .catch(error => {
                alert(error)
            })
            .finally(
                processing_655.style.display = "none"
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

function displayResult(data) {
    var result = document.getElementById("vietlot_655_result");
    var txtInput = document.getElementById("numbers_vietlot655");
    result.style.visibility = "visible";

    console.log(data);

    const length = countwords(txtInput.value);
    var totalProbability = 28989675;

    var first = data.prize1;
    var second = data.prize2;
    var third = data.prize3;
    var jack2 = data.jack2;
    var jack1 = data.jack1;

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

    getSuggest655(total, length);
}

function getSuggest655(total, length) {
    var defaultProbability = ((combinations(length, 3)*combinations(55 - length,3))/combinations(55,6))*100;

    var suggest = document.getElementById("vietlot_655_suggest");
    var times = total/defaultProbability;

    if(times < 3.5) {
        suggest.innerHTML = `Khả năng trúng của bộ số này là <b>Thấp</b>, kiến nghị không dùng.`
    } else if (times > 7.5) {
        suggest.innerHTML = `Khả năng trúng của bộ số này là <b>Cao</b>, nên cân nhắc.`
    } else {
        suggest.innerHTML = `Khả năng trúng của bộ số này là <b>Trung Bình</b>, có thể cân nhắc.`
    }
}

function combinations(n, r) 
{
  if( n < r || r < 0 ) {
      return 0;
  } else if (n == r || r == 0) {
    return 1;
  } else  {
    return combinations(n,r-1)*((n-r+1)/r);
  }
}

function countwords(input) {
    if (input.length === 0) return 0; // Returns 0 if the input is empty

    try {
        const numberSet = new Set();
        var numbers = input.trim().split(" ").map(Number);
        
        //validate numbers
        for(var i=0; i < numbers.length; i++) {
            var item = numbers[i];
            if(item < 1 || item > 55 || numberSet.has(item)) {
                return 0;
            }
            numberSet.add(item);
        }
        return numbers.length; // Returns the number of elements in the array 
    } catch(error) {
        console.log(error);
        return 0;
    }
}
