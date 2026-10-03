/* ========================================
   기본 설정
======================================== */

let selectedCharacter = "mindy";

const foundClues = new Set();

let horrorEvent1Done = false;
let jumpScareDone = false;


/* ========================================
   조사 내용
======================================== */

const objects = {

  window: {
    title: "창문",
    text: "창틀 아래에 작은 쪽지가 끼워져 있다.\n\n「첫 번째 숫자는 1」",
    clue: "1"
  },

  frame: {
    title: "액자",
    text: "액자 뒤에 접힌 종이가 있다.\n\n「두 번째 숫자는 0」",
    clue: "0"
  },

  tv: {
    title: "TV",
    text: "TV 화면을 켜자 잠깐 숫자가 나타났다.\n\n「세 번째 숫자는 1」",
    clue: "1"
  },

  plant: {
    title: "화분",
    text: "화분 밑을 살펴보니 마지막 쪽지가 있다.\n\n「네 번째 숫자는 2」",
    clue: "2"
  },

  cabinet: {
    title: "수납장",
    text: "서랍을 열어봤지만 특별한 건 없다."
  },

  sofa: {
    title: "소파",
    text: "쿠션 사이를 살펴봤지만 아무것도 없다."
  },

  rug: {
    title: "러그",
    text: "러그를 살짝 들어봤다.\n\n…아무것도 없다."
  }

};


/* ========================================
   민디 / 민둥 방 이미지
======================================== */

const roomImages = {

  mindy: {
    window: "images/mindy_window.png",
    frame: "images/mindy_frame.png",
    tv: "images/mindy_tv.png",
    plant: "images/mindy_plant.png",
    cabinet: "images/mindy_cabinet.png",
    sofa: "images/mindy_sofa.png",
    rug: "images/mindy_rug.png",
    door: "images/mindy_door.png"
  },

  mindoong: {
    window: "images/mindoong_window.png",
    frame: "images/mindoong_frame.png",
    tv: "images/mindoong_cabinet.png",
    plant: "images/mindoong_plant.png",
    cabinet: "images/mindoong_drawer.png",
    sofa: "images/mindoong_sofa.png",
    rug: "images/mindoong_rug.png",
    door: "images/mindoong_door.png"
  }

};


/* ========================================
   화면 숨기기
======================================== */

function hideScreens() {

  document
    .querySelectorAll(".screen")
    .forEach(screen => {
      screen.classList.add("hidden");
    });

}


/* ========================================
   게임 시작
======================================== */

function startGame() {

  const bgm =
    document.getElementById("bgm");

  if (bgm) {

    bgm.volume = 0.25;
    bgm.loop = true;

    bgm.play().catch(() => {});

  }

  const startButton =
    document.getElementById("startButton");

  if (startButton) {
    startButton.style.display = "none";
  }

}


/* ========================================
   캐릭터 선택
======================================== */

function selectCharacter(character) {
const bgm =
    document.getElementById("bgm");

  if (bgm && bgm.paused) {

    bgm.volume = 0.25;
    bgm.loop = true;

    bgm.play().catch(() => {});

  }
  selectedCharacter = character;

  foundClues.clear();

  horrorEvent1Done = false;
  jumpScareDone = false;

  updateClueCount();

  changeRoom(character);

  hideScreens();

  document
    .getElementById("livingRoom")
    .classList.remove("hidden");

  const name =
    character === "mindy"
      ? "민디"
      : "민둥";

  document
    .getElementById("characterName")
    .innerText = name;

  document
    .getElementById("message")
    .innerText =
    "방 안을 돌아다니며 단서를 찾아보자.";

  const room =
    document.getElementById("room");

  room.style.filter = "brightness(1)";

  const scare =
    document.getElementById("jumpscare");

  if (scare) {
    scare.classList.add("hidden");
    scare.classList.remove("scare");
  }

  resetPlayerPosition();

}


/* ========================================
   방 이미지 변경
======================================== */

