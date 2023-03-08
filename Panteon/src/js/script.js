//Table mobile custom scroll
document.querySelectorAll('.simplebar').forEach(el => {
    new SimpleBar(el, {
		scrollbarMinSize: 106,
		clickOnTrack: true,
	});
});

//Scroll animation
const simplebar1 = document.querySelector('.table-responsive--first').querySelector('.simplebar-track');
const simplebar2 = document.querySelector('.table-responsive--second').querySelector('.simplebar-track');

simplebar1.classList.add('_anim', '_anim-hide');
simplebar2.classList.add('_anim', '_anim-hide');

const animItems = document.querySelectorAll('._anim');

if (animItems.length > 0) {
	window.addEventListener('scroll', animOnScroll);

	function animOnScroll() {
		for (let index = 0; index < animItems.length; index++) {
			const animItem = animItems[index];
			const animItemHeight = animItem.offsetHeight;
			const animItemOffset = offset(animItem).top;
			const animStart = 3; 
			let animItemPoint = window.innerHeight - animItemHeight / animStart;
		
			if (animItemHeight > window.innerHeight) {
				animItemPoint = window.innerHeight - window.innerHeight / animStart;
			}
			if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
				animItem.classList.add('_animate');
			} else {
				
				if (!animItem.classList.contains('_anim-hide')) {
					animItem.classList.remove('_animate');
				}
			}
		}
	}

	function offset(el) {
		const rect = el.getBoundingClientRect(),
			scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
			scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		return {
			top: rect.top + scrollTop,
			left: rect.left + scrollLeft
		};
	}
	animOnScroll();
}

//Smooth scroll
const anchors = document.querySelectorAll('a[href*="#"]');

for (let anchor of anchors) {
	anchor.addEventListener("click", function(event) {
		event.preventDefault();
		const blockID = anchor.getAttribute('href');
		document.querySelector('' + blockID).scrollIntoView({
			behavior: "smooth",
			block: "start"
		});
	});
}

//Upward
let scroll1 = document.querySelector('.upward');

window.addEventListener('scroll', function() {
	scroll1.classList.toggle("active", window.scrollY > 960);
	scroll1.setAttribute('tabindex', '0');

	if(window.scrollY < 960) {
		scroll1.setAttribute('tabindex', '-1');
	}
});

scroll1.addEventListener('click', move);

function move() {
	window.scrollTo({
		top: 0
	});
}

//Burger menu
const button = document.querySelectorAll('.burger-button');
const body = document.body;
const burger = document.querySelectorAll('.burger-menu');
const navItems = document.querySelectorAll('.burger-menu__link');
const nolock = document.getElementById('nolock');

for(let i = 0; i < button.length; i = i + 1) {
	button[i].addEventListener('click', () => {
		body.classList.toggle('lock');
		burger[i].classList.toggle('active');
		button[i].classList.toggle('active');
		scroll1.classList.toggle('block');
	});

	navItems.forEach(el => {
	el.addEventListener('click', () => {
		body.classList.remove('lock');
		burger[i].classList.remove('active');
		button[i].classList.remove('active');
		scroll1.classList.remove('block');
		});
	});
}

//Disable screen lock for second burger menu and hide upward when this menu is open 
nolock.addEventListener('click', () => {
	body.classList.remove('lock');
	scroll1.classList.toggle('active');
});

//Phone mask
let tel = document.querySelectorAll('input[type="tel"]');
let im = new Inputmask('+7 (999) 999-99-99');
im.mask(tel);

//Form validation
let reg = /[A-Za-zA-Яа-яЁё]/;

//Form-1
let nameInput = document.querySelector('#name');
let telInput = document.querySelector('#tel');
let nameWarning = document.querySelector('#name-warning');
let telWarning = document.querySelector('#tel-warning');
let submit = document.querySelector('#submit');
let exit = document.querySelector('#close');
let imitator = document.querySelector('#imitator');

