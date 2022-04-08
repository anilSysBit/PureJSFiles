let canvas = document.querySelector('canvas');
// console.log(canvas)

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext('2d');

// c.fillStyle = 'rgba(255,0,0,0.5)'
// c.fillRect(100,100,100,100);
// c.fillStyle = 'rgba(0,0,255,0.5)'
// c.fillRect(400,50,100,100);
// c.fillStyle = 'rgba(0,255,0,0.5)'
// c.fillRect(500,200,100,100);

// c.beginPath();
// c.moveTo(50,300);
// c.lineTo(300,100);
// c.lineTo(400,300);
// c.lineTo(500,100);
// c.strokeStyle = '#fa3455'
// c.stroke();



// // c.arc(x: Int, y :int , r:int, startAngle:float,endAngle:float, drawCounterCloclwise:Bool{false()})


// for(let i = 0; i < 120; i++){
//     let x = Math.random() * window.innerWidth;
//     let y = Math.random() * window.innerHeight;
//     let col1 = Math.floor(Math.random() * 222);
//     let col2 = Math.floor(Math.random() * 333);
//     let col3 = Math.floor(Math.random() * 444);
//     c.beginPath();
//     c.arc(x,y,30,0,Math.PI * 2, false);
//     c.strokeStyle = `rgb(${col1},${col2},${col3},1)`
//     c.stroke();
// }

// let x = Math.floor(Math.random() * 222);
// console.log(x)

//  --------------------------------------------------------------------
// let mouse = {
//     x:undefined,
//     y:undefined
// }
// let circleArray = [];
// window.addEventListener('mousemove',(event)=>{
//     console.log(event);
//     mouse.x = event.x;
//     mouse.y = event.y;
// })

// const init=()=>{
//     circleArray = [];
//     for (let i = 0; i < 800; i++) {
//         let radius = Math.random() * 3 + 1;
//         let x = Math.random() * (innerWidth - radius*2) + radius;
//         let y = Math.random() * (innerHeight - radius*2) + radius;
//         let dx = (Math.random() - 0.5);
//         let dy = (Math.random() - 0.5);
//         let circle = new Circle(x, y, dx, dy, radius);
//         circleArray.push(circle);
//     }
// }

// window.addEventListener('resize',()=>{
//     canvas.height = window.innerHeight;
//     canvas.width = window.innerWidth;

//     init();

// })

// let maxRadius = 40;
// // let minRadius = 2;

// const colorArray = [
//     '#025159',
//     '#F23005',
//     '#ffffff',
//     '#730202',
//     '#0D0D0D'
// ]
// // let col1 = Math.floor(Math.random() * 222);
// // let col2 = Math.floor(Math.random() * 333);
// // let col3 = Math.floor(Math.random() * 444);
// class Circle {
//     constructor(x, y, dx, dy, radius) {
//         this.x = x;
//         this.y = y;
//         this.dx = dx;
//         this.dy = dy;
//         this.radius = radius;
//         this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
//         this.minRadius = radius;
//         // this.strokeColor = `rgb(${col1},${col2},${col3},1)`;
//     }

//     draw = () => {
//         c.beginPath();
//         c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
//         // c.strokeStyle = this.strokeColor;
//         // c.stroke();
//         c.fillStyle = this.color
//         c.fill()
//     }

//     update = () => {
//         (this.x + this.radius) > innerWidth || (this.x - this.radius) < 0 ? this.dx = -this.dx : this.dx;
//         (this.y + this.radius) > innerHeight || (this.y - this.radius) < 0 ? this.dy = -this.dy : this.dy;
//         this.x += this.dx;
//         this.y += this.dy;

//         // interactividy
//        if( (mouse.x - this.x)< 50
//          && (mouse.x -this.x)> -50
//           && (mouse.y - this.y) < 50
//            && (mouse.y - this.y) > -50
//            && (this.radius < maxRadius )) {
//         this.radius += 1 
//     } else if(this.radius > this.minRadius){
//         this.radius -= 1;
//     }
//         this.draw();
//     }
// }

// init();
// console.log(circleArray)

// const Animate = () => {
//     requestAnimationFrame(Animate);
//     c.clearRect(0, 0, innerWidth, innerHeight);
//     for (let i = 0; i < circleArray.length; i++) {
//         circleArray[i].update();
//     }
// }

// Animate();



// ----------------------------------------------------------------------------------------------------

let mouse = {
    x:undefined,
    y:undefined
}
let circleArray = [];
window.addEventListener('mousemove',(event)=>{
    mouse.x = event.x;
    mouse.y = event.y;
});
let gravity = 1;
let friction = 0.99;

window.addEventListener('resize',()=>{
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    init();

})

const randomIntFromRange=(max,min)=> {
    return Math.floor(Math.random() * (max-min + 1) + min)
}

const randomColors =(colors)=>{
    return colors[Math.floor(Math.random() * colors.length)];
}

const colorArray = [
    '#025159',
    '#F23005',
    '#ffffff',
    '#730202',
    '#0D0D0D'
]
// let col1 = Math.floor(Math.random() * 222);
// let col2 = Math.floor(Math.random() * 333);
// let col3 = Math.floor(Math.random() * 444);
class Ball {
    constructor(x, y,dx,dy,radius,color) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.color = color;
    }
    draw = () => {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        // c.strokeStyle = this.strokeColor;
        // c.stroke();
        c.fillStyle = this.color
        c.fill()
    }

    update = () => {

        if(this.y + this.radius > canvas.height){
            this.dy = -this.dy * friction;
        }else{
            this.dy += gravity;
        }
        this.y += this.dy;
        this.draw();
    }
}
let ball;
let ballArray =[];
const init =()=> {
    let radius = 30;
    for(let i = 0; i < 500; i++ ){
        let x = randomIntFromRange(0,canvas.width-radius);
        let y = randomIntFromRange(0,canvas.height-radius);
        ballArray.push(new Ball(x,y,2 ,2,radius,'red'))
    }
}
init();

console.log(ballArray)


const Animate = () => {
    requestAnimationFrame(Animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.fillText('HTML CANVAS BOILER PLATE',mouse.x,mouse.y);

    for(let i = 0; i  < ballArray.length; i++){
        ballArray[i].update();
    }
}

Animate();