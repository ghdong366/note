#/bin/bash

echo 正在搜索。。。
find / -name "*lastUpdated" | xargs rm -rf

echo 清理完成！!
