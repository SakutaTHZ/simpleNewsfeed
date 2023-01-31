const cards = document.querySelectorAll(".card")
let posts = [
    {name:"Sakuta",imageSrc:"images/loli.png",description:"This is a loli picture i drew"},
    {name:"Timmy",imageSrc:"images/powy icon, chainsaw man.jpg",description:"Pow Pow for life. I hope she dont die in the next chapter"},
    {name:"Aqua",imageSrc:"images/31dcb2c2-8a35-48eb-a087-5c8f4e060ea9.jpg",description:"Be water my friend. Stay calm. Stay Hydrated"},
    {name:"Saber",imageSrc:"images/Abigail [Fate].jpg",description:"Dont ask me to explain fate universe. Even i am confused"},
    {name:"LAM",imageSrc:"images/Character Art - LAM.jpg",description:"Its just lam. Dont call me lamburger"},
    {name:"CJGoat",imageSrc:"images/Cj.jpg",description:"CJ tech les go"},
    {name:"Annonymous",imageSrc:"images/download (3).jpg",description:"I just drew it. I dont remember how i did that"},
    {name:"Kawaii",imageSrc:"images/Kawaii girl icon pfp Anime.jpg",description:"Cute girls are the best!!! Until the FBI show up"},
    {name:"ZumiZum",imageSrc:"images/水視ずみ🐟 (@ZumiZumi1254).jpg",description:"No comments yet. Add one to start the conversation."}
]

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

const cardContainer = document.querySelector(".cardContainer")

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        entry.target.classList.toggle("show",entry.isIntersecting)
        // if u want to stop doing animations to the loaded ones
        // if(entry.isIntersecting) observer.unobserve(entry.target)
    })
},{
    threshold : 0,
    // rootMargin : "-100px",
})

cards.forEach(card =>{
    observer.observe(card);
})

const lastCardObserver = new IntersectionObserver(entries =>{
    const lastCard = entries[0]
    if(!lastCard.isIntersecting) return
    loadNewCards()
    lastCardObserver.unobserve(lastCard.target)
    lastCardObserver.observe(document.querySelector(".card:last-child"))
},{})

lastCardObserver.observe(document.querySelector(".card:last-child"))

function shuffleImages(){
    var testresult = posts[Math.floor(Math.random() * posts.length)]
    return testresult
}

function loadNewCards(){
    for (let i = 0; i < 10; i++) {
        const card = document.createElement("div");
        card.innerHTML = `
                <div class="profile">
                    <img src="${shuffleImages().imageSrc}">
                    <span>${shuffleImages().name}</span>
                </div>
                <div class="details">
                <p>
                ${shuffleImages().description}
                </p>
                <span>${randomDate(new Date(2012, 0, 1), new Date())}</span>
                </div>
                <img src="${shuffleImages().imageSrc}" alt="">
                <div class="actions">
                    <button>
                        <span class="material-symbols-outlined">
                            thumb_up
                        </span>
                    </button>
                    <button>
                        <span class="material-symbols-outlined">
                            thumb_down
                        </span>
                    </button>
                </div>`
        card.classList.add("card")
        observer.observe(card)
        cardContainer.append(card)
    }
}

const hero = document.querySelector(".hero")
//for mouse trails
function generateCircles(){
    for(let i=0; i<10; i++){
        const circle = document.createElement("div")
        circle.classList.add("circle")
        hero.append(circle)
    }
}
generateCircles();

const cords = { x:0 , y:0}
const circles = document.querySelectorAll(".circle")

circles.forEach(function (circle){
    circle.x = 0;
    circle.y = 0;
})

document.addEventListener("mousemove", function(e){
    cords.x = e.clientX;
    cords.y = e.clientY;
})

function animateCircles(){
    let x = cords.x;
    let y = cords.y;
    circles.forEach(function (circle,index){
        circle.style.left = x-12 + "px";
        circle.style.top = y-12 + "px";

        circle.style.scale = (circles.length -index) /10

        circle.x = x;
        circle.y = y;

        const nextCircle = circles[index +1] || circles[0]
        x+= (nextCircle.x -x) *0.3
        y+= (nextCircle.y -y) *0.3
    })

    requestAnimationFrame(animateCircles)
}
animateCircles();

// Creepy eyes
document.addEventListener('mousemove',(e)=>{
    document.querySelector('.hero').style.opacity = 1;
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const anchor = document.getElementById('avatar')
    const rekt = anchor.getBoundingClientRect();
    const anchorX = rekt.left + rekt.width /2;
    const anchorY = rekt.top + rekt.height /2;

    const angleDeg = angle(mouseX, mouseY, anchorX, anchorY);
    const eyes = document.querySelectorAll('.eye')
    eyes.forEach(eye => {
        if(angleDeg <= -52){
            eye.style.transform = `rotate(${0}deg)`
            document.querySelector('.characterChat').style.opacity = 1;
        }else{
            eye.style.transform = `rotate(${-(50+angleDeg)}deg)`
            document.querySelector('.characterChat').style.opacity = 0;
        }
    })
})

function angle(cx,cy,ey,ex){
    const dy = ey - cy;
    const dx = ex - cx;
    const rad = Math.atan2(dy,dx);
    const deg = rad * 180 /Math.PI;
    return deg;
}

const pagetips = ["Watch Chainsaw man","Anya is the cutest","Never gonna give u up","Ohio","Konichiwa","Willy Wiga Kill that ...","Owae ma mou sindeiru","Play Genshin Impact"]
const tips = document.querySelector('.characterChat')
setInterval(
    function () {
        tips.innerHTML = pagetips[Math.floor(Math.random() * pagetips.length)]
    }
, 3000);

function changed(){
    console.log('changed');
}