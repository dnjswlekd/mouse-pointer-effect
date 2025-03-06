gsap.registerPlugin(ScrollTrigger);

let activeImage;

gsap.utils.toArray('.con02 ul li a').forEach((elem) => {
  let image = elem.querySelector('img.fade-img');
  //.con02 ul li a를 배열을 forEach문으로  elem매개변수로 반복문실행 ,
  //elem의 하위요소,showImg를 image에 저장

  let setX, setY;

  const align = (e) => {
    if (setX && setY) {
      setX(e.clientX);
      setY(e.clientY);
    }
  };

  //이벤트발생시 현재 마우스 위치의 x, y 좌표를 setX, setY 변수에 할당.
  // 여기서 clientX, clientY값은 스크롤과 상관없이 현재 브라우스의 top 0을 기준으로
  // 마우스의 좌표값을 구합니다.

  const startPoint = () => document.addEventListener('mousemove', align);
  //startPoint함수는 mousemove이벤트와 align함수가 실행되는 함수

  const stopPoint = () => document.removeEventListener('mousemove', align);
  //stopPoint함수는 mousemove와 align함수가 제거되는 함수

  let fade = gsap.to(image, { autoAlpha: 0.8, ease: 'none', paused: true });
  //변수fade는 이미지가 자동투명도를 0.8되서 일시정지하여 변수 fade에 대입함

  elem.addEventListener('mouseenter', (e) => {
    fade.play();
    startPoint();
    //.con02 ul li a영역에 들어갔을때 fade변수가 실행되고,  startPoint()함수가 호출되라

    //조건식:  activeImage가 있으면 참이되어 gsap바로 세팅
    if (activeImage) {
      gsap.set(image, {
        x: gsap.getProperty(activeImage, 'x'),
        y: gsap.getProperty(activeImage, 'y'),
      });
    }
    //이미지의 X값는  activeImage의 x값을 가져오고
    //이미지의 y값은  activeImage의 y값을 가져오고
    //gsap.getProperty()는 ( activeImage의 x값, y값)=> 속성을 반환

    activeImage = image;

    setX = gsap.quickTo(image, 'x', { duration: 0.5, ease: 'elastic' });
    setY = gsap.quickTo(image, 'y', { duration: 0.5, ease: 'elastic' });
    // setX, setY 변수를 gsap.quickTo() 메소드를 사용하여, image 요소의 x, y 위치를 빠르게 변경

    align(e);
    //마우스 위치의 x, y 좌표를 setX, setY 변수에 할당하는 함수 호출
  });

  elem.addEventListener('mouseleave', () => {
    fade.reverse();
    stopPoint();
  });
  //reverse() =>애니메이션이 뒤로 향하여 재생 반전
});
//.reverse() => 애니메이션모든 측면이 뒤로 향하도록 재생 반전
