const express = require('express');
const os = require('os');

const app = express();
const PORT = process.env.PORT || 3000;

// 루트 경로: 컨테이너 정보를 JSON으로 돌려줌
app.get('/', (req, res) => {
  res.json({
    message: '안녕! 내 첫 컨테이너 앱',
    hostname: os.hostname(),                       // 컨테이너 ID가 찍힘
    version: process.env.APP_VERSION || 'dev',     // 환경변수로 버전 주입
    time: new Date().toISOString(),
  });
});

// 헬스체크용 (쿠버네티스에서 나중에 씀)
app.get('/healthz', (req, res) => res.send('ok'));

app.listen(PORT, () => console.log(`listening on :${PORT}`));
