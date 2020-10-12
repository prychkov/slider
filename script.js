window.addEventListener('DOMContentLoaded', function() {
    
    // Slider

    let slideIndex = 1, // параметр текущего слайда (какой слай показывать)
        slides = document.querySelectorAll('.slider-item'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        dotsWrap = document.querySelector('.slider-dots'),
        dots = document.querySelectorAll('.dot');

    showSlides(slideIndex); // 1
    
    function showSlides(n) { // функция переключения слайдов, n-аргумент это номер слайда // 1
        if (n > slides.length) { // > 4
            slideIndex = 1;
        }
        if (n < 1) {            // < 1
            slideIndex = slides.length;
        }
        slides.forEach((item) => item.style.display = 'none');
        /* for (let i = 0; i < slides.length; i++) {    // выше тот же цикл, только в современном формате
            slides[i].style.display = 'none';
        } */
        dots.forEach((item) => item.classList.remove('dot-active'));
        slides[slideIndex - 1].style.display = 'block'; // slidIndex - 1, показывает нулевой слайд
        dots[slideIndex - 1].classList.add('dot-active');
    }

    function plusSlides(n) { 
        showSlides(slideIndex += n);
    }
    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    prev.addEventListener('click', function() {
        plusSlides(-1);
    });
    next.addEventListener('click', function() {
        plusSlides(1);
    });

    dotsWrap.addEventListener('click', function(event) {
        for (let i = 0; i < dots.length + 1; i++) {                                    // e 2
            if (event.target.classList.contains('dot') && event.target == dots[i-1]) { // i 0, 1, 2, 3, 4 
                currentSlide(i);                                                       // d -1, 0, 1, 2, 3
            }                                                                          // 3
        }
    });

    // кликаем на третъю точку, в event получаем [2], цикл начинает перебор i = 0,
    // далее идет сравнение, если event[2] == dots[0-1=-1], в currentSlide переменная i(0) не передается
    // продолжает перебор i = 1, event[2] == dots[1-1=0], в currentSlide переменная i(1) не передается
    // продолжает перебор i = 2, event[2] == dots[2-1=1], в currentSlide переменная i(2) не передается
    // продолжает перебор i = 3, event[2] == dots[3-1=2], т.к. e[2] == d[2] передаем в currentSlide переменную i(3)
    // продолжает перебор i = 4, event[2] == dots[4-1=3], в currentSlide переменная i(4) не передается
    // далее по цепочке вызывается функция currentSlide(3), в которой вызывается функция showSlides(3)
    // в которой проверяется условие 3 не больше 4 и 3 не меньше 1, 
    // выполняется условие slides[slideIndex - 1].style.display = 'block'; 3-1=2 и показывается третий слайд
});
