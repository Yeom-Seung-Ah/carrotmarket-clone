<script>
  import { onMount } from "svelte";
  import Footer from "../components/Footer.svelte";
  import { getDatabase, ref, onValue } from "firebase/database";

  let hour = new Date().getHours();
  let min = new Date().getMinutes();

  $: items = [];

  const db = getDatabase();
  const starCountRef = ref(db, "items/");

  onMount(() => {
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      items = Object.values(data).reverse();
    });
  });

  function calcTime(insertAt) {
    const now = new Date();
    const diff = Math.floor(
      (now.getTime() - new Date(insertAt).getTime()) / 1000
    ); // 시간 차이를 초 단위로 계산

    if (diff < 60) {
      return "방금 전"; // 1분 미만이면 "방금 전" 표시
    } else if (diff < 3600) {
      const minutes = Math.floor(diff / 60);
      return `${minutes}분 전`; // 1시간 미만이면 분 단위로 표시
    } else if (diff < 86400) {
      const hours = Math.floor(diff / 3600);
      return `${hours}시간 전`; // 24시간 미만이면 시간 단위로 표시
    } else {
      const days = Math.floor(diff / 86400);
      return `${days}일 전`; // 하루 이상이면 일 단위로 표시
    }
  }
</script>

<header>
  <div class="info-bar">
    <div class="info-bar__time">{hour}:{min}</div>
    <div class="info-bar__icons">
      <img src="assets/chart-bar.svg" alt="chart-bar" />
      <img src="assets/wifi.svg" alt="wifi" />
      <img src="assets/battery.svg" alt="battery" />
    </div>
  </div>
  <div class="menu-bar">
    <div class="menu-bar__location">
      <div>역삼1동</div>
      <div class="menu-bar__location-icon">
        <img src="assets/arrow-down.svg" />
      </div>
    </div>
    <div class="menu-bar__icons">
      <img src="assets/search.svg" />
      <img src="assets/menu.svg" />
      <img src="assets/alert.svg" />
    </div>
  </div>
</header>

<main>
  {#each items as item}
    <div class="item-list">
      <div class="item-list__img">
        <img alt={item.title} src={item.imgUrl} />
      </div>
      <div class="item-list__info">
        <div class="item-list__info-title">{item.title}</div>
        <div class="item-list__info-meta">
          {item.place}
          {calcTime(item.insertAt)}
        </div>
        <div class="item-list__info-price">{item.price}</div>
        <div>{item.description}</div>
      </div>
    </div>
  {/each}
  <a class="write-btn" href="#/write">+ 글쓰기</a>
</main>

<Footer location="home" />

<div class="media-info-msg">화면 사이즈를 줄여주세요</div>
