const fs = require('fs');
const path = require('path');

const schedulePath = path.join(__dirname, 'schedules');
const scheduleModules = {};

// schedule 폴더 내의 모든 .js 파일을 동적으로 불러옴
fs.readdirSync(schedulePath).forEach(file => {
    if (file.endsWith('.js')) {
        const moduleName = path.basename(file, '.js'); // 파일명에서 .js 제거
        scheduleModules[moduleName] = require(`./schedules/${moduleName}`);
    }
});

// 모든 스케줄 모듈을 내보냄
module.exports = scheduleModules;