window.onload = function(){
	// console.log(document.body.clientWidth,document.body.clientHeight)
	const BODY_WIDTH = window.innerWidth
	const BODY_HEIGHT = window.innerHeight
	const BALL_R = Math.ceil(BODY_WIDTH*0.8/108)-2

	const start_X =  Math.ceil(BODY_WIDTH*0.07)
	const start_Y = Math.ceil(BODY_HEIGHT*0.1)
	const color =  ['#7CFC00','#BA55D3','#D2B48C','#FFD700','#FF83FA','#FF3030','#D3D3D3','#CD950C','#97FFFF','#EE7942']
	const G = 1.5

	var balls = []


	var date = new Date()
	var hour = date.getHours()
	var minute = date.getMinutes()
	var second = date.getSeconds()

	var Fhour = Math.floor(hour/10)
	var Shour = hour%10

	var Fminute = Math.floor(minute/10)
	var Sminute = minute%10

	var Fsecond = Math.floor(second/10)
	var Ssecond = second%10
	var img=new Image()
	img.src = 'index.jpg'
	
	window.requestAnimationFrame(render)

	function render(){
		var canvas=document.getElementById('myCanvas')
		canvas.width = BODY_WIDTH
		canvas.height = BODY_HEIGHT
		var context = canvas.getContext('2d')
		context.clearRect(0,0,BODY_WIDTH,BODY_HEIGHT)
		context.drawImage(img,0,0)
		
		draw_digit(start_X,start_Y,Digit[Fhour],context)
		draw_digit(start_X+(BALL_R+2)*14,start_Y,Digit[Shour],context)

		draw_digit(start_X+(BALL_R+2)*28,start_Y,Digit[10],context)
			
		draw_digit(start_X+(BALL_R+2)*36,start_Y,Digit[Fminute],context)
		draw_digit(start_X+(BALL_R+2)*50,start_Y,Digit[Sminute],context)

		draw_digit(start_X+(BALL_R+2)*64,start_Y,Digit[10],context)

		draw_digit(start_X+(BALL_R+2)*72,start_Y,Digit[Fsecond],context)
		draw_digit(start_X+(BALL_R+2)*86,start_Y,Digit[Ssecond],context)
		draw_balls(context)
		update()
		window.requestAnimationFrame(render)
	}


	function update(){
		var dates = new Date()
		var hours = dates.getHours()
		var minutes = dates.getMinutes()
		var seconds = dates.getSeconds()
		
		var CFhour = Fhour
		var CShour = Shour
		var CFminute = Fminute
		var CSminute = Sminute
		var CFsecond = Fsecond
		var CSsecond = Ssecond

		Fhour = Math.floor(hours/10)
		Shour = hours%10

		Fminute = Math.floor(minutes/10)
		Sminute = minutes%10

		Fsecond = Math.floor(seconds/10)
		Ssecond = seconds%10

		if (CFhour!=Fhour){
			add_balls(Digit[Fhour],start_X)
		}
		if (CShour!=Shour){
			add_balls(Digit[Fhour],start_X+(BALL_R+2)*14)
		}
		if (CFminute!=Fminute){
			add_balls(Digit[Fminute],start_X+(BALL_R+2)*36)
		}
		if (CSminute!=Sminute){
			add_balls(Digit[Sminute],start_X+(BALL_R+2)*50)
		}
		if (CFsecond!=Fsecond){
			add_balls(Digit[Fsecond],start_X+(BALL_R+2)*72)
		}
		if (CSsecond!=Ssecond){
			add_balls(Digit[Ssecond],start_X+(BALL_R+2)*86)
		}
		console.log(balls.length)
		update_balls()
	}

	function add_balls(Digit,offset){
		var int_Y = 5
		for(var i = 0;i< Digit.length;i++){
			for (var j=0 ; j <Digit[i].length; j++) {
				if (Digit[i][j]==1){
					var ball_color = color[Math.ceil(Math.random()*9)]
					let ball_item = {
						x:(2*BALL_R+1)*j+offset,
						y:start_Y+(2*BALL_R+1)*i+int_Y,
						ball_color:ball_color,
						index:1,
						g:G+Math.random(),
						vx : Math.pow(-1,Math.ceil(Math.random()*1000))*3,
						vy : -15
					}
					balls.push(ball_item)
				}
			}
		}
	}

	function update_balls(){
		for(var i = 0;i<balls.length;i++){
			balls[i].x += balls[i].vx
			balls[i].y += balls[i].vy
			balls[i].vy += balls[i].g
			if(balls[i].y>=BODY_HEIGHT-BALL_R){
				balls[i].y = BODY_HEIGHT - BALL_R
				balls[i].vy = - balls[i].vy * 0.75
			}
		}
		var cnt = 0
		for(var i = 0;i<balls.length;i++){
			if(balls[i].x<BODY_WIDTH-BALL_R && balls[i].x>BALL_R){
				balls[cnt++] = balls[i]
			}
		}
		while(balls.length>cnt){
			balls.pop()
		}
	}


	function draw_balls(context){
		for (var i = 0;i< balls.length;i++) {
			draw_ball(balls[i].x,balls[i].y,context,balls[i].ball_color)
		}
	}

	function draw_ball(x,y,context,ball_color){
		// console.log(color[Math.ceil(Math.random()*9)])
		context.fillStyle = ball_color
		context.beginPath()
		context.arc(x,y,BALL_R,0,2*Math.PI)
		context.fill()

	}

	function draw_digit(x,y,num,context){
		context.fillStyle = '#5CACEE'
		for (var i = 0; i < num.length; i++) {
			for (var j=0 ; j <num[i].length; j++) {
				if (num[i][j]==1){
					context.beginPath()
					context.arc(x+(2*BALL_R+1)*j,y+(2*BALL_R+1)*i,BALL_R,0,2*Math.PI)
					context.fill()
				}
			}
		}
	}
}