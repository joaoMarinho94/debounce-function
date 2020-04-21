function debounceEvent(fn, wait = 1000, time) {
  return function () {
    document.getElementById("loading").classList.remove("none");
    document.getElementById("icon").classList.add("none");
    clearTimeout(time)
    time = setTimeout(() => {
      fn.apply(this, arguments)
    }, wait);
  }
}

function handleKeyUp(event) {
  filterUsers(event.target.value)
    .then(users => {
      const content = document.getElementById("content");
      while (content.hasChildNodes()) {
        content.removeChild(content.firstChild);
      }
      if (!users.length) printUsers("sorry, we didn't find")
      users.forEach(user => {
        printUsers(user.name)
      })
      document.getElementById("icon").classList.remove("none");
      document.getElementById("loading").classList.add("none");
      console.log(users.map(user => user.name))
    })
}

function printUsers(name) {
  const p = document.createElement("P")
  const t = document.createTextNode(name)
  p.appendChild(t)
  content.appendChild(p);
}

const filterUsers = async (name) =>
  fetch(`https://jsonplaceholder.typicode.com/users?name_like=${name}`)
    .then(res => res.json())

document.querySelector("input").
  addEventListener("keyup", debounceEvent(handleKeyUp, 1000))