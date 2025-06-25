const fs = require('fs');
const path = require('path');

// 递归遍历目录
function traverseDirectory(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            traverseDirectory(filePath);
        } else {
            checkFileForLibreTV(filePath);
        }
    });
}

// 检查文件内容是否包含 LibreTV
function checkFileForLibreTV(filePath) {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        if (data.includes('LibreTV')) {
            console.log(filePath);
        }
    } catch (err) {
        console.error(`读取文件 ${filePath} 出错:`, err);
    }
}

// 起始目录
const projectRoot = path.join(__dirname, 'LibreTV');
traverseDirectory(projectRoot);
