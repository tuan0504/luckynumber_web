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

function getNumbers(input) {
    try {
        if (input.length === 0) return []; // Returns 0 if the input is empty

        const numberSet = new Set();
        var numbers = input.trim().split(" ").map(Number);
        
        //validate numbers
        for(var i=0; i < numbers.length; i++) {
            var item = numbers[i];
            if(item < 1 || item > 55 || numberSet.has(item)) {
                return [];
            }
            numberSet.add(item);
        }
        return Array.from(numbers); // Returns the number of elements in the array 
    } catch(error) {
        console.log(error);
        return 0;
    }
}

function countwords(input) {
    try {
        var numbers = getNumbers(input);
        return numbers.length
    } catch(error) {
        console.log(error);
        return 0;
    }
}

function setCookie(name, value) {
    const d = new Date();
    d.setHours(23,59,59)
    let expires = "expires="+ d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
        c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
        }
    }
    return "";
}

function pickRandom(contents, size) {
    const result = new Set();
    var numbers = contents.split(" ").map(Number).filter( item => item != 0);
    
    for(var i = 0; i < size ; i++) {
      var randomIndex = Math.floor(Math.random()*numbers.length);
      while(true) {
        var item = numbers[randomIndex]
        if(!result.has(item)) {
          result.add(item);
          break;
        } else {
          randomIndex++;
        }
      }
    }
    return Array.from(result).sort(function(a,b) { return a - b;}).join(" ");
}