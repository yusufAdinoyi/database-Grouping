let fullnameUsed;
let matricnumberUsed;
let group;
class UI {
  static showAlert(msg, className) {
    const div = document.querySelector('#alert-box-container')
    div.className = `alert ${className}`;

    div.innerText = msg

    setTimeout(() => {

        document.querySelector('#alert-box-container').className = ""
        document.querySelector('#alert-box-container').innerText = "";
    }, 3000);
  }
  static changeBallot(){
    const ballotA = document.querySelector('.ballotA');
    const ballotB = document.querySelector('.ballotB');
    const ballotC = document.querySelector('.ballotC');
    const ballotD = document.querySelector('.ballotD');
    const ballotNo = Math.floor((Math.random() * 4) + 1);
    if(ballotNo === 1){
      ballotA.innerHTML = 'A'
      ballotB.innerHTML = 'B'
      ballotC.innerHTML = 'C'
      ballotD.innerHTML = 'D'
    }else if(ballotNo === 2){
      ballotA.innerHTML = 'B'
      ballotB.innerHTML = 'D'
      ballotC.innerHTML = 'A'
      ballotD.innerHTML = 'C'
    }else if(ballotNo === 3){
      ballotA.innerHTML = 'D'
      ballotB.innerHTML = 'C'
      ballotC.innerHTML = 'B'
      ballotD.innerHTML = 'A'
    }else{
      ballotA.innerHTML = 'C'
      ballotB.innerHTML = 'A'
      ballotC.innerHTML = 'D'
      ballotD.innerHTML = 'B'
    }
  }
  static clearField(){
    document.querySelector('#fullname').value = '';
    document.querySelector('#matricno').value = '';
  }
  static closeFormOpenPanel(){
    document.querySelector('#ballot-panel').style.display = 'block';
    document.querySelector('#process-form').style.display = 'none';
  }
  static changeColor(){
    document.querySelectorAll('#ballot').forEach((ballot) => {
      ballot.style.color = '#fff';
    })
  }
}
// document.querySelector('.continue').addEventListener('click', (e) => {
//   document.querySelector('#ballot-panel').style.display = 'block';
// })
const processForm = document.querySelector('#process-form');
processForm.addEventListener('submit', (e) => {
  const fullname = document.querySelector('#fullname').value;
  const matno = document.querySelector('#matricno').value;
  console.log('am here')
  if(fullname === ''){
    UI.showAlert('Your full name is required', 'error')
  }
  else if(fullname !== '' && matno === ''){
    matricnumberUsed = 'NIL';
    UI.showAlert("No Mat Number, but don't worry, you can choose ballot", "success");
    fullnameUsed = fullname;
    setTimeout(() => {
      UI.clearField();
      UI.closeFormOpenPanel();
    },3000)
  }
  else{
    matricnumberUsed = matno;
    fullnameUsed = fullname;
    UI.showAlert("Successful, you will be redirect to choose a lot", "success");
    setTimeout(() => {
      UI.clearField();
      UI.closeFormOpenPanel();
    },3000)
  }
  e.preventDefault()
})

document.querySelector('.ballot-box').addEventListener('click', (e) => {
  group = e.target.textContent;
})


document.querySelector('.ballot-box').addEventListener('click', (e) => {
  group = e.target.textContent;
  UI.changeColor();

  setTimeout(() => {
    document.querySelector('#ballot-panel').innerHTML = `
    <form name="form" method="POST" data-netlify="true">
    <div class="groupItem">
    <input type="text" id="name" value="${fullnameUsed}"/>
    <input type="text" id="matricNo" value="${matricnumberUsed}"/>
    <input type="text" id="group" value="${group}"/>
    </div>
    <h1 class="my-2">Your <span class="primary-color">Details</span></h1>
    <table class="table table-dark table-striped">
      <tr>
        <td>Name</td><td>${fullnameUsed}</td>
      </tr>
      <tr>
        <td>Matric No.</td><td>${matricnumberUsed}</td>
      </tr>
      <tr>
        <td>Group</td><td>${group}</td>
      </tr>
    </table>
    <button type="submit" class="btn btn-primary">Save to Database</button>
    </form>
    `
  },3000)
})
document
  .querySelector("form")
  .addEventListener("submit", handleSubmit);

const handleSubmit = (e) => {
  e.preventDefault();
  let myForm = document.getElementById("name");
  let formData = new FormData(myForm);
  fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(formData).toString(),
  })
    .then(() => console.log("Form successfully submitted"))
    .catch((error) => alert(error));
};

UI.changeBallot();