document.querySelector('#submit').onclick = function(e) {
	e.preventDefault();

	//Name validation
	if (nameInput.value.length >= 2 && validate(reg, nameInput.value)) {
		valid(nameInput, nameWarning, '');
	} else if (nameInput.value.length == "") {
		notValid(nameInput, nameWarning, 'Поле не заполнено');
	} else if (!validate(reg, nameInput.value)) {
		notValid(nameInput, nameWarning, 'Введите только буквы');
	} else {
		notValid(nameInput, nameWarning, 'Введите минимум две буквы');
	}
	//Tel validation
	if (telInput.value.length == 18) {
		valid(telInput, telWarning, '');
	} else {
		notValid(telInput, telWarning, 'Поле не заполнено');
	}

	if (nameInput.value.length >= 2 && validate(reg, nameInput.value) && telInput.value.length == 18) {
		submit.classList.add('valid');
		nameInput.value = '';
		telInput.value = '';
	}

	//Redirection to the next popup
	if (submit.classList.contains('valid')) {
		exit.click();
		setTimeout(function() {
			document.body.classList.add('modal-open');
		}, 310);
		imitator.click();
		submit.classList.remove('valid');
	}
};

//Form-2
let nameInput2 = document.querySelector('#name-2');
let telInput2 = document.querySelector('#tel-2');
let nameWarning2 = document.querySelector('#name-warning-2');
let telWarning2 = document.querySelector('#tel-warning-2');
let submit2 = document.querySelector('#submit-2');

document.querySelector('#submit-2').onclick = function(e) {
	e.preventDefault();

	//Name validation
	if (nameInput2.value.length >= 2 && validate(reg, nameInput2.value)) {
		valid(nameInput2, nameWarning2, '');
	} else if (nameInput2.value.length == "") {
		notValid(nameInput2, nameWarning2, 'Поле не заполнено');
	} else if (!validate(reg, nameInput2.value)) {
		notValid(nameInput2, nameWarning2, 'Введите только буквы');
	} else {
		notValid(nameInput2, nameWarning2, 'Введите минимум две буквы');
	}
	//Tel validation
	if (telInput2.value.length == 18) {
		valid(telInput2, telWarning2, '');
	} else {
		notValid(telInput2, telWarning2, 'Поле не заполнено');
	}

	if (nameInput2.value.length >= 2 && validate(reg, nameInput2.value) && telInput2.value.length == 18) {
		submit2.classList.add('valid');
		nameInput2.value = '';
		telInput2.value = '';
	}

	//Redirection to popup
	if (submit2.classList.contains('valid')) {
		imitator.click();
		submit.classList.remove('valid');
	}
};

//Validation functions
function validate(regex, inp) {
	return regex.test(inp);
}

function notValid(input, element, message) {
	input.classList.add('invalid');
	element.classList.add('active');
	element.innerHTML = message;
}

function valid(input, element, message) {
	input.classList.remove('invalid');
	input.classList.add('valid');
	element.classList.remove('active');
	element.innerHTML = message;
}

//Clean inputs after user click on close button
exit.addEventListener('click', clear);

function clear() {
	nameInput.classList.remove('invalid');
	telInput.classList.remove('invalid');
	nameWarning.classList.remove('active');
	telWarning.classList.remove('active');
	nameInput.value = '';
	telInput.value = '';
}

//Slider-1
new Swiper('.swiper-1', {
	resistance: true,
	resistanceRatio: 0.6,
	grabCursor: true,
	spaceBetween: 30,
    lazy: {
        loadPrevNext: true,
    },
	navigation: {
		nextEl: '.next-1',
		prevEl: '.prev-1',
	},
	scrollbar: {
		el: '.scrollbar-1',
		snapOnRelease: false,
		draggable: true,
		dragSize: 200,
	},
	keyboard: {
		enabled: true,
		onlyInViewport: true,
	},
	mousewheel: {
		eventsTarget: ".swiper-1",
	},
    breakpoints: {
	    1400: {
	        slidesPerView: 4,
	    },
	    1200: {
	        slidesPerView: 3,
	    },
        992: {
            spaceBetween: 15,
	        slidesPerView: 3,
	    },
		768: {
	        slidesPerView: 2.325,
			scrollbar: {
				dragSize: 102,
			},
	    },
		500: {
			spaceBetween: 30,
	        slidesPerView: 1.65,
			scrollbar: {
				dragSize: 102,
			},
	    },
		320: {
			spaceBetween: 30,
	        slidesPerView: 1.45,
			scrollbar: {
				dragSize: 102,
			},
	    },
	}
});