function changeRoom(character) {

  const room =
    document.getElementById("room");

  const theme =
    roomImages[character];

  room.classList.remove(
    "mindy-room",
    "mindoong-room"
  );

  if (character === "mindy") {
    room.classList.add("mindy-room");
  } else {
    room.classList.add("mindoong-room");
  }

  document.querySelector("#room .window img").src = theme.window;
  document.querySelector("#room .frame img").src = theme.frame;
  document.querySelector("#room .tv img").src = theme.tv;
  document.querySelector("#room .plant img").src = theme.plant;
  document.querySelector("#room .cabinet img").src = theme.cabinet;
  document.querySelector("#room .sofa img").src = theme.sofa;
  document.querySelector("#room .rug img").src = theme.rug;
  document.querySelector("#room .door img").src = theme.door;

}


/* ========================================
   플레이어
======================================== */

let playerX = 43;
let playerY = 70;

const moveSpeed = 0.15;

const keys = {};

let playerDirection = "down";

let walkFrame = false;

let lastWalkChange = 0;


function getCharacterPrefix() {

  if (selectedCharacter === "mindoong") {
    return "mindoong";
  }

  return "mindy";

}


/* ========================================
   캐릭터 이미지
======================================== */

function setPlayerSprite(direction, walking) {

  const playerImage =
    document.getElementById("playerImage");

  if (!playerImage) return;

  const prefix =
    getCharacterPrefix();

  let fileName;

  if (walking && walkFrame) {

    fileName =
      `images/${prefix}_${direction}_walk.png`;

  } else {

    fileName =
      `images/${prefix}_${direction}.png`;

  }

  if (
    playerImage.getAttribute("src")
    !== fileName
  ) {

    playerImage.src = fileName;

  }

}


/* ========================================
   시작 위치
======================================== */

function resetPlayerPosition() {

  playerX = 43;
  playerY = 70;

  playerDirection = "down";

  walkFrame = false;

  updatePlayerPosition();

  setPlayerSprite(
    "down",
    false
  );

}


/* ========================================
   위치 업데이트
======================================== */

function updatePlayerPosition() {

  const player =
    document.getElementById("player");

  if (!player) return;

  player.style.left =
    playerX + "%";

  player.style.top =
    playerY + "%";

  player.style.bottom =
    "auto";

}


/* ========================================
   키보드
======================================== */

document.addEventListener(
  "keydown",
  function(event) {

    const key =
      event.key.toLowerCase();

    if (
      document.activeElement &&
      document.activeElement.id ===
      "passwordInput"
    ) {
      return;
    }

    if (key === "escape") {

      const detail =
        document.getElementById(
          "detailScreen"
        );

      const keypad =
        document.getElementById(
          "keypadScreen"
        );

      if (
        detail &&
        !detail.classList.contains("hidden")
      ) {

        backToRoom();
        return;

      }

      if (
        keypad &&
        !keypad.classList.contains("hidden")
      ) {

        backToRoom();
        return;

      }

    }

    if (
      key === "arrowup" ||
      key === "arrowdown" ||
      key === "arrowleft" ||
      key === "arrowright" ||
      key === "w" ||
      key === "a" ||
      key === "s" ||
      key === "d"
    ) {

      event.preventDefault();

      keys[key] = true;

    }

    if (key === "e") {

      event.preventDefault();

      interact();

    }

  }
);


document.addEventListener(
  "keyup",
  function(event) {

    keys[
      event.key.toLowerCase()
    ] = false;

  }
);


/* ========================================
   이동
======================================== */

