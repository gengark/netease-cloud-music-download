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

### 快速开始

**查询 `Makka Pakka` 歌曲，选中相应歌曲下载**

```bash
wyy "Makka Pakka"
```

**使用默认浏览器访问资源**

```bash
wyy "Makka Pakka" -b
```

**通过剪贴板中的分享链接下载**

```bash
wyy dl
```

**通过分享链接下载**

```bash
wyy dl "https://music.163.com/song?id=34324641"
```

### 通用选项

| 选项                 | 类型        | 可选   | 默认值     | 描述                |
|--------------------|-----------|------|---------|-------------------|
| `--output` / `-o`  | `boolean` | true | `false` | 输出路径 (目录/文件名.mp3) |
| `--rewrite` / `-r` | `boolean` | true | `false` | 覆盖现有的同名文件 (若存在)   |
| `--browse` / `-b`  | `boolean` | true | `false` | 使用默认浏览器访问         |

### Search

> 查询并下载选中单曲

```bash
wyy 查询信息
```

- 查询 `兰亭序` 并下载选中歌曲

  ```bash
  wyy 兰亭序
  ```

  `disabled` 一般表示付费/vip/无音源/无版权

  ```
  - 兰亭序 - 歌手1 (disabled)
  - 兰亭序 - 歌手2 (disabled)
  > 兰亭序 - 歌手3
  ...
  ──────────────
    下一页
  专辑: xx专辑
  发布日期: 2010-10-01
  ```

  ```
  下载进度 [========================================] 100% | 3248422/3248422 KB
  ✔ 下载完成: C:\Users\User\Downloads\兰亭序 - 歌手3.mp3
  ```

- 查询单曲名、歌手、描述任意组合

  ```bash
  wyy "猪猪侠主题曲 陈洁丽"
  ```

  ```
  > 猪猪侠 - 陈洁丽
  - 超兽武装 - 陈洁丽 / 刘罡 (disabled)
    猪猪侠主题曲 - 胡小贝
    疯狂果宝 - 陈洁丽 / 陆双 / 祖晴 / 王巍
  - 疯狂果宝 - 陈洁丽 / 陆双 / 祖晴 / 王巍 (disabled)
    果宝特攻 - 陈洁丽
  ...
  ──────────────
    下一页
  专辑: 未知专辑
  其他信息: 动画片《猪猪侠》主题曲
  发布日期: 2014-01-01
  ```

- 参数使用参考 `download` 命令

### Download

> 通过 `分享链接` / `ID` 下载单曲

别名: `dl`

参数: `--output` (`-o`) / `--rewrite` (`-r`) / `--browse` (`-b`)

默认: `false`

- 使用 ID

  ```bash
  wyy dl 25159744
  ```

  ```
  下载进度 [========================================] 100% | 433467/433467 KB
  ✔ 下载完成: C:\Users\User\Downloads\Hello Makka Pakka! - Andrew Davenport.mp3
  ```

- 使用分享链接

  ```bash
  wyy dl "https://music.163.com/song?id=25159744"
  ```

  ```
  下载进度 [========================================] 100% | 433467/433467 KB
  ✔ 下载完成: C:\Users\User\Downloads\Hello Makka Pakka! - Andrew Davenport.mp3
  ```

- 使用剪贴板

  ```bash
  wyy dl
  ```

  ```
  下载进度 [========================================] 100% | 433467/433467 KB
  ✔ 下载完成: C:\Users\User\Downloads\Hello Makka Pakka! - Andrew Davenport.mp3
  ```

- 指定下载目录 (`.`表示当前目录)

  ```bash
  wyy dl -o .
  ```

  ```
  下载进度 [========================================] 100% | 433467/433467 KB
  ✔ 下载完成: Hello Makka Pakka! - Andrew Davenport.mp3
  ```

- 当下载目录同名文件存在时，覆盖现有文件

  ```bash
  wyy dl -r
  ```

  ```
  下载进度 [========================================] 100% | 433467/433467 KB
  ✔ 下载完成: C:\Users\User\Downloads\Hello Makka Pakka! - Andrew Davenport.mp3
  ```

- 使用默认浏览器访问，而非下载文件

  ```bash
  wyy dl -b
  ```

  ```
  ℹ 资源地址: http://music.163.com/song/media/outer/url?id=25159744
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
