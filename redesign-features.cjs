const fs = require('fs');
let html = fs.readFileSync('./public/content.html', 'utf8');

const newSection = `
<div class="sh-studio-features">
<style>
  .sh-studio-features {
    background: #f8f8f6;
    padding: 100px 72px;
    position: relative;
  }
  @media (max-width: 799px) {
    .sh-studio-features { padding: 64px 24px; }
  }

  .sh-sf-top {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 72px;
    gap: 32px;
    flex-wrap: wrap;
  }
  .sh-sf-label {
    color: #83875a;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.35em;
    text-transform: uppercase;
    margin-bottom: 14px;
  }
  .sh-sf-title {
    color: #131313;
    font-family: condensed, sans-serif;
    font-size: clamp(48px, 6vw, 80px);
    font-weight: 700;
    letter-spacing: -2px;
    line-height: 88%;
    text-transform: uppercase;
  }
  .sh-sf-desc {
    color: #555;
    font-size: 16px;
    line-height: 160%;
    max-width: 380px;
    align-self: flex-end;
  }

  /* Features grid */
  .sh-sf-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
  }
  @media (max-width: 1100px) {
    .sh-sf-grid { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 599px) {
    .sh-sf-grid { grid-template-columns: 1fr; }
  }

  .sh-sf-card {
    background: #ffffff;
    border: 1px solid #e8e8e5;
    border-radius: 24px;
    padding: 44px 36px;
    display: flex;
    flex-direction: column;
    gap: 24px;
    transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
    position: relative;
    overflow: hidden;
  }
  .sh-sf-card::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: #83875a;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.4s ease;
  }
  .sh-sf-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 60px rgba(0,0,0,0.08);
    border-color: #d5d5d0;
  }
  .sh-sf-card:hover::before {
    transform: scaleX(1);
  }

  .sh-sf-icon-wrap {
    width: 60px;
    height: 60px;
    background: #f2f2ef;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.3s ease;
  }
  .sh-sf-card:hover .sh-sf-icon-wrap {
    background: #83875a;
  }
  .sh-sf-card:hover .sh-sf-icon-wrap svg path {
    fill: #ffffff;
  }

  .sh-sf-card-label {
    color: #83875a;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.25em;
    text-transform: uppercase;
  }
  .sh-sf-card-title {
    color: #131313;
    font-family: condensed, sans-serif;
    font-size: 28px;
    font-weight: 700;
    text-transform: uppercase;
    line-height: 92%;
    letter-spacing: -0.3px;
    margin-top: -10px;
  }
  .sh-sf-card-body {
    color: #777;
    font-size: 14px;
    line-height: 160%;
    flex: 1;
  }
  .sh-sf-card-num {
    font-family: condensed, sans-serif;
    font-size: 13px;
    color: #ccc;
    letter-spacing: 0.1em;
    font-weight: 600;
  }
</style>

  <div class="sh-sf-top">
    <div>
      <p class="sh-sf-label">[ Step into the fun zone ]</p>
      <h2 class="sh-sf-title">Studio<br>Features</h2>
    </div>
    <p class="sh-sf-desc">We're not just a fitness studio — we're a thoughtfully designed sanctuary created to support your wellness journey in every way.</p>
  </div>

  <div class="sh-sf-grid">

    <!-- Card 1: Changing Room -->
    <div class="sh-sf-card">
      <div class="sh-sf-icon-wrap">
        <svg width="28" height="28" viewBox="0 0 71 71" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M67.5248 33.7562L57.0845 26.3996C51.1628 22.2268 44.2723 19.8923 37.0699 19.6026V15.9292C37.0699 14.8639 37.9366 13.9971 39.002 13.9971C42.6379 13.9971 45.5958 11.0392 45.5958 7.40347V6.87162C45.5956 3.23571 42.6378 0.277832 39.0018 0.277832C35.3659 0.277832 32.4081 3.23571 32.4081 6.87162V7.89965C32.4081 8.74156 33.0905 9.42401 33.9324 9.42401C34.7743 9.42401 35.4568 8.74156 35.4568 7.89965V6.87162C35.4568 4.91693 37.0472 3.32656 39.0018 3.32656C40.9565 3.32656 42.5469 4.91693 42.5469 6.87162V7.40347C42.5469 9.35816 40.9567 10.9484 39.0018 10.9484C36.2554 10.9484 34.021 13.1828 34.021 15.9292V19.602C26.8152 19.8901 19.9212 22.225 13.9968 26.3996L3.55597 33.7565C1.94212 34.8945 1.28497 36.8462 1.88176 38.7287C2.4787 40.6108 4.13995 41.827 6.11431 41.827H15.2234V68.7536C15.2234 69.5955 15.9059 70.278 16.7478 70.278H46.8006C47.6424 70.278 48.325 69.5955 48.325 68.7536V56.3767H56.7238C57.5655 56.3767 58.2482 55.6942 58.2482 54.8523V41.8271H64.9669C66.9411 41.8271 68.6025 40.611 69.1993 38.729C69.7963 36.8462 69.1391 34.8945 67.5248 33.7562Z" fill="#83875A"/>
        </svg>
      </div>
      <div>
        <p class="sh-sf-card-label">Amenity</p>
        <h3 class="sh-sf-card-title">Changing<br>Room</h3>
      </div>
      <p class="sh-sf-card-body">Private, clean, and comfortable changing facilities so you can arrive and leave feeling your best.</p>
      <span class="sh-sf-card-num">01</span>
    </div>

    <!-- Card 2: Modern Equipment -->
    <div class="sh-sf-card">
      <div class="sh-sf-icon-wrap">
        <svg width="28" height="28" viewBox="0 0 71 71" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M34.8363 15.1486C34.9076 15.1583 34.9794 15.1631 35.0508 15.1631C35.3098 15.1631 35.5661 15.1004 35.7974 14.9793C38.829 13.3897 40.4663 10.0554 39.8717 6.68213C39.2768 3.30926 36.5978 0.735841 33.2054 0.278956C32.8755 0.234661 32.5394 0.293781 32.2445 0.448457C29.2128 2.03791 27.5755 5.37221 28.1701 8.74562C28.7646 12.1183 31.4436 14.6916 34.8363 15.1486ZM47.7515 59.9266H11.1783V35.3042L16.0163 30.4666L17.8544 32.3048C18.4824 32.9327 19.5 32.9327 20.1279 32.3048C20.7558 31.677 20.7558 30.6593 20.1279 30.0315L10.384 20.2876C9.75605 19.6598 8.73851 19.66 8.11051 20.2876C7.4827 20.9154 7.4827 21.9331 8.11051 22.5609L13.7428 28.1932L8.43398 33.5017C8.13248 33.8032 7.96316 34.212 7.96316 34.6384V60.0243C5.58496 60.4933 3.78564 62.595 3.78564 65.1089C3.78564 67.9665 6.11026 70.2913 8.96766 70.2913H47.7513C50.6089 70.2913 52.9337 67.9665 52.9337 65.1089C52.9337 62.2514 50.609 59.9266 47.7515 59.9266Z" fill="#83875A"/>
        </svg>
      </div>
      <div>
        <p class="sh-sf-card-label">Equipment</p>
        <h3 class="sh-sf-card-title">Modern<br>Equipment</h3>
      </div>
      <p class="sh-sf-card-body">State-of-the-art reformers and Pilates apparatus, maintained to the highest standard for your safety and experience.</p>
      <span class="sh-sf-card-num">02</span>
    </div>

    <!-- Card 3: Daily Classes -->
    <div class="sh-sf-card">
      <div class="sh-sf-icon-wrap">
        <svg width="28" height="28" viewBox="0 0 71 71" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M63.6652 32.1145C63.6652 24.1237 65.4417 18.7146 66.8694 14.3682C67.9194 11.1715 68.8262 8.41074 68.8262 5.45356C68.8262 2.59955 66.5043 0.277832 63.6502 0.277832C60.6931 0.277832 57.9325 1.18458 54.7358 2.23442C50.3894 3.6619 44.9802 5.43845 36.9897 5.43845C28.9988 5.43845 23.5894 3.6619 19.243 2.23442C16.0461 1.18458 13.2856 0.277832 10.3282 0.277832C7.47419 0.277832 5.15229 2.59955 5.15229 5.45356C5.15229 8.41093 6.05903 11.1717 7.10907 14.3684C8.39586 18.2861 9.85431 22.7263 10.2256 29.0668C10.2799 29.9926 11.0719 30.7014 12.0001 30.6448C12.9259 30.5907 13.6324 29.7963 13.5781 28.8705C13.1815 22.0936 11.5837 17.2291 10.2998 13.3204C9.30018 10.2772 8.51061 7.8736 8.51061 5.45356C8.51061 4.45147 9.32593 3.63615 10.3282 3.63615C12.7481 3.63615 15.1519 4.42554 18.1951 5.42501C22.7689 6.9273 28.4611 8.79676 36.9895 8.79676C45.5174 8.79676 51.2097 6.9273 55.7834 5.4252C58.8268 4.42554 61.2306 3.63615 63.6502 3.63615C64.6525 3.63615 65.4678 4.45147 65.4678 5.45356C65.4678 7.87341 64.6785 10.277 63.6788 13.3202C62.1765 17.8941 60.3069 23.5862 60.3069 32.1145C60.3069 40.6427 62.1765 46.3351 63.6788 50.9089C64.6783 53.9521 65.4678 56.3557 65.4678 58.7754C65.4678 59.7777 64.6525 60.593 63.6502 60.593C61.2304 60.593 58.8266 59.8036 55.7834 58.804C52.406 57.6946 48.2027 56.314 42.6846 55.7272C41.7624 55.63 40.9355 56.2973 40.8374 57.2194C40.7392 58.1414 41.4074 58.9685 42.3294 59.0667C47.4934 59.6157 51.3409 60.8796 54.7356 61.9945C57.9323 63.0444 60.6931 63.9513 63.6502 63.9513C66.5043 63.9513 68.8262 61.6294 68.8262 58.7754C68.8262 55.8182 67.9194 53.0577 66.8696 49.8609C65.4417 45.5145 63.6652 40.1052 63.6652 32.1145Z" fill="#83875A"/>
        </svg>
      </div>
      <div>
        <p class="sh-sf-card-label">Schedule</p>
        <h3 class="sh-sf-card-title">Daily<br>Classes</h3>
      </div>
      <p class="sh-sf-card-body">A rich variety of classes every day, designed around your lifestyle so you can always find your flow.</p>
      <span class="sh-sf-card-num">03</span>
    </div>

    <!-- Card 4: Ladies Only -->
    <div class="sh-sf-card">
      <div class="sh-sf-icon-wrap">
        <svg width="28" height="28" viewBox="0 0 71 71" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M52.4111 11.9971C51.7789 11.3653 51.7789 10.3405 52.4109 9.70846L53.4925 8.6267C54.1244 7.99465 55.1493 7.99447 55.7812 8.62652C56.4134 9.25838 56.4134 10.2831 55.7814 10.9152L54.6998 11.9969C54.3839 12.3129 53.9696 12.4709 53.5554 12.4709C53.1413 12.4709 52.727 12.3131 52.4111 11.9971ZM35.7223 5.08437C36.6161 5.08437 37.3406 4.3599 37.3406 3.46605V1.93619C37.3406 1.04252 36.6161 0.317871 35.7223 0.317871C34.8284 0.317871 34.1039 1.04252 34.1039 1.93619V3.46605C34.1039 4.3599 34.8284 5.08437 35.7223 5.08437ZM56.3375 45.2918C50.7833 41.6038 43.4294 39.5728 35.6305 39.5728C27.8319 39.5728 20.4778 41.6038 14.9237 45.2918C9.16558 49.1151 5.99438 54.2656 5.99438 59.7945C5.99438 60.6881 6.71885 61.4128 7.61271 61.4128H63.6487C64.5426 61.4128 65.2671 60.6881 65.2671 59.7945C65.2671 54.2656 62.0959 49.115 56.3375 45.2918Z" fill="#83875A"/>
        </svg>
      </div>
      <div>
        <p class="sh-sf-card-label">Community</p>
        <h3 class="sh-sf-card-title">Ladies<br>Only</h3>
      </div>
      <p class="sh-sf-card-body">A dedicated, safe, women-only space where you can move freely, build confidence, and truly belong.</p>
      <span class="sh-sf-card-num">04</span>
    </div>

  </div>
</div>
`;

// Replace the entire studioFeatures section
html = html.replace(
  /<div class="studioFeatures_container__5_jER">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*(?=<div class="sh-classes-section|<div class="ourClasses_container)/,
  newSection + '\n'
);

fs.writeFileSync('./public/content.html', html);
console.log('✅ Studio Features section redesigned!');
