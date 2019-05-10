const fs            = require('fs');
const path          = require('path');
const zipFolder     = require('zip-folder');
const appDirectory  = fs.realpathSync(process.cwd());
const resolveApp    = relativePath => path.resolve(appDirectory, relativePath);
const distDir       = resolveApp('build');
const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() +1;
const day = date.getDate();
const hours = date.getHours();
const min = date.getMinutes();
const now = `${year}-${month}-${day}-${hours}:${min}`
const file          = resolveApp('/Users/xiaohuangyu/Desktop') + `/web-${now}.zip`;

module.exports = {
    startZip() {
        fs.exists(file, exist =>{
            if(exist){
                fs.unlinkSync(file);
            }
            zipFolder(distDir, file, function(err) {
                if(!err){
                    console.log('文件压缩成功!');
                }
            });
        });
    }
}





