function buttonFunction() {
    Quagga.init({
        inputStream : {
          name : "Live",
          type : "LiveStream",
          target: document.querySelector('#viewport'),
          constraints: {
            facingMode: "environment",
            width : 300,
            height : 200
          },
          area : {
              top : "0%",
              right : "0%",
              left : "0%",
              bottom : "0%"
          }
        },
        decoder : {
          readers : ["code_128_reader", "upc_reader", "upc_e_reader", "ean_reader"],
          drawBoundingBox : true
        },
        locate : true,
        locator : {
            halfSample : true,
            patchSize : "medium"
        }
      }, function(err) {
          if (err) {
              console.log(err);
              return
          }
          Quagga.start();
      });
}

Quagga.onDetected(result => {
    alert(result);
    console.log(result);
})

function submitted() {
    alert("Parking Ticket successfully recorded! Enjoy your afternoon.");
    var firstName = document.getElementById('firstName').value;
    var lastName = document.getElementById('lastName').value;
    setCookie('fName', firstName, 365);
    setCookie('lName', lastName, 365);
}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
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

function checkCookie() {
    let fName = getCookie('fName');
    if (fName != '') {
        document.getElementById('firstName').value = fName;
    }
    let lName = getCookie('lName');
    if (lName != '') {
        document.getElementById('lastName').value = lName;
    }   
}