// slider-2
new Swiper('.swiper-2', {
	resistance: true,
	resistanceRatio: 0.6,
	grabCursor: true,
	lazy: {
        loadPrevNext: true,
    },
	navigation: {
		nextEl: '.next-2',
		prevEl: '.prev-2',
	},
	scrollbar: {
		el: '.scrollbar-2',
		snapOnRelease: false,
		draggable: true,
		dragSize: 200,
	},
	keyboard: {
		enabled: true,
		onlyInViewport: true,
	},
	mousewheel: {
		eventsTarget: ".swiper-2",
	},
    breakpoints: {
	    1400: {
	        spaceBetween: 38.5,
			slidesPerView: 3,
	    },
	    1200: {
			slidesPerView: 3,
            spaceBetween: 20, 
	    },
        992: {
            spaceBetween: 20,
	        slidesPerView: 2,
	    },
		768: {
			spaceBetween: 30,
	        slidesPerView: 1.74,
			scrollbar: {
				dragSize: 102,
			},
	    },
		500: {
			spaceBetween: 30,
	        slidesPerView: 1.4,
			scrollbar: {
				dragSize: 102,
			},
	    },
		320: {
			spaceBetween: 30,
	        slidesPerView: 1.31,
			scrollbar: {
				dragSize: 102,
			},
	    },
	}
});

// slider-3
new Swiper('.swiper-3', {
	resistance: true,
	resistanceRatio: 0.6,
	grabCursor: true,
	spaceBetween: 0,
	desktopFirst: true,
	lazy: {
        loadPrevNext: true,
    },
	navigation: {
		nextEl: '.next-3',
		prevEl: '.prev-3',
	},
	scrollbar: {
		el: '.scrollbar-3',
		snapOnRelease: false,
		draggable: true,
		dragSize: 200,
	},
	keyboard: {
		enabled: true,
		onlyInViewport: true,
	},
	mousewheel: {
		eventsTarget: ".swiper-3",
	},
	breakpoints: {
	    1400: {
	        slidesPerView: 3.28,
	    },
	    1200: {
	        slidesPerView: 3,
	    },
		992: {
	        slidesPerView: 2.5,
			spaceBetween: 15,
	    },
		768: {
	        slidesPerView: 2.28,
			scrollbar: {
				dragSize: 102,
			},
	    },
		700: {
			spaceBetween: 0,
	        slidesPerView: 2.2,
			scrollbar: {
				dragSize: 102,
			},
	    },
		600: {
			spaceBetween: 0,
	        slidesPerView: 1.8,
			scrollbar: {
				dragSize: 102,
			},
	    },
		500: {
			spaceBetween: 0,
	        slidesPerView: 1.46,
			scrollbar: {
				dragSize: 102,
			},
	    },
		425: {
			spaceBetween: 0,
	        slidesPerView: 1.255,
			scrollbar: {
				dragSize: 102,
			},
	    },
		320: {
			spaceBetween: 30,
	        slidesPerView: 1.255,
			scrollbar: {
				dragSize: 102,
			},
	    },
	}
});

//Advantages animation
let link = document.querySelectorAll('.advantages__link');
let jump = document.querySelectorAll('._jump');

for (let i = 0; i < link.length; i = i + 1) {

	link[i].addEventListener('mouseover', go);

	function go() {
		jump[i].classList.add('active');
		link[i].classList.add('active');
	}
	link[i].addEventListener('mouseout', ungo);

	function ungo() {
		setTimeout(function() {
			jump[i].classList.remove('active');
		}, 300);
	}
}

//Table-1 animation
const tableLine1 = document.querySelectorAll('._1');
const tableLine2 = document.querySelectorAll('._2');
const tableLine3 = document.querySelectorAll('._3');
const tableTop = document.querySelectorAll('.table-1__text-4');
const tableLeft = document.querySelectorAll('.table-1__text');

