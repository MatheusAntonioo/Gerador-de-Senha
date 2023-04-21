const inputEl = document.querySelector("#password")
const uppercaseCheckEl = document.getElementById("uppercase-check")
const numberCheckEl = document.getElementById("number-check")
const symbolCheckEl = document.getElementById("symbol-check")
const securityIndicatorBarEl = document.getElementById("security-indicator-bar")
const divMessage = document.querySelector(".alert")
const msg = "Senha Copiada"

let passwordLength = 16

function generatePassword() {
  let chars = "abcdefghjkmnpqrstuvwxyz"

  const uppercaseChars = "ABCDEFGHJKLMNPQRSTUVWXYZ"
  const numberChars = "123456789"
  const symbolChars = "?!@#$%&*(){}[]"

  if (uppercaseCheckEl.checked) {
    chars += uppercaseChars
  }

  if (numberCheckEl.checked) {
    chars += numberChars
  }

  if (symbolCheckEl.checked) {
    chars += symbolChars
  }

  let password = ""

  for(let i = 0; i < passwordLength; i++) {
    const randomNumber = Math.floor(Math.random() * chars.length)
    password += chars.substring(randomNumber, randomNumber + 1)
  }

  inputEl.value = password
  calculateQuality()
  calculateFontSize()
}

function calculateQuality() {

  const percent = Math.round(
    (passwordLength / 64) * 35 + 
    (uppercaseCheckEl.checked ? 20 : 0) + 
    (numberCheckEl.checked ? 10 : 0) +
    (symbolCheckEl.checked ? 35 : 0)
  )

  securityIndicatorBarEl.style.width = `${percent}%`

  if (percent > 69) {
    //safe
    securityIndicatorBarEl.classList.remove("critical")
    securityIndicatorBarEl.classList.remove("warning")
    securityIndicatorBarEl.classList.add("safe")
  } else if (percent > 40) {
    //warning
    securityIndicatorBarEl.classList.remove("critical")
    securityIndicatorBarEl.classList.remove("safe")
    securityIndicatorBarEl.classList.add("warning")
  } else {
    securityIndicatorBarEl.classList.remove("safe")
    securityIndicatorBarEl.classList.remove("warning")
    securityIndicatorBarEl.classList.add("critical")
  }

  if (percent >= 100) {
    securityIndicatorBarEl.classList.add("completed")
  } else {
    securityIndicatorBarEl.classList.remove("completed")
  }
}

function calculateFontSize() {
  if(passwordLength > 45) {
    inputEl.classList.remove("font-sm")
    inputEl.classList.remove("font-xs")
    inputEl.classList.add("font-xxs")
  } else if(passwordLength > 32) {
    inputEl.classList.remove("font-sm")
    inputEl.classList.remove("font-xxs")
    inputEl.classList.add("font-xs")
  } else if(passwordLength > 22) {
    inputEl.classList.remove("font-xs")
    inputEl.classList.remove("font-xxs")
    inputEl.classList.add("font-sm")
  } else {
    inputEl.classList.remove("font-sm")
    inputEl.classList.remove("font-xs")
    inputEl.classList.remove("font-xxs")
  }
}

function copy(msg) {
  navigator.clipboard.writeText(inputEl.value)
  const message = document.createElement("div")
  message.classList.add("message")
  message.innerText = msg
  divMessage.appendChild(message)

  setTimeout(() => {
    message.style.display = "none"
  },1500)
}

function renew() {
  generatePassword()
}

const passwordLengthEl = document.querySelector("#password-length") // ajustando o evento da barra para ajustar a quantidade de caractere
passwordLengthEl.addEventListener("input", function() {
  passwordLength = passwordLengthEl.value
  document.querySelector("#password-length-text").innerText = passwordLength
  generatePassword()
})
uppercaseCheckEl.addEventListener("click", generatePassword)
numberCheckEl.addEventListener("click", generatePassword)
symbolCheckEl.addEventListener("click", generatePassword)

document.querySelector("#copy-1").addEventListener("click",() => {
  copy(msg)
}) // adicionando evento de copiar no botão copy
document.querySelector("#copy-2").addEventListener("click", () => {
  copy(msg)
})
document.querySelector("#renew").addEventListener("click", renew)

generatePassword()