function movePlayer(timestamp) {

  const livingRoom =
    document.getElementById(
      "livingRoom"
    );

  let moved = false;

  if (
    livingRoom &&
    !livingRoom.classList.contains(
      "hidden"
    )
  ) {

    if (
      keys["arrowup"] ||
      keys["w"]
    ) {

      playerY -= moveSpeed;
      playerDirection = "up";
      moved = true;

    }

    if (
      keys["arrowdown"] ||
      keys["s"]
    ) {

      playerY += moveSpeed;
      playerDirection = "down";
      moved = true;

    }

    if (
      keys["arrowleft"] ||
      keys["a"]
    ) {

      playerX -= moveSpeed;
      playerDirection = "left";
      moved = true;

    }

    if (
      keys["arrowright"] ||
      keys["d"]
    ) {

      playerX += moveSpeed;
      playerDirection = "right";
      moved = true;

    }

    playerX =
      Math.max(
        1,
        Math.min(
          82,
          playerX
        )
      );

    playerY =
      Math.max(
        28,
        Math.min(
          82,
          playerY
        )
      );

    updatePlayerPosition();

    if (moved) {

      if (
        timestamp -
        lastWalkChange >
        160
      ) {

        walkFrame =
          !walkFrame;

        lastWalkChange =
          timestamp;

      }

      setPlayerSprite(
        playerDirection,
        true
      );

    } else {

      walkFrame = false;

      setPlayerSprite(
        playerDirection,
        false
      );

    }

    updateNearbyObject();

  }

  requestAnimationFrame(
    movePlayer
  );

}


requestAnimationFrame(
  movePlayer
);


/* ========================================
   조사 시스템
======================================== */

let nearbyObject = null;


const interactableObjects = [

  "window",
  "frame",
  "tv",
  "plant",
  "cabinet",
  "sofa",
  "rug",
  "door"

];


const objectNames = {

  window: "창문",
  frame: "액자",
  tv: "TV",
  plant: "화분",
  cabinet: "수납장",
  sofa: "소파",
  rug: "러그",
  door: "현관문"

};


/* ========================================
   거리 계산
======================================== */

function getDistanceToObject(objectName) {

  const player =
    document.getElementById("player");

  const object =
    document.querySelector(
      "#room ." + objectName
    );

  if (
    !player ||
    !object
  ) {
    return 99999;
  }

  const playerRect =
    player.getBoundingClientRect();

  const objectRect =
    object.getBoundingClientRect();

  const playerCenterX =
    playerRect.left +
    playerRect.width / 2;

  const playerCenterY =
    playerRect.top +
    playerRect.height / 2;

  let objectCenterX =
    objectRect.left +
    objectRect.width / 2;

  let objectCenterY =
    objectRect.top +
    objectRect.height / 2;

  if (
    objectName === "window" ||
    objectName === "frame"
  ) {

    objectCenterY =
      objectRect.bottom + 45;

  }

  const dx =
    playerCenterX -
    objectCenterX;

  const dy =
    playerCenterY -
    objectCenterY;

  return Math.sqrt(
    dx * dx +
    dy * dy
  );

}


/* ========================================
   조사 거리
======================================== */

function getInteractionRange(objectName) {

  if (
    objectName === "window" ||
    objectName === "frame"
  ) {
    return 300;
  }

  if (objectName === "door") {
    return 170;
  }

  if (
    objectName === "tv" ||
    objectName === "plant"
  ) {
    return 150;
  }

  return 135;

}


/* ========================================
   근처 물건 찾기
======================================== */

function findNearbyObject() {

  let closest = null;
  let closestDistance = Infinity;

  interactableObjects.forEach(
    objectName => {

      const distance =
        getDistanceToObject(
          objectName
        );

      const range =
        getInteractionRange(
          objectName
        );

      if (
        distance <= range &&
        distance < closestDistance
      ) {

        closest = objectName;
        closestDistance = distance;

      }

    }
  );

  return closest;

}


/* ========================================
   조사 안내
======================================== */

function updateNearbyObject() {

  nearbyObject =
    findNearbyObject();

  const message =
    document.getElementById(
      "message"
    );

  if (!message) return;

  if (nearbyObject) {

    message.innerText =
      `🔍 ${objectNames[nearbyObject]} 조사하기 [E]`;

  } else {

    message.innerText =
      "방 안을 돌아다니며 단서를 찾아보자.";

  }

}


/* ========================================
   조사
======================================== */

