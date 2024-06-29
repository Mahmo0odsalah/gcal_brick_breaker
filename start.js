{
  let xDir = 1;
  let yDir = -1;
  let velocity = 5;

  let overlay;
  let step;
  let ball;

  let meetings = new Set();

  const stepWidth = 200;

  const ballRadius = 25;

  overlay = document.getElementById("brick-overlay");
  step = document.getElementById("brick-step");
  ball = document.getElementById("brick-ball");

  if (!overlay) {
    // First run
    overlay = document.createElement("div");
    overlay.id = "brick-overlay";

    step = document.createElement("div");
    step.style.width = stepWidth + "px";
    step.id = "brick-step";
    overlay.appendChild(step);

    ball = document.createElement("div");
    ball.id = "brick-ball";
    ball.style.width = 2 * ballRadius + "px";
    ball.style.height = 2 * ballRadius + "px";
    overlay.appendChild(ball);

    document.body.appendChild(overlay);
  } else {
    overlay.style.display = "block";
  }

  paused = false;

  let stepMaxX = window.innerWidth - stepWidth;
  window.onresize = () => {
    stepMaxX = window.innerWidth - stepWidth;
  };

  overlay.onmousemove = (event) => {
    let stepLeft = event.clientX - stepWidth * 0.5;
    if (stepLeft < 0) {
      stepLeft = 0;
    } else if (stepLeft > stepMaxX) {
      stepLeft = stepMaxX;
    }
    step.style.left = stepLeft + "px";
  };
  let x = window.innerWidth * 0.5 - ballRadius;
  let y = window.innerHeight * 0.5 - ballRadius;

  function moveBall() {
    if (paused) {
      return;
    }
    const stepTop = step.getBoundingClientRect().top;
    x += xDir * velocity;
    y += yDir * velocity;

    if (x + 2 * ballRadius >= window.innerWidth || x <= 0) {
      xDir *= -1;
    }

    if (y + 2 * ballRadius >= window.innerHeight || y <= 0) {
      yDir *= -1;
    }

    if (
      y + 2 * ballRadius >= stepTop &&
      x + ballRadius >= step.getBoundingClientRect().left &&
      x + ballRadius <= step.getBoundingClientRect().right
    ) {
      yDir *= -1;
    }
    meetings.forEach((meeting) => {
      const meetingRect = meeting.getBoundingClientRect();
      if (
        y <= meetingRect.bottom &&
        y + 2 * ballRadius >= meetingRect.top &&
        x + ballRadius >= meetingRect.left &&
        x + ballRadius <= meetingRect.right
      ) {
        yDir *= -1;
        meetings.delete(meeting);
        meeting.remove();
      }
    });

    ball.style.left = x + "px";
    ball.style.top = y + "px";

    requestAnimationFrame(moveBall);
  }

  moveBall();

  function findMeetings() {
    const parentDiv = document.getElementsByClassName("mDPmMe")[0];
    if (parentDiv) {
      const buttons = parentDiv.getElementsByClassName("GTG3wb");
      meetings = new Set(
        Array.from(buttons).filter(
          (button) =>
            button.getElementsByClassName("XuJrye").length > 0 &&
            !button
              .getElementsByClassName("XuJrye")[0]
              .innerText.includes("Declined")
        )
      );
    }
    setTimeout(findMeetings, 1000);
  }
  findMeetings();
}
