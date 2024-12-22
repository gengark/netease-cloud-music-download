# 网易云音乐下载

一个简单的 Node.js CLI 库，用来下载网易云音乐源的 mp3 文件。

## 📦 安装

1. 确保安装过 Node 程序。

    > 官方提供的简易安装包： [下载链接 (约 30 MB)][node-url]

2. 打开任意终端（cmd/bash/powershell/...）安装当前包。

    ```bash
    git clone https://github.com/gengark/netease-cloud-music-download.git && cd netease-cloud-music-download && npm run install && npm link
    ```

3. 遇到问题无法解决？

    > 点击 [Issues][issues-url] 填写表单，描述问题和截图来获取帮助。

## ⚙️ 使用

- 使用 ID

  ```bash
  wyy 25159744
  ```

  ```
  下载进度 [========================================] 100% | 433467/433467 KB
  ✔ 下载完成: C:\Users\User\Downloads\Hello Makka Pakka! - Andrew Davenport.mp3
  ```

- 使用分享链接

  ```bash
  wyy "https://music.xxx.com/song?id=25159744"
  ```

  ```
  下载进度 [========================================] 100% | 433467/433467 KB
  ✔ 下载完成: C:\Users\User\Downloads\Hello Makka Pakka! - Andrew Davenport.mp3
  ```

- 使用剪贴板

  ```bash
  wyy
  ```

  ```
  下载进度 [========================================] 100% | 433467/433467 KB
  ✔ 下载完成: C:\Users\User\Downloads\Hello Makka Pakka! - Andrew Davenport.mp3
  ```

- 指定下载目录 (`.`表示当前目录)

  ```bash
  wyy -o .
  ```

  ```
  下载进度 [========================================] 100% | 433467/433467 KB
  ✔ 下载完成: Hello Makka Pakka! - Andrew Davenport.mp3
  ```
  
- 当下载目录同名文件存在时，覆盖现有文件

  ```bash
  wyy -r
  ```

  ```
  下载进度 [========================================] 100% | 433467/433467 KB
  ✔ 下载完成: C:\Users\User\Downloads\Hello Makka Pakka! - Andrew Davenport.mp3
  ```

- 使用默认浏览器访问，而非下载文件

  ```bash
  wyy -b
  ```

  ```
  ✔ 资源地址: http://music.163.com/song//media/outer/url?id=25159744
  ✔ 浏览器访问资源会自动播放, 请注意使用场合, 确认使用浏览器打开吗? (按回车键确认) Yes
  ✔ 已在默认浏览器中打开，请切换到浏览器窗口中查看
  ```

## ❓ Q & A

### \> 默认文件会下载到哪里

未指定 -o 参数时，默认下载到当前用户默认的 Downloads 文件夹，即浏览器下载文件目录。

### \> 文件命名规则是什么

单曲名 - 歌手名1\[, 歌手名2, ...\](若有多个).mp3

### \> 如何获取分享链接

在客户端中点击一首歌曲的分享按钮 > 点击复制链接。

或者直接复制单曲在浏览器中的链接。

## 🤝 贡献

欢迎通过 Pull Requests 或 [Issues][issues-url] 来贡献你的想法和代码。

## 📄 许可

本项目采用 MIT 许可证。详情请见 [LICENSE][license-url] 文件。

[node-url]: https://nodejs.org/zh-cn/download/prebuilt-installer

[issues-url]: https://github.com/gengark/netease-cloud-music-download/issues

[license-url]: LICENSE