function interact() {

  const livingRoom =
    document.getElementById(
      "livingRoom"
    );

  if (
    !livingRoom ||
    livingRoom.classList.contains(
      "hidden"
    )
  ) {
    return;
  }

  nearbyObject =
    findNearbyObject();

  if (!nearbyObject) {

    document
      .getElementById("message")
      .innerText =
      "조사할 물건이 근처에 없다.";

    return;

  }

  if (nearbyObject === "door") {

    openKeypad(true);
    return;

  }

  showObject(
    nearbyObject
  );

}


/* ========================================
   그림 클릭
======================================== */

function openObject(objectName) {

  const distance =
    getDistanceToObject(
      objectName
    );

  const range =
    getInteractionRange(
      objectName
    );

  if (distance > range) {

    document
      .getElementById("message")
      .innerText =
      "너무 멀다. 가까이 가서 살펴보자.";

    return;

  }

  showObject(
    objectName
  );

}


/* ========================================
   조사 화면 + 서랍 효과음
======================================== */

function showObject(objectName) {

  const object =
    objects[objectName];

  if (!object) return;


  /* ★ 수납장/서랍 조사할 때 소리 */

  if (objectName === "cabinet") {

    const drawerSound =
      document.getElementById(
        "drawerSound"
      );

    if (drawerSound) {

      drawerSound.pause();

      drawerSound.currentTime = 0;

      drawerSound.volume = 0.8;

      drawerSound
        .play()
        .catch(() => {});

    }

  }


  hideScreens();

  document
    .getElementById("detailScreen")
    .classList.remove("hidden");

  document
    .getElementById("detailTitle")
    .innerText =
    object.title;

  const theme =
    roomImages[
      selectedCharacter
    ];

  document
    .getElementById("detailImage")
    .src =
    theme[objectName];

  document
    .getElementById("detailText")
    .innerText =
    object.text;

  if (object.clue) {

    foundClues.add(
      objectName
    );

    updateClueCount();

  }

}


/* ========================================
   단서 개수
======================================== */

function updateClueCount() {

  const clueCount =
    document.getElementById(
      "clueCount"
    );

  if (!clueCount) return;

  clueCount.innerText =
    `단서 ${foundClues.size} / 4`;

}


/* ========================================
   첫 번째 공포 이벤트
======================================== */

function horrorEvent1() {

  if (horrorEvent1Done) return;

  horrorEvent1Done = true;

  const room =
    document.getElementById(
      "room"
    );

  const message =
    document.getElementById(
      "message"
    );

  if (!room || !message) return;

  room.style.transition =
    "filter 0.15s";

  room.style.filter =
    "brightness(0.12)";

  message.innerText =
    "……?";

  setTimeout(
    () => {

      room.style.filter =
        "brightness(0.4)";

      message.innerText =
        "방금… 무슨 소리가 난 것 같은데.";

    },
    800
  );

  setTimeout(
    () => {

      room.style.filter =
        "brightness(1)";

    },
    1800
  );

  setTimeout(
    () => {

      updateNearbyObject();

    },
    3000
  );

}


/* ========================================
   점프스케어 + 효과음
======================================== */

function jumpScare() {

  if (jumpScareDone) return;

  jumpScareDone = true;

  const scare =
    document.getElementById(
      "jumpscare"
    );

  const message =
    document.getElementById(
      "message"
    );

  if (!scare) return;

  if (message) {
    message.innerText = "……";
  }

  setTimeout(
    () => {

      scare.classList.remove(
        "hidden"
      );

      scare.classList.add(
        "scare"
      );

      const scareSound =
        document.getElementById(
          "scareSound"
        );

      if (scareSound) {

        scareSound.pause();

        scareSound.currentTime = 0;

        scareSound.volume = 0.8;

        scareSound
          .play()
          .catch(() => {});

      }

      if (document.body.animate) {

        document.body.animate(

          [
            {
              transform:
                "translate(0px, 0px)"
            },
            {
              transform:
                "translate(-12px, 6px)"
            },
            {
              transform:
                "translate(12px, -6px)"
            },
            {
              transform:
                "translate(-10px, -5px)"
            },
            {
              transform:
                "translate(10px, 6px)"
            },
            {
              transform:
                "translate(0px, 0px)"
            }
          ],

          {
            duration: 320
          }

        );

      }

      setTimeout(
        () => {

          scare.classList.add(
            "hidden"
          );

          scare.classList.remove(
            "scare"
          );

          if (scareSound) {

            scareSound.pause();

            scareSound.currentTime = 0;

          }

          updateNearbyObject();

        },
        500
      );

    },
    700
  );

}


