const calcTime = (timestamp) => {
    const curTime = new Date().getTime();  // 현재 시간 (밀리초 단위)
    const timeDifference = curTime - (timestamp * 1000);  // timestamp는 초 단위이므로 1000을 곱해 밀리초로 변환

    const hour = Math.floor(timeDifference / (1000 * 60 * 60));  // 시간 차이 계산
    const minute = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));  // 남은 시간에서 분 차이 계산
    const second = Math.floor((timeDifference % (1000 * 60)) / 1000);  // 남은 분에서 초 차이 계산

    if (hour > 0) return `${hour}시간 전`;
    else if (minute > 0) return `${minute}분 전`;
    else return `${second}초 전`;
};


const renderData = (data) => {
    const main = document.querySelector("main");
    data.reverse().forEach(async(obj) => {
        const div = document.createElement("div");
        div.className = "item-list";

        const imgDiv = document.createElement("div");
        imgDiv.className = "item-list__img";

        const img = document.createElement("img");
        const res = await fetch(`/images/${obj.id}`);
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        img.src = url;

        const InfoDiv = document.createElement("div");
        InfoDiv.className = "item-list__info";

        const InfoTitleDiv = document.createElement("div");
        InfoTitleDiv.className = "item-list__info-title";
        InfoTitleDiv.innerText = obj.title;

        const InfoMetaDiv = document.createElement("div");
        InfoMetaDiv.className = "item-list__info-meta";
        InfoMetaDiv.innerText = obj.place + " " + calcTime(obj.insertAt);

        const InfoPriceDiv = document.createElement("div");
        InfoPriceDiv.className = "item-list__info-price";
        InfoPriceDiv.innerText = obj.price;

        imgDiv.appendChild(img);

        InfoDiv.appendChild(InfoTitleDiv);
        InfoDiv.appendChild(InfoMetaDiv);
        InfoDiv.appendChild(InfoPriceDiv);
        div.appendChild(imgDiv);
        div.appendChild(InfoDiv);
        main.appendChild(div);
    });
};

const fetchList = async() => {
    const accessToken = window.localStorage.getItem("token");
    const res = await fetch(`${window.location.origin}/items`, {
        headers:{
            Authorization:"Bearer " + accessToken,
        },
    });
    
    if (res.status === 401) {
        alert("로그인이 필요합니다!");
        window.location.pathname = "/login.html";
        return;
    }
    
    const data = await res.json();
    renderData(data);
};

fetchList();