for(let i = 0; i < tableLine1.length; i = i + 1) {
	
	// Row 1
	tableLine1[i].addEventListener('mouseover', () => {
		tableTop[i].classList.add('active');
		tableLeft[0].classList.add('active');
	});

	tableLine1[i].addEventListener('mouseout', () => {
		tableTop[i].classList.remove('active');
		tableLeft[0].classList.remove('active');
	});

	// Row 2
	tableLine2[i].addEventListener('mouseover', () => {
		tableTop[i].classList.add('active');
		tableLeft[1].classList.add('active');
	});

	tableLine2[i].addEventListener('mouseout', () => {
		tableTop[i].classList.remove('active');
		tableLeft[1].classList.remove('active');
	});

	// Row 3
	tableLine3[i].addEventListener('mouseover', () => {
		tableTop[i].classList.add('active');
		tableLeft[2].classList.add('active');
	});

	tableLine3[i].addEventListener('mouseout', () => {
		tableTop[i].classList.remove('active');
		tableLeft[2].classList.remove('active');
	});
}

//Table-2 animation
const table2Line1 = document.querySelectorAll('._2_1');
const table2Line2 = document.querySelectorAll('._2_2');
const table2Top = document.querySelectorAll('.table-2__text-4');
const table2Left = document.querySelectorAll('.table-2__text');

for(let i = 0; i < table2Line1.length; i = i + 1) {
	
	// Row 1
	table2Line1[i].addEventListener('mouseover', () => {
		table2Top[i].classList.add('active');
		table2Left[0].classList.add('active');
	});

	table2Line1[i].addEventListener('mouseout', () => {
		table2Top[i].classList.remove('active');
		table2Left[0].classList.remove('active');
	});

	// Row 2
	table2Line2[i].addEventListener('mouseover', () => {
		table2Top[i].classList.add('active');
		table2Left[1].classList.add('active');
	});

	table2Line2[i].addEventListener('mouseout', () => {
		table2Top[i].classList.remove('active');
		table2Left[1].classList.remove('active');
	});
}

//Cards animation
let card = document.querySelectorAll('.card-face');
let picture2 = document.querySelectorAll('.card-face__image');

for (let i = 0; i < card.length; i = i + 1) {

	card[i].addEventListener('mouseover', jump2);

	function jump2() {
		picture2[i].classList.add('jump2');
	}

	card[i].addEventListener('mouseout', unjump2);

	function unjump2() {
		picture2[i].classList.remove('jump2');
	}
}

//Map
function initMap() {

	let query320 = window.matchMedia("(max-width: 426px)");
	let query768 = window.matchMedia("(max-width: 768px)");
	let query769 = window.matchMedia("(min-width: 769px)");

    if(query320.matches){
        var options = {
			center: {
				lat: 55.8099032,
				lng: 38.9905025
			}, 
			zoom: 17,
			disableDefaultUI: true,
			scrollwheel: false
		};
	}
	else if(query768.matches){
        var options = {
			center: {
				lat: 55.8101623,
				lng: 38.9893726
			},
			zoom: 17,
			disableDefaultUI: true,
			scrollwheel: false
		};
	}
	else if(query769.matches){
        var options = {
			center: {
				lat: 55.8100137,
				lng: 38.9891097
			},
			zoom: 17,
			disableDefaultUI: true,
			scrollwheel: false
		};
	}

	var map = new google.maps.Map(document.getElementById("map"), options);

	var marker = new google.maps.Marker({
		position: {
			lat: 55.80982371012919,
			lng: 38.99080510095649
		},
		map: map
	});

	var place = document.querySelector('.map-info');

	var info = new google.maps.InfoWindow({
		content: place
	});

	if(query768.matches){
		marker.addListener("click", function() {
			info.open(map, marker);
			place.classList.add('active');
		});
	}

	marker.addListener("mouseover", function() {
		info.open(map, marker);
		place.classList.add('active');
	});

	marker.addListener("mouseout", function() {
		info.close(map, marker);
		place.classList.remove('active');
	});

}
window.initMap = initMap;

//Info-bar animation
let tel1 = document.querySelectorAll('.info-bar__link');
let telContainer = document.querySelector('.info-bar__wrapper-2');

for (let i = 0; i < tel1.length; i = i + 1) {
	tel1[i].addEventListener('mouseover', tel2);

	function tel2() {
		telContainer.classList.add('active');
	}

	tel1[i].addEventListener('mouseout', tel3);

	function tel3() {
		telContainer.classList.remove('active');
	}
}