/* ========================================
   거실로 돌아가기
======================================== */

function backToRoom() {

  hideScreens();

  document
    .getElementById("livingRoom")
    .classList.remove("hidden");

  updateNearbyObject();

  if (
    foundClues.size >= 1 &&
    !horrorEvent1Done
  ) {

    setTimeout(
      () => {

        horrorEvent1();

      },
      500
    );

    return;

  }

  if (
    foundClues.size >= 3 &&
    !jumpScareDone
  ) {

    jumpScare();

  }

}


/* ========================================
   현관문 비밀번호
======================================== */

function openKeypad(fromInteract = false) {

  if (!fromInteract) {

    const distance =
      getDistanceToObject(
        "door"
      );

    const range =
      getInteractionRange(
        "door"
      );

    if (distance > range) {

      document
        .getElementById("message")
        .innerText =
        "문까지 가까이 가보자.";

      return;

    }

  }

  hideScreens();

  document
    .getElementById("keypadScreen")
    .classList.remove("hidden");

  document
    .getElementById("passwordInput")
    .value = "";

  document
    .getElementById("passwordMessage")
    .innerText =

    foundClues.size < 4

      ? "아직 못 찾은 단서가 있는 것 같다."

      : "네 자리 숫자를 입력해 보자.";

}


/* ========================================
   비밀번호 + 문 여는 효과음
======================================== */

function checkPassword() {

  const password =
    document
      .getElementById("passwordInput")
      .value;

  const message =
    document
      .getElementById("passwordMessage");

  if (password === "1012") {

    message.innerText =
      "철컥— 문이 열렸다.";

    /* ★ 문 여는 효과음 */

    const doorSound =
      document.getElementById(
        "doorSound"
      );

    if (doorSound) {

      doorSound.pause();

      doorSound.currentTime = 0;

      doorSound.volume = 0.8;

      doorSound
        .play()
        .catch(() => {});

    }

    setTimeout(
      () => {

        hideScreens();

        document
          .getElementById("endingScreen")
          .classList.remove("hidden");

      },
      1200
    );

  } else {

    message.innerText =
      "삐빅— 비밀번호가 틀렸다.";

  }

}


/* ========================================
   모바일 버튼
======================================== */

function setupMobileButton(
  buttonId,
  keyName
) {

  const button =
    document.getElementById(
      buttonId
    );

  if (!button) return;

  button.addEventListener(
    "pointerdown",
    function(event) {

      event.preventDefault();

      keys[keyName] = true;

    }
  );

  button.addEventListener(
    "pointerup",
    function(event) {

      event.preventDefault();

      keys[keyName] = false;

    }
  );

  button.addEventListener(
    "pointercancel",
    function() {

      keys[keyName] = false;

    }
  );

  button.addEventListener(
    "pointerleave",
    function() {

      keys[keyName] = false;

    }
  );

}


setupMobileButton(
  "upBtn",
  "arrowup"
);

setupMobileButton(
  "downBtn",
  "arrowdown"
);

setupMobileButton(
  "leftBtn",
  "arrowleft"
);

setupMobileButton(
  "rightBtn",
  "arrowright"
);


const interactBtn =
  document.getElementById(
    "interactBtn"
  );


if (interactBtn) {

  interactBtn.addEventListener(
    "pointerdown",
    function(event) {

      event.preventDefault();

      interact();

    }
  );

}